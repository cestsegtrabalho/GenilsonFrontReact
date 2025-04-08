// useAuth.js
import { jwtDecode } from "jwt-decode";

function isTokenValid() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp && decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
}

export default isTokenValid;
