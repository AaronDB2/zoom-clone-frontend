import React from "react";

// Component for create and join room button
const ConnectingButton = ({
  createRoomButton = false,
  buttonText,
  onClickHandler,
}) => {
  const buttonClass = createRoomButton
    ? "create_room_button"
    : "join_room_button";
  return (
    <button className={buttonClass} onClick={onClickHandler}>
      {buttonText}
    </button>
  );
};

export default ConnectingButton;
