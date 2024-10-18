import warnings
warnings.filterwarnings("ignore", category=UserWarning)


warnings.filterwarnings("ignore", message=".*beta.*")
warnings.filterwarnings("ignore", message=".*gamma.*")



# Import Necessary Libraries
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


def get_bert_embedding(text):
    if text in embedding_cache:
        return embedding_cache[text]
    else:
        inputs = tokenizer(text, return_tensors='pt', truncation=True, max_length=512)
        outputs = bert_model(**inputs)
        embedding = outputs.pooler_output
        embedding_cache[text] = embedding
        return embedding

def calculate_similarity(text1, text2):
    embedding1 = get_bert_embedding(text1)
    embedding2 = get_bert_embedding(text2)
    similarity = torch.nn.functional.cosine_similarity(embedding1, embedding2)
    return similarity.item()

def experience_similarity(prof_exp, job_exp):
    if prof_exp >= job_exp:
        return 1.0  # Full score
    else:
        return prof_exp / job_exp  # Partial score

def apply_verification_weight(score, verified, verification_boost=0.2):
    return score * (1 + verification_boost) if verified else score

def calculate_theki_score(profile, job, category_weights):
    # Normalize category weights
    total_weight = sum(category_weights.values())
    category_weights = {k: v / total_weight for k, v in category_weights.items()}
    
    total_score = 0
    max_score = 0  # For normalization

    # Skills Matching
    skill_score = 0
    max_skill_score = len(job['qualifications']['skills']['technical_skills']) + len(job['qualifications']['skills']['soft_skills'])
    
    # Technical Skills
    for job_skill in job['qualifications']['skills']['technical_skills']:
        best_match = 0
        for prof_skill in profile['skills']['technical_skills']:
            similarity = calculate_similarity(prof_skill['skill'], job_skill['skill'])
            similarity = apply_verification_weight(similarity, prof_skill['verified'])
            exp_similarity = experience_similarity(prof_skill['experience'], job_skill['experience'])
            total_similarity = similarity * exp_similarity
            if total_similarity > best_match:
                best_match = total_similarity
        skill_score += best_match

    # Soft Skills
    for job_skill in job['qualifications']['skills']['soft_skills']:
        best_match = 0
        for prof_skill in profile['skills']['soft_skills']:
            similarity = calculate_similarity(prof_skill['skill'], job_skill['skill'])
            similarity = apply_verification_weight(similarity, prof_skill['verified'])
            exp_similarity = experience_similarity(prof_skill['experience'], job_skill['experience'])
            total_similarity = similarity * exp_similarity
            if total_similarity > best_match:
                best_match = total_similarity
        skill_score += best_match

    # Normalize and weight skill score
    total_score += (skill_score / max_skill_score) * category_weights['skills']
    max_score += category_weights['skills']

    # Experiences Matching
    experience_score = 0
    max_experience_score = len(job['qualifications']['experiences'])
    for job_exp in job['qualifications']['experiences']:
        best_match = 0
        for prof_exp in profile['experiences']:
            industry_similarity = calculate_similarity(prof_exp['industry'], job_exp['industry'])
            industry_similarity = apply_verification_weight(industry_similarity, prof_exp['verified'])
            duration_similarity = experience_similarity(prof_exp['duration'], job_exp['duration'])
            total_similarity = industry_similarity * duration_similarity
            if total_similarity > best_match:
                best_match = total_similarity
        experience_score += best_match

    # Normalize and weight experience score
    total_score += (experience_score / max_experience_score) * category_weights['experiences']
    max_score += category_weights['experiences']

    # Projects Matching
    project_score = 0
    max_project_score = len(job['qualifications']['projects'])
    for job_proj in job['qualifications']['projects']:
        best_match = 0
        for prof_proj in profile['projects']:
            skills_similarity = np.mean([calculate_similarity(skill, job_skill)
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
            type_match = 1.0 if prof_ach['type'] == job_ach['type'] else 0.0
            industry_similarity = calculate_similarity(prof_ach['industry'], job_ach['industry'])
            skill_similarity = calculate_similarity(prof_ach['skill'], job_ach['skill'])
            total_similarity = (type_match + industry_similarity + skill_similarity) / 3
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
    max_claim_score = len(job['qualifications'].get('claims', []))
    for job_claim in job['qualifications'].get('claims', []):
        best_match = 0
        for prof_claim in profile['claims']:
            similarity = calculate_similarity(prof_claim['content'], job_claim['content'])
            similarity = apply_verification_weight(similarity, prof_claim['verified'])
            if similarity > best_match:
                best_match = similarity
        claim_score += best_match

    # Normalize and weight claim score
    if max_claim_score > 0:
        total_score += (claim_score / max_claim_score) * category_weights['claims']
        max_score += category_weights['claims']

    # Final Theki Score
    final_score = (total_score / max_score) * 100  # Scale to 0-100
    return final_score


# Flask API endpoint for calculating the score
@app.route('/calculate_score', methods=['POST'])
def calculate_score():

    try:

        data = request.get_json()
        
        # Extracting profile, job and weights from the request
        profile = data.get('profile')
        job = data.get('job')
        category_weights = data.get('category_weights')

        # Calculate Theki Score
        score = calculate_theki_score(profile, job, category_weights)
        
        # Return the score in JSON format

        return jsonify({'theki_score': score})

    except Exception as e:
        # Log the error
        app.logger.error(f"An error occurred: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500
        

# Main entry point
if __name__ == '__main__':
    app.run(debug=True, port=5000)