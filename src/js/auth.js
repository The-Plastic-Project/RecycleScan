
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';



export function setUpLogin() {
    const google = document.getElementById("google-btn");
    const facebook = document.getElementById("facebook-btn");

    google.addEventListener("click", async function() {
        Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google })
    })

    facebook.addEventListener("click", async function() {
        Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Facebook })
    })
}


export async function checkAuth() {
    try {
        const user = await Auth.currentSession()
        return user;
    } catch (error) {
        window.location.href = "login.html";
        return undefined;
    }
}


export async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
}