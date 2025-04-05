import { Typography, Box, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import ReactJson from "react-json-view";

export default function InternalPanel() {
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

    function removeBloat(myObj) {
        for (const key in myObj) {
            if (typeof myObj[key] == 'function') {
                delete myObj[key]
            } else if (typeof myObj[key] == "undefined") {
                delete myObj[key]
            }
        }
    }

    if(walkmeLoaded === false) {
        return(
                <Typography>
                    Loading WalkMe Internals...
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

