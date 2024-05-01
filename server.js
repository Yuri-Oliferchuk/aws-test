import express from "express";
import dotenv from "dotenv";
import https from "https";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT || 4500;

const __dirname = path.dirname(new URL(import.meta.url).pathname);


// Routes
app.get("/", (req, res) => {
  res.send("WELCOME TO THE BASIC EXPRESS APP WITH AN HTTPS SERVER");
});

app.get("/.well-known/apple-app-site-association", (req, res) => {
  fs.readFile('./.well-known/apple-app-site-association', 'utf-8', (err, data) => {

    res.status(200).json(JSON.parse(data));
  })
});

// Read SSL certificate and key files1
const options = {
  key: fs.readFileSync(path.join(__dirname, "localhost-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "localhost.pem")),
};

// Create HTTPS server
const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`App listening on https://localhost:${port}`);
});