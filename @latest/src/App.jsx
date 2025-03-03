import { WalkMeForm } from "./components/walkMeForm";
import { SnackbarProvider } from "notistack";
import { loadWalkMe } from "./routes/loadWalkme"
import "./index.css";

async function statusReport() {
    if (window._walkmeInternals?.removeWalkMeReason) {
        alert(window._walkmeInternals.removeWalkMeReason);
    }
}

export default function App() {
    const guid = window.localStorage.getItem("guid");
    const env = window.localStorage.getItem("env");


    if (guid || env !== "") {
        loadWalkMe(guid, env, statusReport);
    }
    return (
        <SnackbarProvider>
            <WalkMeForm />
        </SnackbarProvider>
    );
}
