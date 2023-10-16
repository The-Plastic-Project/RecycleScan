import { Amplify, Analytics } from "aws-amplify";
import awsConfig from "./aws-exports";
import { setUpLogin } from "./js/auth";
import { loadHome } from "./js/main";
import { loadLobe } from "./js/lobe-detect"


const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [
  localRedirectSignIn,
  productionRedirectSignIn,
] = awsConfig.oauth.redirectSignIn.split(",");

const [
  localRedirectSignOut,
  productionRedirectSignOut,
] = awsConfig.oauth.redirectSignOut.split(",");

const updatedAwsConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
    redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
  }
}

Amplify.configure(updatedAwsConfig);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../sw.js', { scope: '/' });
}

Analytics.autoTrack('pageView', {
    enable: true,
    eventName: 'pageView',
    attributes: {
      attr: 'attr'
    },
    type: 'multiPageApp',
    provider: 'AWSPinpoint',
    getUrl: () => {
      return window.location.origin + window.location.pathname;
    }
});

const page = window.location.pathname.split('/').pop();
if (page === "login.html") {
    setUpLogin();
} else if (page === "" || page === "index.html") { // home
    loadHome();
} else if (page === "scan.html") {
    loadLobe();
}