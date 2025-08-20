# HireDD - Job Portal Platform

A comprehensive full-stack job portal application built with the MERN stack, connecting job seekers with recruiters through an intuitive and secure platform.

## 🚀 Live Demo

- **Frontend**: [https://hiredd-git-main-akashs-projects-dc5d2db0.vercel.app](https://hiredd-git-main-akashs-projects-dc5d2db0.vercel.app)
- **Backend API**: [https://hiredd-vwh1.onrender.com](https://hiredd-vwh1.onrender.com)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Upcoming Features](#upcoming-features)
- [Contributing](#contributing)


### For Job Seekers
- 👤 **User Registration & Authentication** - Admin side only for now.
- 📄 **Profile Management** - Upload and manage profile pictures with automatic image resizing
- 🖼️ **Image Optimization** - Automatic image compression and resizing for optimal performance
- 🔍 **Advanced Job Search** - Browse, filter, and search through available job postings
- 📧 **Application Tracking** - Real-time job application status updates 
- ⭐ **Job Bookmarking** - Not handled from FE part

### For Recruiters
- 🏢 **Company Profile Management** - Create and manage detailed company information
- 👥 **Candidate Management** - Review, filter, and manage job applications efficiently
- 📊 **Recruitment Dashboard** - Monitor job postings, applications,
- 🔍 **Candidate Search** - Work in Progress

### Technical Features
- 🔐 **Role-Based Access Control** - Granular permissions for job seekers, recruiters, and admins
- ☁️ **Cloud Storage Integration** - Cloudinary integration with automatic image optimization
- 🛡️ **Advanced Security** - Secure authentication with httpOnly cookies and CSRF protection
- 🔄 **Real-time Updates** - Live status updates for applications
- 📊 **Data Validation** - Comprehensive input validation and sanitization
- 🔧 **Error Handling** - Comprehensive error logging and user-friendly error messages
- 📦 **Modular Architecture** - Clean, maintainable code structure
- 🧪 **API Testing** - Comprehensive test coverage for all endpoints

##  📷 Screenshot
<img width="1920" height="1080" alt="Screenshot 2025-08-20 105755" src="https://github.com/user-attachments/assets/97b7aa0d-f515-4fef-bd01-5ca38a44c048" />
<img width="1919" height="1079" alt="Screenshot 2025-08-20 105819" src="https://github.com/user-attachments/assets/199fffa1-7cd4-4c93-ad01-6c1865486554" />
<img width="527" height="498" alt="Screenshot 2025-08-19 180807" src="https://github.com/user-attachments/assets/b696c8a7-69dc-4a65-abb6-937d35623946" />
<img width="1920" height="1080" alt="Screenshot 2025-08-20 105612" src="https://github.com/user-attachments/assets/7b821abc-6ba3-42d4-9ee2-67d413560234" />
<img width="1920" height="1080" alt="Screenshot 2025-08-20 105620" src="https://github.com/user-attachments/assets/2c598c78-4bbe-4dad-8908-976bcc666842" />
<img width="1920" height="1080" alt="Screenshot 2025-08-20 105638" src="https://github.com/user-attachments/assets/26591ca3-9aec-4ea1-a10a-fd08cae697ce" />
<img width="1920" height="1080" alt="Screenshot 2025-08-20 105723" src="https://github.com/user-attachments/assets/e5a33acc-097b-40ff-8ba1-8dfa3d1ac684" />

## 🛠️ Tech Stack

### Frontend
- **React.js** - Component-based UI library
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Styling and responsive design

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Cookie Parser** - Cookie handling middleware
- **Multer** - File upload handling
- **Cloudinary** - Cloud-based image storage with automatic resizing

### Deployment & Tools
- **Vercel** - Frontend deployment
- **Render** - Backend deployment
- **Git** - Version control
- **Postman** - API testing

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Cloudinary account for image uploads

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/akaash1024/hiredd.git
   cd hiredd
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up Environment Variables**
   
   Create `.env` file in the backend directory:
   ```env
   PORT=3000
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret_key
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   NODE_ENV=development
   ```

5. **Start the Application**
   
   **Backend** (from backend directory):
   ```bash
   npm start
   ```
   
   **Frontend** (from frontend directory):
   ```bash
   npm run dev
   ```

6. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Jobs (Coming Soon)
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create job posting (recruiters only)
- `GET /api/jobs/:id` - Get specific job
- `PUT /api/jobs/:id` - Update job posting
- `DELETE /api/jobs/:id` - Delete job posting

### Applications (Coming Soon)
- `POST /api/applications` - Apply for job
- `GET /api/applications/my` - Get user's applications
- `GET /api/applications/job/:jobId` - Get applications for specific job

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | Yes |
| `MONGO_URL` | MongoDB connection string | Yes |
| `JWT_SECRET_KEY` | Secret key for JWT signing | Yes |
| `CLOUD_NAME` | Cloudinary cloud name | Yes |
| `API_KEY` | Cloudinary API key | Yes |
| `API_SECRET` | Cloudinary API secret | Yes |
| `NODE_ENV` | Environment (development/production) | Yes |

## 🌐 Deployment

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy with automatic builds on push

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set `VITE_API_URL` environment variable
3. Deploy with automatic builds on push

## 🔮 Upcoming Features

- 👨‍💼 **Admin Dashboard** - Comprehensive admin controls and analytics
- 📧 **Email Notifications** - Automated notifications for applications and updates
- 🤖 **AI Integration** - AI-powered job matching and resume analysis

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
