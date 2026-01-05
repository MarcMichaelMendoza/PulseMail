const { createProxyMiddleware } = require("http-proxy-middleware");

// Proxy setup to forward API requests to the backend server
module.exports = function (app) {
  app.use(["/api", "/auth/google"],createProxyMiddleware({
      target: "http://localhost:5000",
    }));
};