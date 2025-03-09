export function loadWalkMe(guid, env) {    
    var walkme = document.createElement("script");
    walkme.type = "text/javascript";
    walkme.async = true;
    walkme.src = `https://cdn.walkme.com/users/${guid}${env}/walkme_${guid}_https.js`;
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(walkme, s);
    window._walkmeConfig = { smartLoad: true };
}
