import { fetchRecycleHistory, fetchWeeklyChallenges } from "./track";
import { signOut, checkAuth } from "./auth";

// map classes to icons
const img_dict = {
    "Plastic" : "imgs/plastic.jpeg",
    "Metal" : "imgs/metal.jpeg",
    "Glass" : "imgs/glass.jpeg",
    "Cardboard" : "imgs/cardboard.jpeg",
    "E-waste" : "imgs/e-waste.jpeg",
    "Paper" : "imgs/paper.jpeg",
}

export async function loadHome() {
    // first lets grab the user
    const user = await checkAuth()
    console.log(user)
    console.log(fetchRecycleHistory(user))

    // load user data
    // await loadUIElements(user)


    // add listeners to our buttons
    const signout = document.getElementById("signoutbtn");
    signout.addEventListener("click", function() {
        confirm("Are you sure you want to sign out?")
        signOut();
    })

    // lastly, load in the model
    // loadModel()
}

// display user data on the home page 
export async function loadUIElements(user) {

    const data = fetchRecycleHistory(user);

    // first, fetch all the HTML elements we need
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
    totalCo2.textContent = data.co2 + " lbs of CO2"
    challengesCompleted.textContent = data.numChallenges;
    badgesCollected.textContent = data.numBadges;
    itemsRecycled.textContent = data.numRecycled;

    // next, update weekly progress
    const challenges = fetchWeeklyChallenges();
    challenge1Item.textContent = challenges.item1;
    challenge1Num.textContent = challenges.num1 + "/" + data.challenge1Progress;
    challenge2Item.textContent = challenges.item2;
    challenge2Num.textContent = challenges.num2 + "/" + data.challenge2Progress;
    challenge1Img.src = img_dict[challenges.item1];
    challenge2Img.src = img_dict[challenges.item2];
    progbar1.style.width = (parseInt(data.challenge1Progress) / parseInt(challenges.num1) * 100).toString() + "%"
    progbar2.style.width = (parseInt(data.challenge2Progress) / parseInt(challenges.num2) * 100).toString() + "%"

    // finally, get the badges
    const allBadges = data.awards;
    for (const badge of allBadges) {
        loadBadge(badge.name, badge.description, img_dict[badge.name])
    }
}

export async function loadBadge(name, description, imgSrc) {
    // Create the main container div
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('flex-col', 'shadow-box', 'semi-sq');

    // Create the image container div
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('flex-col', 'ss-img-box');
    imgDiv.id = 'img';

    // Create the image element
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = 'Silver Trophy';
    img.style.height = '79px';

    // Append the image to its container
    imgDiv.appendChild(img);

    // Create the name text div
    const nameDiv = document.createElement('div');
    nameDiv.classList.add('regular-text', 'ss-text');
    nameDiv.textContent = name;

    // Create the description text div
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('light-text', 'ss-text');
    descriptionDiv.textContent = description

    // Append all elements to the main container
    mainDiv.appendChild(imgDiv);
    mainDiv.appendChild(nameDiv);
    mainDiv.appendChild(descriptionDiv);

    // Append the main container to a parent element in the DOM (e.g., body)
    document.body.appendChild(mainDiv);
}


