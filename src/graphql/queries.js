/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRecycleHistory = /* GraphQL */ `
  query GetRecycleHistory($id: ID!) {
    getRecycleHistory(id: $id) {
      id
      co2
      numChallenges
      numRecycled
      numBadges
      awards {
        items {
          id
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
export const listRecycleHistories = /* GraphQL */ `
  query ListRecycleHistories(
    $filter: ModelRecycleHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecycleHistories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        co2
        numChallenges
        numRecycled
        numBadges
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
      nextToken
      __typename
    }
  }
`;
export const getBadge = /* GraphQL */ `
  query GetBadge($id: ID!) {
    getBadge(id: $id) {
      id
      name
      description
    }
  }
`;
export const listBadges = /* GraphQL */ `
  query ListBadges(
    $filter: ModelBadgeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBadges(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
      }
      nextToken
      __typename
    }
  }
`;
export const getChallenge = /* GraphQL */ `
  query GetChallenge($id: ID!) {
    getChallenge(id: $id) {
      id
      item1
      num1
      item2
      num2
    }
  }
`;
export const listChallenges = /* GraphQL */ `
  query ListChallenges(
    $filter: ModelChallengeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChallenges(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        item1
        num1
        item2
        num2
      }
      nextToken
      __typename
    }
  }
`;
export const getBadgeAward = /* GraphQL */ `
  query GetBadgeAward($id: ID!) {
    getBadgeAward(id: $id) {
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
export const listBadgeAwards = /* GraphQL */ `
  query ListBadgeAwards(
    $filter: ModelBadgeAwardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBadgeAwards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getChallengeProgress = /* GraphQL */ `
  query GetChallengeProgress($id: ID!) {
    getChallengeProgress(id: $id) {
      id
      progress1
      progress2
      challenge {
        id
        item1
        num1
        item2
        num2
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
export const listChallengeProgresses = /* GraphQL */ `
  query ListChallengeProgresses(
    $filter: ModelChallengeProgressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChallengeProgresses(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
