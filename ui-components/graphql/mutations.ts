/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $condition: ModelPostConditionInput
    $input: CreatePostInput!
  ) {
    createPost(condition: $condition, input: $input) {
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
export const createProfile = /* GraphQL */ `
  mutation CreateProfile(
    $condition: ModelProfileConditionInput
    $input: CreateProfileInput!
  ) {
    createProfile(condition: $condition, input: $input) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $condition: ModelPostConditionInput
    $input: DeletePostInput!
  ) {
    deletePost(condition: $condition, input: $input) {
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
export const deleteProfile = /* GraphQL */ `
  mutation DeleteProfile(
    $condition: ModelProfileConditionInput
    $input: DeleteProfileInput!
  ) {
    deleteProfile(condition: $condition, input: $input) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $condition: ModelPostConditionInput
    $input: UpdatePostInput!
  ) {
    updatePost(condition: $condition, input: $input) {
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
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile(
    $condition: ModelProfileConditionInput
    $input: UpdateProfileInput!
  ) {
    updateProfile(condition: $condition, input: $input) {
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
