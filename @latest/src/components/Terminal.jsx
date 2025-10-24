import { useState } from "react";
import Terminal, {
    TerminalOutput,
    TerminalInput,
} from "react-terminal-ui";
import CreateModal from "./CreateModal"

export function TerminalController({ isOpen, onClose }) {
    const [terminalLineData, setTerminalLineData] = useState([
        <TerminalOutput key="welcome-message">
            Welcome to WalkMeCtl
        </TerminalOutput>,
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => setIsModalOpen(false);
    var splitted = []

    function onInput(input) {
        let ld = [...terminalLineData];
        ld.push(<TerminalInput>{input}</TerminalInput>);
        const echoRegex = /echo.*/
        const createRegex = /create.*/
        if (input.toLocaleLowerCase().trim() === "clear") {
                ld = []
        } else if (input.toLocaleLowerCase().trim() === "help") {
                const helpText = 'Available commands: \n- help \n- echo [text]\n- about';
                ld.push(helpText)
        } else if (input.toLocaleLowerCase().trim().match(echoRegex)) {
                splitted = input.split(' ')
                splitted.shift()
                ld.push(splitted.join(" "))
        } else if (input.toLocaleLowerCase().trim() === "about") {
                ld.push("I'm not sure what to put here, so enjoy reading this sentence :)")
        } else if (input.toLocaleLowerCase().trim().match(createRegex)) {
            if (input === "create") {
                ld.push("Acceptable Args: Textbox, button, input")
            } else {
                setIsModalOpen(true)
                splitInput(input)
            } 
        } else {
                ld.push("Unrecognized command, use 'help' to see a full list of commands")
        }
        setTerminalLineData(ld);
    }

    function splitInput(input) {
        const splitted = input.split();
        splitted.shift();
        return splitted;
    }

    return (
        <div className="terminal-container">
            <CreateModal elements={splitted} isOpen={isModalOpen} onClose={closeModal} />
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
