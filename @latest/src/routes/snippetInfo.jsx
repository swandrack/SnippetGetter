export default function SnippetInfo() {
  try {
  return(
    <>
    <h3>Snippet Log:</h3>
      {window._walkmeInternals ? (
        <p>{window._walkmeInternals.snippetLog}</p>
      ) : (
        <p>???</p>        
      )
    }
    </>
  )} catch(error) {
    console.log(error)
  }
   
}