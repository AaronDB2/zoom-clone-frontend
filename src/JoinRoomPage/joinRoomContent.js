import React, { useState } from "react";
import JoinRoomInputs from "./joinRoomInputs";
import { connect } from "react-redux";
import OnlyWidthAudioCheckbox from "./onlyWithAudioCheckbox";
import {
  setConnectOnlyWithAudio,
  setIdentity,
  setRoomId,
} from "../store/actions";
import ErrorMessage from "./errorMessage";
import JoinRoomButtons from "./joinRoomButtons";
import { useHistory } from "react-router-dom";
import { getRoomExists } from "../utils/api";

// Component for join room content
const JoinRoomContent = (props) => {
  const {
    isRoomHost,
    setConnectOnlyWithAudio,
    connectOnlyWithAudio,
    setIdentityAction,
    setRoomIdAction,
  } = props;

  const [roomIdValue, setRoomIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const history = useHistory();

  const handleJoinRoom = async () => {
    setIdentityAction(nameValue);
    if (isRoomHost) {
      createRoom();
    } else {
      await joinRoom();
    }
  };

  // Function for joining a room
  const joinRoom = async () => {
    // Check if room exists with given room ID
    const responseMessage = await getRoomExists(roomIdValue);

    const { roomExists, full } = responseMessage;
    // Check if room exists
    if (roomExists) {
      // Check if room is full
      if (full) {
        setErrorMessage("Meeting is full. Please try again later");
      } else {
        // Save in redux store meeting id
        setRoomIdAction(roomIdValue);
        history.push("/room");
      }
    } else {
      setErrorMessage("Room not found. Check your meeting id");
    }
  };

  // Function for creating a room
  const createRoom = () => {
    history.push("/room");
  };

  return (
    <>
      <JoinRoomInputs
        roomIdValue={roomIdValue}
        setRoomIdValue={setRoomIdValue}
        nameValue={nameValue}
        setNameValue={setNameValue}
        isRoomHost={isRoomHost}
      />
      <OnlyWidthAudioCheckbox
        setConnectOnlyWithAudio={setConnectOnlyWithAudio}
        connectOnlyWithAudio={connectOnlyWithAudio}
      />
      <ErrorMessage errorMessage={errorMessage} />
      <JoinRoomButtons
        handleJoinRoom={handleJoinRoom}
        isRoomHost={isRoomHost}
      />
    </>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    setConnectOnlyWithAudio: (onlyWithAudio) =>
      dispatch(setConnectOnlyWithAudio(onlyWithAudio)),
    setIdentityAction: (identity) => dispatch(setIdentity(identity)),
    setRoomIdAction: (roomId) => dispatch(setRoomId(roomId)),
  };
};

export default connect(
  mapStoreStateToProps,
  mapActionsToProps
)(JoinRoomContent);
