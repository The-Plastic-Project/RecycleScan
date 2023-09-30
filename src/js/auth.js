
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';


// set up Google and FaceBook logins, handeled by AWS
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


// check that there is a signed in user
// if there isn't, redirect to the login page
export async function checkAuth() {
    try {
        const user = await Auth.currentSession()
        return user;
    } catch (error) {
        window.location.href = "login.html";
        return undefined;
    }
}

// check out without redirecting
export async function checkAccountVal() {
    try {
        const user = await Auth.currentSession()
        return [1, user];;
    } catch (error) {
        return [0, undefined];;
    }
}

// sign out function
export async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
}