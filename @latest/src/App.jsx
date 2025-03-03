import { WalkMeForm } from "./components/WalkMeForm";
import { SnackbarProvider } from "notistack";

import "./index.css";

export default function App() {
    return (
        <SnackbarProvider>
            <WalkMeForm />
        </SnackbarProvider>
    );
}
