import { setShowOverlay } from "../store/actions";
import store from "../store/store";
import * as wss from "./wss";
import Peer from "simple-peer";

const defaultConstraints = {
  audio: true,
  video: true,
};

var localStream;
var peers = {};
var streams = [];

// Function for getting local stream and joining or hosting room
export const getLocalPreviewAndInitRoomConnection = async (
  isRoomHost,
  identity,
  roomId = null
) => {
  // Get mic and video access
  navigator.mediaDevices
    .getUserMedia(defaultConstraints)
    .then((stream) => {
      console.log("successfully received local stream");
      localStream = stream;
      showLocalVideoPreview(localStream);

      store.dispatch(setShowOverlay(false));
      // dispatch an action to hide loading overlay
      isRoomHost ? wss.createNewRoom(identity) : wss.joinRoom(identity, roomId);
    })
    .catch((err) => {
      console.log("error occurred when trying to get access to localstream");
      console.log(err);
    });
};

// Function for handeling signaling data
export const handleSignalingData = (data) => {
  // Add signaling data to peer connection
  peers[data.connUserSocketId].signal(data.signal);
};

// Function that returns the webRTC configuration for simple-peer
const getConfiguration = () => {
  return {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };
};

// Function for displaying incoming stream
const addStream = (stream, connUserSocketId) => {
  const videosContainer = document.getElementById("videos_portal");
  const videoContainer = document.createElement("div");
  videoContainer.id = connUserSocketId;

  videoContainer.classList.add("video_track_container");
  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.srcObject = stream;
  videoElement.id = `${connUserSocketId}-video`;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  videoContainer.appendChild(videoElement);
  videosContainer.appendChild(videoContainer);
};

// Function for showing local video preview
const showLocalVideoPreview = (stream) => {
  const videosContainer = document.getElementById("videos_portal");
  videosContainer.classList.add("videos_portal_styles");
  const videoContainer = document.createElement("div");
  videoContainer.classList.add("video_track_container");
  const videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.muted = true;
  videoElement.srcObject = stream;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  videoContainer.appendChild(videoElement);
  videosContainer.appendChild(videoContainer);
};

// Function for preparing peer connection
export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const configuration = getConfiguration();

  // Init new Peer
  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream,
  });

  // Peer is listening for incoming signal
  // Data for singaling: webRTC offer, webRTC Answer (SDP info), ice candidates
  peers[connUserSocketId].on("signal", (data) => {
    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };

    wss.signalPeerData(signalData);
  });

  // Peer is listening for incoming stream
  peers[connUserSocketId].on("stream", (stream) => {
    console.log("new stream came in");

    addStream(stream, connUserSocketId);
    streams = [...streams, stream];
  });
};
