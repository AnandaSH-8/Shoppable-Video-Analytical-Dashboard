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
  ('Vertex Mechanical Keyboard', 119.00),
  ('Luna Portable Speaker', 59.99),
  ('Atlas Travel Backpack', 74.50),
  ('Nova Fitness Watch', 149.00),
  ('Echo USB Microphone', 79.99),
  ('Orbit Desk Lamp', 45.00),
  ('Pulse Fitness Tracker Demo', 99.00);

INSERT INTO videos (product_id, video_url, title) VALUES
  (
    1,
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=640&h=360&fit=crop',
    'Aurora Headphones Unboxing'
  ),
  (
    2,
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=640&h=360&fit=crop',
    'Nimbus Running Shoes Review'
  ),
  (
    3,
    'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=640&h=360&fit=crop',
    'Cobalt Smart Bottle Demo'
  ),
  (
    4,
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=640&h=360&fit=crop',
    'Vertex Keyboard Setup'
  ),
  (
    5,
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=640&h=360&fit=crop',
    'Luna Speaker Sound Test'
  ),
  (
    6,
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=640&h=360&fit=crop',
    'Atlas Backpack Review'
  ),
  (
    7,
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=640&h=360&fit=crop',
    'Nova Fitness Watch Demo'
  ),
  (
    8,
    'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=640&h=360&fit=crop',
    'Echo Microphone Test'
  ),
  (
    9,
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=640&h=360&fit=crop',
    'Orbit Desk Lamp Setup'
  ),
  (
  10,
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=640&h=360&fit=crop',
  'Pulse Fitness Tracker Demo'
  );
`;


