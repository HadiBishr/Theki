# Import Libraries
import torch
import logging
from transformers import BertTokenizer, BertModel
import numpy as np
from flask_cors import CORS, cross_origin
from flask import Flask, request, jsonify

# Load Pre-trained BERT Model and Tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
bert_model = BertModel.from_pretrained('bert-base-uncased')

# Caching Mechanism for Embeddings
embedding_cache = {}

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Helper functions for calculating embeddings and similarity
def get_bert_embedding(text):
    # Check if the embedding is already cached, if so, return it to save computation
    if text in embedding_cache:
        return embedding_cache[text]
    else:
        # Tokenize input text and pass through BERT model to get embeddings
        inputs = tokenizer(text, return_tensors='pt', truncation=True, max_length=512)
        outputs = bert_model(**inputs)
        embedding = outputs.pooler_output  # Extract the pooled output from BERT
        embedding_cache[text] = embedding  # Cache the embedding for future use
        return embedding

def calculate_similarity(text1, text2):
    # Get embeddings for both text inputs
    embedding1 = get_bert_embedding(text1)
    embedding2 = get_bert_embedding(text2)
    # Calculate cosine similarity between the two embeddings
    similarity = torch.nn.functional.cosine_similarity(embedding1, embedding2)
    similarity_value = similarity.item()  # Convert the tensor to a scalar value

    # Apply soft threshold using a sigmoid function to smooth similarity values
    def sigmoid(x, alpha=10):
        return 1 / (1 + np.exp(-alpha * (x)))
    
    # Return the sigmoid value to smoothly scale the similarity
    return sigmoid(similarity_value)

def experience_similarity(prof_exp, job_exp):
    # If professional's experience is greater than or equal to job requirement, calculate a boosted score
    if prof_exp >= job_exp:
        # Reward additional experience with a diminishing return factor to avoid runaway scoring
        return 1.0 + np.log1p(prof_exp - job_exp) / np.log1p(job_exp + 1)
    else:
        # Otherwise, return a partial score proportional to experience
        return prof_exp / job_exp  # Partial score

def apply_verification_weight(score, verified, verification_boost=0.2):
    # Increase the score if the information has been verified
    return score * (1 + verification_boost) if verified else score

