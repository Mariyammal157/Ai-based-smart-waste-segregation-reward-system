# EcoSort AI Implementation Plan

## Overview
EcoSort AI is a full-stack waste segregation, collection, and reward system designed for a polished, responsive production-style deployment. It supports local demo usage through in-memory fallback layers and falls back to rule-based AI when the classification service is unavailable.

## Proposed Workspace Structure
- `frontend/` – React + TypeScript + Vite + Tailwind client.
- `backend/` – Node.js + Express + TypeScript API server.
- `ai-service/` – FastAPI Python service for waste classification.
- `scripts/` – Utility scripts such as database seeding.
- `package.json` (root) – orchestration of workspace commands.

## Key Architecture Decisions
- Backend attempts MongoDB connection using `MONGODB_URI`.
- On DB connection failure, fallback to an in-memory repository layer for demo mode.
- Backend hits `AI_SERVICE_URL` for image classification.
- If AI service is offline, backend uses a rule-based mock classifier.
- Root start script runs frontend, backend, and AI service concurrently.

## Database Model Design
### User
- `name`
- `email`
- `phone`
- `hashedPassword`
- `role` (`USER`, `COLLECTOR`, `ADMIN`)
- `pointsBalance`
- `address`
- `coordinates`

### WasteScan
- `user` reference
- `imageUrl`
- `category` (`Plastic`, `Paper`, `Glass`, `Metal`, `Organic`, `E-Waste`)
- `confidenceScore`
- `recommendedBin`
- `pointsAwarded`
- `disposalInstruction`
- `environmentalMessage`
- `timestamp`

### CollectionRequest
- `user` reference
- `collector` reference (optional)
- `wasteType`
- `estimatedQuantity`
- `address`
- `coordinates`
- `status` (`PENDING`, `ASSIGNED`, `ACCEPTED`, `PICKUP_IN_PROGRESS`, `COLLECTED`, `COMPLETED`, `CANCELLED`)
- `timestamps`

### Reward
- `name`
- `description`
- `pointsRequirement`
- `image`
- `stock`
- `active`

### RewardTransaction
- `user` reference
- `reward` reference
- `pointsSpent`
- `status` (`PENDING`, `COMPLETED`)
- `timestamp`

### Notification
- `user` reference
- `title`
- `message`
- `type` (`alert`, `points`, `system`)
- `readStatus`
- `timestamp`

### CollectorProfile
- `collector` user reference
- `vehicleNumber`
- `currentStatus` (`active`, `idle`)
- `currentCoordinates`

## Backend API Design
### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Waste
- `POST /api/waste/scan` – upload or proxy image prediction.
- `GET /api/waste/history` – list user scans.

### Rewards
- `GET /api/rewards`
- `POST /api/rewards/redeem`

### Collection
- `POST /api/collections`
- `GET /api/collections` (user/collector/admin views)
- `PATCH /api/collections/:id/status`

### Leaderboard
- `GET /api/leaderboard`

### Notifications
- `GET /api/notifications`
- `PATCH /api/notifications/:id/read`

### Admin
- `GET /api/admin/users`
- `GET /api/admin/collectors`
- `PATCH /api/admin/assignments`
- `POST /api/admin/rewards`
- `PUT /api/admin/rewards/:id`

## AI Service
- `GET /health`
- `POST /predict`

Features:
- Accepts image uploads.
- Returns category, confidence, bin recommendation, points, and messaging.
- Fallback keyword/meta analysis when model unavailable.

## Frontend Pages
### Public
- `LandingPage` – product story, KPIs, feature summary.

### User
- `Dashboard` – points summary, recent scans, actions.
- `ScanWaste` – image upload and classification.
- `WasteHistory` – scan history with filters.
- `Rewards` – browse and redeem items.
- `Leaderboard` – community contributions.
- `Collection` – request pickups with map/address.

### Collector
- `CollectorDashboard` – assignment list, route map, status controls.

### Admin
- `AdminDashboard` – analytics, user/collector management, reward editor.

### Shared
- Theme toggle (dark/light)
- `AuthContext` for session state, role, and token management.
- `api.ts` Axios instance with auth interceptor.

## Deployment & Dev Layout
- Root `package.json` runs `concurrently`:
  - frontend dev server
  - backend API server
  - AI service
- `scripts/seed.ts` populates demo data.
- Production-ready backend can use MongoDB when configured.

## Verification Plan
### Automated
- Build frontend with `npm run build`.
- Type-check backend with `npm run build` or `npm run typecheck`.
- Validate critical REST endpoints with test client or script.

### Manual
- Start app and verify on `http://localhost:5173`.
- Register user, log in, scan an image, confirm points.
- Create a collection request and verify collector workflow.
- Test admin assignment and reward redemption.

## Notes
- Since the workspace is currently empty, I created the initial folder skeleton and this implementation plan.
- Next step: scaffold actual project files in `frontend/`, `backend/`, `ai-service/`, and add a root `package.json` if you want me to continue.
