import axios from "axios";

// Address of the server
const serverApi = "http://localhost:3001/api";

// Function for checking if room exists
export const getRoomExists = async (roomId) => {
  const response = await axios.get(`${serverApi}/room-exists/${roomId}`);
  return response.data;
};
