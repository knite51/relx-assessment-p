const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-API-Key"],
  })
);

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

// Set up a basic route without express.Router() as it's unnecessary here
app.get("/test", (req, res) => {
  res.send({ message: "Welcome to Relx" });
});

// Proxy setup to bypass CORS
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://angular-exercise.trunarrative.cloud",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "",
    },
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader(
        "X-API-Key",
        "PwewCEztSW7XlaAKqkg4IaOsPelGynw6SN9WsbNf"
      );
    },
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
