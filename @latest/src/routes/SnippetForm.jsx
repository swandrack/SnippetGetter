import { useState } from "react";

export default function SnippetForm() {
    const [guid, setGuid] = useState("");

    const handleSubmit = (e) => {
        e.preventDeafult();
        alert(`The Guid entered was: ${guid}`);
    };

    return (
        <form>
            <label>
                Please add GUID here:
                <input
                    type="text"
                    value={guid}
                    onChange={(e) => setGuid(e.target.value)}
                    onSubmit={handleSubmit}
                />
            </label>
        </form>
    );
}
