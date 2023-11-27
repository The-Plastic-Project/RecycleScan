import { fetchUIElements, getBadgeByID, fetchWeeklyChallenges } from "./track";
import { signOut, checkAuth } from "./auth";
import recycleInfo from "../model/recycle-info.json";

// load the HTML elements for the home screen
export async function loadHome() {

    // grab the user
    const user = await checkAuth()

    // load user data
    await loadUIElements(user)

    // 500 ms buffer, then end looader
    setTimeout(() => {
        document.getElementById("page-loader").style.display = "none"
        document.getElementById("content").style.display = "block";
    }, 500); 

    // add listeners to our buttons
    const signout = document.getElementById("signoutbtn");
    signout.addEventListener("click", function() {
        // Display a confirmation dialog
        const userConfirmed = window.confirm("Are you sure you want to sign out?");
        // Check if the user confirmed
        if (userConfirmed) {
            // Call the signOut function
            signOut();
        }
    })
}

// display user data on the home page 
export async function loadUIElements(user) {

    // first, grab all of the data we need from the backend
    const data = await fetchUIElements(user);
    console.log(data);

    // if the user hasn't set a preference for whether or not they
    // want their images to be downloaded, do that now
    if (data.download === null) {
        window.location.href = "permission.html";
    }

    // if the user hasnt recycling anything, briefly guide them as to how to 
    // get started using the app
    if (data.numRecycled == 0) {
        document.getElementById("instructions").style.display = "block";
    }

    // fetch all the HTML elements we need
    const userName = document.getElementById("user-name")
    const totalCo2 = document.getElementById("total-co2")
    const challengesCompleted = document.getElementById("challenges-completed")
    const badgesCollected = document.getElementById("badges-collected")
    const itemsRecycled = document.getElementById("items-recycled")
    const challenge1Item = document.getElementById("challenge-1-item")
    const challenge1Num = document.getElementById("challenge-1-num")
    const challenge2Item = document.getElementById("challenge-2-item")
    const challenge2Num = document.getElementById("challenge-2-num")
    const challenge1Img = document.getElementById("challenge-1-img")
    const challenge2Img = document.getElementById("challenge-2-img")
    const progbar1 = document.getElementById("progbar-1")
    const progbar2 = document.getElementById("progbar-2")

    // next, add user data to the top of the page
    userName.textContent = "Hello " + data.userName;
    totalCo2.textContent = data.co2.toFixed(2).toString() + " lbs of CO2"
    challengesCompleted.textContent = data.numChallenges;
    badgesCollected.textContent = data.numBadges;
    itemsRecycled.textContent = data.numRecycled;

    // next, update weekly progress

    // start with challenge 1
    challenge1Item.textContent = data.challengeProgress.challenge.item1 + " recycled"
    if (data.challengeProgress.progress1 > data.challengeProgress.challenge.num1) {
        challenge1Num.textContent = data.challengeProgress.challenge.num1 + "/" + data.challengeProgress.challenge.num1;
        progbar1.style.width = "100%"
    } else {
        challenge1Num.textContent = data.challengeProgress.progress1 + "/" + data.challengeProgress.challenge.num1;
        progbar1.style.width = ((data.challengeProgress.progress1 / data.challengeProgress.challenge.num1) * 100).toString() + "%"
    }

    challenge1Img.src = recycleInfo[data.challengeProgress.challenge.item1.toLowerCase()].img;

    // now challenge 2
    challenge2Item.textContent = data.challengeProgress.challenge.item2 + " recycled"
    if (data.challengeProgress.progress2 > data.challengeProgress.challenge.num2) {
        challenge2Num.textContent = data.challengeProgress.challenge.num2 + "/" + data.challengeProgress.challenge.num2;
        progbar2.style.width = "100%"
    } else {
        challenge2Num.textContent = data.challengeProgress.progress2 + "/" + data.challengeProgress.challenge.num2;
        progbar2.style.width = ((data.challengeProgress.progress2 / data.challengeProgress.challenge.num2) * 100).toString() + "%"
    }

    challenge2Img.src = recycleInfo[data.challengeProgress.challenge.item2.toLowerCase()].img;

    // finally, get the badges
    const allAwards = data.awards.items;
    if (allAwards.length === 0) {
        makeEmptyBadge();
    } else {
        for (const award of allAwards) {
            loadBadge(award.badgeAwardBadgeId)
        }
    }
}

// load HTML for a badge given its ID
export async function loadBadge(badgeID) {

    const badge = await getBadgeByID(badgeID)

    // Create the main container div
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('flex-col', 'shadow-box', 'semi-sq');

    // Create the image container div
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('flex-col', 'ss-img-box');
    imgDiv.id = 'img';

    // Create the image element
    const img = document.createElement('img');
    img.src = "../imgs/silver-graphic.png";
    img.alt = 'Silver Trophy';
    img.style.height = '79px';

    // Append the image to its container
    imgDiv.appendChild(img);

    // Create the name text div
    const nameDiv = document.createElement('div');
    nameDiv.classList.add('regular-text', 'ss-text');
    nameDiv.textContent = badge.name;

    // Create the description text div
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('light-text', 'ss-text');
    descriptionDiv.textContent = badge.description;

    // Append all elements to the main container
    mainDiv.appendChild(imgDiv);
    mainDiv.appendChild(nameDiv);
    mainDiv.appendChild(descriptionDiv);

    // Append the main container to a parent element in the DOM (e.g., body)
    document.getElementById("rewards-div").appendChild(mainDiv);
}

// load the empty bage (for users with no badges)
export async function makeEmptyBadge() {

    // Create the main container div
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('flex-col', 'shadow-box', 'semi-sq');

    // Create the image container div
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('flex-col', 'ss-img-box');
    imgDiv.id = 'img';

    // Create the image element
    const img = document.createElement('img');
    img.src = "../imgs/sad-face.png";
    img.alt = 'Sad face';
    img.style.height = '79px';

    // Append the image to its container
    imgDiv.appendChild(img);

    // Create the name text div
    const nameDiv = document.createElement('div');
    nameDiv.classList.add('regular-text', 'ss-text');
    nameDiv.textContent = "No rewards yet"

    // Create the description text div
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('light-text', 'ss-text');
    descriptionDiv.textContent = "Scan items to earn badges.";

    // Append all elements to the main container
    mainDiv.appendChild(imgDiv);
    mainDiv.appendChild(nameDiv);
    mainDiv.appendChild(descriptionDiv);

    // Append the main container to a parent element in the DOM (e.g., body)
    document.getElementById("rewards-div").appendChild(mainDiv);
}