# Webhook Demo Project

This project demonstrates a **secure webhook system** between a **Main Server** and a **Third-Party Server**, implementing:

- Signature-based verification using a shared secret
- Replay protection via timestamps and unique signatures
- IP whitelisting
- Basic simulation of webhook payloads and responses

---

## Features

### Main Server
- Receives webhooks at `/webhook/recipe`
- Verifies:
  - IP is whitelisted
  - Signature matches using HMAC with shared secret
  - Timestamp is recent (replay attack protection)
  - Unique signature not already processed
- Sends webhook to Third-Party server using `/start-cooking`
- Returns order status

### Third-Party Server
- Receives recipe orders at `/make-recipe`
- Processes request asynchronously
- Generates a signed payload with timestamp
- Sends the webhook to the Main Server
- Returns cooking status

### Security Features
- HMAC signature verification using `WEBHOOK_SECRET`
- Replay protection via timestamps
- Duplicate request prevention using in-memory hash tracking
- IP whitelisting for allowed servers

---

## Getting Started

### Prerequisites
- Node.js >= 18
- npm or yarn
- Optional: MongoDB (for future webhook logging)

### Install Dependencies
For each server:

```bash
cd main-server
npm install

cd ../third-party-server
npm install