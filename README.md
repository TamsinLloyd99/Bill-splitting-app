# Split Bill App

A simple React app, made as part of the "ultimate react" course by Jonas Schmedtmann, to split bills with friends and track balances. Add friends, record shared expenses, and calculate who owes whom.

## 🚀 Features

* 👥 Add new friends with a name and avatar
* ✅ Select a friend and split a bill
* 💵 Tracks who owes whom and by how much
* 🔄 Toggle selection and clear forms
* 🎯 Dynamic balance updates with clear visual cues

## 🧱 Tech Stack

* React 18+
* Functional components with hooks (`useState`)
* UUID with `crypto.randomUUID()`
* Dynamic image URLs with `https://i.pravatar.cc`

## 📦 Getting Started

### Prerequisites

* Node.js >= 14
* npm or yarn

### Installation

```bash
git clone https://github.com/TamsinLloyd99/Split-Bill-App.git
cd Split-Bill-App
npm install
```

### Run the App

```bash
npm start
```

This launches the app in your browser at `http://localhost:3000`

---

## 🧑‍💻 Usage Guide

1. **Add a Friend**

   * Click `Add Friend`
   * Fill in name and optional image URL
   * Submit to add to the sidebar list

2. **Select a Friend**

   * Click `Select` on any friend to open the bill form
   * Click again to `Close` and deselect

3. **Split a Bill**

   * Enter total bill amount
   * Enter how much **you paid**
   * Choose who paid the bill
   * Click `Add` to split and update balances

4. **Balances**

   * Green = they owe you
   * Red = you owe them
   * Grey = even

---

## 📁 Folder Structure

```
Split-Bill-App/
├── public/
├── src/
│   ├── App.js
│   ├── index.js
│   └── styles.css
├── .gitignore
├── package.json
└── README.md
```

---

## [Deployed App](https://react-bill-splitting-app.netlify.app/)

## 📄 License

MIT License — free to use and modify.

---

Made with 💙 for sharing tabs and splitting bills.
