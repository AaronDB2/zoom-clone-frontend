import React from "react";
import MicButton from "./micButton";
import CameraButton from "./cameraButton";
import LeaveRoomButton from "./leaveRoomButton";
import SwitchToScreenSharingButton from "./switchToScreenSharingButton";

const VideoButtons = (props) => {
  return (
    <div className="video_buttons_container">
      <MicButton />
      <CameraButton />
      <LeaveRoomButton />
      <SwitchToScreenSharingButton />
    </div>
  );
};

export default VideoButtons;
