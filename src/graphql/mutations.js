/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRecycleHistory = /* GraphQL */ `
  mutation CreateRecycleHistory(
    $input: CreateRecycleHistoryInput!
    $condition: ModelRecycleHistoryConditionInput
  ) {
    createRecycleHistory(input: $input, condition: $condition) {
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
export const updateRecycleHistory = /* GraphQL */ `
  mutation UpdateRecycleHistory(
    $input: UpdateRecycleHistoryInput!
    $condition: ModelRecycleHistoryConditionInput
  ) {
    updateRecycleHistory(input: $input, condition: $condition) {
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
export const deleteRecycleHistory = /* GraphQL */ `
  mutation DeleteRecycleHistory(
    $input: DeleteRecycleHistoryInput!
    $condition: ModelRecycleHistoryConditionInput
  ) {
    deleteRecycleHistory(input: $input, condition: $condition) {
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
export const createBadge = /* GraphQL */ `
  mutation CreateBadge(
    $input: CreateBadgeInput!
    $condition: ModelBadgeConditionInput
  ) {
    createBadge(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateBadge = /* GraphQL */ `
  mutation UpdateBadge(
    $input: UpdateBadgeInput!
    $condition: ModelBadgeConditionInput
  ) {
    updateBadge(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteBadge = /* GraphQL */ `
  mutation DeleteBadge(
    $input: DeleteBadgeInput!
    $condition: ModelBadgeConditionInput
  ) {
    deleteBadge(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createBadgeAward = /* GraphQL */ `
  mutation CreateBadgeAward(
    $input: CreateBadgeAwardInput!
    $condition: ModelBadgeAwardConditionInput
  ) {
    createBadgeAward(input: $input, condition: $condition) {
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
export const updateBadgeAward = /* GraphQL */ `
  mutation UpdateBadgeAward(
    $input: UpdateBadgeAwardInput!
    $condition: ModelBadgeAwardConditionInput
  ) {
    updateBadgeAward(input: $input, condition: $condition) {
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
export const deleteBadgeAward = /* GraphQL */ `
  mutation DeleteBadgeAward(
    $input: DeleteBadgeAwardInput!
    $condition: ModelBadgeAwardConditionInput
  ) {
    deleteBadgeAward(input: $input, condition: $condition) {
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
export const createWeeklyChallenges = /* GraphQL */ `
  mutation CreateWeeklyChallenges(
    $input: CreateWeeklyChallengesInput!
    $condition: ModelWeeklyChallengesConditionInput
  ) {
    createWeeklyChallenges(input: $input, condition: $condition) {
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
export const updateWeeklyChallenges = /* GraphQL */ `
  mutation UpdateWeeklyChallenges(
    $input: UpdateWeeklyChallengesInput!
    $condition: ModelWeeklyChallengesConditionInput
  ) {
    updateWeeklyChallenges(input: $input, condition: $condition) {
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
export const deleteWeeklyChallenges = /* GraphQL */ `
  mutation DeleteWeeklyChallenges(
    $input: DeleteWeeklyChallengesInput!
    $condition: ModelWeeklyChallengesConditionInput
  ) {
    deleteWeeklyChallenges(input: $input, condition: $condition) {
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
