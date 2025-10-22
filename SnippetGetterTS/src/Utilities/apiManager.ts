export default function submitFeedback(incName: string, incEmail: string, incSubject: string, incBody: string) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const raw = JSON.stringify({
    "name": incName,
    "email": incEmail,
    "body": incBody,
    "subject": incSubject
  });
  
  const requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  async function getData() {
    const response = await fetch("https://feedbackapi-uvru.onrender.com", requestOptions)
    const data = await response.json();
    return data;
  }
  try {
  getData().then(data => window.location.pathname = data.url)
  } catch(e) {
    console.log(e)
  }

}


export function loadAPI() {

  const requestOptions: any = {
    method: "GET",
    redirect: "follow"
  };

  fetch("https://feedbackapi-uvru.onrender.com/api/feedback", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}