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
        const magic8 = /magic8.*/
        if (input.toLocaleLowerCase().trim() === "clear") {
                ld = []
        } else if (input.toLocaleLowerCase().trim() === "help") {
                const helpText = 'Available commands: \n- help \n- echo [text] \n- magic8 [question]';
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
        } else if (input.toLocaleLowerCase().trim().match(magic8)) {
            const num = (max) => Math.floor(Math.random() * max)
            switch (num(20)) {
                case 1:
                    ld.push("It is certain");
                    break;
                case 2:
                    ld.push("It is decidedly so");
                    break;
                case 3:
                    ld.push("Without a doubt");
                    break;
                case 4:
                    ld.push("Yes, definitely");
                    break;
                case 5:
                    ld.push("You may rely on it");
                    break;
                case 6:
                    ld.push("As I see it, yes");
                    break;
                case 7:
                    ld.push("Most likely");
                    break;
                case 8:
                    ld.push("Outlook good");
                    break;
                case 9:
                    ld.push("Yes");
                    break;
                case 10:
                    ld.push("Signs point to yes");
                    break;
                case 11:
                    ld.push("Don't count on it")
                    break;
                case 12:
                    ld.push("Very doubtful");
                    break;
                case 13:
                    ld.push("Outlook not so good");
                    break;
                case 14: 
                    ld.push("My sources say no");
                    break;
                case 15:
                    ld.push("My reply is no");
                    break;
                case 16:
                    ld.push("Reply hazy, try again");
                    break;
                case 17:
                    ld.push("Ask again later");
                    break;
                case 18:
                    ld.push("Better not tell you now");
                    break;
                case 19:
                    ld.push("Cannot predict now");
                    break;
                case 20:
                    ld.push("Concentrate and ask again")
                    break;
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
