const express = require("express");
const http = require("http");

let app = express();

http.createServer(app).listen(4444, () => {
  console.log(`http://localhost:4444`);
  console.log("nodejs服务器已启动");
});

app.use(express.static(__dirname + '/dist', {
  maxAge: 1000 * 3600
}));