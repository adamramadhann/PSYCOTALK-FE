# Psychology Consultation App - Frontend

This is the frontend application for a Psychology Consultation platform. The application allows users to book appointments with psychologists, participate in community forums, and manage their profile.

## Features

- **User Authentication**
  - Register with email verification
  - Login/Logout functionality
  - Password reset
  - Protected routes

- **User Profiles**
  - View and edit profile information
  - Upload profile picture
  - Manage personal information

- **Doctor Browse & Search**
  - Browse available psychologists
  - Filter by specialization/category
  - View doctor details and availability

- **Booking System**
  - Schedule appointments with psychologists
  - View upcoming and past appointments
  - Cancel or reschedule appointments
  - Receive booking confirmations

- **Community Forum**
  - Create new posts in different categories
  - Reply to existing threads
  - Search and filter posts
  - Get notifications for replies

- **Notification Center**
  - Real-time notifications
  - Mark notifications as read
  - Filter notifications by type

## Tech Stack

- **React.js** - Frontend library
- **React Router** - Routing
- **Axios** - API requests
- **Tailwind CSS** - Styling
- **React Context API** - State management
- **React Hook Form** - Form handling and validation

## Prerequisites

- Node.js (v14+)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/psychology-consultation-app.git
cd psychology-consultation-app/frontend
```

2. Install dependencies:
```bash
yarn add
```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
yarn dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Reusable UI components
│   ├── common/      # Common UI elements (buttons, inputs, etc.)
│   ├── layout/      # Layout components (header, footer, etc.)
│   ├── auth/        # Authentication related components
│   ├── booking/     # Booking related components
│   ├── forum/       # Forum related components
│   └── profile/     # Profile related components
├── contexts/        # React Context providers
├── hooks/           # Custom React hooks
├── pages/           # Application pages
├── services/        # API services
├── utils/           # Utility functions
├── App.js           # Main application component
└── index.js         # Application entry point
```

## Pages

1. **Authentication Pages**
   - Login
   - Register
   - Verify Email
   - Forgot Password
   - Reset Password

2. **User Pages**
   - Home/Dashboard
   - Profile
   - Edit Profile

3. **Doctor Pages**
   - Browse Doctors
   - Doctor Details
   - Booking Page

4. **Booking Pages**
   - Create Booking
   - My Bookings (Patient)
   - Appointment Requests (Doctor)

5. **Forum Pages**
   - Forum Home
   - Create Post
   - Post Details
   - My Posts

6. **Notification Pages**
   - Notification Center

## API Integration

The frontend communicates with the backend API using Axios. API service files are organized by feature:

- `authService.js` - Authentication endpoints
- `userService.js` - User and profile endpoints
- `bookingService.js` - Booking endpoints
- `forumService.js` - Forum endpoints
- `notificationService.js` - Notification endpoints

## Authentication

JWT authentication is implemented using Axios interceptors. The token is stored in localStorage and automatically included in API requests.

## State Management

React Context API is used for state management:
- `AuthContext` - User authentication state
- `NotificationContext` - Notification state
- `ThemeContext` - UI theme settings (if applicable)

## Component Examples

### User Authentication

```jsx
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
```

### Doctor Listing

```jsx
import { useState, useEffect } from 'react';
import { getDoctors } from '../services/userService';
import DoctorCard from '../components/DoctorCard';

function DoctorListing() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getDoctors(category);
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [category]);

  return (
    <div className="doctor-listing">
      <h2>Find a Psychologist</h2>
      <select 
        value={category} 
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="CBT">Cognitive Behavioral Therapy</option>
        <option value="Psychoanalysis">Psychoanalysis</option>
        <option value="Family">Family Therapy</option>
      </select>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="doctor-grid">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
}
```

## Testing

```bash
npm test
```

## Building for Production

```bash
npm run build
```

This will create an optimized production build in the `build` folder.

## Deployment

The frontend can be deployed to various platforms:

- **Netlify/Vercel**: Connect your GitHub repository for automatic deployments
- **AWS S3/CloudFront**: Upload build folder to S3 and configure CloudFront
- **GitHub Pages**: Deploy using GitHub Actions

## Recommended Extensions

For VS Code users, we recommend the following extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- React Developer Tools (browser extension)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.