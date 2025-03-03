import { useState, useMemo } from "react";
import { loadWalkMe } from "../routes/loadWalkme";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { SettingsDisplay } from "./SettingsDisplay";

const getLocalStorageItem = (key, defaultValue = "") => {
    return localStorage.getItem(key) || defaultValue;
};

const setLocalStorageItem = (key, value) => {
    localStorage.setItem(key, value);
};

const removeLocalStorageItem = (key) => {
    localStorage.removeItem(key);
}

export function WalkMeForm() {
    const [guid, setGuid] = useState(getLocalStorageItem("guid"));
    const [env, setEnv] = useState(getLocalStorageItem("env"));
    const [uuid, setUuid] = useState(getLocalStorageItem("uuid"));
    const [chartValues, setChartValues] = useState([
        { name: "guid", value: getLocalStorageItem("guid") },
        { name: "uuid", value: getLocalStorageItem("uuid") },
        { name: "env", value: getLocalStorageItem("env") },
    ]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const environment = formatEnv(env);
        createUuid(uuid);
        loadWalkMe(guid, environment, statusReport);
        enqueueSnackbar({
            message: "WalkMe Settings Updated",
            variant: "success",
        });
    };

    const removeWalkMe = (event) => {
        event.preventDefault();
        let variables = ["env", "guid", "uuid"]
        variables.forEach((varr) => {
            removeLocalStorageItem(varr)
        })
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

    async function statusReport() {
        if (window._walkmeInternals?.removeWalkMeReason) {
            alert(window._walkmeInternals.removeWalkMeReason);
        }
    }

    function formatEnv(env) {
        setLocalStorageItem("env", env);
        return env ? `/${env}` : "";
    }

    function createUuid(uuid) {
        if (uuid) {
            setLocalStorageItem("uuid", uuid);
            window[uuid] = "Hello I got places to be";
        }
    }

    useMemo(() => {
        setChartValues([
            { name: "guid", value: guid },
            { name: "uuid", value: uuid },
            { name: "env", value: env },
        ]);
    }, [env, guid, uuid])

    return (
        <Container maxWidth="sm">
            <Box component="form" sx={{ mt: 4 }}>
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
                <TextField
                    fullWidth
                    margin="normal"
                    label="Please enter Env here"
                    variant="outlined"
                    value={env}
                    onChange={(e) => setEnv(e.target.value)}
                />
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
            {chartValues.filter((arrItem) => arrItem.value !== "").length > 0 && (
                <Box sx={{ mt: 16 }}>
                    <SettingsDisplay values={chartValues} />
                </Box>
            )}
        </Container>
    );
}
