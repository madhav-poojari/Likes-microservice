const express = require('express');
const router = express.Router();
const pool = require("./db");
const redisClient = require("./redisConfig");


// gets all the "like" events
router.get('/allLikes', async (req, res) => {
    try {
        const data = await pool.query("SELECT * FROM likes");
        res.status(200).send(data.rows);
      } catch (err) {
        console.log(err);
        res.sendStatus(500);
      }
});

//post request to add a like event
router.post('/addlike', async (req, res) => {
    const { user_id, content_id } = req.body;
    try {
      await pool.query("INSERT INTO likes (userId, contentId) VALUES ($1, $2)", [
        user_id,
        content_id,
      ]);
  
      var totalLikes = await redisClient.get(`total_likes_${content_id}`);
      if (totalLikes !== null) {
        console.log("hi from redis");
        totalLikes=parseInt(totalLikes)+1
        await redisClient.set(`total_likes_${content_id}`, totalLikes );
       
      } else {
        const query = `
              SELECT COUNT(*) as like_count
              FROM likes
              WHERE contentId = $1;
            `;
        const result = await pool.query(query, [content_id]);
        totalLikes = parseInt(result.rows[0].like_count);
        await redisClient.set(`total_likes_${content_id}`, totalLikes);
      }
  
      res
        .status(200)
        .send({ message: "Successfully added child", total: totalLikes });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
});

//
router.get('/total-likes', async (req, res) => {
    const content_id = req.query.content_id;
    if (!content_id) {
      return res
        .status(400)
        .json({ error: "contentId is required as a query parameter" });
    }
  
    try {
      const totalLikes = await redisClient.get(`total_likes_${content_id}`);
      if (totalLikes !== null) {
        console.log("hi from redis");
        return res.json({ totalLikes: parseInt(totalLikes) });
      } else {
        const query = `
          SELECT COUNT(*) as like_count
          FROM likes
          WHERE contentId = $1;
        `;
        const result = await pool.query(query, [content_id]);
        const totalLikes = parseInt(result.rows[0].like_count);
        await redisClient.set(`total_likes_${content_id}`, totalLikes);
      }
  
      res.json({ Likes: totalLikes });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred" });
    }
});

// gets all the "like" events
router.get('/hasLiked', async (req, res) => {
    const user_id = req.query.user_id;
  const content_id = req.query.content_id;

  if (!user_id || !content_id) {
    return res
      .status(400)
      .json({ error: "user_id and content_id are required query parameters" });
  }
  try {
    const query = `
        SELECT COUNT(*) as like_count
        FROM likes
        WHERE userId = $1 AND contentId = $2;
      `;

    const values = [user_id, content_id];
    const result = await pool.query(query, values);

    const likeCount = result.rows[0].like_count;
    const hasLiked = likeCount > 0;

    res.json({ hasLiked });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
});

module.exports = router;    

