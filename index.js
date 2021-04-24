const { isFunction } = require("util");

const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http,{
    cors:{origin:"*"}
});

io.on("connection", (socket) => {
    socket.on("new-operations", (data) => {
      io.emit("new-remote-operations", data);
    });
  });

http.listen(8080,()=> console.log(`listenting on http:\\localhost:8080`))