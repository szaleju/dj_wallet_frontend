import React, { useState, useEffect } from "react";
import { ListGroup, Row, Col, Form, Button, Table } from "react-bootstrap";
import axios from "axios";
import { getData, getTransactions, config } from "../api/HomeScreenApi";

function HomeScreen() {
  const [wallet, setWallet] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [success, setSuccess] = useState(false);
  const [asset, setAsset] = useState("");
  const [quantity, setQuantity] = useState("");

  const addAsset = async () => {
    try {
      await axios.post(
        "api/transaction/",
        {
          asset: asset,
          quantity: quantity,
        },
        config
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!success) {
      getData().then((data) => {
        setWallet(data.assets);
        setSuccess(true);
      });
      getTransactions().then((data) => {
        console.log("DATA", data);
        setTransactions(data);
      });
    }
  }, [success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addAsset();
    console.log("poszlo!");
    console.log(asset);
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
                  placeholder='Asset'
                  value={asset}
                  onChange={(e) => setAsset(e.target.value)}
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
                {wallet.map((asset, index) => (
                  <ListGroup.Item key={index}>
                    {asset.ticker}, {asset.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Row>
        </Col>
      </Row>

      <Row>
        {success && (
          <Table striped bordered hover size='sm'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Data</th>
                <th>Aktywo</th>
                <th>Ilość</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.id}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.asset}</td>
                  <td>{transaction.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Row>
      <p>{JSON.stringify(transactions)}</p>
      <p>{JSON.stringify(wallet)}</p>
    </div>
  );
}

export default HomeScreen;
