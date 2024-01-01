import { Schema } from "@/amplify/data/resource";
import { generateServerClientUsingReqRes } from "@aws-amplify/adapter-nextjs/api";
import config from "@/amplifyconfiguration.json";
import { fetchAuthSession } from "aws-amplify/auth/server";
import { AmplifyServer } from "aws-amplify/adapter-core";

export const getProfileById = async (
  contextSpec: AmplifyServer.ContextSpec,
  id: string,
): Promise<Schema["Profile"]> => {
  const session = await fetchAuthSession(contextSpec);
  const client = generateServerClientUsingReqRes<Schema>({
    config: config,
    authMode: "userPool",
    authToken: session.tokens?.accessToken.toString()!,
  });

  const profile = await client.models.Profile.get(contextSpec, {
    id,
  });
  console.log({ profile });
  return profile.data;
};
