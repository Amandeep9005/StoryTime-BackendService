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
const maxUsersAllowed =5;//ideally to be loaded from the config file
let indexCurrent=1;
io.on("connection", (socket) => {
  /**
   * check if number of users added are less than max allowed users. 
   * if yes check if all players have joined if not don't give them the ablity to edit yet.
   * if numbers of users connected are greater than the number allowed disconnect that socket.
   */
  if (usersConnected.length<maxUsersAllowed)
  {
        usersConnected.push(socket.id);  //add a new socket connection to usersConnected Array
        if(usersConnected.length<maxUsersAllowed){
          socket.emit("message","waiting for players to join");//emit a message when all the users are not yet joined
        }
        
          if(usersConnected.length===maxUsersAllowed){
          io.emit("message","all players have joined start the game")//emit a message when all the users have joined
          io.emit("user-turn", {socket:usersConnected[0],msg:"your turn"});//emit a message to 1st socket that its your turn and make it editable
         
        
          let timer =setInterval(()=>{
            io.emit("start",true);//times up all the sockets are uneditable now
            io.emit("user-turn", {socket:usersConnected[indexCurrent],msg:"your turn"});//emit a message to next socket that its your turn and make it editable
            ++indexCurrent;
            if(indexCurrent===maxUsersAllowed+1){
              io.emit("game-over");//times up game over
              clearInterval(timer)
            }
          }, 10000);
        

          
      }

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
  socket.on("disconnect", () => {
    usersConnected = usersConnected.filter(item => item !== socket.id)
      
   if(usersConnected.length===0){
     indexCurrent=1;
   }
   
});




  });

http.listen(8080,()=> console.log(`listenting on http:\\localhost:8080`))