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
    .authorization([
      a.allow.owner(),
      a.allow.custom(),
      a.allow.private().to(["read"]),
      a.allow.private("iam").to(["read"]),
      a.allow.public("iam").to(["read"]),
    ]),
  Post: a
    .model({
      date: a.date().required(),
      description: a.string().required(),
      title: a.string().required(),
    })
    .authorization([
      a.allow.custom(),
      a.allow.owner(),
      a.allow.private().to(["read", "create"]),
      a.allow.private("iam").to(["read"]),
      a.allow.public("iam").to(["read"]),
    ]),
  Poll: a
    .model({
      options: a.hasMany("BookOption"),
      prompt: a.string().required(),
    })
    .authorization([a.allow.public("iam"), a.allow.private("iam")]),
  BookOption: a
    .model({
      poll: a.belongsTo("Poll"),
      title: a.string().required(),
      author: a.string().required(),
      publishDate: a.string().required(),
      description: a.string(),
      pageCount: a.integer().required(),
      imageUrl: a.string(),
      googleBooksUrl: a.string(),
      price: a.float(),
      voteCount: a.integer().required().default(0),
    })
    .authorization([a.allow.public("iam"), a.allow.private("iam")]),
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
