import React from "react";
import CheckImg from "../resources/images/check.png";

// Component for only with audio checkbox
const OnlyWidthAudioCheckbox = ({
  connectOnlyWithAudio,
  setConnectOnlyWithAudio,
}) => {
  // Handler for changing info in store about connection type
  const handleConnectionTypeChange = () => {
    setConnectOnlyWithAudio(!connectOnlyWithAudio);
  };
  return (
    <div className="checkbox_container">
      <div className="checkbox_connection" onClick={handleConnectionTypeChange}>
        {connectOnlyWithAudio && (
          <img className="checkbox_image" src={CheckImg}></img>
        )}
      </div>
      <p className="checkbox_container_paragraph">Only Audio</p>
    </div>
  );
};

export default OnlyWidthAudioCheckbox;
