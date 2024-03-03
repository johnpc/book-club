/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBookOption = /* GraphQL */ `
  query GetBookOption($id: ID!) {
    getBookOption(id: $id) {
      amazonId
      author
      createdAt
      goodReadsId
      googleId
      id
      pageCount
      poll {
        createdAt
        id
        prompt
        updatedAt
        __typename
      }
      pollOptionsId
      publishYear
      title
      updatedAt
      voteCount
      __typename
    }
  }
`;
export const getPoll = /* GraphQL */ `
  query GetPoll($id: ID!) {
    getPoll(id: $id) {
      createdAt
      id
      options {
        nextToken
        __typename
      }
      prompt
      updatedAt
      __typename
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      createdAt
      date
      description
      id
      owner
      title
      updatedAt
      __typename
    }
  }
`;
export const getProfile = /* GraphQL */ `
  query GetProfile($id: String!) {
    getProfile(id: $id) {
      avatarKey
      createdAt
      email
      id
      name
      owner
      updatedAt
      userId
      __typename
    }
  }
`;
export const listBookOptions = /* GraphQL */ `
  query ListBookOptions(
    $filter: ModelBookOptionFilterInput
    $id: ID
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listBookOptions(
      filter: $filter
      id: $id
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        amazonId
        author
        createdAt
        goodReadsId
        googleId
        id
        pageCount
        pollOptionsId
        publishYear
        title
        updatedAt
        voteCount
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listPolls = /* GraphQL */ `
  query ListPolls(
    $filter: ModelPollFilterInput
    $id: ID
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPolls(
      filter: $filter
      id: $id
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        createdAt
        id
        prompt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $id: ID
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPosts(
      filter: $filter
      id: $id
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        createdAt
        date
        description
        id
        owner
        title
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $id: String
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listProfiles(
      filter: $filter
      id: $id
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        avatarKey
        createdAt
        email
        id
        name
        owner
        updatedAt
        userId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
