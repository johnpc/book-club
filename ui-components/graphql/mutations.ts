/* tslint:disable */

// this is an auto generated file. This will be overwritten

export const createBookOption = /* GraphQL */ `
  mutation CreateBookOption(
    $condition: ModelBookOptionConditionInput
    $input: CreateBookOptionInput!
  ) {
    createBookOption(condition: $condition, input: $input) {
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
export const createPoll = /* GraphQL */ `
  mutation CreatePoll(
    $condition: ModelPollConditionInput
    $input: CreatePollInput!
  ) {
    createPoll(condition: $condition, input: $input) {
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
export const deleteBookOption = /* GraphQL */ `
  mutation DeleteBookOption(
    $condition: ModelBookOptionConditionInput
    $input: DeleteBookOptionInput!
  ) {
    deleteBookOption(condition: $condition, input: $input) {
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
export const deletePoll = /* GraphQL */ `
  mutation DeletePoll(
    $condition: ModelPollConditionInput
    $input: DeletePollInput!
  ) {
    deletePoll(condition: $condition, input: $input) {
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
export const updateBookOption = /* GraphQL */ `
  mutation UpdateBookOption(
    $condition: ModelBookOptionConditionInput
    $input: UpdateBookOptionInput!
  ) {
    updateBookOption(condition: $condition, input: $input) {
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
export const updatePoll = /* GraphQL */ `
  mutation UpdatePoll(
    $condition: ModelPollConditionInput
    $input: UpdatePollInput!
  ) {
    updatePoll(condition: $condition, input: $input) {
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
