export function loadWalkMe(guid, env) {    
    var walkme = document.createElement("script");
    walkme.type = "text/javascript";
    walkme.async = true;
    walkme.src = `https://cdn.walkme.com/users/${guid}${env}/walkme_${guid}_https.js`;
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(walkme, s);
    window._walkmeConfig = { smartLoad: true };
}

export function formatEnv(env, customEnv) {
  if (env != "production" && env != "" && env != null && env != "null" && env != 'custom') {
    return `/${env}`
  } else if (env == 'custom') {
    return `/${customEnv}`
  } else {
    return ""
  }
}

export function setWindowVariable(path) {
    const parts = path.split('.');
    let current = window;
    for (let i = 0; i < parts.length; i++) {
        if (!current[parts[i]]) {
            current[parts[i]] = {};
        }
        current = current[parts[i]];
    }
    current.value = path.toString();
}

export function combineEnvs(env) {
    return env
}