import React from "react";

// Component for displaying error messages
const ErrorMessage = ({ errorMessage }) => {
  return (
    <div className="error_message_container">
      {errorMessage && (
        <p className="error_message_paragraph">{errorMessage}</p>
      )}
    </div>
  );
};

export default ErrorMessage;
