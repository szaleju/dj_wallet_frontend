import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function Login() {
    const config = {
      headers: { "Content-type": "application/json" },
      username: username,
      password: password,
    };

    const { data } = await axios.post("/api/token/", config);

    localStorage.setItem("access", JSON.stringify(data["access"]));
  }

  const submitHandler = (e) => {
    e.preventDefault();
    Login();
    console.log("submit");
  };

  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='formBasicCheckbox'>
          <Form.Check type='checkbox' label='Check me out' />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default LoginScreen;
