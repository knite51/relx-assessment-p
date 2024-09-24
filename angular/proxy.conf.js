const PROXY_CONFIG = {
  "/api": {
    target: "https://angular-exercise.trunarrative.cloud",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "",
    },
    on: {
      proxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader(
          "X-API-Key",
          "PwewCEztSW7XlaAKqkg4IaOsPelGynw6SN9WsbNf"
        );
      },
    },
    onProxyReq: function (proxyReq, req, res) {
      proxyReq.setHeader(
        "x-api-key",
        "PwewCEztSW7XlaAKqkg4IaOsPelGynw6SN9WsbNf"
      );
    },
  },
};

module.exports = PROXY_CONFIG;
