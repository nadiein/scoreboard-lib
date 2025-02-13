# 🏆 Scoreboard Library

[![npm version](https://img.shields.io/npm/v/@inadiein/scoreboard-lib)](https://www.npmjs.com/package/@inadiein/scoreboard-lib)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A **simple React library** for managing football (or any sport) matches with a scoreboard.
✔ **Add matches**
✔ **Update scores**
✔ **Finish matches**
✔ **View match summary in order**

---

## 📦 Installation

### 🔹 Option 1: Install via NPM
The easiest way to use **Scoreboard Library** is by installing it from **npm**:

npm install @inadiein/scoreboard-lib

---

### 🔹 Option 2: Use Locally from GitHub
To use the library locally in another React app:

1️⃣ **Clone the repository**:
git clone https://github.com/inadiein/scoreboard-lib.git
cd scoreboard-lib

2️⃣ **Install dependencies**:
npm install

3️⃣ **Build the library**:
npm run build

4️⃣ **Link the package**:
npm link

5️⃣ **Use it in your React app**:
npm install "{path_to_project}/scoreboard-lib/dist"

6️⃣ **Run your app**:
npm start

---

## 🚀 Run the Project Locally (Play Around with Components)

If you want to explore the **Scoreboard Library** and test its components:

# Navigate to the project root
cd scoreboard-lib

# Install dependencies
npm install

# Start the development server
npm run start

---

## 🔧 Usage

import { Scoreboard, ScoreboardProvider } from '@inadiein/scoreboard-lib';

function App() {
  return (
    <ScoreboardProvider>
      <Scoreboard />
    </ScoreboardProvider>
  );
}

export default App;

---

## 📜 License
This project is licensed under the **ISC License**.
