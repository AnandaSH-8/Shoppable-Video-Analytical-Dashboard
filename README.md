
# Shoppable Video Analytical Dashboard

A full-stack dashboard that tracks shoppable video engagement metrics — views, clicks, and add-to-cart conversions — with simulated traffic support.
---

## Tech Stack

| Layer    | Technology                              |
| -------- | --------------------------------------- |
| Frontend | React 19, TypeScript, Vite, Axios       |
| Backend  | Node.js, Express, TypeScript|
| Database | SQLite via better-sqlite3               |

---

## Prerequisites

- Node.js >= 18
- npm >= 9

---

## Project Structure

```
Shoppable-Video-Analytical-Dashboard/
├── Backend/   # Express API server
└── Frontend/  # React Vite app
```

---

## 1. Clone the Repository

```bash
git clone https://github.com/AnandaSH-8/Shoppable-Video-Analytical-Dashboard.git
cd Shoppable-Video-Analytical-Dashboard
```

---

## 2. Backend Setup

### Install dependencies

```bash
cd Backend
npm install
```

> If you see a warning about `better-sqlite3` install scripts, approve it and reinstall:
> ```bash
> npm approve-scripts better-sqlite3
> npm install
> ```

### Database — migrations and seed data

No manual migration step is required. When the server starts for the first time it automatically:

1. Creates the `data/analytics.db` SQLite file.
2. Runs `CREATE TABLE IF NOT EXISTS` for all three tables:
   - `products`
   - `videos`
   - `engagement_events`
3. Seeds 10 products and 10 videos if the `videos` table is empty.

To reset the database and re-seed from scratch, delete the database file and restart the server:

```bash
rm -f data/analytics.db data/analytics.db-shm data/analytics.db-wal
npm start
```

### Start the backend server

```bash
npm start
```

The API server will be available at: `http://localhost:4000`

---

## 3. Frontend Setup

Open a new terminal tab.

### Install dependencies

```bash
cd Frontend
npm install
```

### Start the frontend dev server

```bash
npm run dev
```

The dashboard will be available at: `http://localhost:5173`

---

## 4. API Endpoints

| Method | Endpoint                  | Description                                      |
| ------ | ------------------------- | ------------------------------------------------ |
| GET    | `/api/analytics/videos`   | Returns paginated video analytics aggregates     |
| POST   | `/api/events`             | Ingests a new engagement event                   |

### GET `/api/analytics/videos`

Query parameters:

| Param      | Type   | Default | Description          |
| ---------- | ------ | ------- | -------------------- |
| `page`     | number | `1`     | Page number          |
| `pageSize` | number | `10`    | Results per page     |

Example:

```
GET http://localhost:4000/api/analytics/videos?page=1&pageSize=10
```

### POST `/api/events`

Request body:

```json
{
  "video_id": 1,
  "event_type": "view"
}
```

`event_type` must be one of: `view`, `click`, `add_to_cart`.

---

## 5. Environment Variables

The backend supports the following optional environment variables:

| Variable  | Default                      | Description                  |
| --------- | ---------------------------- | ---------------------------- |
| `PORT`    | `4000`                       | Port the API server runs on  |
| `DB_FILE` | `./data/analytics.db`        | Path to the SQLite database  |

To override, create a `.env` file inside `Backend/` or export them in your shell:

```bash
export PORT=5000
export DB_FILE=./data/custom.db
```

---

## 6. Running Both Servers Together

You need two terminal tabs running simultaneously:

**Terminal 1 — Backend:**
```bash
cd Backend && npm start
```

**Terminal 2 — Frontend:**
```bash
cd Frontend && npm run dev
```

Then open `http://localhost:5173` in your browser.




## Personal Project Contributions - Links

`https://ashets-pulse.vercel.app/` *


## Unlisted Youtube Link - Strong Candidate Reason
`https://youtu.be/TIMXtSCH6zo`



## Technical Video WalkThrough
`https://youtu.be/KbRmSuGR02w`