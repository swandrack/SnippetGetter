import { WalkMeForm } from "./components/walkMeForm";
import { InternalPanel } from "./components/InternalPanel";
import { SnackbarProvider } from "notistack";
import { loadWalkMe } from "./utils/loadWalkme";
import { useState, useEffect } from "react"
import "./index.css";

export default function App() {
    const guid = window.localStorage.getItem("guid");
    const env = window.localStorage.getItem("env");

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
        <SnackbarProvider>
            <div style={{ display: "flex", flexDirection: "row", gap: 4 }}>
                <WalkMeForm />
            </div>
        </SnackbarProvider>
    );
}
