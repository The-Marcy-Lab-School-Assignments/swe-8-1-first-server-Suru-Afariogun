const express = require('express');
const app = express();
const port = 8080;

// === API Endpoints ===
app.get('/api/joke', (req, res) => {
  res.json({
    setup: "What do you call a pile of kittens?",
    punchline: "A meowntain"
  });
});

app.get('/api/picture', (req, res) => {
  res.json({
    src: "https://static-cdn.jtvnw.net/jtv_user_pictures/meowntain-profile_banner-71b7a6d0d943dc9e-480.jpeg"
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
