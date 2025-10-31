# Customer Feedback System

The Customer Feedback System is a full-stack web application built with Next.js, TypeScript, and MongoDB that enables businesses to collect, store, and manage customer feedback efficiently.
It provides an easy-to-use platform for users to log in, submit reviews for food items, and rate their experience. Admins can view all customer feedback entries in a structured dashboard, allowing data-driven insights for improving services and user satisfaction.

# Features

 Secure Authentication using NextAuth.js

 Submit Feedback with name, email, location, food item, rating, and review

 Admin Dashboard to view all customer feedback

 Fast API Routes powered by Next.js App Router

 MongoDB Integration for seamless data storage

 Responsive UI built with Tailwind CSS

# Tech Stack
Category	Technology
Frontend	Next.js 14, TypeScript, Tailwind CSS
Backend	Next.js API Routes, Node.js
Database	MongoDB, Mongoose
Authentication	NextAuth.js (Credentials Provider)
Deployment	Vercel
⚙️ How to Run Locally

Clone the repository

git clone https://github.com/kartik1029/customer-feedback.git
cd customer-feedback


Install dependencies

npm install


Create .env.local file in the root folder and add:

MONGODB_URI="mongodb+srv://kartik:kartik123@customerfeedback.2gxpqnk.mongodb.net/customer_feedback_db"
NEXTAUTH_SECRET="6c740a879b72134f877dac803d6576b3"
NEXTAUTH_URL="http://localhost:3000"


Run the development server

npm run dev


Open http://localhost:3000
 in your browser.

🌐 Deployment

This project is deployed on Vercel, which automatically builds and hosts both frontend and backend routes directly from your GitHub repository.

# User Credentials for Login:
## Username: admin@test.com
## Password: admin123
