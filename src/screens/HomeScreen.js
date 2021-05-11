import React, { useState, useEffect } from "react";
import { ListGroup, Row, Col, Form, Button, ButtonGroup } from "react-bootstrap";
import axios from "axios";

function HomeScreen() {
  const [wallet, setWallet] = useState([]);
  const [success, setSuccess] = useState(false);
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("poszlo!");
    console.log(ticker);
    console.log(quantity);
  };

  return (
    <div>
      <Row className='my-3'>
        <Col>
          <h3>Łączna wartość:</h3>
          <p>10 000 000 $</p>
        </Col>
        <Col>
          <h3>Wolna gotówka:</h3>
          <p> 1 000 000 $</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2> Jakiś wykres </h2>
        </Col>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Control
                  placeholder='Ticker'
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder='Ilość'
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Col>
            </Row>
            <Button type='submit'>Dodaj</Button>
          </Form>
          <Row>
            {success && (
              <ListGroup className='my-3'>
                {wallet.assets.map((asset, index) => (
                  <ListGroup.Item key={index}>
                    {asset.ticker}, {asset.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Row>
        </Col>
      </Row>

      <Row></Row>
    </div>
  );
}

export default HomeScreen;
