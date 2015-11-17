"use strict";

const express = require('express');
const app = express()

const router = express.Router();

router.get("/:page", function(req, resp) {
  const page = req.params.page;
  const books = generateBooks(page * 20, 20);
  resp.json(books);
  resp.end();
});

app.use("/book", router);

app.listen(9000, () => console.log("Listening at 9000"));

function generateBooks(start, count) {
  const list = [];
  for(let i=0; i<count; i++) {
    list.push({
      id: start + i,
      name: "test name",
    });
  }
  return list;
}
