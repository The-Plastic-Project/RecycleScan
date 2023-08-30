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
      challengeProgress1
      challengeProgress2
      createdAt
      updatedAt
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
      challengeProgress1
      challengeProgress2
      createdAt
      updatedAt
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
      challengeProgress1
      challengeProgress2
      createdAt
      updatedAt
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
export const onCreateWeeklyChallenges = /* GraphQL */ `
  subscription OnCreateWeeklyChallenges(
    $filter: ModelSubscriptionWeeklyChallengesFilterInput
  ) {
    onCreateWeeklyChallenges(filter: $filter) {
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
export const onUpdateWeeklyChallenges = /* GraphQL */ `
  subscription OnUpdateWeeklyChallenges(
    $filter: ModelSubscriptionWeeklyChallengesFilterInput
  ) {
    onUpdateWeeklyChallenges(filter: $filter) {
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
export const onDeleteWeeklyChallenges = /* GraphQL */ `
  subscription OnDeleteWeeklyChallenges(
    $filter: ModelSubscriptionWeeklyChallengesFilterInput
  ) {
    onDeleteWeeklyChallenges(filter: $filter) {
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
