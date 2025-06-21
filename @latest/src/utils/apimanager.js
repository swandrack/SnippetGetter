export default function submitFeedback(incName, incEmail, incSubject, incBody) {
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
  
  fetch("https://feedbackapi-uvru.onrender.com", requestOptions)
    .then((response) => response.text())
    .then(response => {
      window.location.href = response.url
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error))
}

export function loadAPI() {

  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("https://feedbackapi-uvru.onrender.com/api/feedback", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}