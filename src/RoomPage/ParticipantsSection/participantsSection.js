import React from "react";
import ParticipantsLabel from "./participantsLabel";
import Participants from "./participants";

const ParticipantsSection = () => {
  return (
    <div className="participants_section_container">
      <ParticipantsLabel />
      <Participants />
    </div>
  );
};

export default ParticipantsSection;
