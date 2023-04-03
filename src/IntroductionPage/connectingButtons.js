import React from "react";
import ConnectingButton from "./connectingButton";
import { useHistory } from "react-router-dom";

// Component for button container
const ConnectingButtons = () => {
  var history = useHistory();

  // Handler for joining a room
  const pushToJoinRoomPage = () => {
    history.push("/join-room");
  };

  // Handler for joining a room as host
  const pushToJoinRoomPageAsHost = () => {
    history.push("/join-room?host=true");
  };

  return (
    <div className="connecting_buttons_container">
      <ConnectingButton
        buttonText="Join a meeting"
        onClickHandler={pushToJoinRoomPage}
      />
      <ConnectingButton
        createRoomButton={true}
        buttonText="Host a meeting"
        onClickHandler={pushToJoinRoomPageAsHost}
      />
    </div>
  );
};

export default ConnectingButtons;
