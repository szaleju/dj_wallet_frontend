import React, { useState, useEffect } from "react";
import { ListGroup, Row, Col } from "react-bootstrap";
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
      <Row className='my-3'>
        <h1>Gotówka: 1 000 000 $</h1>
      </Row>
      <Row>
        <Col>
          <h2> Jakiś wykres </h2>
        </Col>
        <Col>
          {success && (
            <ListGroup>
              {wallet.assets.map((asset, index) => (
                <ListGroup.Item key={index}>
                  {asset.ticker}, {asset.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>

      <Row></Row>
    </div>
  );
}

export default HomeScreen;
