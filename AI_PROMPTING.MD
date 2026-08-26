# AI Prompting Log

## 1. Initial Full-Stack Architecture and Implementation

### Tool Used

ChatGPT, Perplexity, Amazon Q

## `ChatGPT`

### Context/Task

Set up the full-stack dashboard architecture and implementation using React, Node.js, Express, SQLite, and TypeScript.

### Exact Prompt Used

"Provide in Typescript without doing known issue or issue which trigger warning in Vscode

Backend & Database (SQL)
Design a normalized SQL database with at least the following entities:
● Products: ID, Name, Price, CreatedAt
● Videos: ID, ProductID, VideoURL, Title
● EngagementEvents: ID, VideoID, EventType (e.g., 'view', 'click', 'add_to_cart'),
Timestamp
Create the following API endpoints:
● POST /api/events: Ingests a new engagement event (simulate webhook traffic).
● GET /api/analytics/videos: Returns a list of videos aggregated with their total views,
clicks, and add_to_cart conversions. Must support basic pagination.
Frontend (React)
Build a clean, responsive dashboard with the following features:
● Data Table: Display the videos and their aggregated metrics (Views, Clicks,
Conversions) fetched from the backend.
● Conversion Rate Column: Calculate and display the conversion rate (Add to Carts /
Views) on the frontend.
● Simulate Traffic Button: A button that, when clicked, fires a random payload to the
POST /api/events endpoint to simulate a user interacting with a video. The table data
should refresh after this action

Dont add/ put extra masala anywhere unless specified - Provide what is mentioned"

### Outcome & Adjustments

The AI provided a TypeScript full-stack implementation with:

- React frontend
- Express backend
- SQLite database
- Routes → Controllers → Services → Database layering
- Parameterized SQL queries
- Pagination
- Aggregated video analytics
- Frontend conversion-rate calculation
- Simulated traffic functionality

The implementation was kept limited to the requested technologies and features.

## 2. Axios API Client Conversion

### Tool Used

ChatGPT

### Context/Task

Convert the existing frontend API service from native fetch to Axios while keeping TypeScript types.

### Exact Prompt Used

"import type {
ApiResponse,
CreateEventPayload,
EngagementEvent,
PaginatedResult,
VideoAnalytics,
} from "../types";

const API_BASE_URL = "http://localhost:4000/api";

const request = async <TData>(
path: string,
init?: RequestInit,
): Promise<TData> => {
const response = await fetch(`${API_BASE_URL}${path}`, {
...init,
headers: { "Content-Type": "application/json", ...init?.headers },
});

const payload = (await response.json()) as ApiResponse<TData>;

if (!payload.success) {
throw new Error(payload.error);
}

if (!response.ok) {
throw new Error(`Request failed with status ${response.status}`);
}

return payload.data;
};

export const fetchVideoAnalytics = (
page: number,
pageSize: number,
): Promise<PaginatedResult<VideoAnalytics>> =>
request<PaginatedResult<VideoAnalytics>>(
`/analytics/videos?page=${page}&pageSize=${pageSize}`,
);

export const createEngagementEvent = (
payload: CreateEventPayload,
): Promise<EngagementEvent> =>
request<EngagementEvent>("/events", {
method: "POST",
body: JSON.stringify(payload),
});

Convert to Axios setup and make sure everything comfortable with Typescript"

### Outcome & Adjustments

The AI converted the API layer to Axios using a typed Axios client.

The implementation used:

- `axios.create()`
- Typed `axios.get<T>()`
- Typed `axios.post<T>()`
- Existing `ApiResponse<T>` types
- Existing domain types
- Axios `params` for pagination instead of manually constructing the query string

The simpler Axios implementation was preferred because the project is a small dashboard and does not require an unnecessary abstraction layer.

## 3. API Endpoint Implementation and File Structure

### Tool Used

ChatGPT

### Context/Task

Identify exactly where the two required backend endpoints are implemented and provide the complete code and flow.

### Exact Prompt Used

"Create the following API endpoints:
● POST /api/events: Ingests a new engagement event (simulate webhook traffic).
● GET /api/analytics/videos: Returns a list of videos aggregated with their total views,
clicks, and add_to_cart conversions. Must support basic pagination

In which file its implemented ? provide me the code and details"

### Outcome & Adjustments

The AI mapped the endpoints into the backend layers:

POST /api/events:

- `routes/eventRoutes.ts`
- `controllers/eventsController.ts`
- `services/eventService.ts`
- SQLite `EngagementEvents` table

