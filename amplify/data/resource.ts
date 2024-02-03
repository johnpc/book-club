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
