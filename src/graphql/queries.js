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
        challengeProgress1
        challengeProgress2
        createdAt
        updatedAt
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
      }
      createdAt
      updatedAt
      recycleHistoryAwardsId
      badgeAwardBadgeId
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
export const getWeeklyChallenges = /* GraphQL */ `
  query GetWeeklyChallenges($id: ID!) {
    getWeeklyChallenges(id: $id) {
      id
      item1
      num1
      item2
      num2
    }
  }
`;
export const listWeeklyChallenges = /* GraphQL */ `
  query ListWeeklyChallenges(
    $filter: ModelWeeklyChallengesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWeeklyChallenges(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        item1
        num1
        item2
        num2
      }
    }
  }
`;
