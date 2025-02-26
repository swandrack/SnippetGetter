import { useState } from "react";

export default function SnippetForm() {
  const [guid, setGuid] = useState("");

  const handleSubmit = (event) => {
    event.preventDeafult();
    alert(`The Guid entered was: ${guid}`)
  }
  <form>
    <label>Please add GUID here:
      <input 
      type="text" 
      value={guid}
      onChange={(e) => setGuid(e.target.value)}
      />
    </label>
  </form>
}