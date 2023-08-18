const express = require("express");


const port = 3000;
const app = express();
app.use(express.json());
process.on("uncaughtException", function (err) {
  console.log(err);
});
const routes = require('./routes');
app.use('/', routes);

//used for dev pourpose
app.get("/setup", async (req, res) => {
  try {
    await pool.query(
      "CREATE TABLE likes( id SERIAL PRIMARY KEY, userId VARCHAR(100), contentId VARCHAR(100))"
    );
    res.status(200).send({ message: "Successfully created table" });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(port, () => console.log(`Server has started on port: ${port}`));
