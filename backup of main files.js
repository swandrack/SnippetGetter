// InternalsPanel.jsx

import { Typography, Box, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import ReactJson from "react-json-view";

export function InternalPanel() {
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
                        console.log(e)
                    } finally {
                        setWalkmeInternalsResult(_walkmeInternals)
                    }
                } else {
                    setTimeout(handleWalkMe(), 1500);
                }
            }, timeout)
        }
        handleWalkMe(1500);
    }, [])

    function removeBloat(myObj) {
        for (const key in myObj) {
            if (typeof myObj[key] == 'function') {
                delete myObj[key]
            }
        }
    }

    if(walkmeLoaded === false) {
        return(
                <Typography>
                    Loading...
                </Typography>
        )
    } else {
        removeBloat(walkmeInternalsResult)
        return(
            <Paper elevation={0} variant="outlined" style={{ height: "fit-content", backgroundColor: "#5b5b5b", border: "2px", borderColor: "#5b5b5b" }}>
                <ReactJson 
                src={walkmeInternalsResult} 
                enableClipboard="false" 
                groupArrayAfterLength="25" 
                theme="shapeshifter" 
                collapsed="1" 
                displayDataTypes="false" 
                displayArrayKey="false" 
                quotesOnKeys="false" 
                name="WalkMe Internals" 
                indentWidth={6} 
                sortKeys="true"
                />
            </Paper>
        )
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// App.jsx
import { WalkMeForm } from "./components/walkMeForm";
import { InternalPanel } from "./components/InternalPanel";
import { SnackbarProvider } from "notistack";
import { loadWalkMe } from "./utils/loadWalkme";
import { useState, useEffect } from "react"
import "./index.css";
import { Box } from "@mui/material";

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
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <SnackbarProvider>
            <div style={{ display: "flex", flexDirection: "row", gap: 4 }}>
                <WalkMeForm />
            </div>
            <Box sx={{ display: "flex", width: "400px" }}>
                <InternalPanel />
            </Box>
        </SnackbarProvider>
        </Box>
    );
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WalkMeForm.jsx
import { useState, useMemo, useEffect } from "react";
import { TextField, Button, Box, Typography, Container, InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { SettingsDisplay } from "./SettingsDisplay";
import { setWindowVariable } from "../utils/uuid";
import { Form, Link } from "react-router-dom";
import {
    getLocalStorageItem,
    setLocalStorageItem,
    removeLocalStorageItem,
} from "../utils/storage";
import { loadWalkMe } from "../utils/loadWalkme";
import { InternalPanel } from "./InternalPanel";

export function WalkMeForm() {
    const [guid, setGuid] = useState(getLocalStorageItem("guid"));
    const [env, setEnv] = useState(getLocalStorageItem("env"));
    const [uuid, setUuid] = useState(getLocalStorageItem("uuid"));
    const [chartValues, setChartValues] = useState([
        { name: "guid", value: getLocalStorageItem("guid") },
        { name: "uuid", value: getLocalStorageItem("uuid") },
        { name: "env", value: getLocalStorageItem("env") },
    ]);

    const removeWalkMe = (event) => {
        event.preventDefault();
        let variables = ["env", "guid", "uuid"];
        variables.forEach((localItem) => {
            removeLocalStorageItem(localItem);
        });
        setGuid("");
        setEnv("");
        setUuid("");
        try {
            window._walkMe.removeWalkMe();
            enqueueSnackbar({ message: "WalkMe Removed!", variant: "success" });
        } catch (error) {
            enqueueSnackbar({
                message: `Error removing WalkMe: ${error}`,
                variant: "warning",
            });
        }
    };

    function formatEnv(env) {
        if (env != "production") {
            const customEnv = `/${env}`
            return customEnv
        } else {
            const customEnv = ""
            return customEnv
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newEnv = formatEnv(env);
        createUuid(uuid);
        setLocalStorageItem("guid", guid);
        setLocalStorageItem("env", env);
        enqueueSnackbar({
            message: "WalkMe Settings Updated",
            variant: "success",
        });
        if (window._walkMe) {
            window._walkMe.removeWalkMe()
            setTimeout(loadWalkMe, 3000, guid, `/${env}`)
        } else {
        loadWalkMe(guid, newEnv)
        }
    };

    const handleChange = (event) => {
        setEnv(event.target.value)
    }

    function createUuid(uuid) {
        if (uuid) {
            setLocalStorageItem("uuid", uuid);
            const parts = uuid.split(".");

            if (parts.length === 0) {
                window.uuid = "Hello I got places to be";
            } else {
                setWindowVariable(uuid);
            }
        } else {
            setLocalStorageItem("uuid", "none");
        }
    }

    useMemo(() => {
        setChartValues([
            { name: "guid", value: guid },
            { name: "uuid", value: uuid },
            { name: "env", value: env },
        ]);
    }, [env, guid, uuid]);

    return (
        <Container maxWidth="sm">
            <Box component="form" sx={{ m: 1, minWidth: 120 }}>
                <Typography variant="h5" gutterBottom>
                    WalkMe Configuration
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Please add GUID here"
                    variant="outlined"
                    value={guid}
                    onChange={(e) => setGuid(e.target.value)}
                />
                <FormControl 
                    fullWidth
                    margin="normal"
                    variant="outlined"
                >
                <InputLabel 
                    id="demo-select-small-label"
                    label="Environment"
                >Please Enter Environment</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={env}
                    onChange={handleChange}
                    label="Please Enter Environment"
                >
                    <MenuItem value="production">Production</MenuItem>
                    <MenuItem value="test">Test</MenuItem>
                    <MenuItem value="success">Success</MenuItem>
                    <MenuItem value="custom">Custom Environment</MenuItem>
                </Select>
                </FormControl>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Please Enter UUID variable if necessary"
                    variant="outlined"
                    value={uuid}
                    onChange={(e) => setUuid(e.target.value)}
                />
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                    <Button
                        type="submit"
                        variant="outlined"
                        color="secondary"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                    <Button
                        variant="outlined"
                        color="warning"
                        onClick={removeWalkMe}
                    >
                        Remove WalkMe
                    </Button>
                </Box>
            </Box>
            {chartValues.filter((arrItem) => arrItem.value !== "").length >
                0 && (
                <Box sx={{ mt: 16 }}>
                    <SettingsDisplay values={chartValues} />
                </Box>
            )}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Link style={{color:"black"}} to="/terminal">Terminal</Link>
            </Box>
        </Container>
    );
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// loadWalkMe.js
export function loadWalkMe(guid, env) {    
    var walkme = document.createElement("script");
    walkme.type = "text/javascript";
    walkme.async = true;
    walkme.src = `https://cdn.walkme.com/users/${guid}${env}/walkme_${guid}_https.js`;
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(walkme, s);
    window._walkmeConfig = { smartLoad: true };
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// main.jsx
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
