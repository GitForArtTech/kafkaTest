const express = require("express");
const cors = require("cors");
const router = express.Router();
const user = require("./routers/user");
const queryDorm = require("./routers/querydorm");
const bp = require("body-parser");
const app = express();
const port = 1222;

router.get("/", (req, res) => {
  res.send("hello world!");
});

app.use("/", router);
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());
app.use(user);
app.use(queryDorm);
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, content-type, token, language"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
