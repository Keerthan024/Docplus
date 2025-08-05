# 🚑 Doc+

## 📝 Project Overview

**Doc+** is a modern, user-friendly platform that simplifies the process of booking and managing doctor appointments. It bridges the gap between patients and healthcare providers with a smooth interface for scheduling, real-time updates, and secure payments. Designed for accessibility and efficiency, Doc+ improves patient experience and streamlines doctor appointment management.

---

## 🎯 Main Goal

The primary goal of **Doc+** is to create a streamlined, secure, and efficient healthcare ecosystem. It enables patients to connect with doctors effortlessly while giving healthcare providers a robust platform to manage their schedules. Doc+ focuses on reducing waiting times, enhancing patient satisfaction, and ensuring smooth operations in the medical field.

---

## ✨ Key Features

- 🧭 **User-Friendly Interface** – Easy navigation for booking, rescheduling, and canceling appointments.
- 🔍 **Specialization Filters** – Find doctors based on area of expertise.
- 🕒 **Real-Time Availability** – Instantly confirm available appointment slots.
- 💳 **Secure Online Payments** – Integrated with Razorpay for secure transactions.
- 🔐 **Data Security** – Bcrypt used for password encryption.
- 🔔 **Notifications & Reminders** – Email/SMS alerts for appointment status and reminders.
- ☁️ **Scalable & Cloud-Enabled** – Cloudinary for media uploads and storage.

---

## 🌐 Live Demo

Try out the live demo of Doc+:

| Role       | Live Demo Link                                 | Credentials                                        |
|------------|-------------------------------------------------|---------------------------------------------------|
| **Patient**| [Patient Portal](https://docplus.vercel.app)          | 📧 `patient@docplus.com` <br> 🔑 `patient123`     |
| **Doctor** | [Doctor Dashboard](https://docplus.vercel.app/doctor) | 📧 `doctor@docplus.com` <br> 🔑 `doctor123`       |
| **Admin**  | [Admin Panel](https://docplus.vercel.app/admin)       | 📧 `admin@docplus.com` <br> 🔑 `keerthan123`      |

> ⚠️ **Note**: This is a demo environment. Please avoid entering real personal information.

---

## 🛠 Technology Stack

| Layer        | Technology             |
|--------------|------------------------|
| **Frontend** | React.js               |
| **Backend**  | Node.js (JavaScript)   |
| **Database** | MongoDB                |
| **Cloud**    | Cloudinary             |
| **Auth**     | Bcrypt                 |
| **Payments** | Razorpay               |

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js (v14 or above)
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Cloudinary account
- Razorpay account (for payment gateway)

---

### ⚙️ Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/Docplus.git
cd DocTalk
npm install

MONGODB_URI='your-mongodb-uri'
CLOUDINARY_NAME='your-cloudinary-name'
CLOUDINARY_API_KEY='your-cloudinary-api-key'
CLOUDINARY_SECRET_KEY='your-cloudinary-secret'
ADMIN_EMAIL='admin@doctalk.com'
ADMIN_PASSWORD='keerthan123'
JWT_SECRET='doctalk'
RAZORPAY_KEY_ID='your-razorpay-key-id'
RAZORPAY_KEY_SECRET='your-razorpay-key-secret'
CURRENCY='INR'
VITE_BACKEND_URL='http://localhost:4000'
npm run dev

👥 Application Features
🧑‍⚕️ Patient Portal
Register/Login securely

Search doctors by specialization

Book, reschedule, or cancel appointments

View appointment history and doctor profiles

🩺 Doctor Dashboard
Register/Login as doctor

Set available time slots

View and manage appointments

Access and update patient interaction records

🛡 Admin Panel
Login as admin

Monitor platform activities

Manage user accounts (patients and doctors)

Handle disputes and payment logs

logs

🔄 How It Works
User Registration

Secure signup for both doctors and patients using Bcrypt.

Search & Book

Patients filter doctors by specialization and location.

Schedule Management

Doctors set their availability, and patients can choose slots accordingly.

Secure Payment

Patients make payments through Razorpay during booking.

Media Management

Profile pictures and medical documents are stored via Cloudinary.

Database Storage

MongoDB is used to store users, appointments, messages, and reviews.

🔐 Security Measures
✅ Password Encryption – All passwords are hashed using Bcrypt.

🔒 Data Privacy – Sensitive data is securely stored and transmitted.

💳 Secure Payments – Razorpay ensures compliance with payment protocols.

☁️ Cloud Media Security – Cloudinary provides secure access to uploaded content.

👨‍💻 Author
Made with ❤️ by Keerthan A
