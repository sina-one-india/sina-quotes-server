# SINA Quotes Backend Server

A secure, performance-focused Node.js and Express RESTful API backend for the SINA Quotes ecosystem, storing structured quotes data in MongoDB.

## 🚀 Key Features

* **Authentication & Verification Flow**:
  * OTP generation and verification for secure, email-based auth routes.
  * Password resets and session validations.
* **Quotes Resource Manager**:
  * `POST /quote` uploads and validates quote contents, utilizing Cloudinary storage for author profiles.
  * `GET /myQuote` handles backend sorting, keyword text searches, and pagination controls.
* **Dynamic Statistics Aggregation**:
  * `/quote-stats` utilizes MongoDB aggregation pipelines to calculate status aggregates.
  * Supports a `personal=true` scope parameter to toggle admin counts between global stats and personal stats.
* **Admin Review Queue Hooks**:
  * Moderation routes to accept, reject, or leave comments on user submissions.
* **Database Models**:
  * Robust schemas for Users and Quotes with relational object reference links.

## 🛠️ Technology Stack

* **Runtime & Framework**: Node.js, Express.js
* **Database**: MongoDB with Mongoose ODM
* **Authentication**: JSON Web Tokens (JWT), bcryptjs hashing
* **File Uploads**: Multer, Cloudinary SDK
* **Utility Libraries**: Cors, dotenv

## 📦 Getting Started

### 1. Prerequisites
Ensure you have Node.js (version 18 or higher) and a MongoDB instance running locally or via MongoDB Atlas.

### 2. Environment Configuration
Create a `.env` file in the root of the server directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/sina-quotes
JWT_SECRET=your_super_secret_jwt_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173
```

### 3. Installation
Install the project dependencies:
```bash
npm install
```

### 4. Running the Server
Start the development server:
```bash
npm run dev
```
The REST API server will spin up on `http://localhost:5000/`.

## 📁 API Endpoints Overview

### Own Routes (Authenticated Users)
* `POST /api/quote` - Submit a new quote (with custom profile portrait upload).
* `PUT /api/quote/:id` - Edit/update an existing quote.
* `GET /api/quote/:id` - Get details of a single quote.
* `GET /api/myQuote` - Fetch personal quotes list (with support for `page`, `limit`, `search`, `status`, `sortBy`, `sortOrder`).
* `DELETE /api/quotes/:id` - Delete a quote.
* `GET /api/quote-stats` - Retrieve status counters (with support for `personal=true` query).

### Admin Routes (Admin privileges required)
* `GET /api/quotes` - Fetch all system quotes for review queue.
* `PUT /api/approve/quote/:id` - Approve a pending quote.
* `PUT /api/reject/quote/:id` - Reject a pending quote.
