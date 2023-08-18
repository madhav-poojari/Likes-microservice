-- init.sql
CREATE TABLE IF NOT EXISTS likes (
  id SERIAL PRIMARY KEY,
  userId VARCHAR(100),
  contentId VARCHAR(100)
);
INSERT INTO likes (userId, contentId) VALUES
  ('user1', 'content1'),
  ('user2', 'content1'),
  ('user3', 'content2'),
  ('user4', 'content2'),
  ('user1', 'content2');

