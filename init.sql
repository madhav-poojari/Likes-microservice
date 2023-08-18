-- init.sql
CREATE TABLE IF NOT EXISTS likes (
  id SERIAL PRIMARY KEY,
  userId VARCHAR(100),
  contentId VARCHAR(100)
);
