# 🚑 Doc+ - Doctor Appointment System

![Project Banner](https://via.placeholder.com/1200x400?text=Doc+Appointment+System) <!-- Replace with actual image -->

## 📝 Table of Contents
- [Project Overview](#-project-overview)
- [Features](#-features)
- [Live Demo](#-live-demo)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
  - [Prerequisites](#-prerequisites)
  - [Setup Instructions](#-setup-instructions)
  - [Environment Variables](#-environment-variables)
- [How It Works](#-how-it-works)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

## 🌟 Project Overview
Doc+ is a modern healthcare platform connecting patients with doctors through an intuitive appointment system. It simplifies medical scheduling with real-time availability, secure payments, and automated reminders.

## ✨ Features
### For Patients
- 🗓️ Easy appointment booking
- 🔍 Doctor search by specialization
- 💳 Secure online payments
- 🔔 SMS/Email reminders

### For Doctors
- 📅 Schedule management
- 👥 Patient records
- 💰 Payment tracking
- 📊 Analytics dashboard

### For Admins
- 👤 User management
- 📝 Content moderation
- 💸 Transaction logs
- 🛠 System configuration

## 🌐 Live Demo
Access our live demo environment:

| Role       | URL                                      | Test Credentials                  |
|------------|------------------------------------------|-----------------------------------|
| Patient    | [Patient Portal](https://...)            | Email: patient@demo.com<br>Pass: demo123 |
| Doctor     | [Doctor Dashboard](https://.../doctor)   | Email: doctor@demo.com<br>Pass: demo123 |
| Admin      | [Admin Panel](https://.../admin)         | Email: admin@demo.com<br>Pass: admin123 |

## 💻 Technology Stack
**Frontend:**
- React.js
- Tailwind CSS
- Redux Toolkit

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

**Services:**
- Cloudinary (Media storage)
- Razorpay (Payments)
- Twilio (SMS notifications)

## 🛠 Installation

### 📋 Prerequisites
- Node.js v16+
- MongoDB Atlas account
- Cloudinary account
- Razorpay test credentials

### ⚙️ Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/docplus.git
cd docplus

npm install
cd client
npm install
cd ..

# Server Configuration
PORT=4000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/docplus

# Authentication
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d

# Cloudinary
CLOUDINARY_NAME=your_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret

# Razorpay
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_SECRET=your_secret_key

# Email Service
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password

# Start backend server
npm run server

# In separate terminal, start frontend
cd client
npm start

graph TD
    A[Patient] -->|Books Appointment| B(Frontend)
    B -->|API Calls| C[Backend]
    C -->|Database Operations| D[MongoDB]
    C -->|External Services| E[Payment Gateway]
    C -->|External Services| F[Cloud Storage]
    D -->|Returns Data| C
    C -->|Sends Response| B
    B -->|Displays UI| A

graph TD
    A[Patient] -->|Books Appointment| B(Frontend)
    B -->|API Calls| C[Backend]
    C -->|Database Operations| D[MongoDB]
    C -->|External Services| E[Payment Gateway]
    C -->|External Services| F[Cloud Storage]
    D -->|Returns Data| C
    C -->|Sends Response| B
    B -->|Displays UI| A
