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
 * open connections and look for any new-operations being emiited from client side and once 
 * received re-emmit them as remote operations to all the ports
 */
let usersConnected = [];
let maxUsersAllowed =5;
io.on("connection", (socket) => {
  if (usersConnected.length<maxUsersAllowed)
  {
    usersConnected.push(socket.id);
  console.log("A user is connected",socket);
    socket.on("new-operations", (data) => {
      
  console.log("A user sends data",data);
      io.emit("new-remote-operations", data);
    });
  }
  else{
    socket.emit("error", "Maximum allowed users limit reached");
        socket.disconnect();
        return;
  }
  });

http.listen(8080,()=> console.log(`listenting on http:\\localhost:8080`))