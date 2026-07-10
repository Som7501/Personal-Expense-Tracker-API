# 💳 Personal Expense Tracker API

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)

A secure and user-friendly expense management web application built with Node.js, Express, MongoDB, and EJS. It helps users record expenses, organize them by category, upload supporting files, and keep their financial records in one place.

---

## 📖 About the Project

This project solves the problem of scattered spending records and missing receipts. Instead of relying on notes or spreadsheets, users can manage their expenses from a simple dashboard with authentication and file uploads.

### 🎯 The Problem It Solves

Managing personal finances manually can be messy and time-consuming. Receipts are often lost, spending is hard to review, and keeping records organized becomes difficult over time.

This application provides a centralized place to add expenses, categorize them, and store supporting documents such as receipts or invoices.

### ✨ Key Benefits

- Better financial visibility with a simple and organized workflow
- Faster expense entry and tracking
- Easy receipt and document attachment support
- Secure personal data through authentication

---

## 🏗️ Architecture and Tech Stack

The application follows a simple backend-driven structure with server-rendered views.

- Backend: Node.js and Express.js
- Database: MongoDB with Mongoose
- Views: EJS templates
- Authentication: JSON Web Tokens and cookies
- File Uploads: Multer
- Security: Password hashing with Node.js crypto

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js installed on your system
- MongoDB running locally or a reachable MongoDB URI

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/personal-expense-tracker-api.git
   cd personal-expense-tracker-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add your environment variables:

   ```env
   PORT=3003
   SECRET=your_super_secret_key_here
   ```

4. Start MongoDB locally if it is not already running.

5. Start the development server:

   ```bash
   npm run dev
   ```

The application will be available at http://localhost:3003.

---

## ✨ Features

- User registration and login
- Secure authentication with JWT
- Add, view, and delete expenses
- Expense categorization
- Upload support files such as images or PDFs
- Expense summary by category

---

## 🤝 How to Fork and Contribute

Contributions are welcome. If you would like to improve the project, follow these steps:

1. Fork the repository on GitHub.
2. Clone your fork locally.
3. Create a new branch for your feature or fix.
4. Make your changes and commit them.
5. Push the branch to your fork.
6. Open a pull request with a clear description.

Example:

```bash
git checkout -b feature/your-feature-name
```

---

## 📂 Project Structure

```text
├── documents/          # Static assets and upload storage
├── middleware/         # Authentication middleware
├── models/             # Mongoose schemas
├── router/             # Express route handlers
├── service/            # JWT helper functions
├── views/              # EJS templates and partials
├── index.js            # Main application entry point
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

## Built with care and a lot of heart ❤️
*- by Showmick Roy*