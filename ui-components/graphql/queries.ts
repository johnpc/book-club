/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
