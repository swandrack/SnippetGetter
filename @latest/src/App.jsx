import { WalkMeForm } from "./components/walkMeForm";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { TerminalController } from "./components/Terminal";
import FeedbackSubmitted from "./routes/FeedbackSubmitted";
import FeedbackForm from "./routes/FeedbackForm"
import Header from "./components/Header";
import Modal from "./components/Modal";

export default function App() {
    return (
        <div className="App">
            <Header />
                <Routes>
                    <Route path="/" element={<WalkMeForm />} />
                    <Route path="terminal" element={<TerminalController />} />
                    <Route path="/feedback" element={<FeedbackForm />} />
                    <Route path="/submitted" element={<FeedbackSubmitted />} />
                </Routes>
        </div>
    );
}
