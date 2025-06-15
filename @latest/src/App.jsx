import { WalkMeForm } from "./components/walkMeForm";
import { Routes, Route } from "react-router";
import { TerminalController } from "./components/Terminal";
import FeedbackForm from "./routes/FeedbackForm"

export default function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/*" element={<WalkMeForm />} />
                <Route path="terminal" element={<TerminalController />} />
                <Route path="/feedback" element={<FeedbackForm />} />
            </Routes>
        </div>
    );
}
