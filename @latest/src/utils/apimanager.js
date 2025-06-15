export default function submitFeedback() {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("https://feedback-api-psi.vercel.app/", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}