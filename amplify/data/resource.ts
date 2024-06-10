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
      allow.authenticated().to(["read"]),
      allow.guest().to(["read"]),
    ]),
  Post: a
    .model({
      date: a.date().required(),
      description: a.string().required(),
      title: a.string().required(),
    })
    .authorization((allow) => [
      allow.custom(),
      allow.owner(),
      allow.authenticated().to(["read", "create"]),
      allow.guest().to(["read"]),
    ]),
  Poll: a
    .model({
      options: a.hasMany("BookOption", "pollOptionsId"),
      prompt: a.string().required(),
    })
    .authorization((allow) => [allow.guest(), allow.authenticated()]),
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
    .authorization((allow) => [allow.guest(), allow.authenticated()]),
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
