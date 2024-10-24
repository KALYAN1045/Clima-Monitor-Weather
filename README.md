# **ClimaCore - Weather Monitoring System**

ClimaCore is a real-time weather monitoring system that tracks and stores weather information for major metro cities in India (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad). The system fetches weather data every 5 minutes, maintains a rolling 7-day history for analytics, and tracks minimum, maximum, and average temperatures for the current day.

---

### **Deployed Application**

Access the live application [here](https://clima-monitor-frontend.vercel.app)


---
    
## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation Instructions](#installation-instructions)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Set Up Environment Variables](#3-set-up-environment-variables)
  - [4. Run the Application](#4-run-the-application)
- [API Endpoints](#api-endpoints)
  - [OpenWeather API Routes](#openweather-api-routes)
  - [Backend Routes](#backend-routes)
    - [Weather Routes](#weather-routes)
    - [Alert Routes](#alert-routes)
- [Demo](#demo)
  - [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---
    
## **Features**

1. **Real-time Weather Updates**
   - Fetches weather data every 5 minutes from the OpenWeather API for major metro cities in India.
    
2. **Weather Data Storage**
   - Updates current day's data every 5 minutes and stores it in MongoDB.
   - Maintains a rolling 7-day history for analytics.
    
3. **Temperature Statistics**
   - Tracks minimum, maximum, and average temperatures for each city.
   - Records daily dominant weather conditions (e.g., Clear, Mist, Rain).
    
4. **Alerting System**
   - User-configurable thresholds for temperature or specific weather conditions.
   - Triggers alerts when thresholds are breached, with email notifications.
    
5. **Visualizations**
   - Displays daily weather summaries, historical trends, and triggered alerts through interactive dashboards.

---
    
## **Tech Stack**

- **Backend**: Node.js, Express.js
- **Frontend**: React.js, shadcn-ui, Tailwind CSS
- **Database**: MongoDB
- **Data Fetching**: Axios
- **Real-Time Updates**: Socket.io
- **Email Notifications**: Nodemailer

---
    
## **Installation Instructions**

### 1. **Clone the Repository**

```bash
git clone https://github.com/KALYAN1045/Clima-Monitor-Weather
cd Clima-Monitor-Weather
```

### 2. **Install Dependencies**

#### **Backend**

```bash
cd backend
npm install
```

#### **Frontend**

```bash
cd ../frontend
npm install
```

### 3. **Set Up Environment Variables**

Create a `.env` file in both `backend` and `frontend` directories with the following variables:

#### **Backend (`backend/.env`):**

```env
OPENWEATHER_API_KEY=your_openweather_api_key
MONGO_URI=your_mongodb_connection_string
PORT=5000

# Email Configuration for Nodemailer (use Gmail App password after creating 2FA)
EMAIL=your-email@gmail.com
PASSWORD=your-email-password(App password)
```

#### **Frontend (`frontend/.env`):**

```env
VITE_APP_OPEN_API=your_openweather_api_key
VITE_APP_API=http://localhost:5000/api/weather
```

### 4. **Run the Application**

#### **Backend**

```bash
cd backend
npm start
```

#### **Frontend**

```bash
cd ../frontend
npm run dev
```

---
    
## **API Endpoints**

### **OpenWeather API Routes**

#### **Weather Data Routes:**

- **GET `/weather?q={cityName}&appid={API_KEY}`**
  - Fetches current weather data for a specified city.
      
- **GET `/forecast?q={cityName}&appid={API_KEY}`**
  - Retrieves a 5-day weather forecast for a specific city.

### **Backend Routes**

#### **Weather Routes**

- **GET `/daily/:cityName`**
  - Fetches the daily weather summary for a specific city.
    
- **GET `/weekly/:cityName`**
  - Retrieves the weekly weather data for a specific city.
    
- **POST `/test-end-of-day`**
  - Triggers a manual update of the end-of-day weather summary.

#### **Alert Routes**

- **POST `/alerts`**
  - Creates a new weather alert for a specific city.
    
- **GET `/alerts/:cityName`**
  - Retrieves all weather alerts for a specific city.
    
- **DELETE `/alerts/:cityName/:alertId`**
  - Deletes a specific weather alert from a city by alert ID.

---
    
## **Demo**

### **Screenshots**

![Screenshot 2024-10-24 235422](https://github.com/user-attachments/assets/9da7a588-a0dd-41a1-89b6-223b5c75576e)

![image](https://github.com/user-attachments/assets/d2c4c431-397f-474c-8cca-f2621036dae0)




    
