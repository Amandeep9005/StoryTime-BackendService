/**
 * Create an express server attach Socket.io to it and allow cors
 * so that it doesn't give you any headaches
 * 
 */

const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http,{
    cors:{origin:"*"}
});

/**
 * open connections and look for any new-operations being emiited from client side and once received remmit them as operations
 */

io.on("connection", (socket) => {
    socket.on("new-operations", (data) => {
      io.emit("new-remote-operations", data);
    });
  });

http.listen(8080,()=> console.log(`listenting on http:\\localhost:8080`))