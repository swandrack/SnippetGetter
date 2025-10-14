import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Container, InputLabel, MenuItem, Select, FormControl } from "@mui/material";
/* import { enqueueSnackbar, SnackbarProvider } from "notistack";*/
import { Link } from "react-router-dom";
import {
    getLocalStorageItem,
    setLocalStorageItem,
    removeLocalStorageItem,
} from "../utils/storage";
import { 
    loadWalkMe, 
    formatEnv, 
    setWindowVariable 
} from "../utils/loadWalkme";
import WalkMeTools from "./WalkMeTools";
import { loadAPI } from "../utils/apimanager";
import { combineEnvs } from "../utils/loadWalkme";

export function WalkMeForm() {
    const [guid, setGuid] = useState(getLocalStorageItem("guid"));
    const [env, setEnv] = useState(getLocalStorageItem("env"));
    const [uuid, setUuid] = useState(getLocalStorageItem("uuid"));
    const [customEnv, setCustomEnv] = useState()
    const [walkmeLoaded, setWalkmeLoaded] = useState(false);

    useEffect(() => {
        try {
            loadAPI();
        } catch(e) {
            console.log(e)
        }
    }, [])

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
                if (env != "production" && env != null && env != "null" && env != "") {
                    loadWalkMe(guid, `/${env}`)
                } else {
                    loadWalkMe(guid, "")
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
            /*enqueueSnackbar({ message: "WalkMe Removed!", variant: "success" });*/
        } catch (error) {
            /*enqueueSnackbar({
                message: `Error removing WalkMe: ${error}`,
                variant: "warning",
            });*/
            console.log(error)
        }
        window.location.reload()
    };

    const handleSubmit = () => {
        const newEnv = combineEnvs(formatEnv(env));
        createUuid(uuid);
        setLocalStorageItem("guid", guid);
        setLocalStorageItem("env", customEnv ? customEnv : env)
        /*enqueueSnackbar({
            message: "WalkMe Settings Updated",
            variant: "success",
        });*/
        if (window._walkMe) {
            window._walkMe.removeWalkMe()
            setTimeout(loadWalkMe, 3000, guid, newEnv)
        } else {
        loadWalkMe(guid, newEnv)
        }
        window.location.reload()
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
                {env == 'custom' &&
                    <TextField
                    fullWidth
                    margin="normal"
                    label="Please add custom env name here"
                    variant="outlined"
                    value={customEnv}
                    onChange={(e) => setCustomEnv(e.target.value)}
                />
                }
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
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Link style={{color:"black"}} to="/terminal">Terminal</Link>
            </Box>
        </Container>
    );
}