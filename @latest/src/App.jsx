import { WalkMeForm } from "./components/walkMeForm";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { TerminalController } from "./components/Terminal";
import FeedbackSubmitted from "./routes/FeedbackSubmitted";
import FeedbackForm from "./routes/FeedbackForm"
import Header from "./components/Header";
import Modal from "./components/Modal";
import { SnackbarProvider } from "notistack";
import { useState } from "react";

export default function App() {
    const [isModalOpen, setIsModalOpen] = useState()
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<WalkMeForm />} />
                <Route path="/terminal" element={<TerminalController isOpen={isModalOpen} onClose={closeModal} />} />
                <Route path="/feedback" element={<FeedbackForm />} />
                <Route path="/submitted" element={<FeedbackSubmitted />} />
            </Routes>
        </div>
    );
}
