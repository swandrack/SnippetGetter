import { WalkMeForm } from "./components/walkMeForm";
import InternalPanel from "./components/InternalPanel";
import { SnackbarProvider } from "notistack";
import { loadWalkMe } from "./utils/loadWalkme";
import { useState, useEffect } from "react"
import "./index.css";
import { Box } from "@mui/material";

export default function App() {
    const guid = window.localStorage.getItem("guid");
    const env = window.localStorage.getItem("env");
    const [walkmeLoaded, setWalkmeLoaded] = useState(false);
    const [walkmeInternalsResult, setWalkmeInternalsResult] = useState(null);

    useEffect(() => {
        const handleWalkMe = (timeout) => {
            setTimeout(() => {
                if(walkmeLoaded == false) {
                    try {
                        if(_walkmeInternals) {
                            setWalkmeLoaded(true)
                        }
                    } catch(e) {
                        setTimeout(handleWalkMe(), 1500);
                    } finally {
                        setWalkmeInternalsResult(_walkmeInternals)
                    }
                }
            }, timeout)
        }
        handleWalkMe(1500);
    }, [])

    useEffect(() => {
    if (guid != "null") {
        if (guid != null){
            if (env == "production" || env == null || env == "null") {
                loadWalkMe(guid, "")
            } else {
                loadWalkMe(guid, `/${env}`)
            }
        }
    }
}, []);
    return (
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <SnackbarProvider>
            <div style={{ display: "flex", flexDirection: "row", gap: 4 }}>
                <WalkMeForm walkmeLoaded={walkmeLoaded} walkmeInternalsResult={walkmeInternalsResult} />
            </div>
            <Box sx={{ display: "flex", width: "400px" }}>
                <InternalPanel walkmeLoaded={walkmeLoaded} walkmeInternalsResult={walkmeInternalsResult} />
            </Box>
        </SnackbarProvider>
        </Box>
    );
}
