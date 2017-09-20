import mitt from 'mitt';

const emitter = mitt();
const SUPPORTED = 'supported';
const ERROR = 'error';
const SUBSCRIBED = 'subscribed';
const UNSUBSCRIBED = 'unsubscribed';

function buildApplicationServerKey() {
  const base64 = 'BBFNCDSVirGYfrhSp5Q1u-ksUTnn7HMUnigBiZ0dvYdsNjtL4OtlRjuf4Gki55eZohpa-FiWFOvUIVI7UKRucx0';
  const rfc4648 = base64.replace(/-/g, '+').replace(/_/g, '/');
  const characters = atob(rfc4648).split('').map(character => character.charCodeAt(0));
  console.log("PUBLIC KEY");
  console.log(base64);
  return new Uint8Array(characters);
}

function sendSubscriptionToServer(subscription) {
  // This is where you'd update the subscription on the server.
  document.querySelector('.js-subscription').innerHTML = JSON.stringify(subscription.toJSON());

  let xhr = new XMLHttpRequest();
  // let url = "http://localhost:8000";
  // let url = "https://zjh5q71uma.execute-api.ap-southeast-1.amazonaws.com/prod/testfunction";
  let url = "https://huy3vicolc.execute-api.us-east-1.amazonaws.com/dev/subscribe";
  xhr.open("POST", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.send(JSON.stringify(subscription.toJSON()));
  console.log("SENT")
  console.log(JSON.stringify(subscription.toJSON()));
  xhr.onload = function () {
    console.log(JSON.parse(this.responseText));
  };
}

function removeSubscriptionFromServer(subscription) {
  // This is where you'd remove the subscription from the server.
}

const registerServiceWorker = function () {
  if ('serviceWorker' in navigator) {
    // Unless you change the URL of the service worker script,
    // `navigator.serviceWorker.register()` is effectively a no-op during subsequent visits.
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        initializeState();
        console.log('ServiceWorker registration successful.', registration);
      }).catch((error) => {
        console.error('ServiceWorker registration failed.', error);
      });
  } else {
    console.log('Service workers aren’t supported in this browser.');
  }
};

const initializeState = function () {
  // Are Notifications supported in the service worker?
  if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
    console.error('Notifications aren’t supported.');
    return;
  }

  // If the current notification permission is denied,
  // it's a permanent block until the user changes the permission
  if (Notification.permission === 'denied') {
    console.error('The user has blocked notifications.');
    return;
  }

  // Check if push messaging is supported
  if (!('PushManager' in window)) {
    console.error('Push messaging isn’t supported.');
    return;
  }

  navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
    serviceWorkerRegistration.pushManager.getSubscription()
      .then((subscription) => {
        emitter.emit(SUPPORTED);

        // Do we already have a push message subscription?
        if (subscription) {
          sendSubscriptionToServer(subscription);
          emitter.emit(SUBSCRIBED);
        }
      })
      .catch((error) => {
        console.error('Error during getSubscription()', error);
      });
  });
};

const subscribe = function () {
  function permissionDenied() {
    emitter.emit(ERROR, 'Please allow notifications to use our service.');
    unsubscribe();
  }

  function permissionGranted() {
    navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
      serviceWorkerRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: buildApplicationServerKey(),
        })
        .then((subscription) => {
          sendSubscriptionToServer(subscription);
          emitter.emit(SUBSCRIBED);
        })
        .catch((error) => {
          console.error('Unable to subscribe to messaging server.', error);
          emitter.emit(ERROR,
            'An error occurred while logging in to the external notification service. ' +
            'Please try again in a few minutes.',
          );
        });
    });
  }
  if (Notification.permission === 'denied') {
    permissionDenied();
    return;
  }
  if (Notification.permission === 'default') {
    Notification.requestPermission().then((result) => {
      if (result !== 'granted') {
        permissionDenied();
        return;
      }
      permissionGranted();
    });
    return;
  }
  permissionGranted();
};

const unsubscribe = function () {
  navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
    serviceWorkerRegistration.pushManager.getSubscription()
      .then((subscription) => {
        if (!subscription) {
          emitter.emit(UNSUBSCRIBED);
          return;
        }
        subscription.unsubscribe().then(() => {
          emitter.emit(UNSUBSCRIBED);
        }).catch((error) => {
          console.error('Unable to unsubscribe to messaging server.', error);
          emitter.emit(ERROR,
            'An error occurred while logging off to the external notification service.'
          );
        });
        removeSubscriptionFromServer();
      })
      .catch((error) => {
        console.error('Error during getSubscription()', error);
      });
  });
};

export default {
  init: registerServiceWorker,
  on: emitter.on,
  SUPPORTED,
  ERROR,
  SUBSCRIBED,
  UNSUBSCRIBED,
  subscribe,
  unsubscribe,
};
