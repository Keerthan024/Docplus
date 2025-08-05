# Doc+

## Project Overview
**Doc+** is a modern, user-friendly platform that simplifies the process of booking and managing doctor appointments. It serves as a bridge between patients and healthcare providers, offering an intuitive interface for seamless scheduling, real-time updates, and secure payments. With a focus on accessibility and efficiency, DocTalk is designed to enhance the patient experience while empowering doctors with better appointment management tools.

### Main Goal
The primary goal of **Doc+** is to create a streamlined, secure, and efficient healthcare ecosystem. It enables patients to connect with doctors effortlessly while giving healthcare providers a robust platform to manage their schedules. **Doc+** focuses on reducing waiting times, enhancing patient satisfaction, and ensuring smooth operations in the medical field.

### Key Features
- **User-Friendly Interface**: Intuitive design for easy navigation, allowing users to book, reschedule, or cancel appointments effortlessly.
- **Specialization Filters**: Find the right doctor based on specialty with advanced filtering options.
- **Real-Time Availability**: View real-time doctor availability and receive instant appointment confirmations.
- **Secure Online Payments**: Integrated with Razorpay for quick, secure, and hassle-free payment processing.
- **Data Security**: Uses advanced encryption (Bcrypt) to ensure user data privacy and secure logins.
-  **Notifications and Reminders**: Get appointment reminders, status updates, and follow-up alerts via email and SMS.
- **Scalable and Cloud-Enabled**: Built on Cloudinary for scalability and reliable performance.

## Technology Stack
- **Frontend**: React.js for building a responsive and dynamic user interface.
- **Backend**: JavaScript (Node.js) for managing server-side logic and APIs.
- **Database**: MongoDB for scalable and flexible data storage.
- **Cloud Storage**: Cloudinary for media storage, optimization, and delivery.
- **Authentication & Security**: Bcrypt for password hashing and secure user authentication.
- **Payment Integration**: Razorpay for smooth and secure payment processing.

## Getting Started
To run the **DocTalk** application locally, follow these instructions:

### Prerequisites
Node.js (v14 or higher)
npm or yarn
MongoDB (or a MongoDB Atlas cluster)
Cloudinary credentials (for cloud storage)

### Installation

1. Clone the repository:

```bash
   git clone https://github.com/yourusername/Docplus.git
   ```
2 Navigate into the project directory:

 ```bash
   cd DocTalk
   ```
3. Install the dependencies:

 ```bash
   npm install
   ```
4. Set up environment variables:

Create a `.env.local` file in the root directory and add the following configuration:

```bash
MONGODB_URI ='MongoDB URI here'
CLOUDINARY_NAME = 'Cloudinary Name here'
CLOUDINARY_API_KEY ='Cloudinary API key here'
CLOUDINARY_SECRET_KEY =' Cloudinary Secret key here'
ADMIN_EMAIL = 'admin@doctalk.com'
ADMIN_PASSWORD = 'keerthan123'
JWT_SECRET = "doctalk"
RAZORPAY_KEY_ID = 'Razorpay Key Id here'
RAZORPAY_KEY_SECRET = 'Razorpay Key Secret here'
CURRENCY = "INR"
VITE_BACKEND_URL=http://localhost: 4000
```

5. Run the application:

 ```bash
   npm run dev
   ```
6.The application will be available at http://localhost:4000.

## Features and Usage

### 1. **Patient Portal**

   - Register, filter for doctors, view profiles, and book appointments.
   
### 2. **Doctor Dashboard**

   - Manage availability, view appointments, and interact with patients.
   
### 3 **Admin Panel**

   - Monitor system activity, manage user accounts, and handle payments.

## How It Works

1. **User Registration**: Patients and doctors register with secure authentication via Bcrypt.

2. **Filtered & Book**: Patients Book the doctors using filters and book available slots.

3. **Payment Processing**: Payments are handled securely using Razorpay.

4. **Cloud Media Management**: User profile images and documents are uploaded and stored in Cloudinary.

5. **Data Storage**: All reviews and university data are securely stored in MongoDB.

## Security Measures
- **Encryption**: User passwords are encrypted using Bcrypt for robust security.
- **Data Privacy**: User data and interactions are encrypted and protected.
- **Secure Payments**: Razorpay ensures compliance with industry-standard payment protocols.
- **Cloud Security**: Cloudinary handles media storage with secure access and delivery.
