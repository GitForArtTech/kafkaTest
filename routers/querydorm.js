const express = require("express");
const router = new express.Router();
const axios = require("axios");

let dormDataProcessed = [];

router.post("/dorm", async (req, res) => {
  try {
    let rowData = await axios
      .post("http://0.0.0.0:8088/query", {
        ksql: "select * from  queryable_dorm_table ;",
        streamsProperties: {},
      })
      .catch((error) => {
        console.error(error);
      });

    // 整理資料
    dormDataProcessed = processData(rowData.data);
    res.send(dormDataProcessed);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

function processData(data) {
  let originData = data;
  let dormData = [];
  originData.forEach((element) => {
    if (element.row != undefined) {
      let dormObj = {
        room: element.row.columns[0],
        dormname: element.row.columns[1],
        status: element.row.columns[2],
      };
      dormData.push(dormObj);
    }
  });
  return dormData;
}

module.exports = router;
