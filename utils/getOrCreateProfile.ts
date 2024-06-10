import { Schema } from "@/amplify/data/resource";
import { generateServerClientUsingReqRes } from "@aws-amplify/adapter-nextjs/api";
import config from "@/amplify_outputs.json";
import {
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
} from "aws-amplify/auth/server";
import { AmplifyServer } from "aws-amplify/adapter-core";

export const getOrCreateProfile = async (
  contextSpec: AmplifyServer.ContextSpec,
): Promise<Schema["Profile"]["type"]> => {
  const session = await fetchAuthSession(contextSpec);
  const user = await getCurrentUser(contextSpec);
  const userAttributes = await fetchUserAttributes(contextSpec);
  const client = generateServerClientUsingReqRes<Schema>({
    config: config,
    authMode: "userPool",
    authToken: session.tokens?.accessToken.toString()!,
  });

  let existingProfile;
  try {
    existingProfile = await client.models.Profile.get(contextSpec, {
      id: user.userId,
    });
  } catch (e) {
    console.log(e);
  }
  console.log({ existingProfile, errors: existingProfile?.errors });

  if (existingProfile?.data?.id) {
    console.log({ message: "returning existing profile", existingProfile });
    return existingProfile.data;
  }

  try {
    console.log({ message: "creating new profile record" });
    const createdProfile = await client.models.Profile.create(contextSpec, {
      id: user.userId,
      userId: user.userId,
      email: userAttributes.email!,
      name: userAttributes.name ?? userAttributes.email ?? user.username,
    });
    console.log({
      message: "created new profile record",
      createdProfile,
      error: createdProfile.errors,
    });

    return createdProfile.data as unknown as Schema["Profile"]["type"];
  } catch (e) {
    console.log(e);
    console.log({ message: (e as any).message });
    throw e;
  }
};
