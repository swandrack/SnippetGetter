import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import SnippetInfo from "./routes/snippetInfo";
import { TerminalController } from "./components/Terminal";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="snippet" element={<SnippetInfo />} />
            <Route path="/terminal" element={<TerminalController />} />
        </Routes>
    </BrowserRouter>
);
