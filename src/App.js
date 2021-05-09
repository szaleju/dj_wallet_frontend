import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <div className='App'>
        <main>main</main>
        <footer>footer</footer>
      </div>
    </Router>
  );
}

export default App;
