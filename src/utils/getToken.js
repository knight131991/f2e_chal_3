import axios from "axios";

export default function getToken() {
  return axios
    .post(
      "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: "knight131991-5becc4b4-fa67-413b",
        client_secret: "4ac39376-038d-4fd6-97b5-2e0b273214c8",
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    )
    .then((resp) => {
      const token = resp?.data?.["access_token"];
      axios.defaults.headers.authorization = `Bearer ${token}`;
      return token;
    });
}
