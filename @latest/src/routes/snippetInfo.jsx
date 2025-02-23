import React from "react"

export default function SnippetInfo() {
  try {
  return(
    <>
    <h3>Snippet Log:</h3>
      {_walkmeInternals ? (
        <p>{_walkmeInternals.snippetLog}</p>
      ) : (
        <p>???</p>        
      )
    }
    </>
  )} catch(error) {
    console.log(error)
  }
   
}