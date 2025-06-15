import { WalkMeForm } from "./components/walkMeForm";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { TerminalController } from "./components/Terminal";
import FeedbackForm from "./routes/FeedbackForm"

export default function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<WalkMeForm />} />
                    <Route path="terminal" element={<TerminalController />} />
                    <Route path="/feedback" element={<FeedbackForm />} />
                </Routes>
            </Router>
        </div>
    );
}