# Theki Score Calculation
def calculate_theki_score(profile, job, category_weights):
    # Normalize category weights to ensure they sum to 1
    total_weight = sum(category_weights.values())
    category_weights = {k: v / total_weight for k, v in category_weights.items()}
    
    total_score = 0
    max_score = 0 # to keep track of normalization
    
    # skills matching
    skill_score = 0
    max_skill_score = len(job['qualifications']['technical_skills']) + len(job['qualifications']['soft_skills'])
    
    # Technical Skills Matching
    for job_skill in job['qualifications']['technical_skills']:
        best_match = 0
        for prof_skill in profile['technical_skills']:
            # Calculate similarity and apply verification weight if applicable
            similarity = calculate_similarity(prof_skill['skill'], job_skill['skill'])
            similarity = apply_verification_weight(similarity, prof_skill['verified'])
            exp_similarity = experience_similarity(prof_skill['experience'], job_skill['experience'])
            total_similarity = similarity * exp_similarity
            if total_similarity > best_match:
                best_match = total_similarity # update best match if current match is better
        skill_score += best_match
            
    # Soft Skills Matching
    for job_skill in job['qualifications']['soft_skills']:
        best_match = 0
        for prof_skill in profile['soft_skills']:
            # Calculate similarity for soft skills
            similarity = calculate_similarity(prof_skill['skill'], job_skill['skill'])
            similarity = apply_verification_weight(similarity, prof_skill['verified'])
            exp_similarity = experience_similarity(prof_skill['experience'], job_skill['experience'])
            total_similarity = similarity * exp_similarity
            if total_similarity > best_match:
                best_match = total_similarity
        skill_score += best_match
        
    # Normalize and weight skill score
    if max_skill_score > 0:
        total_score += (skill_score / max_skill_score) * category_weights['skills']
        max_score += category_weights['skills']
        
    # Experiences Matching
    experience_score = 0
    max_experience_score = len(job['qualifications']['experiences'])
    for job_exp in job['qualifications']['experiences']:
        best_match = 0
        for prof_exp in profile['experiences']:
            # Calculate industry similarity and apply verification
            industry_similarity = calculate_similarity(prof_exp['industry'], job_exp['industry'])
            industry_similarity = apply_verification_weight(industry_similarity, prof_exp['verified'])
            duration_similarity = experience_similarity(prof_exp['experience'], job_exp['experience'])
            total_similarity = industry_similarity * duration_similarity
            if total_similarity > best_match:
                best_match = total_similarity
        experience_score += best_match
        
    # Normalize and weight experience score
    if max_experience_score > 0:
        total_score += (experience_score / max_experience_score) * category_weights['experiences']
        max_score += category_weights['experiences']
        
    # Project Matching
    project_score = 0
    max_project_score = len(job['qualifications']['project'])
    for job_proj in job['qualifications']['projects']:
        best_match = 0
        for prof_proj in profile['projects']:
            # Calculate average similarity for skills and tools used in projects
            skills_similarity = np.maen([calculate_similarity(skill, job_skill) 
                                         for skill in prof_proj['skills_applied']
                                         for job_skill in job_proj['skills_applied']])
            tools_similarity = np.mean([calculate_similarity(tool, job_tool)
                                        for tool in prof_proj['tools_used']
                                        for job_tool in job_proj['tools_used']])
            total_similarity = (skills_similarity + tools_similarity) / 2
            total_similarity = apply_verification_weight(total_similarity, prof_proj['verified'])
            if total_similarity > best_match:
                best_match = total_similarity
        project_score += best_match
        
    # Normalize and weight project score
    if max_project_score > 0:
        total_score += (project_score / max_project_score) * category_weights['projects']
        max_score += category_weights['projects']
        
    # Achievements Matching
    achievement_score = 0
    max_achievement_score = len(job['qualifications']['achievements'])
    for job_ach in job['qualifications']['achievements']:
        best_match = 0
        for prof_ach in profile['achievements']:
            # Check for type match and calculate industry and skill similarity
            type_match = 1.0 if prof_ach['content'] == job['content'] else 0.0
            industry_similarity = calculate_similarity(prof_ach['industry'], job_ach['industry'])
            skills_similarity = calculate_similarity(prof_ach['skill'], job_ach['skill'])
            total_similarity = (type_match + industry_similarity + skills_similarity) / 3
            total_similarity = apply_verification_weight(total_similarity, prof_ach['verified'])
            if total_similarity > best_match:
                best_match = total_similarity
            achievement_score += best_match
            
    # Normalize and weight achievement score
    if max_achievement_score > 0:
        total_score += (achievement_score / max_achievement_score) * category_weights['achievements']
        max_score += category_weights['achievements']
        
        
    # Endorsements Matching
    endorsement_score = 0
    max_endorsement_score = len(job['qualifications']['endorsements'])
    for job_end in job['qualifications']['endorsements']:
        best_match = 0
        for prof_end in profile['endorsements']:
            # Calculate similarity for related skills in endorsements
            skills_similarity = np.mean([calculate_similarity(skill, job_skill)
                                         for skill in prof_end['skills_related']
                                         for job_skill in job_end['skills_related']])
            total_similarity = skills_similarity
            total_similarity = apply_verification_weight(total_similarity, prof_end['verified'])
            if total_similarity > best_match:
                best_match = total_similarity
        endorsement_score += best_match
        
    # Normalize and weight endorsement score
    if max_endorsement_score > 0:
        total_score += (endorsement_score / max_endorsement_score) * category_weights['endorsements']
        max_score += category_weights['endorsements']
        
    # Claims Matching 
    claim_score = 0
    max_claim_score = len(profile['claims']) # max score based on # of claims made by profesional
    
    for prof_claim in profile['claims']:
        # Vectorize the claim
        claim_embedding = get_bert_embedding(prof_claim['content'])

        # Store similarity scores for different sections
        section_scores = {}

        # Compare claim with technical skills in the job description
        tech_skills_embedding = get_bert_embedding(' '.join([skill['skill'] for skill in job['qualifications']['technical_skills']]))
        section_scores['technical_skills'] = torch.nn.functional.cosine_similarity(claim_embedding, tech_skills_embedding).item()

        # Compare claim with soft skills in the job description
        soft_skills_embedding = get_bert_embedding(' '.join([skill['skill'] for skill in job['qualifications']['soft_skills']]))
        section_scores['soft_skills'] = torch.nn.functional.cosine_similarity(claim_embedding, soft_skills_embedding).item()

        # Compare claim with experiences in the job description
        experience_embedding = get_bert_embedding(' '.join([exp['industry'] + ' ' + exp['job'] for exp in job['qualifications']['experiences']]))
        section_scores['experiences'] = torch.nn.functional.cosine_similarity(claim_embedding, experience_embedding).item()

        # Compare claim with duties
        duties_embedding = get_bert_embedding(' '.join(job['duties']['primary_duties'] + job['duties']['secondary_duties']))
        section_scores['duties'] = torch.nn.functional.cosine_similarity(claim_embedding, duties_embedding).item()

        # Compare claim with achievements in the job description
        achievements_embedding = get_bert_embedding(' '.join([ach['content'] for ach in job['qualifications']['achievements']]))
        section_scores['achievements'] = torch.nn.functional.cosine_similarity(claim_embedding, achievements_embedding).item()

        # Compare claim with projects in the job description
        projects_embedding = get_bert_embedding(' '.join([proj['skills_applied'] + ' ' + proj['tools_used'] for proj in job['qualifications']['projects']]))
        section_scores['projects'] = torch.nn.functional.cosine_similarity(claim_embedding, projects_embedding).item()

        # Compare claim with endorsements in the job description
        endorsements_embedding = get_bert_embedding(' '.join([end['skills_related'] for end in job['qualifications']['endorsements']]))
        section_scores['endorsements'] = torch.nn.functional.cosine_similarity(claim_embedding, endorsements_embedding).item()

        # Find the section that is most relevant to the claim
        best_match_section = max(section_scores, key=section_scores.get)
        best_match_score = section_scores[best_match_section]

        # Apply verification weight to the best match score
        best_match_score = apply_verification_weight(best_match_score, prof_claim['verified'])

        # Add the best match score to the claim score
        claim_score += best_match_score
        
    if max_claim_score > 0:
        total_score += (claim_score / max_claim_score)
        max_score += category_weights['claims']
            
    final_score = (total_score / max_score) * 100 # Scale to 0-100
    final_score = min(final_score, 100) # cap the score
    
    return final_score


# Flask API endpoint for calculating the score
@app.route('/calculate_score', methods=['POST'])
@cross_origin()  # Allow all origins for this specific route
def calculate_score():
    try:
        data = request.get_json()
        print(data)
        
        # Extracting profile, job, and weights from the request
        profile = data.get('profile')
        job = data.get('job')
        category_weights = data.get('category_weights')

        # Calculate Theki Score
        score = calculate_theki_score(profile, job, category_weights)

        print(score)
        
        # Return the score in JSON format
        return jsonify({'theki_score': score})

    except Exception as e:
        # Log the error
        app.logger.error(f"An error occurred: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

# Main entry point
if __name__ == '__main__':
    app.run(debug=True, port=5000)
    