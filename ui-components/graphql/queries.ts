/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBookOption = /* GraphQL */ `
  query GetBookOption($id: ID!) {
    getBookOption(id: $id) {
      author
      createdAt
      description
      googleBooksUrl
      id
      imageUrl
      pageCount
      poll {
        createdAt
        id
        prompt
        updatedAt
        __typename
      }
      pollOptionsId
      price
      publishDate
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
    $limit: Int
    $nextToken: String
  ) {
    listBookOptions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        author
        createdAt
        description
        googleBooksUrl
        id
        imageUrl
        pageCount
        pollOptionsId
        price
        publishDate
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
    $limit: Int
    $nextToken: String
  ) {
    listPolls(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
