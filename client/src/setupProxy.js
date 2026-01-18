/**
 * @fileoverview Development proxy configuration for Create React App.
 * @module setupProxy
 */

const { createProxyMiddleware } = require("http-proxy-middleware");

/** @param {import('express').Application} app */
module.exports = function (app) {
  app.use(["/api", "/auth/google"],createProxyMiddleware({
      target: "http://localhost:5000",
    }));
};