# ⚡ Local Webhook Dashboard

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb)
![Express](https://img.shields.io/badge/Express-API-black?style=for-the-badge&logo=express)

**A secure, real-time webhook monitoring system with signature verification, replay protection, and a beautiful modern dashboard.**

[Features](#-features) • [Architecture](#-architecture) • [Installation](#-installation) • [Usage](#-usage) • [API Reference](#-api-reference)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Reference](#-api-reference)
- [Security](#-security)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)

---

## 🎯 Overview

This project demonstrates a **production-ready webhook system** with enterprise-level security features. It consists of three main components:

1. **Main Server** - Receives and verifies webhooks with multiple security layers
2. **Third-Party Server** - Processes orders, generates signed webhooks, and logs events
3. **Dashboard** - Modern React-based UI for real-time webhook monitoring

The system implements **HMAC SHA-256 signature verification**, **timestamp-based replay protection**, **IP whitelisting**, and **duplicate request prevention** to ensure webhook authenticity and prevent attacks.

---

## ✨ Features

### 🔒 Security Features

- **HMAC SHA-256 Signature Verification** - Ensures webhook authenticity using shared secrets
- **Timestamp-Based Replay Protection** - Prevents replay attacks by validating request timestamps
- **IP Whitelisting** - Only allows requests from trusted IP addresses
- **Duplicate Prevention** - Tracks processed signatures to prevent duplicate processing
- **Secure Payload Transmission** - All webhooks are signed and verified before processing

### 📊 Dashboard Features

- **Real-Time Monitoring** - Live updates of webhook events every 5 seconds
- **Modern UI** - Beautiful shadcn/ui-inspired design with dark mode support
- **Event Details** - Expandable cards showing full webhook payload, signatures, and metadata
- **Status Tracking** - Visual indicators for success/error states
- **Data Management** - Clear all webhook data with confirmation dialog
- **Responsive Design** - Works seamlessly on desktop and mobile devices

### 🚀 Server Features

- **Asynchronous Processing** - Non-blocking webhook handling
- **MongoDB Integration** - Persistent storage of all webhook events
- **Health Checks** - Built-in health endpoints for monitoring
- **Error Handling** - Comprehensive error logging and response handling

---

## 🏗️ Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│                 │         │                  │         │                 │
│  Main Server    │◄────────│  Third Party     │         │   Dashboard     │
│  (Port 3000)    │         │  Server          │         │   (React App)   │
│                 │         │  (Port 3001)      │         │                 │
│  • Verifies     │         │  • Processes     │         │  • Monitors     │
│    signatures   │         │    orders        │         │    events       │
│  • IP check     │         │  • Generates      │         │  • Displays      │
│  • Replay       │         │    webhooks      │         │    analytics     │
│    protection   │         │  • Logs to DB     │         │                 │
└─────────────────┘         └──────────────────┘         └─────────────────┘
         │                           │                            │
         │                           │                            │
         └───────────────────────────┴────────────────────────────┘
                                    │
                           ┌────────▼────────┐
                           │    MongoDB      │
                           │   (Database)    │
                           └─────────────────┘
```

### Flow Diagram

1. **Order Initiation**: Main server receives order request at `/start-cooking`
2. **Processing**: Third-party server processes the order asynchronously
3. **Webhook Generation**: Third-party server generates signed webhook with timestamp
4. **Verification**: Main server verifies signature, IP, timestamp, and uniqueness
5. **Logging**: All events are logged to MongoDB
6. **Monitoring**: Dashboard displays real-time updates from the database

---

## 🚀 Installation

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd webhook
```

### Step 2: Install Dependencies

#### Main Server

```bash
cd main
npm install
```

#### Third-Party Server

```bash
cd "third party"
npm install
```

#### Dashboard

```bash
cd console
npm install
```

---

## ⚙️ Configuration

### Main Server Configuration

1. Navigate to the `main` directory
2. Copy `sample.env` to `.env`:

```bash
cp sample.env .env
```

3. Update `.env` with your configuration:

```env
PORT=3000
WEBHOOK_SECRET=your_secure_secret_key_here
```

### Third-Party Server Configuration

1. Navigate to the `third party` directory
2. Copy `sample.env` to `.env`:

```bash
cp sample.env .env
```

3. Update `.env` with your configuration:

```env
PORT=3001
WEBHOOK_SECRET=your_secure_secret_key_here
DB_URL=mongodb://localhost:27017
DB_NAME=webhook_db
```

> ⚠️ **Important**: The `WEBHOOK_SECRET` must be **identical** in both servers for signature verification to work.

### IP Whitelisting

Edit `main/src/consts.js` to add allowed IP addresses:

```javascript
const whitelistedIps = ["::1", "127.0.0.1", "your-server-ip"];
```

---

## 🎮 Usage

### Starting the Servers

#### Terminal 1: Main Server

```bash
cd main
npm start
# Server running on http://localhost:3000
```

#### Terminal 2: Third-Party Server

```bash
cd "third party"
npm start
# Server running on http://localhost:3001
```

#### Terminal 3: Dashboard

```bash
cd console
npm run dev
# Dashboard running on http://localhost:5173
```

### Accessing the Dashboard

1. Open your browser and navigate to `http://localhost:5173`
2. Click **"View Dashboard"** to see the webhook monitoring interface
3. Use **"Start Cooking"** button to trigger a webhook event
4. Monitor events in real-time with automatic refresh every 5 seconds

---

## 📡 API Reference

### Main Server Endpoints

#### `POST /start-cooking`

Triggers the webhook flow by sending a request to the third-party server.

**Request:**
```bash
curl -X POST http://localhost:3000/start-cooking \
  -H "Content-Type: application/json"
```

**Response:**
```json
{
  "status": "OK",
  "message": "Cooking started"
}
```

#### `POST /webhook/recipe`

Receives and verifies webhooks from the third-party server.

**Headers:**
- `x-webhook-signature`: HMAC SHA-256 signature
- `x-timestamp`: Unix timestamp in milliseconds

**Request:**
```json
{
  "webhook": true,
  "acknowledgement": "OK",
  "data": {
    "dish": "chicken curry",
    "taste": "spicy with italian sauce",
    "quantity": 5
  }
}
```

**Response:**
```json
{
  "status": "verified",
  "message": "Webhook verified and processed"
}
```

#### `GET /healthz`

Health check endpoint.

**Response:**
```
healthz works fine for server at port:3000
```

### Third-Party Server Endpoints

#### `POST /make-recipe`

Processes recipe orders and generates webhooks.

**Request:**
```bash
curl -X POST http://localhost:3001/make-recipe \
  -H "Content-Type: application/json" \
  -d '{"item": "chicken", "taste": "spicy", "quantity": 5}'
```

**Response:**
```json
{
  "status": "OK",
  "data": {
    "dish": "chicken curry",
    "taste": "spicy with italian sauce",
    "quantity": 5
  }
}
```

#### `GET /webhooks`

Retrieves all webhook events from the database.

**Response:**
```json
[
  {
    "_id": "...",
    "event_id": "uuid",
    "requester_ip": "127.0.0.1",
    "status": "SUCCESS",
    "signature": "...",
    "timestamp": 1234567890,
    "payload": {...},
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

#### `DELETE /webhooks`

Clears all webhook data from the database.

**Request:**
```bash
curl -X DELETE http://localhost:3001/webhooks
```

**Response:**
```json
{
  "acknowledged": true,
  "deletedCount": 10
}
```

#### `GET /healthz`

Health check endpoint.

---

## 🔐 Security

### Signature Verification

All webhooks are signed using **HMAC SHA-256** with a shared secret:

```javascript
const signature = createHmac('sha256', secret)
  .update(payload + '-' + timestamp)
  .digest('hex');
```

### Replay Protection

- Timestamps are validated to ensure requests are recent (within 5 minutes)
- Each signature is tracked to prevent duplicate processing
- Old signatures are automatically rejected

### IP Whitelisting

Only requests from whitelisted IP addresses are accepted. Configure in `main/src/consts.js`.

### Best Practices

1. **Never commit `.env` files** - Keep secrets secure
2. **Use strong secrets** - Generate random, long strings for `WEBHOOK_SECRET`
3. **Rotate secrets regularly** - Update secrets periodically
4. **Monitor logs** - Check for suspicious activity
5. **Use HTTPS in production** - Encrypt all webhook traffic

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database for event logging
- **Mongoose** - MongoDB ODM
- **dotenv** - Environment variable management

### Frontend
- **React 19.2** - UI framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server
- **shadcn/ui** - Modern component design system

### Security
- **HMAC SHA-256** - Signature algorithm
- **UUID** - Unique event identifiers
- **Timestamp validation** - Replay protection

---

## 📁 Project Structure

```
webhook/
├── main/                    # Main server
│   ├── src/
│   │   ├── app.js          # Express app setup
│   │   ├── consts.js       # Constants (IP whitelist, etc.)
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API routes
│   │   └── utils/          # Utilities (hash, signature verification)
│   ├── package.json
│   └── sample.env
│
├── third party/             # Third-party server
│   ├── src/
│   │   ├── app.js          # Express app setup
│   │   ├── consts.js       # Webhook payload templates
│   │   ├── controllers/    # Request handlers
│   │   ├── db/             # Database connection
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utilities
│   ├── package.json
│   └── sample.env
│
├── console/                 # Dashboard frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts (theme)
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

---

## 🎨 Dashboard Features

### Real-Time Monitoring
- Automatic refresh every 5 seconds
- Live status updates
- Event count tracking

### Webhook Cards
- Expandable details view
- Status badges (SUCCESS/ERROR)
- Formatted timestamps
- IP address tracking
- Full payload display
- Signature verification details

### Actions
- **Start Cooking** - Trigger new webhook events
- **Clear All Data** - Remove all webhook records (with confirmation)
- **Refresh** - Manually update the webhook list
- **Theme Toggle** - Switch between light and dark modes

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style
- Add comments for complex logic
- Update README for new features
- Test all changes thoroughly
- Ensure security best practices

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by best practices in webhook security
- Designed for production-ready deployments

---

<div align="center">

**Made with ⚡ by [Your Name]**

[Report Bug](https://github.com/yourusername/webhook/issues) • [Request Feature](https://github.com/yourusername/webhook/issues)

</div>
