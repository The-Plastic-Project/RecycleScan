import { API, graphqlOperation } from "aws-amplify";
import {createRecycleHistory, updateRecycleHistory, createBadgeAward} from '../graphql/mutations';
import {getRecycleHistory, getWeeklyChallenges, listBadges, listWeeklyChallenges, getBadge} from '../graphql/queries';


export async function fetchRecycleHistory(user) {
    const userID = user.idToken.payload["cognito:username"];
    const userName = user.idToken.payload.name.toString().split(" ")[0];
    let query = await API.graphql(graphqlOperation(getRecycleHistory, {id: userID}));
    if (query.data.getRecycleHistory === null) {
        const start = { 
            id: userID, 
            co2 : "0",
            numBadges: "0", 
            numChallenges: "0", 
            numRecycled: "0", 
            challengeProgress1: "0", 
            challengeProgress2: "0" 
        }
        query = await API.graphql(graphqlOperation(createRecycleHistory, {input: start}))
        query = query.data.createRecycleHistory;
    } else {
        query = query.data.getRecycleHistory;
    }
    query["userName"] = userName;
    return query;
}

export async function fetchWeeklyChallenges() {
    const query = await API.graphql(graphqlOperation(listWeeklyChallenges));
    return query.data.listWeeklyChallenges.items[0]
}

export async function getBadgeByID(badgeID) {
    const query = await API.graphql(graphqlOperation(getBadge, {id: badgeID}))
    return query.data.getBadge;
}

export async function addItems(user, items) {
    // fetch history
    const userID = user.idToken.payload["cognito:username"];
    let history = await API.graphql(graphqlOperation(getRecycleHistory, {id: userID}));
    console.log(history)
    history = history.data.getRecycleHistory;
    let updatedHistory = {};
    updatedHistory.id = userID;

    // add some basic info
    updatedHistory.numRecycled = (parseInt(history.numRecycled) + items.length).toString();
    updatedHistory.co2 = (parseInt(history.co2) + (parseInt(updatedHistory.numRecycled * items.length))).toString();

    // check challenge progress
    let challenges = await API.graphql(graphqlOperation(getWeeklyChallenges, {id: "wc1"}));
    challenges = challenges.data.getWeeklyChallenges;
    let challenge1 = 0;
    let challenge2 = 0;
    // check each item against currently challenges
    for (const item of items) {
        if (item.toLowerCase().includes(challenges.item1.toLowerCase())) {
            challenge1 ++;
        } else if (item.toLowerCase().includes(challenges.item2.toLowerCase())) {
            challenge2 ++;
        }
    }
    // check if the challenges are completed
    updatedHistory.challengeProgress1 = (parseInt(history.challengeProgress1) + challenge1).toString()
    updatedHistory.challengeProgress2 = (parseInt(history.challengeProgress2) + challenge2).toString()
    if (updatedHistory.challengeProgress1 >= challenges.num1) {
        updatedHistory.numChallenges = history.numChallenges + 1;
    }
    if (updatedHistory.challengeProgress2 >= challenges.num2) {
        updatedHistory.numChallenges = history.numChallenges + 1;
    }

    // check for new badges
    let badges = await API.graphql(graphqlOperation(listBadges));

    console.log("doing badges")

    // just basic badges for now
    if (parseInt(updatedHistory.numRecycled) >= 20 && parseInt(history.numRecycled) < 20) {
        const awardVals = {
            badgeAwardBadgeId: "nr20", 
            id: userID + "nr20", 
            recycleHistoryAwardsId: userID
        };
        await API.graphql(graphqlOperation(createBadgeAward, {input : awardVals}));
    } else if (parseInt(updatedHistory.numRecycled) >= 10 && parseInt(history.numRecycled) < 10) {
        const awardVals = {
            badgeAwardBadgeId: "nr10", 
            id: userID + "nr10", 
            recycleHistoryAwardsId: userID
        };
        await API.graphql(graphqlOperation(createBadgeAward, {input : awardVals}));
    } else if (history.numRecycled === "0") {
        const awardVals = {
            badgeAwardBadgeId: "nrfirst", 
            id: userID + "nrfirst", 
            recycleHistoryAwardsId: userID
        };
        await API.graphql(graphqlOperation(createBadgeAward, {input : awardVals}));
    }

    console.log("done. updating user")
    console.log(updatedHistory)

    // now update the user profile and return
    await API.graphql(graphqlOperation(updateRecycleHistory, {input: updatedHistory}));
}
