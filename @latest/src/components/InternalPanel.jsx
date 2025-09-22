/*** REMOVE THIS FILE ***/
/*
import { Typography, Box, Paper, Button } from "@mui/material";
import { useState, useEffect } from "react";
import ReactJson from "react-json-view";

export default function InternalPanel(props) {

    function removeBloat(myObj) {
        const newObj = Object.assign({}, myObj)
        for (const key in newObj) {
            if (typeof newObj[key] == 'function') {
                delete newObj[key]
            } else if (typeof newObj[key] == "undefined") {
                delete newObj[key]
            }
        }
        try {
            newObj['Last Publish'] = new Date(wmSnippet.getSettingsFile().PublishDate)
        } catch(e) {
            setTimeout(() => {
                newObj['Last Publish'] = new Date(wmSnippet.getSettingsFile().PublishDate)
            }, 1000);
        }
        return newObj
    }
    
    if(props.walkmeLoaded === false) {
        return(
                <Typography>
                    Loading WalkMe Internals...
                </Typography>
        )
    } else {
        return(
            <Paper elevation={0} variant="outlined" style={{ height: "fit-content", backgroundColor: "#5b5b5b", border: "2px", borderColor: "#5b5b5b" }}>
                <ReactJson 
                src={removeBloat(props.walkmeInternalsResult)} 
                enableClipboard={false}
                groupArrayAfterLength="25" 
                theme={{
                    base00: "#242424",
                    base01: "#fff",
                    base02: "#242424",
                    base03: "#ddd",
                    base04: "purple",
                    base05: "#fff",
                    base06: "#fff",
                    base07: "#fff",
                    base08: "#444",
                    base09: "rgba(70, 70, 230, 1)",
                    base0A: "rgba(70, 70, 230, 1)",
                    base0B: "rgba(70, 70, 230, 1)",
                    base0C: "rgba(70, 70, 230, 1)",
                    base0D: "rgba(70, 70, 230, 1)",
                    base0E: "rgba(70, 70, 230, 1)",
                    base0F: "rgba(70, 70, 230, 1)"
                }}
                collapsed="1" 
                displayDataTypes={false} 
                displayArrayKey={false} 
                quotesOnKeys={false}
                name="WalkMe Internals" 
                indentWidth={6} 
                sortKeys="true"
                />
            </Paper>
        )
    }
}
    */