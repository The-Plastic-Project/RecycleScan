/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRecycleHistory = /* GraphQL */ `
  subscription OnCreateRecycleHistory(
    $filter: ModelSubscriptionRecycleHistoryFilterInput
    $owner: String
  ) {
    onCreateRecycleHistory(filter: $filter, owner: $owner) {
      id
      co2
      numChallenges
      numRecycled
      numBadges
      awards {
        items {
          id
          createdAt
          updatedAt
          recycleHistoryAwardsId
          badgeAwardBadgeId
          owner
          __typename
        }
        nextToken
        __typename
      }
      challengeProgress {
        id
        progress1
        progress2
        challenge {
          id
          item1
          num1
          item2
          num2
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        challengeProgressChallengeId
        owner
        __typename
      }
      createdAt
      updatedAt
      recycleHistoryChallengeProgressId
      owner
      __typename
    }
  }
`;
export const onUpdateRecycleHistory = /* GraphQL */ `
  subscription OnUpdateRecycleHistory(
    $filter: ModelSubscriptionRecycleHistoryFilterInput
    $owner: String
  ) {
    onUpdateRecycleHistory(filter: $filter, owner: $owner) {
      id
      co2
      numChallenges
      numRecycled
      numBadges
      awards {
        items {
          id
          createdAt
          updatedAt
          recycleHistoryAwardsId
          badgeAwardBadgeId
          owner
          __typename
        }
        nextToken
        __typename
      }
      challengeProgress {
        id
        progress1
        progress2
        challenge {
          id
          item1
          num1
          item2
          num2
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        challengeProgressChallengeId
        owner
        __typename
      }
      createdAt
      updatedAt
      recycleHistoryChallengeProgressId
      owner
      __typename
    }
  }
`;
export const onDeleteRecycleHistory = /* GraphQL */ `
  subscription OnDeleteRecycleHistory(
    $filter: ModelSubscriptionRecycleHistoryFilterInput
    $owner: String
  ) {
    onDeleteRecycleHistory(filter: $filter, owner: $owner) {
      id
      co2
      numChallenges
      numRecycled
      numBadges
      awards {
        items {
          id
          createdAt
          updatedAt
          recycleHistoryAwardsId
          badgeAwardBadgeId
          owner
          __typename
        }
        nextToken
        __typename
      }
      challengeProgress {
        id
        progress1
        progress2
        challenge {
          id
          item1
          num1
          item2
          num2
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        challengeProgressChallengeId
        owner
        __typename
      }
      createdAt
      updatedAt
      recycleHistoryChallengeProgressId
      owner
      __typename
    }
  }
`;
export const onCreateBadge = /* GraphQL */ `
  subscription OnCreateBadge($filter: ModelSubscriptionBadgeFilterInput) {
    onCreateBadge(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateBadge = /* GraphQL */ `
  subscription OnUpdateBadge($filter: ModelSubscriptionBadgeFilterInput) {
    onUpdateBadge(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteBadge = /* GraphQL */ `
  subscription OnDeleteBadge($filter: ModelSubscriptionBadgeFilterInput) {
    onDeleteBadge(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateChallenge = /* GraphQL */ `
  subscription OnCreateChallenge(
    $filter: ModelSubscriptionChallengeFilterInput
  ) {
    onCreateChallenge(filter: $filter) {
      id
      item1
      num1
      item2
      num2
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateChallenge = /* GraphQL */ `
  subscription OnUpdateChallenge(
    $filter: ModelSubscriptionChallengeFilterInput
  ) {
    onUpdateChallenge(filter: $filter) {
      id
      item1
      num1
      item2
      num2
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteChallenge = /* GraphQL */ `
  subscription OnDeleteChallenge(
    $filter: ModelSubscriptionChallengeFilterInput
  ) {
    onDeleteChallenge(filter: $filter) {
      id
      item1
      num1
      item2
      num2
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateBadgeAward = /* GraphQL */ `
  subscription OnCreateBadgeAward(
    $filter: ModelSubscriptionBadgeAwardFilterInput
    $owner: String
  ) {
    onCreateBadgeAward(filter: $filter, owner: $owner) {
      id
      badge {
        id
        name
        description
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      recycleHistoryAwardsId
      badgeAwardBadgeId
      owner
      __typename
    }
  }
`;
export const onUpdateBadgeAward = /* GraphQL */ `
  subscription OnUpdateBadgeAward(
    $filter: ModelSubscriptionBadgeAwardFilterInput
    $owner: String
  ) {
    onUpdateBadgeAward(filter: $filter, owner: $owner) {
      id
      badge {
        id
        name
        description
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      recycleHistoryAwardsId
      badgeAwardBadgeId
      owner
      __typename
    }
  }
`;
export const onDeleteBadgeAward = /* GraphQL */ `
  subscription OnDeleteBadgeAward(
    $filter: ModelSubscriptionBadgeAwardFilterInput
    $owner: String
  ) {
    onDeleteBadgeAward(filter: $filter, owner: $owner) {
      id
      badge {
        id
        name
        description
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      recycleHistoryAwardsId
      badgeAwardBadgeId
      owner
      __typename
    }
  }
`;
export const onCreateChallengeProgress = /* GraphQL */ `
  subscription OnCreateChallengeProgress(
    $filter: ModelSubscriptionChallengeProgressFilterInput
    $owner: String
  ) {
    onCreateChallengeProgress(filter: $filter, owner: $owner) {
      id
      progress1
      progress2
      challenge {
        id
        item1
        num1
        item2
        num2
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      challengeProgressChallengeId
      owner
      __typename
    }
  }
`;
export const onUpdateChallengeProgress = /* GraphQL */ `
  subscription OnUpdateChallengeProgress(
    $filter: ModelSubscriptionChallengeProgressFilterInput
    $owner: String
  ) {
    onUpdateChallengeProgress(filter: $filter, owner: $owner) {
      id
      progress1
      progress2
      challenge {
        id
        item1
        num1
        item2
        num2
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      challengeProgressChallengeId
      owner
      __typename
    }
  }
`;
export const onDeleteChallengeProgress = /* GraphQL */ `
  subscription OnDeleteChallengeProgress(
    $filter: ModelSubscriptionChallengeProgressFilterInput
    $owner: String
  ) {
    onDeleteChallengeProgress(filter: $filter, owner: $owner) {
      id
      progress1
      progress2
      challenge {
        id
        item1
        num1
        item2
        num2
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      challengeProgressChallengeId
      owner
      __typename
    }
  }
`;
