import React, { useState, useEffect } from "react";
import Message from "../components/Message";
import {
  ListGroup,
  Row,
  Col,
  Form,
  Button,
  Table,
  Tabs,
  Tab,
  ButtonGroup,
} from "react-bootstrap";
import axios from "axios";
import { getData, getTransactions, config } from "../api/HomeScreenApi";

function HomeScreen() {
  const [wallet, setWallet] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [asset, setAsset] = useState("");
  const [quantity, setQuantity] = useState("");

  const tradeAsset = async () => {
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
      console.log("LIPTON", err);
      setError(true);
    }
  };

  const addAsset = async () => {
    try {
      await axios.post("api/transaction/", {}, config);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!success) {
      getData().then((data) => {
        setWallet(data.assets);
      });
      getTransactions().then((data) => {
        console.log("DATA", data);
        setTransactions(data);
        setSuccess(true);
      });
    }
  }, [success]);

  const handleTrade = (e) => {
    e.preventDefault();
    tradeAsset().then(() => {
      setSuccess(false);
    });
    console.log("poszlo!");
  };

  const handleAdd = () => {
    console.log("added!");
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
          <Row>
            <Tabs defaultActiveKey='1' transition={false} id='noanim-tab'>
              <Tab eventKey='1' title='Posiadane'>
                <Form onSubmit={handleTrade} className='my-3'>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Control
                          as='select'
                          size='sm'
                          value={asset}
                          onChange={(e) => setAsset(e.target.value)}
                        >
                          {console.log(asset)}
                          <option>Wybierz...</option>
                          {success &&
                            wallet.map((asset, index) => (
                              <option key={index} value={asset.id}>
                                {asset.ticker}, {asset.name}
                              </option>
                            ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Control
                        size='sm'
                        placeholder='Ilość...'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <ButtonGroup className='d-flex'>
                        <Button type='submit' className='m-3' size='sm' block>
                          Kup
                        </Button>
                      </ButtonGroup>
                    </Col>
                    <Col>
                      <ButtonGroup className='d-flex'>
                        <Button type='submit' className='m-3' size='sm' block>
                          Sprzedaj
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </Form>
              </Tab>
              <Tab eventKey='2' title='Nowy'>
                <Form onSubmit={handleTrade} className='my-3'>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Control
                          size='sm'
                          placeholder='Asset'
                          value={asset}
                          onChange={(e) => setAsset(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Control
                        size='sm'
                        placeholder='Ilość...'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <ButtonGroup className='d-flex'>
                        <Button type='submit' className='m-3' size='sm' block>
                          Dodaj
                        </Button>
                      </ButtonGroup>
                    </Col>
                    <Col></Col>
                  </Row>
                </Form>
              </Tab>
            </Tabs>
          </Row>
          {error ? <Message variant='danger'>Źle baranie!</Message> : ""}
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
                  <td>{transaction.date.substring(0, 10)}</td>
                  <td>{transaction.asset_name}</td>
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
