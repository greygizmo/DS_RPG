/***** script.js *****/
"use strict";  // Enforce strict mode for cleaner code

let rolesData = [];  // will hold the array of role objects from rolesData.json

// Fetch roles data on initial load (could also do this on button click for lazy load)
fetch('rolesData.json')
  .then(response => response.json())
  .then(data => {
    rolesData = data;
    console.log(`Loaded ${rolesData.length} roles from rolesData.json`);
  })
  .catch(err => {
    console.error("Failed to load rolesData.json:", err);
  });

// Utility: Calculate match score for a role given selected criteria
function calculateMatchScore(role, criteria) {
  let score = 0;
  let totalCriteria = 0;
  // Loop through each criterion key in the criteria object
  for (let key in criteria) {
    if (!criteria[key] || criteria[key] === "") continue;  // skip if not specified (Any)
    totalCriteria++;
    // If role has the same value for this criterion, increment score
    if (role[key] !== undefined) {
      // For string/boolean criteria:
      if (role[key] === criteria[key]) {
        score++;
      }
      // (If there are numeric criteria ranges, handle accordingly, e.g., within range)
    }
  }
  return { score: score, total: totalCriteria };
}

// Utility: Get descriptive text for match strength
function getMatchDescription(score, maxScore) {
  if (maxScore === 0) {
    return "No criteria given.";
  }
  const ratio = score / maxScore;
  if (ratio === 1) {
    return "🌟 A perfect match! This role fits you like a legendary artifact.";
  } else if (ratio >= 0.75) {
    return "👍 Great match – the stars align strongly for this role.";
  } else if (ratio >= 0.5) {
    return "✨ Decent match – many aspects align on your journey.";
  } else if (ratio > 0) {
    return "🔍 Partial match – some elements resonate, but others do not.";
  } else {
    return "❓ No match on selected criteria.";
  }
}

// Main function to filter and rank roles, then update the UI
function displayResults(criteria) {
  if (!rolesData || rolesData.length === 0) {
    console.error("Role data is not loaded yet.");
    return;
  }

  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.innerHTML = "";  // clear previous results

  // Calculate scores for each role
  let results = rolesData.map(role => {
    const { score, total } = calculateMatchScore(role, criteria);
    return { role: role, score: score, total: total };
  });

  // Filter out roles with zero score (no match at all) if desired
  results = results.filter(r => r.score > 0);
  // Sort roles by score (and perhaps secondary sort by name for same scores)
  results.sort((a, b) => b.score - a.score || a.role.name.localeCompare(b.role.name));

  if (results.length === 0) {
    // No matches found
    resultsContainer.innerHTML = "<p>No roles match your selections. Try adjusting your criteria.</p>";
  } else {
    // Display each result role
    results.forEach(result => {
      const role = result.role;
      const score = result.score;
      const total = result.total;
      const percent = total > 0 ? Math.round((score / total) * 100) : 0;

      // Determine match level for color coding
      let matchLevelClass = "";
      if (percent === 100) {
        matchLevelClass = "high";
      } else if (percent >= 75) {
        matchLevelClass = "high";
      } else if (percent >= 50) {
        matchLevelClass = "medium";
      } else {
        matchLevelClass = "low";
      }

      // Construct HTML for the role card
      const roleCard = document.createElement("div");
      roleCard.className = "role-card";
      // Role title and score
      const title = document.createElement("h3");
      title.textContent = `${role.name} – Match: ${score}/${total} (${percent}%)`;
      roleCard.appendChild(title);
      // Match gauge bar
      const gauge = document.createElement("div");
      gauge.className = "match-gauge";
      const bar = document.createElement("div");
      bar.className = "match-bar " + matchLevelClass;
      bar.style.width = percent + "%";
      gauge.appendChild(bar);
      roleCard.appendChild(gauge);
      // Qualitative match description
      const desc = document.createElement("p");
      desc.className = "match-text";
      desc.textContent = getMatchDescription(score, total);
      roleCard.appendChild(desc);

      resultsContainer.appendChild(roleCard);
    });
  }

  // Reveal the results section with a fade-in effect
  const resultsSection = document.getElementById("results-section");
  resultsSection.classList.remove("hidden");
  resultsSection.classList.add("fade-in");

  console.log(`Displayed ${results.length} matching roles (sorted by score).`);
}

// Event listener for the search button
document.getElementById("searchButton").addEventListener("click", () => {
  // Gather selected criteria from form
  const selectedCriteria = {
    domain: document.getElementById("domain").value,
    level: document.getElementById("level").value
    // add other criteria fields here, e.g., location, skills, etc.
  };
  console.log("Selected criteria:", selectedCriteria);
  // Display results based on criteria
  displayResults(selectedCriteria);
});