GET /api/analytics/videos:

- `routes/analyticsRoutes.ts`
- `controllers/analyticsController.ts`
- `services/analyticsService.ts`
- SQLite aggregation query

The implementation used parameterized SQL queries and SQL aggregation with `SUM` and `CASE`.

Pagination was implemented using:

- `page`
- `pageSize`
- `LIMIT`
- `OFFSET`

The final route registration was placed in `app.ts` using `/api` as the common route prefix.

## 4. Understanding Simulated Webhook Traffic and Frontend Event Flow

### Tool Used

ChatGPT

### Context/Task

Clarify what "simulate webhook traffic" means and how the React frontend sends engagement events to the backend.

### Exact Prompt Used

"what does mean simulate webhook traffic ?

how does FE sends events ? Checkout this file

[VideoAnalyticsTable TypeScript/React component provided]

"

### Outcome & Adjustments

The AI clarified that the assignment does not require a real external webhook provider.

The intended flow is:

User clicks "Simulate Traffic"
→ React generates a random event
→ POST /api/events
→ Express validates the event
→ SQLite stores the event
→ GET /api/analytics/videos
→ React refreshes the table

The existing `VideoAnalyticsTable` was identified as a presentation component only. It displays aggregated analytics and should not be responsible for sending events.

The event API call should instead be handled by the dashboard/container logic using the API service.

The existing frontend conversion-rate calculation was confirmed as correct:

`conversionRate = addToCarts / views`

and formatted as a percentage on the frontend.

## 5. Seed Data and Product Images

### Tool Used

ChatGPT

### Context/Task

Replace placeholder Picsum images with product-related images and correct inconsistent product/video relationships.

### Exact Prompt Used

"INSERT INTO products (name, price) VALUES
('Aurora Wireless Headphones', 129.99),
('Nimbus Running Shoes', 89.50),
('Cobalt Smart Bottle', 34.00),
('Aurora Wireless Headphones', 129.99),
('Vertex Mechanical Keyboard', 119.00),
('Luna Portable Speaker', 59.99),
('Atlas Travel Backpack', 74.50),
('Nova Fitness Watch', 149.00),
('Echo USB Microphone', 79.99),
('Orbit Desk Lamp', 45.00);

