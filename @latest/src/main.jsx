import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import SnippetInfo from "./routes/snippetInfo";
import { TerminalController } from "./components/Terminal";
import { InternalPanel } from "./components/InternalPanel";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="terminal" element={<TerminalController />} />
        </Routes>
    </BrowserRouter>
);
