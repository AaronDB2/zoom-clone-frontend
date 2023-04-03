import React, { useEffect } from "react";
import ParticipantsSection from "./ParticipantsSection/participantsSection";
import VideoSection from "./VideoSection/videoSection";
import ChatSection from "./ChatSection/chatSection";
import RoomLabel from "./roomLabel";
import { connect } from "react-redux";
import * as webRTCHandler from "../utils/webRTCHandler";
import Overlay from "./overlay";

import "./roomPage.css";

const RoomPage = ({ roomId, identity, isRoomHost, showOverlay }) => {
  useEffect(() => {
    webRTCHandler.getLocalPreviewAndInitRoomConnection(
      isRoomHost,
      identity,
      roomId
    );
  }, []);

  return (
    <div className="room_container">
      <ParticipantsSection />
      <VideoSection />
      <ChatSection />
      <RoomLabel roomId={roomId} />
      {showOverlay && <Overlay />}
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(RoomPage);
