const express = require("express");
const router = new express.Router();
const axios = require("axios");
const defaultUser = {
  name: "藍子琪",
  studentID: 107306014,
  department: "資管四乙",
  dorm: "",
};

router.post("/users/login", async (req, res) => {
  try {
    if (
      req.body.name === defaultUser.name &&
      req.body.studentID === defaultUser.studentID
    ) {
      axios
        .post("http://0.0.0.0:8088/query", {
          ksql: "select * from queryable_student_dorm emit changes;",
          streamsProperties: {},
        })
        .then((res) => {
          console.log(`statusCode: ${res.status}`);
          console.log(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
      res.cookie("studentName", defaultUser.name, { httpOnly: true });
      res.send({ defaultUser });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

module.exports = router;
