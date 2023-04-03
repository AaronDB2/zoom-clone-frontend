import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setIsRoomHost } from "../store/actions";
import JoinRoomTitle from "./joinRoomTitle";
import JoinRoomContent from "./joinRoomContent";
import "./joinRoomPage.css";

const JoinRoomPage = (props) => {
  const { setIsRoomHostAction, isRoomHost } = props;
  // Get URL params
  const search = useLocation().search;

  useEffect(() => {
    // Check URL params for host value
    const isRoomHost = new URLSearchParams(search).get("host");
    if (isRoomHost) {
      // Set State
      setIsRoomHostAction(true);
    }
  }, []);
  return (
    <div className="join_room_page_container">
      <div className="join_room_page_panel">
        <JoinRoomTitle isRoomHost={isRoomHost} />
        <JoinRoomContent />
      </div>
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(JoinRoomPage);
