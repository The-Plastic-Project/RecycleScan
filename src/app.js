import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { setUpSignup, setUpVerify, setUpLogin, checkAuth } from "./js/auth";
import { loadHome } from "./js/main";
import { loadModel, loadWebCam } from "./js/detect";

Amplify.configure(awsconfig);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../sw.js', { scope: '/' });
}

const page = window.location.pathname.split('/').pop();
if (page === "login.html") {
    setUpLogin();
} else if (page === "home.html") {
    loadHome();
    loadModel();
} else if (page === "scan.html") {
    await checkAuth();
    loadWebCam();
}
