const express = require("express");
const storage = require("node-persist");
const socket = require("socket.io");

// App Setup
const app = express();
var server = app.listen(9000, () =>
  console.log("Listening on port number 9000")
);

// Socket Setup
var io = socket(server);

// Object to store socket ids and listening key
var currentValuesBeingListened = {};

// defining socket events
io.on("connection", socket => {
  console.log("Connection established");

  socket.on("testing_socket_connection", msg => {
    console.log(msg);
    socket.emit('test_successful');
  });

  socket.on("set", async data => {
    console.log("set was called");
    await storage.init();
    await storage.setItem(data.key, data.value);
    socket.emit(
        "set_done",
        "Added/Updated the pair = <" + data.key + ", " + data.value + ">"
      );

    console.log(currentValuesBeingListened);
    for(var key in currentValuesBeingListened){
        if (currentValuesBeingListened[key] == data.key) {
            socket.broadcast.to(key).emit("listen_again", data.key);
        }
    }
});

  socket.on("get", async data => {
    console.log("get was called");
    await storage.init();
    const value = await storage.getItem(data.key);
    result = "";
    if (value == null) {
      result = "No value found";
    } else {
      result = value;
    }
    socket.emit("get_done", result);
  });

  socket.on("listen", async data => {
    console.log("listen was called");
    await storage.init();
    const value = await storage.getItem(data.key);
    result = "";
    if (value == null) {
      result = "NULL";
    } else {
      result = value;
    }
    socket.emit("get_listening_value", { key: data.key, value: result });
    currentValuesBeingListened[socket.id.toString()] = data.key;
  });

  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected");
    delete currentValuesBeingListened[socket.id];
  });
});
