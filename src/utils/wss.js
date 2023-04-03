import io from "socket.io-client";
import store from "../store/store";
import { setRoomId, setParticipants } from "../store/actions";
import * as webRTCHandler from "./webRTCHandler";

// Address of the server
const SERVER = "http://localhost:3001";

let socket = null;

export const connectWithSocketIOServer = () => {
  // Connect to the server with socket io
  socket = io(SERVER);

  // Listen for connections to socket io server
  socket.on("connect", () => {
    console.log("successfully connected with socket io server");
    console.log(socket.id);
  });

  // Listen for event tha gives room id
  socket.on("room-id", (data) => {
    const { roomId } = data;
    store.dispatch(setRoomId(roomId));
  });

  // Listen for event that updates the room
  socket.on("room-update", (data) => {
    const { connectedUsers } = data;
    store.dispatch(setParticipants(connectedUsers));
  });

  // Listen for event that signals to prepare for connection between clients
  socket.on("conn-prepare", (data) => {
    const { connUserSocketId } = data;

    webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);

    // inform the user which just joined the room that we prepared for incoming connection
    socket.emit("conn-init", { connUserSocketId: connUserSocketId });
  });

  // Listen for event that provides signaling data
  socket.on("conn-signal", (data) => {
    webRTCHandler.handleSignalingData(data);
  });

  // Listen for event that initialize connection between peers
  socket.on("conn-init", (data) => {
    webRTCHandler.prepareNewPeerConnection(data, true);
  });
};

// Funtion for creating a room
export const createNewRoom = (identity) => {
  const data = {
    identity,
  };

  // Emit event for creating a new room to the server
  socket.emit("create-new-room", data);
};

// Funtion for joining a room
export const joinRoom = (identity, roomId) => {
  const data = {
    roomId,
    identity,
  };

  // Emit event for creating a new room to the server
  socket.emit("join-room", data);
};

// Function for sending signal data
export const signalPeerData = (data) => {
  socket.emit("conn-signal", data);
};
