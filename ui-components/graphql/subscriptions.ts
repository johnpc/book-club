/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBookOption = /* GraphQL */ `
  subscription OnCreateBookOption(
    $filter: ModelSubscriptionBookOptionFilterInput
  ) {
    onCreateBookOption(filter: $filter) {
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
export const onCreatePoll = /* GraphQL */ `
  subscription OnCreatePoll($filter: ModelSubscriptionPollFilterInput) {
    onCreatePoll(filter: $filter) {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost(
    $filter: ModelSubscriptionPostFilterInput
    $owner: String
  ) {
    onCreatePost(filter: $filter, owner: $owner) {
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
export const onCreateProfile = /* GraphQL */ `
  subscription OnCreateProfile(
    $filter: ModelSubscriptionProfileFilterInput
    $owner: String
  ) {
    onCreateProfile(filter: $filter, owner: $owner) {
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
export const onDeleteBookOption = /* GraphQL */ `
  subscription OnDeleteBookOption(
    $filter: ModelSubscriptionBookOptionFilterInput
  ) {
    onDeleteBookOption(filter: $filter) {
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
export const onDeletePoll = /* GraphQL */ `
  subscription OnDeletePoll($filter: ModelSubscriptionPollFilterInput) {
    onDeletePoll(filter: $filter) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost(
    $filter: ModelSubscriptionPostFilterInput
    $owner: String
  ) {
    onDeletePost(filter: $filter, owner: $owner) {
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
export const onDeleteProfile = /* GraphQL */ `
  subscription OnDeleteProfile(
    $filter: ModelSubscriptionProfileFilterInput
    $owner: String
  ) {
    onDeleteProfile(filter: $filter, owner: $owner) {
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
export const onUpdateBookOption = /* GraphQL */ `
  subscription OnUpdateBookOption(
    $filter: ModelSubscriptionBookOptionFilterInput
  ) {
    onUpdateBookOption(filter: $filter) {
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
export const onUpdatePoll = /* GraphQL */ `
  subscription OnUpdatePoll($filter: ModelSubscriptionPollFilterInput) {
    onUpdatePoll(filter: $filter) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost(
    $filter: ModelSubscriptionPostFilterInput
    $owner: String
  ) {
    onUpdatePost(filter: $filter, owner: $owner) {
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
export const onUpdateProfile = /* GraphQL */ `
  subscription OnUpdateProfile(
    $filter: ModelSubscriptionProfileFilterInput
    $owner: String
  ) {
    onUpdateProfile(filter: $filter, owner: $owner) {
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
