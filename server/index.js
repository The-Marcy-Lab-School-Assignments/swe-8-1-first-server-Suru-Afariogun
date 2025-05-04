const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;

// === Middleware: Logger ===
const logRoutes = (req, res, next) => {
  console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
  next();
};
app.use(logRoutes);

// === API Endpoints ===
app.get('/api/joke', (req, res) => {
  res.json({
    setup: "Why don't skeletons fight each other?",
    punchline: "Because they don't have the guts."
  });
});

app.get('/api/picture', (req, res) => {
  res.json({
    src: "https://picsum.photos/600/400"
  });
});

app.get('/api/rollDie', (req, res) => {
  let quantity = parseInt(req.query.quantity);
  if (isNaN(quantity) || quantity < 1) {
    quantity = 1;
  }
  const rolls = Array.from({ length: quantity }, () =>
    Math.ceil(Math.random() * 6)
  );
  res.json({ rolls });
});

// === Serve Static Assets ===
// Absolute path to React app's dist folder
const frontendPath = path.join(__dirname, '..', 'my-app', 'dist');
app.use(express.static(frontendPath));

// Serve index.html on all unmatched GET routes (for React router support)
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// === Start the Server ===
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
