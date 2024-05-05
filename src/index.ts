import express from "express";
import { connextDB } from "./db";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

connextDB()
  .then(() => {
    app.listen(3000, function () {
      console.log("app is running on 3000");
    });
  })
  .catch((e) => {
    console.log("connecting db error => ", e.message);
    process.exit(3000);
  });
