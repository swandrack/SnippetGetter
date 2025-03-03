import { WalkMeForm } from "./components/walkMeForm";
import { InternalPanel } from "./components/InternalPanel";
import { SnackbarProvider } from "notistack";
import { loadWalkMe } from "./utils/loadWalkme";
import { useState, useEffect } from "react"
import "./index.css";

async function statusReport() {
    if (window._walkmeInternals?.removeWalkMeReason) {
        alert(window._walkmeInternals.removeWalkMeReason);
    }
}

export default function App() {
    const guid = window.localStorage.getItem("guid");
    const env = window.localStorage.getItem("env");
    const [internals, setInternals] = useState({})

    useEffect(() => {
        setInternals(window._walkmeInternals)
    }, [guid])

    if (guid || env !== "") {
        loadWalkMe(guid, env, statusReport);
    }
    return (
        <SnackbarProvider>
            <div style={{ display: "flex", flexDirection: "row", gap: 4 }}>
                <WalkMeForm />
                {internals &&
                <InternalPanel />
                }
            </div>
        </SnackbarProvider>
    );
}
