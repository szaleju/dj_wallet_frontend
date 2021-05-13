import axios from "axios";

const accessToken = JSON.parse(localStorage.getItem("access"));

export const config = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
};

export const getData = async () => {
  try {
    const { data } = await axios.get("/api/wallet/", config);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getTransactions = async () => {
  try {
    const { data } = await axios.get("/api/transactions/", config);
    console.log("TRANSACTIONS", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
