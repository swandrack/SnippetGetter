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
        const echoRegex = /echo.*/
        if (input.toLocaleLowerCase().trim() === "clear") {
                ld = []
        } else if (input.toLocaleLowerCase().trim() === "help") {
                const helpText = 'Available commands: \n- help \n- echo [text]\n- about';
                ld.push(helpText)
        } else if (input.toLocaleLowerCase().trim().match(echoRegex)) {
                const splitted = input.split(' ')
                splitted.shift()
                ld.push(splitted.join(" "))
        } else {
                ld.push("Unrecognized command, use 'help' to see a full list of commands")
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
