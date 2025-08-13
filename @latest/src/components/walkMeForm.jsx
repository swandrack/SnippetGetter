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
import WalkMeTools from "./WalkMeTools";
import { loadAPI } from "../utils/apimanager";

export function WalkMeForm(props) {
    const [guid, setGuid] = useState(getLocalStorageItem("guid"));
    const [env, setEnv] = useState(getLocalStorageItem("env"));
    const [uuid, setUuid] = useState(getLocalStorageItem("uuid"));
    const [chartValues, setChartValues] = useState([
        { name: "guid", value: getLocalStorageItem("guid") },
        { name: "uuid", value: getLocalStorageItem("uuid") },
        { name: "env", value: getLocalStorageItem("env") },
    ]);
    const [walkmeLoaded, setWalkmeLoaded] = useState(false);

    useEffect(() => {
        try {
            loadAPI();
        } catch(e) {
            console.log(e)
        }
    })

    useEffect(() => {
        const handleWalkMe = () => {
            setTimeout(() => {
                if(walkmeLoaded == false) {
                    try {
                        if(_walkmeInternals) {
                            setWalkmeLoaded(true)
                            setWalkmeInternalsResult(_walkmeInternals)
                        }
                    } catch(e) {
                        setTimeout(handleWalkMe(), 250);
                    }
                }
            }, 1500)
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

    const removeWalkMe = () => {
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
        window.location.reload()
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

    const handleSubmit = () => {
        const newEnv = formatEnv(env);
        createUuid(uuid);
        setLocalStorageItem("guid", guid);
        if (env === "custom") {setLocalStorageItem("env", customEnv);
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
        window.location.reload()
    };
}

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
            { name: "env", value: env },
            { name: "uuid", value: uuid },
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
                    <WalkMeTools walkmeLoaded={walkmeLoaded} />
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