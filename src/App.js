import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={LoginScreen} exact />
          <Route path='/home' component={HomeScreen} />
        </Container>
      </main>
      <footer>footer</footer>
    </Router>
  );
}

export default App;
