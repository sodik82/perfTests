const request = require("request");
const async = require("async");

function getBooks(idx, next) {
  request
    .get("http://localhost:8080/book/" + idx)
    .on("error", (e) => next(e))
    .on("response", () => next(undefined));
}

console.log("Starting");
const start = Date.now();
async.timesLimit(10000, 100, getBooks, (e) => {
  if (e) {
    console.log("Error");
    return console.error(e);
  }
  console.log('Done', Date.now() - start);
});
