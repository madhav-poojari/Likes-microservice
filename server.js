const express = require('express')
const pool = require('./db')
const port = 3000

const app = express()
app.use(express.json())

//routes
app.get('/', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM likes')
        res.status(200).send(data.rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

app.post('/', async (req, res) => {
    const { user_id, content_id } = req.body
    try {
        await pool.query('INSERT INTO likes (userId, contentId) VALUES ($1, $2)', [ user_id, content_id])
        res.status(200).send({ message: "Successfully added child" })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})
app.get('/hasliked', async (req, res) => {
    const user_id = req.query.user_id;
    const content_id = req.query.content_id;
  
    if (!user_id || !content_id) {
      return res.status(400).json({ error: 'user_id and content_id are required query parameters' });
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
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while processing your request' });
    } finally {
      await client.end();
    }
  });
  

  
  
  
  
app.get('/setup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE likes( id SERIAL PRIMARY KEY, userId VARCHAR(100), contentId VARCHAR(100))')
        res.status(200).send({ message: "Successfully created table" })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})


app.listen(port, () => console.log(`Server has started on port: ${port}`))