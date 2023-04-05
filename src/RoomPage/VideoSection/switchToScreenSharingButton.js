import React, { useState } from "react";
import SwitchImg from "../../resources/images/switchToScreenSharing.svg";
import LocalScreenSharingPreview from "./localScreenSharingPreview";
import * as webRTCHandler from "../../utils/webRTCHandler";

const constraints = {
  audio: false,
  video: true,
};

const SwitchToScreenSharingButton = () => {
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
  const [screenSharingStream, setScreenSharingStream] = useState(null);

  // Handler for when screen share button is clicked
  const handleScreenShareToggle = async () => {
    if (!isScreenSharingActive) {
      var stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (err) {
        console.log(
          "error occurred when trying to get access to screen share stream"
        );
      }

      if (stream) {
        setScreenSharingStream(stream);

        webRTCHandler.toggleScreenShare(isScreenSharingActive, stream);
        setIsScreenSharingActive(true);
        // Execute function to switch the video track to screen sharing video track
      }
    } else {
      // switch to video track from camera
      webRTCHandler.toggleScreenShare(isScreenSharingActive);
      setIsScreenSharingActive(false);

      // stop screen share stream
      screenSharingStream.getTracks().foreach((t) => t.stop());
      setScreenSharingStream(null);
    }
  };

  return (
    <>
      <div className="video_button_container">
        <img
          src={SwitchImg}
          onClick={handleScreenShareToggle}
          className="video_button_image"
        />
      </div>
      {isScreenSharingActive && (
        <localScreenSharingPreview stream={screenSharingStream} />
      )}
    </>
  );
};

export default SwitchToScreenSharingButton;
