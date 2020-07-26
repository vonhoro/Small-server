let http = require("http");
let fs = require("fs");
const url = require("url");
const successfulResponseCode = 200;
const port = 8080;
const homeServer = http
  .createServer(function (req, res) {
    let query = url.parse(req.url, true);

    let loc = query.pathname.lastIndexOf("/");

    query.pathname = query.pathname.endsWith("/")
      ? query.pathname.substring(0, loc)
      : query.pathname;
    let filename = `./sites/${query.pathname}.html`;

    fs.readFile(filename, (err, data) => {
      if (err) {
        fs.readFile("./sites/404.html", (err, data) => {
          res.end(data);
        });
      } else {
        res.writeHead(successfulResponseCode, { "Content-Type": "text/html" });
        console.log(data);
        res.write(data);
        res.end();
      }
    });
  })
  .listen(port);
