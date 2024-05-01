import express from "express";
import path from "path";
import cors from "cors";
import fs from 'fs';
import { fileURLToPath } from "url";
const app = express();
const PORT = process.env.PORT || 3001;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors())
app.use(express.json());

app.use(express.static('client/build'))


app.get("/.well-known/apple-app-site-association", (req, res) => {
  fs.readFile('./.well-known/apple-app-site-association', 'utf-8', (err, data) => {

    res.status(200).json(JSON.parse(data));
  })
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});