import React, { useState, useEffect } from "react";
import axios from "axios";

function HomeScreen() {
  const [wallet, setWallet] = useState([]);
  const [success, setSuccess] = useState(false);
  const accessToken = JSON.parse(localStorage.getItem("access"));

  useEffect(() => {
    if (!success) {
      async function getWallet() {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const { data } = await axios.get("/api/wallet/", config);
        setWallet(data);
        setSuccess(true);
        console.log(data);
      }
      getWallet();
    } else {
      console.log("loading");
    }
  }, [success, accessToken]);

  return (
    <div>
      <h1>Home Screen</h1>
      {success && wallet.id}
    </div>
  );
}

export default HomeScreen;
