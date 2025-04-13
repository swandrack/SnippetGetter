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
        const newObj = Object.assign({}, myObj)
        for (const key in newObj) {
            if (typeof newObj[key] == 'function') {
                delete newObj[key]
            } else if (typeof newObj[key] == "undefined") {
                delete newObj[key]
            }
        }
        return newObj
    }
    
    if(walkmeLoaded === false) {
        return(
                <Typography>
                    Loading WalkMe Internals...
                </Typography>
        )
    } else {
        return(
            <Paper elevation={0} variant="outlined" style={{ height: "fit-content", backgroundColor: "#5b5b5b", border: "2px", borderColor: "#5b5b5b" }}>
                <ReactJson 
                src={removeBloat(walkmeInternalsResult)} 
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