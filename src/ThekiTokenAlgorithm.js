// Import Necessary Libraries
const tf = require('@tensorflow/tfjs-node');
const { BertTokenizer, BertModel } = require('@huggingface/tokenizers');



// Load Pre-trained BERT Model and Tokenizer
const tokenizer = BertTokenizer.fromPretrained('bert-base-uncased');
const bertModel = BertModel.fromPretrained('bert-base-uncased');

// Caching Mechanism for Embeddings
const embeddingCache = {};

async function getBertEmbedding(text) {
    if (embeddingCache[text]) {
        return embeddingCache[text];
    } else {
        const inputs = await tokenizer.encode(text, { truncation: true, maxLength: 512, returnTensors: 'tf' });
        const outputs = await bertModel(inputs);
        const embedding = outputs.poolerOutput;
        embeddingCache[text] = embedding;
        return embedding;
    }
}

async function calculateSimilarity(text1, text2) {
    const embedding1 = await getBertEmbedding(text1);
    const embedding2 = await getBertEmbedding(text2);
    const similarity = tf.losses.cosineDistance(embedding1, embedding2, 0);
    return similarity.arraySync();
}

function experienceSimilarity(profExp, jobExp) {
    if (profExp >= jobExp) {
        return 1.0; // Full score
    } else {
        return profExp / jobExp; // Partial score
    }
}

function applyVerificationWeight(score, verified, verificationBoost = 0.2) {
    return verified ? score * (1 + verificationBoost) : score;
}

