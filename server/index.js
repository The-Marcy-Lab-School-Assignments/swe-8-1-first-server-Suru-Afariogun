const express = require('express');
const app = express();
const port = 8080;

// The path module is useful for constructing relative filepaths
const path = require('path');

// the filepath is to the entire assets folder
const filepath = path.join(__dirname, '../my-app/dist');

// generate middleware using the filepath
const serveStatic = express.static(filepath);

// Register the serveStatic middleware before the remaining controllers
app.use(serveStatic);

// other controllers

// === API Endpoints ===
app.get('/api/joke', (req, res) => {
  res.json({
    setup: 'What do you call a pile of kittens?',
    punchline: 'A meowntain',
  });
});

app.get('/api/picture', (req, res) => {
  res.json({
    src: 'https://static-cdn.jtvnw.net/jtv_user_pictures/meowntain-profile_banner-71b7a6d0d943dc9e-480.jpeg',
  });
});

app.get('/api/rollDie', (req, res) => {
  const quantity = parseInt(req.query.quantity) || 1;
  const rolls = Array.from({ length: quantity }, () =>
    Math.ceil(Math.random() * 6)
  );
  res.json({ rolls });
});

// === Start Server ===
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
