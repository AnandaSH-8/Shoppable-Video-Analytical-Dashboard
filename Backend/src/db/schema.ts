export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS products (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL,
  price       REAL    NOT NULL CHECK (price >= 0),
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS videos (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id  INTEGER NOT NULL,
  video_url   TEXT    NOT NULL,
  title       TEXT    NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS engagement_events (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  video_id    INTEGER NOT NULL,
  event_type  TEXT    NOT NULL CHECK (event_type IN ('view', 'click', 'add_to_cart')),
  timestamp   TEXT    NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (video_id) REFERENCES videos (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_videos_product_id ON videos (product_id);
CREATE INDEX IF NOT EXISTS idx_events_video_type ON engagement_events (video_id, event_type);
`;

/** Baseline products/videos so the dashboard and traffic simulation have targets. */
export const SEED_SQL = `
INSERT INTO products (name, price) VALUES
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
