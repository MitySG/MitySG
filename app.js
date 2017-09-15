loadScript('./config.js', initializeFirebase);

if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register('./service-worker.js', { scope: './' })
        .then(function(registration) {
            console.log("Service Worker Registered");
        })
        .catch(function(err) {
            console.log("Service Worker Failed to Register", err);
        });
}

function initializeFirebase() {
    firebase.initializeApp(FBCONFIG);
      
    const messaging = firebase.messaging();
    
    messaging.requestPermission()
        .then(function() {
            console.log("Permission Granted");
        })
        .catch(function(error) {
            console.log("Error Occured");
        });
}

function loadScript(url, callback)
{
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    script.onreadystatechange = callback;
    script.onload = callback;

    head.appendChild(script);
}