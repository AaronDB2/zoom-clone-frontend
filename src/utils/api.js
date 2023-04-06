import axios from "axios";

// Server address
const serverApi = "http://localhost:5002/api";

// Get room from server
export const getRoomExists = async (roomId) => {
  const response = await axios.get(`${serverApi}/room-exists/${roomId}`);
  return response.data;
};

// Get TURN server crendentials
export const getTURNCredentials = async () => {
  const response = await axios.get(`${serverApi}/get-turn-credentials`);
  return response.data;
};
