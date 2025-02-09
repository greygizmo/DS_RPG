// src/utils/roleScoring.js

export async function fetchRolesData() {
    const response = await fetch(`${process.env.PUBLIC_URL}/rolesData.json`);
    if (!response.ok) {
        throw new Error('Failed to load rolesData');
    }
    return response.json();
}

export function calculateMatchScore(role, selections, weights) {
    let weightedScore = 0;
    let totalWeight = 0;

    // Define keyword mappings for each selection criterion
    const motivationMapping = {
        'Creative Expression': ['Designer', 'Illusionist', 'Artist', 'Creative'],
        'Analytical Rigor': ['Engineer', 'Analyst', 'Scientist', 'Data'],
        'Efficiency & Order': ['Management', 'Administrator', 'Coordinator', 'Planner', 'Operations'],
        'Collaboration & Teamwork': ['Collaborator', 'Team', 'Liaison', 'Communication']
    };

    const workPreferenceMapping = {
        'Solo Explorer': ['Solo', 'Independent'],
        'Team Player': ['Team', 'Collaboration', 'Group']
    };

    // Helper function to check if a string contains any of the keywords (case-insensitive)
    const containsAny = (str, keywords) => {
        if (!str) return false; // Handle null/undefined strings
        const lowerStr = str.toLowerCase();
        return keywords.some(keyword => lowerStr.includes(keyword.toLowerCase()));
    };

    // Define checks for each criterion
    const criteriaChecks = {
        motivation: (role, selection) => {
            const keywords = motivationMapping[selection];
            return keywords && (containsAny(role.guild, keywords) || containsAny(role.subcategory, keywords));
        },
        industry: (role, selection) => role.industry === selection || role.industry === "Generic",
        specialization: (role, selection) => parseInt(role.levelOfSpecialization, 10) <= selection,
        workPreference: (role, selection) => {
            const keywords = workPreferenceMapping[selection];
            return keywords && (containsAny(role.guild, keywords) || containsAny(role.subcategory, keywords));
        },
    };

    // Iterate through the selections and apply the corresponding checks
    for (const key in selections) {
        if (selections[key] && criteriaChecks[key]) {
            totalWeight += weights[key] || 1; // Use provided weight or default to 1
            if (criteriaChecks[key](role, selections[key])) {
                weightedScore += weights[key] || 1;
            }
        }
    }

    const percent = totalWeight > 0 ? Math.round((weightedScore / totalWeight) * 100) : 0;
    return { ...role, weightedScore, totalWeight, percent };
}


export function getMatchDescription(score, total) { // Keeping this for consistency, but it's not *used* in RoleAssignmentScreen
    if (total === 0) return "No criteria chosen.";
    const ratio = score / total;
    if (ratio === 1) return "🌟 A perfect match!";
    if (ratio >= 0.75) return "👍 Great match!";
    if (ratio >= 0.5) return "✨ Decent match.";
    if (ratio > 0) return "🔍 Partial match.";
    return "❓ No match for your selections.";
}