const request = require("request");
const async = require("async");
const argv = require('yargs')
  .default('port', "8080")
  .default('limit', 300)
  .default('count', 10000)
  .argv;

const http = require('http');
const keepAliveAgent = new http.Agent({ keepAlive: true });

const port = argv.port;
const count = argv.count;
const limit = argv.limit;

function getBooks(idx, next) {
  request
    .get({
        url: `http://localhost:${port}/book/${idx}`,
        agent: keepAliveAgent,
    })
    .on("error", (e) => next(e))
    .on("response", () => next(undefined));
}

console.log(`Starting test to port ${port}`);
console.log(`Count: ${count}, limit: ${limit}`);
const start = Date.now();
async.timesLimit(count, limit, getBooks, (e) => {
  if (e) {
    console.log("Error");
    return console.error(e);
  }
  console.log('Done', Date.now() - start);
});
