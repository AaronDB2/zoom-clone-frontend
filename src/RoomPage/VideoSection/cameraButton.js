import React, { useState } from "react";
import CameraButtonImg from "../../resources/images/camera.svg";
import CameraButtonImgOff from "../../resources/images/cameraOff.svg";

const CameraButton = () => {
  const [isLocalVideoDisabled, setIslocalVideoDisabled] = useState(false);

  // Handler for when camera icon is pressed
  const handleCameraButtonPressed = () => {
    setIslocalVideoDisabled(!isLocalVideoDisabled);
  };

  return (
    <div className="video_button_container">
      <img
        src={isLocalVideoDisabled ? CameraButtonImgOff : CameraButtonImg}
        onClick={handleCameraButtonPressed}
        className="video_button_image"
      />
    </div>
  );
};

export default CameraButton;