INSERT INTO videos (product_id, video_url, title) VALUES
(1, 'https://picsum.photos/seed/aurora-unboxing/640/360', 'Aurora Headphones Unboxing'),
(2, 'https://picsum.photos/seed/aurora-bass-test/640/360', 'Aurora Bass Test'),
(3, 'https://picsum.photos/seed/nimbus-first-run/640/360', 'Nimbus First Run Review'),
(4, 'https://picsum.photos/seed/cobalt-hydration/640/360', 'Cobalt Bottle Hydration Demo'),
(5, 'https://picsum.photos/seed/vertex-keyboard/640/360', 'Vertex Keyboard Setup'),
(6, 'https://picsum.photos/seed/luna-speaker/640/360', 'Luna Speaker Sound Test'),
(7, 'https://picsum.photos/seed/atlas-backpack/640/360', 'Atlas Backpack Review'),
(8, 'https://picsum.photos/seed/nova-watch/640/360', 'Nova Fitness Watch Demo'),
(9, 'https://picsum.photos/seed/echo-microphone/640/360', 'Echo Microphone Test'),
(10, 'https://picsum.photos/seed/orbit-lamp/640/360', 'Orbit Desk Lamp Setup');
`;
Provide me real image of product, change the links if possible or change whole product name and add image according to that"

### Outcome & Adjustments

The placeholder Picsum URLs were replaced with product-related image URLs.

During review, an inconsistency was identified between the original product and video IDs. The seed data was corrected so that each video references the intended product.

The frontend currently renders `videoUrl` using an `<img>` element, so the supplied URLs represent dashboard thumbnail images rather than actual video files.

## 6. Broken Image Correction

### Tool Used

ChatGPT

### Context/Task

Replace a broken image URL in the seed data.

### Exact Prompt Used

"last image is broken, provide correct one
https://images.unsplash.com/photo-1551816230-ef5deaed4a2d?w=640&h=360&fit=crop"

### Outcome & Adjustments

A replacement image URL was provided.

The response also identified that the replacement image needed to correspond to the product name. This highlighted that product name, video title, and thumbnail should remain consistent in the seed data.

# Final AI Usage Summary

The AI was used for:

- Full-stack architecture
- TypeScript implementation
- Express API implementation
- SQLite schema and aggregation queries
- Pagination implementation
- Axios API client conversion
- React API integration guidance
- Simulated event flow
- Seed data preparation
- Product thumbnail URL replacement

Human adjustments/review:

- Verified that the API structure matched the assignment.
- Reviewed the frontend/backend separation.
- Reviewed product/video relationships.
- Checked image URLs and corrected broken/mismatched seed data.
- Confirmed that conversion rate is calculated on the frontend as required.

## `Perplexity`

### Entry 1: React and TypeScript Setup

- **Tool Used:** Perplexity
- **Context/Task:** Initializing a React application with TypeScript using Vite.
- **Exact Prompt Used:**
  > Provide latest commands to initialize a React application in TypeScript.
- **Outcome & Adjustments:** Received the Vite initialization command and used the `react-ts` template.

### Entry 2: SQLite Database Setup

- **Tool Used:** Perplexity
- **Context/Task:** Setting up SQLite with a TypeScript Express backend.
- **Exact Prompt Used:**
  > I will use SQLite for a temporary small application. Explain the complete steps to install, connect, create tables, insert data, and view the inserted records using a TypeScript backend.
- **Outcome & Adjustments:** Used the suggested SQLite driver and created a database initialization module. Verified the inserted records using a SQLite viewer extension in VS Code.

## `Amazon Q`

### Entry 1: Type-Only Import Fix

- **Tool Used:** Amazon Q
- **Context/Task:** Fix a TypeScript error in `App.tsx` where `VideoAnalytics` was imported as a regular import but `verbatimModuleSyntax` requires type-only imports.
- **Exact Prompt Used:**
  > 'VideoAnalytics' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.ts(1484)
- **Outcome & Adjustments:** Changed `import { VideoAnalytics }` to `import type { VideoAnalytics }` in `App.tsx`.

### Entry 2: ESLint react-hooks/set-state-in-effect Warning

- **Tool Used:** Amazon Q
- **Context/Task:** Resolve an ESLint warning in `useVideoAnalytics.ts` where calling `void load()` directly inside a `useEffect` body was flagged as synchronous `setState` inside an effect.
- **Exact Prompt Used:**
  > Error: Calling setState synchronously within an effect can trigger cascading renders [...] why this issue and what is the solution
- **Outcome & Adjustments:** Wrapped the `load()` call inside a locally defined `fetchData` async function within the effect body. This satisfies the linter rule because `setState` calls are now inside an async callback rather than the synchronous effect body.

### Entry 3: npm allow-scripts Warning for better-sqlite3

- **Tool Used:** Amazon Q
- **Context/Task:** Understand and resolve the npm warning about `better-sqlite3` install scripts not being approved.
- **Exact Prompt Used:**
  > npm warn allow-scripts 1 package has install scripts not yet covered by allowScripts: better-sqlite3@11.10.0
- **Outcome & Adjustments:** Ran `npm approve-scripts better-sqlite3` to explicitly approve the native `node-gyp rebuild` install script, then re-ran `npm install`.

### Entry 4: SQLite Syntax Error in Seed Data

- **Tool Used:** Amazon Q
- **Context/Task:** Fix a `SqliteError: near "(": syntax error` crash on backend startup caused by malformed `SEED_SQL` in `schema.ts`.
- **Exact Prompt Used:**
  > SqliteError: near "(": syntax error [...] at Database.exec [...] src/db/index.ts:24:6
- **Outcome & Adjustments:** Identified two bugs in `SEED_SQL`: a stray duplicate row with a trailing comma appearing after the semicolon that ended the `INSERT INTO products` statement, and a `product_id = 4` reference in the videos insert when only 3 products were seeded. Both were corrected.

### Entry 5: Retry Mechanism on the Retry Button

- **Tool Used:** Amazon Q
- **Context/Task:** Add a retry mechanism to the Retry button in the Dashboard — either limiting attempts or disabling after multiple failures.
- **Exact Prompt Used:**
  > in dashboard Index file, Retry button is there. i am thinking to add retry mechanisms or disabling if multiple attempts made
- **Outcome & Adjustments:** Implemented a max-retries cap of 3 in `useVideoAnalytics.ts`. Added `retryCount` state that increments only on manual retries (not on initial load or page changes). Exposed `retryCount` and `maxRetries` from the hook. Updated `Dashboard/index.tsx` to show remaining attempts on the button label (`Retry (N left)`) and replace the button with a "Max retries reached. Please refresh the page." message once exhausted.
