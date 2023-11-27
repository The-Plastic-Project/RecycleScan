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
      download
      awards {
        nextToken
        __typename
      }
      challengeProgress {
        id
        progress1
        progress2
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
      download
      awards {
        nextToken
        __typename
      }
      challengeProgress {
        id
        progress1
        progress2
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
      download
      awards {
        nextToken
        __typename
      }
      challengeProgress {
        id
        progress1
        progress2
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
export const createBadge = /* GraphQL */ `
  mutation CreateBadge(
    $input: CreateBadgeInput!
    $condition: ModelBadgeConditionInput
  ) {
    createBadge(input: $input, condition: $condition) {
      id
      name
      description
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
    }
  }
`;
export const createChallenge = /* GraphQL */ `
  mutation CreateChallenge(
    $input: CreateChallengeInput!
    $condition: ModelChallengeConditionInput
  ) {
    createChallenge(input: $input, condition: $condition) {
      id
      item1
      num1
      item2
      num2
    }
  }
`;
export const updateChallenge = /* GraphQL */ `
  mutation UpdateChallenge(
    $input: UpdateChallengeInput!
    $condition: ModelChallengeConditionInput
  ) {
    updateChallenge(input: $input, condition: $condition) {
      id
      item1
      num1
      item2
      num2
    }
  }
`;
export const deleteChallenge = /* GraphQL */ `
  mutation DeleteChallenge(
    $input: DeleteChallengeInput!
    $condition: ModelChallengeConditionInput
  ) {
    deleteChallenge(input: $input, condition: $condition) {
      id
      item1
      num1
      item2
      num2
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
export const createChallengeProgress = /* GraphQL */ `
  mutation CreateChallengeProgress(
    $input: CreateChallengeProgressInput!
    $condition: ModelChallengeProgressConditionInput
  ) {
    createChallengeProgress(input: $input, condition: $condition) {
      id
      progress1
      progress2
      challenge {
        id
        item1
        num1
        item2
        num2
      }
      createdAt
      updatedAt
      challengeProgressChallengeId
      owner
      __typename
    }
  }
`;
export const updateChallengeProgress = /* GraphQL */ `
  mutation UpdateChallengeProgress(
    $input: UpdateChallengeProgressInput!
    $condition: ModelChallengeProgressConditionInput
  ) {
    updateChallengeProgress(input: $input, condition: $condition) {
      id
      progress1
      progress2
      challenge {
        id
        item1
        num1
        item2
        num2
      }
      createdAt
      updatedAt
      challengeProgressChallengeId
      owner
      __typename
    }
  }
`;
export const deleteChallengeProgress = /* GraphQL */ `
  mutation DeleteChallengeProgress(
    $input: DeleteChallengeProgressInput!
    $condition: ModelChallengeProgressConditionInput
  ) {
    deleteChallengeProgress(input: $input, condition: $condition) {
      id
      progress1
      progress2
      challenge {
        id
        item1
        num1
        item2
        num2
      }
      createdAt
      updatedAt
      challengeProgressChallengeId
      owner
      __typename
    }
  }
`;
