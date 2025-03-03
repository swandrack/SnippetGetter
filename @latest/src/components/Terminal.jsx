import { useState } from "react";
import Terminal, {
    TerminalOutput,
    TerminalInput,
} from "react-terminal-ui";

export function TerminalController() {
    const [terminalLineData, setTerminalLineData] = useState([
        <TerminalOutput key="welcome-message">
            Welcome to WalkMeCtl, begin with questions and expect results
        </TerminalOutput>,
    ]);

    function onInput(input) {
        let ld = [...terminalLineData];
        ld.push(<TerminalInput>{input}</TerminalInput>);
        if (input.toLocaleLowerCase().trim() === "clear") {
            ld = [];
        } else if (input) {
            ld.push(<TerminalOutput>Unrecognized command</TerminalOutput>);
        }
        setTerminalLineData(ld);
    }

    return (
        <div className="terminal-container">
            <Terminal
                name="WALKMECTL"
                colorMode="Dark"
                onInput={onInput}
            >
                {terminalLineData}
            </Terminal>
        </div>
    );
}
