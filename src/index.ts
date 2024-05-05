import express from "express";
import { connextDB } from "./db";
import { User } from "./db.services";

const app = express();
const userServices = new User();
app.use(express.json());

app.get("/", (_, res) => {
  res.send("hello world");
});

app.get("/user/create", async (_, res) => {
  const data = await userServices.create();
  res.status(200).send(data);
});

app.post("/user/insert", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).send({
      message: "Need username, email, password in the body!",
    });
  }

  try {
    const data = await userServices.insert(username, email, password);
    res.status(201).send(data);
  } catch (error: any) {
    console.log("error while inserting data => ", error?.message ?? "");
    res.status(500).send({ message: "Something went wrong!" });
  }
});

app.put("/user/update", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username && !email && !password) {
    res.status(400).send({
      message: "No Data found in the body!",
    });
  }

  try {
    const data = await userServices.update(username, email, password);
    res.status(201).send(data);
  } catch (error: any) {
    console.log("error while updating data => ", error?.message ?? "");
    res.status(500).send({ message: "Something went wrong!" });
  }
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
