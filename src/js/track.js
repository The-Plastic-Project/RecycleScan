import { API, graphqlOperation } from "aws-amplify";
import {createRecycleHistory, updateRecycleHistory, createBadgeAward} from '../graphql/mutations';
import {getRecycleHistory, getWeeklyChallenges, listBadges, listWeeklyChallenges, getBadge} from '../graphql/queries';
import recycleInfo from "../model/recycle-info.json";


export async function fetchRecycleHistory(user) {
    const userID = user.idToken.payload["cognito:username"];
    const userName = user.idToken.payload.name.toString().split(" ")[0];
    let query;
    try {
        query = await API.graphql(graphqlOperation(getRecycleHistory, {id: userID}));
        query = query.data.getRecycleHistory;
        query["userName"] = userName;
        return query;
    } catch (error) {
        console.log(error)
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
        query["userName"] = userName;
        return query;
    }
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
    console.log(user)
    // fetch history
    const userID = user.idToken.payload["cognito:username"];
    let history = await API.graphql(graphqlOperation(getRecycleHistory, {id: userID}));
    console.log(history)
    history = history.data.getRecycleHistory;
    let updatedHistory = {};
    updatedHistory.id = userID;

    // add some basic info
    updatedHistory.numRecycled = (parseInt(history.numRecycled) + items.length).toString();

    // co2 calculation
    let co2 = parseFloat(history.co2);
    for (const item of items) {
        co2 += recycleInfo[item].co2 * recycleInfo[item].weight;
    }

    updatedHistory.co2 = co2.toString();

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

    // just basic badges for now
    if (parseInt(updatedHistory.numRecycled) >= 20 && parseInt(history.numRecycled) < 20) {
        const awardVals = {
            badgeAwardBadgeId: "nr20", 
            id: userID + "nr20", 
            recycleHistoryAwardsId: userID
        };
        updatedHistory.numBadges = (parseInt(history.co2) + 1).toString()
        await API.graphql(graphqlOperation(createBadgeAward, {input : awardVals}));
    } else if (parseInt(updatedHistory.numRecycled) >= 10 && parseInt(history.numRecycled) < 10) {
        const awardVals = {
            badgeAwardBadgeId: "nr10", 
            id: userID + "nr10", 
            recycleHistoryAwardsId: userID
        };
        updatedHistory.numBadges = (parseInt(history.co2) + 1).toString()
        await API.graphql(graphqlOperation(createBadgeAward, {input : awardVals}));
    } else if (history.numRecycled === "0") {
        const awardVals = {
            badgeAwardBadgeId: "nrfirst", 
            id: userID + "nrfirst", 
            recycleHistoryAwardsId: userID
        };
        updatedHistory.numBadges = (parseInt(history.co2) + 1).toString()
        await API.graphql(graphqlOperation(createBadgeAward, {input : awardVals}));
    }

    console.log("badges made")

    console.log(user);
    // now update the user profile and return
    await API.graphql(graphqlOperation(updateRecycleHistory, {input: updatedHistory}));
}
