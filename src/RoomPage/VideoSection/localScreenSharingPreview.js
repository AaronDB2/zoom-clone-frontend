import React, { useRef, useEffect } from "react";

// Component for displaying screen share preview
const LocalScreenSharingPreview = ({ stream }) => {
  const localPreviewRef = useRef();

  useEffect(() => {
    const video = localPreviewRef.current;

    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();
    };
  }, [stream]);

  return (
    <div className="local_screen_share_preview">
      <video muted autoPlay ref={localPreviewRef}></video>
    </div>
  );
};

export default LocalScreenSharingPreview;
