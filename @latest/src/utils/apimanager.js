export default function submitFeedback(incName, incEmail, incBody, incSubject) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const raw = JSON.stringify({
    "name": incName,
    "email": incEmail,
    "body": incBody,
    "subject": incSubject
  });
  
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  fetch("https://api.render.com/deploy/srv-d182klidbo4c73d7ipug?key=OiH8Hx_U714", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error))
}