import { API, graphqlOperation } from "aws-amplify";
import {createRecycleHistory, createBadgeAward, createChallengeProgress, updateChallengeProgress, deleteChallengeProgress, updateRecycleHistory} from '../graphql/mutations';
import {getRecycleHistory, listChallenges, getBadge} from '../graphql/queries';
import recycleInfo from "../model/recycle-info.json";


export async function fetchUIElements(user) {
    const userID = user.idToken.payload["cognito:username"];
    const userName = user.idToken.payload.name.toString().split(" ")[0];
    const challenge = await fetchWeeklyChallenges();
    console.log(challenge);

    let query;

    try {
        query = await API.graphql(graphqlOperation(getRecycleHistory, {id: userID}));
        query = query.data.getRecycleHistory;
        if (!(query.challengeProgress) || query.challengeProgress.challengeProgressChallengeId !== challenge.id) {
            
            // make new challenge progress item
            const progressParams = {
                challengeProgressChallengeId: challenge.id,
                id: challenge.id + userID,
                progress1: 0,
                progress2: 0,
            };
            console.log("creatingChallengeProgress");
            await API.graphql(graphqlOperation(createChallengeProgress, {input : progressParams}));
            console.log("creatingChallengeProgress");

            // delete old one (if applicable)
            if (query.challengeProgress) {
                await API.graphql(graphqlOperation(deleteChallengeProgress, {input : {id : query.challengeProgress.id}}));
            }

            console.log("new challenge created")

            // update the recycle history
            const newParams = { 
                id: userID, 
                recycleHistoryChallengeProgressId: challenge.id + userID
            }
            query = await API.graphql(graphqlOperation(updateRecycleHistory, {input : newParams}));
            query = query.data.updateRecycleHistory;
        }
        query["userName"] = userName;
        return query;

    } catch (error) {

        console.log(error)

        // create empty challenge progress also
        const progressParams = {
            challengeProgressChallengeId: challenge.id,
            id: challenge.id + userID,
            progress1: 0,
            progress2: 0,
        };

        let progress = await API.graphql(graphqlOperation(createChallengeProgress, {input : progressParams}));
        progress = progress.data.createChallengeProgress;

        const start = { 
            id: userID, 
            co2 : 0,
            numBadges: 0,
            numChallenges: 0,
            numRecycled: 0,
            recycleHistoryChallengeProgressId: challenge.id + userID
        }
        query = await API.graphql(graphqlOperation(createRecycleHistory, {input: start}))
        query = query.data.createRecycleHistory;
        query["userName"] = userName;

        return query;
    }
}

export async function fetchWeeklyChallenges() {
    const query = await API.graphql(graphqlOperation(listChallenges));
    return query.data.listChallenges.items[0]
}

export async function getBadgeByID(badgeID) {
    const query = await API.graphql(graphqlOperation(getBadge, {id: badgeID}))
    return query.data.getBadge;
}


export async function addItems(user, items) {

    if (items.length === 0) {
        return null;
    }
    // fetch history
    const userID = user.idToken.payload["cognito:username"];
    let history = await API.graphql(graphqlOperation(getRecycleHistory, {id: userID}));
    console.log(history)
    history = history.data.getRecycleHistory;
    let updatedHistory = {};
    updatedHistory.id = userID;

    // add num recycled
    updatedHistory.numRecycled = history.numRecycled + items.length;

    // co2 calculation
    let co2 = parseFloat(history.co2);
    for (const item of items) {
        co2 += recycleInfo[item].co2 * recycleInfo[item].weight;
    }

    updatedHistory.co2 = co2.toString();

    // check challenge progress
    let challenge = await fetchWeeklyChallenges();
    let challenge1 = 0;
    let challenge2 = 0;
    // check each item against currently challenges
    for (const item of items) {
        if (item.toLowerCase().includes(challenge.item1.toLowerCase())) {
            challenge1 ++;
        } else if (item.toLowerCase().includes(challenge.item2.toLowerCase())) {
            challenge2 ++;
        }
    }

    // we've made progress
    if (challenge1 > 0 || challenge2 > 0) {

        let progressHistory = history.challengeProgress;

        const newChallenge1Progress = progressHistory.progress1 + challenge1
        const newChallenge2Progress = progressHistory.progress2 + challenge2


        const progressParams = {
            challengeProgressChallengeId: challenge.id,
            id: challenge.id + userID,
            progress1: newChallenge1Progress,
            progress2: newChallenge2Progress
        };

        await API.graphql(graphqlOperation(updateChallengeProgress, {input : progressParams}));
    }

    // check for new badges

    if (updatedHistory.numRecycled >= 20 && history.numRecycled < 20) {
        const awardVals = {
            badgeAwardBadgeId: "nr20", 
            id: userID + "nr20", 
            recycleHistoryAwardsId: userID
        };
        updatedHistory.numBadges = history.numBadges + 1
        await API.graphql(graphqlOperation(createBadgeAward, {input : awardVals}));
    } else if (updatedHistory.numRecycled >= 10 && history.numRecycled < 10) {
        const awardVals = {
            badgeAwardBadgeId: "nr10", 
            id: userID + "nr10", 
            recycleHistoryAwardsId: userID
        };
        updatedHistory.numBadges = history.numBadges + 1;
        await API.graphql(graphqlOperation(createBadgeAward, {input : awardVals}));
    } else if (history.numRecycled === 0) {
        const awardVals = {
            badgeAwardBadgeId: "nrfirst", 
            id: userID + "nrfirst", 
            recycleHistoryAwardsId: userID
        };
        updatedHistory.numBadges = history.numBadges + 1;
        await API.graphql(graphqlOperation(createBadgeAward, {input : awardVals}));
    } 


    if (updatedHistory.numChallenges == 1) {
        const awardVals = {
            badgeAwardBadgeId: "wc_1", 
            id: userID + "wc_1", 
            recycleHistoryAwardsId: userID
        };
        updatedHistory.numBadges = history.numBadges + 1
        await API.graphql(graphqlOperation(createBadgeAward, {input : awardVals}));
    } else if (history.numChallenges < 5 && updatedHistory.numChallenges >= 5) {
        const awardVals = {
            badgeAwardBadgeId: "wc_5", 
            id: userID + "wc_5", 
            recycleHistoryAwardsId: userID
        };
        updatedHistory.numBadges = history.numBadges + 1;
        await API.graphql(graphqlOperation(createBadgeAward, {input : awardVals}));
    }


    if (history.co2 < 1 && updatedHistory.co2 >= 1) {
        const awardVals = {
            badgeAwardBadgeId: "co2_1", 
            id: userID + "co2_1", 
            recycleHistoryAwardsId: userID
        };
        updatedHistory.numBadges = history.numBadges + 1;
        await API.graphql(graphqlOperation(createBadgeAward, {input : awardVals}));
    } else if (history.co2 < 5 && updatedHistory.co2 >= 5) {
        const awardVals = {
            badgeAwardBadgeId: "co2_5", 
            id: userID + "co2_5", 
            recycleHistoryAwardsId: userID
        };
        updatedHistory.numBadges = history.numBadges + 1;
        await API.graphql(graphqlOperation(createBadgeAward, {input : awardVals}));
    }


    // now update the user profile and return
    await API.graphql(graphqlOperation(updateRecycleHistory, {input: updatedHistory}));
}
