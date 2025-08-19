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

## ✨ Features

### For Job Seekers
- 👤 **User Registration & Authentication** - Secure signup/login with JWT tokens
- 📄 **Profile Management** - Upload profile pictures and manage personal information
- 🔍 **Job Search** - Browse and search through available job postings
- 📧 **Application Tracking** - Track job application status
- 🔒 **Secure Sessions** - Cookie-based authentication for persistent login

### For Recruiters
- 🏢 **Company Profiles** - Create and manage company information
- 📝 **Job Posting** - Post job openings with detailed descriptions
- 👥 **Candidate Management** - Review and manage job applications
- 📊 **Dashboard** - Monitor job postings and application metrics

### Technical Features
- 🔐 **Role-Based Access Control** - Different permissions for job seekers and recruiters
- ☁️ **Cloud Storage** - Cloudinary integration for profile image uploads
- 📱 **Responsive Design** - Mobile-friendly interface // might be differ *Currently WIP
- 🛡️ **Security** - Secure authentication with httpOnly cookies
- 🚀 **Production Ready** - Deployed on Render (backend) and Vercel (frontend)

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
- **Cloudinary** - Cloud-based image storage

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

``` 
## 🔮 Upcoming Features

- 🤖 **AI Integration** - AI-powered job matching and resume analysis
- 👨‍💼 **Admin Dashboard** - Comprehensive admin controls and analytics
- 📊 **Advanced Analytics** - Job posting performance and application insights
- 💬 **Real-time Chat** - Communication between recruiters and candidates
- 📧 **Email Notifications** - Automated notifications for applications and updates
- 🔍 **Advanced Search** - Filters by location, salary, experience level
- ⭐ **Rating System** - Company and candidate rating mechanisms

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
```



