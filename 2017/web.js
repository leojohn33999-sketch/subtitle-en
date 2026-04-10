const http = require("http");
const fs = require("fs");
const path = require("path");

const baseDir = "/storage/emulated/0/Download/movie";

const server = http.createServer((req, res) => {
  let filePath = path.join(baseDir, req.url);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404);
      return res.end("Not found");
    }

    if (stats.isDirectory()) {
      fs.readdir(filePath, (err, files) => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(files.map(f => `<a href="${req.url}/${f}">${f}</a><br>`).join(""));
      });
    } else {
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

server.listen(8080, () => console.log("Server running on port 8080"));
