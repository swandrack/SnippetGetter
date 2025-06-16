import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <Router>
        <App /> 
    </Router>
);