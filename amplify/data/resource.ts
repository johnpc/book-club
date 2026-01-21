// amplify/data/resource.ts
import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { AmplifyFunction, ConstructFactory } from "@aws-amplify/plugin-types";

const schema = a.schema({
  Profile: a
    .model({
      id: a.string().required(),
      userId: a.string().required(),
      email: a.string().required(),
      avatarKey: a.string(),
      name: a.string(),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.custom(),
      allow.authenticated("identityPool").to(["read"]),
      allow.guest().to(["read"]),
    ]),
  Post: a
    .model({
      date: a.date().required(),
      description: a
        .string()
        .required()
        .default(
          "Join us for our next book club meeting! Sign in to audiobookshelf (https://audiobooks.jpc.io) to access the audiobook, or jpc-ereader (https://ereader.jpc.io) to access the epub. Both sites use credentials: username: <your first name>, password: getthejelly Both sites are PWAs, meaning you can add them to your Home Screen from the share sheet in order to remain signed in and for the best app experience to continue the book you're reading from wherever you left off.",
        ),
      title: a.string().required(),
      owner: a.string(),
      eventUrl: a.string(),
      epubUrl: a.string().default("https://ereader.jpc.io"),
      audiobookUrl: a.string().default("https://audiobooks.jpc.io"),
      poll: a.hasOne("Poll", "postPollId"),
    })
    .authorization((allow) => [
      allow.custom(),
      allow.owner(),
      allow.authenticated("identityPool").to(["read", "create", "update"]),
      allow.guest().to(["read"]),
    ]),
  Poll: a
    .model({
      options: a.hasMany("BookOption", "pollOptionsId"),
      prompt: a.string().required(),
      post: a.belongsTo("Post", "postPollId"),
      postPollId: a.string(),
    })
    .authorization((allow) => [
      allow.guest(),
      allow.authenticated("identityPool"),
    ]),
  BookOption: a
    .model({
      poll: a.belongsTo("Poll", "pollOptionsId"),
      title: a.string().required(),
      author: a.string().required(),
      publishDate: a.string().required(),
      description: a.string(),
      pageCount: a.integer().required(),
      imageUrl: a.string(),
      googleBooksUrl: a.string(),
      pollOptionsId: a.string().required(),
      price: a.float(),
      voteCount: a.integer().required().default(0),
    })
    .authorization((allow) => [
      allow.guest(),
      allow.authenticated("identityPool"),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = (authFunction: ConstructFactory<AmplifyFunction>) =>
  defineData({
    schema,
    authorizationModes: {
      defaultAuthorizationMode: "iam",
      lambdaAuthorizationMode: {
        function: authFunction,
        timeToLiveInSeconds: 300,
      },
    },
  });
