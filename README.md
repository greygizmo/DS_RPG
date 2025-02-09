# DS_RPG: Dassault Systèmes 3DEXPERIENCE Quest

DS_RPG is an interactive, multi-step role-playing quest built with React. It guides users through a reflective journey to discover their unique digital destiny within the Dassault Systèmes 3DEXPERIENCE ecosystem. This version leverages enriched role data (including Brand, Role, Description, Detail URL, Guild, Subcategory, Industry, and LevelOfSpecialization) to provide highly tailored recommendations.

## Key Features

- **Extended Questionnaire:**  
  Users answer multiple questions about their motivation, work style, industry, and level of specialization.
  
- **Multi-Dimensional Role Filtering:**  
  The app uses the enriched data to filter over 400 roles based on your responses. Roles are grouped by Guild, Subcategory, Industry, and Level of Specialization.
  
- **Multiple Role Assignment:**  
  Users can select multiple roles that reflect their overlapping job functions.
  
- **Back Navigation:**  
  Every screen (except the Welcome screen) includes a Back button so you can adjust your answers.
  
- **DS-Inspired Visual Theme:**  
  Deep blue gradients and custom Dassault fonts create a cohesive, professional look.

## Flow

1. **Welcome:** Start your journey.  
2. **Motivation:** Discover your inner drive.  
3. **Work Preference:** Choose your work style.  
4. **Industry:** Select your industry.  
5. **Specialization:** Choose your level of specialization.  
6. **Challenge:** Pick a challenge that excites you.  
7. **Role Assignment:** Select from a list of recommended roles.  
8. **Final Result:** See your personalized Innovation Passport.

## Installation & Deployment

Follow the standard Create React App procedures. For GitHub Pages deployment, see the included scripts in `package.json`.

## Folder Structure
DS_RPG/ ├── public/ │ └── index.html ├── src/ │ ├── components/ │ │ ├── ProgressBar.js │ │ ├── ProgressBar.css │ │ ├── WelcomeScreen.js │ │ ├── MotivationScreen.js │ │ ├── WorkPreferenceScreen.js │ │ ├── IndustryScreen.js │ │ ├── SpecializationScreen.js │ │ ├── ChallengeScreen.js │ │ ├── RoleAssignmentScreen.js │ │ ├── RoleAssignmentScreen.css │ │ ├── FinalResultScreen.js │ │ └── ResultScreen.css │ ├── data/ │ │ └── rolesData.json │ ├── fonts/ │ │ ├── 3ds Bold Italic.ttf │ │ ├── 3ds Bold.ttf │ │ ├── 3ds Italic.ttf │ │ ├── 3ds Light.otf │ │ └── 3ds Regular.ttf │ ├── fonts.css │ ├── index.css │ ├── App.js │ └── index.js ├── package.json └── README.md


## Running the App

1. **Install Dependencies:**
   ```bash
   npm install --legacy-peer-deps