export async function calculateThekiScore(profile, job, categoryWeights) {
    // Normalize category weights
    const totalWeight = Object.values(categoryWeights).reduce((acc, val) => acc + val, 0);
    categoryWeights = Object.fromEntries(Object.entries(categoryWeights).map(([k, v]) => [k, v / totalWeight]));

    let totalScore = 0;
    let maxScore = 0;

    // Skills Matching
    let skillScore = 0;
    const maxSkillScore = job.qualifications.skills.technical_skills.length + job.qualifications.skills.soft_skills.length;

    // Technical Skills
    for (const jobSkill of job.qualifications.skills.technical_skills) {
        let bestMatch = 0;
        for (const profSkill of profile.skills.technical_skills) {
            const similarity = await calculateSimilarity(profSkill.skill, jobSkill.skill);
            const weightedSimilarity = applyVerificationWeight(similarity, profSkill.verified);
            const expSimilarity = experienceSimilarity(profSkill.experience, jobSkill.experience);
            const totalSimilarity = weightedSimilarity * expSimilarity;
            bestMatch = Math.max(bestMatch, totalSimilarity);
        }
        skillScore += bestMatch;
    }

    // Soft Skills
    for (const jobSkill of job.qualifications.skills.soft_skills) {
        let bestMatch = 0;
        for (const profSkill of profile.skills.soft_skills) {
            const similarity = await calculateSimilarity(profSkill.skill, jobSkill.skill);
            const weightedSimilarity = applyVerificationWeight(similarity, profSkill.verified);
            const expSimilarity = experienceSimilarity(profSkill.experience, jobSkill.experience);
            const totalSimilarity = weightedSimilarity * expSimilarity;
            bestMatch = Math.max(bestMatch, totalSimilarity);
        }
        skillScore += bestMatch;
    }

    // Normalize and weight skill score
    totalScore += (skillScore / maxSkillScore) * categoryWeights.skills;
    maxScore += categoryWeights.skills;

    // Experiences Matching
    let experienceScore = 0;
    const maxExperienceScore = job.qualifications.experiences.length;
    for (const jobExp of job.qualifications.experiences) {
        let bestMatch = 0;
        for (const profExp of profile.experiences) {
            const industrySimilarity = await calculateSimilarity(profExp.industry, jobExp.industry);
            const weightedIndustrySimilarity = applyVerificationWeight(industrySimilarity, profExp.verified);
            const durationSimilarity = experienceSimilarity(profExp.duration, jobExp.duration);
            const totalSimilarity = weightedIndustrySimilarity * durationSimilarity;
            bestMatch = Math.max(bestMatch, totalSimilarity);
        }
        experienceScore += bestMatch;
    }

    // Normalize and weight experience score
    totalScore += (experienceScore / maxExperienceScore) * categoryWeights.experiences;
    maxScore += categoryWeights.experiences;

    // Projects Matching
    let projectScore = 0;
    const maxProjectScore = job.qualifications.projects.length;
    for (const jobProj of job.qualifications.projects) {
        let bestMatch = 0;
        for (const profProj of profile.projects) {
            const skillsSimilarity = tf.mean(tf.stack(jobProj.skills_applied.map(jobSkill => 
                profProj.skills_applied.map(skill => calculateSimilarity(skill, jobSkill))))).arraySync();
            const toolsSimilarity = tf.mean(tf.stack(jobProj.tools_used.map(jobTool => 
                profProj.tools_used.map(tool => calculateSimilarity(tool, jobTool))))).arraySync();
            const totalSimilarity = (skillsSimilarity + toolsSimilarity) / 2;
            const weightedSimilarity = applyVerificationWeight(totalSimilarity, profProj.verified);
            bestMatch = Math.max(bestMatch, weightedSimilarity);
        }
        projectScore += bestMatch;
    }

    // Normalize and weight project score
    if (maxProjectScore > 0) {
        totalScore += (projectScore / maxProjectScore) * categoryWeights.projects;
        maxScore += categoryWeights.projects;
    }

    // Achievements Matching
    let achievementScore = 0;
    const maxAchievementScore = job.qualifications.achievements.length;
    for (const jobAch of job.qualifications.achievements) {
        let bestMatch = 0;
        for (const profAch of profile.achievements) {
            const typeMatch = profAch.type === jobAch.type ? 1.0 : 0.0;
            const industrySimilarity = await calculateSimilarity(profAch.industry, jobAch.industry);
            const skillSimilarity = await calculateSimilarity(profAch.skill, jobAch.skill);
            const totalSimilarity = (typeMatch + industrySimilarity + skillSimilarity) / 3;
            const weightedSimilarity = applyVerificationWeight(totalSimilarity, profAch.verified);
            bestMatch = Math.max(bestMatch, weightedSimilarity);
        }
        achievementScore += bestMatch;
    }

    // Normalize and weight achievement score
    if (maxAchievementScore > 0) {
        totalScore += (achievementScore / maxAchievementScore) * categoryWeights.achievements;
        maxScore += categoryWeights.achievements;
    }

    // Endorsements Matching
    let endorsementScore = 0;
    const maxEndorsementScore = job.qualifications.endorsements.length;
    for (const jobEnd of job.qualifications.endorsements) {
        let bestMatch = 0;
        for (const profEnd of profile.endorsements) {
            const skillsSimilarity = tf.mean(tf.stack(jobEnd.skills_related.map(jobSkill => 
                profEnd.skills_related.map(skill => calculateSimilarity(skill, jobSkill))))).arraySync();
            const weightedSimilarity = applyVerificationWeight(skillsSimilarity, profEnd.verified);
            bestMatch = Math.max(bestMatch, weightedSimilarity);
        }
        endorsementScore += bestMatch;
    }

    // Normalize and weight endorsement score
    if (maxEndorsementScore > 0) {
        totalScore += (endorsementScore / maxEndorsementScore) * categoryWeights.endorsements;
        maxScore += categoryWeights.endorsements;
    }

    // Claims Matching
    let claimScore = 0;
    const maxClaimScore = job.qualifications.claims?.length || 0;
    for (const jobClaim of (job.qualifications.claims || [])) {
        let bestMatch = 0;
        for (const profClaim of profile.claims) {
            const similarity = await calculateSimilarity(profClaim.content, jobClaim.content);
            const weightedSimilarity = applyVerificationWeight(similarity, profClaim.verified);
            bestMatch = Math.max(bestMatch, weightedSimilarity);
        }
        claimScore += bestMatch;
    }

    // Normalize and weight claim score
    if (maxClaimScore > 0) {
        totalScore += (claimScore / maxClaimScore) * categoryWeights.claims;
        maxScore += categoryWeights.claims;
    }

    // Final Theki Score
    const finalScore = (totalScore / maxScore) * 100; // Scale to 0-100
    return finalScore;
}