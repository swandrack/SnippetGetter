export function handleWalkMe(timeout) {
      const [walkmeLoaded, setWalkmeLoaded] = useState(false);
      const [walkmeInternalsResult, setWalkmeInternalsResult] = useState(null);
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