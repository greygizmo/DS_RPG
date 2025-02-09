// convertCSV.js
const fs = require('fs');
const Papa = require('papaparse');

// Path to your CSV file
const csvFilePath = './src/data/roles_details.csv';

// Read the CSV file (ensure UTF-8 encoding)
let csvData;
try {
  csvData = fs.readFileSync(csvFilePath, 'utf8');
} catch (err) {
  console.error(`Error reading file at ${csvFilePath}:`, err);
  process.exit(1);
}

// Parse CSV data using PapaParse
const parsed = Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
});

// Enrich the data: trim whitespace, convert level to number, and add an "id" field
const enrichedData = parsed.data.map((row, index) => {
  return {
    id: index + 1,
    brand: row.Brand ? row.Brand.trim() : '',
    role: row.Role ? row.Role.trim() : '',
    description: row.Description ? row.Description.trim() : '',
    detailUrl: row['Detail URL'] ? row['Detail URL'].trim() : '',
    guild: row.Guild ? row.Guild.trim() : '',
    subcategory: row.Subcategory ? row.Subcategory.trim() : '',
    industry: row.Industry ? row.Industry.trim() : '',
    levelOfSpecialization: row['LevelOfSpecialization']
      ? parseInt(row['LevelOfSpecialization'].trim(), 10)
      : 0
  };
});

// Path to the output JSON file
const jsonOutputPath = './src/data/rolesData.json';

// Write the enriched data to JSON file
try {
  fs.writeFileSync(jsonOutputPath, JSON.stringify(enrichedData, null, 2), 'utf8');
  console.log('Conversion complete: rolesData.json has been created successfully.');
} catch (err) {
  console.error(`Error writing JSON file at ${jsonOutputPath}:`, err);
  process.exit(1);
}
