import {
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
} from "aws-amplify/auth/server";
import { runWithAmplifyServerContext } from "@/utils/amplifyServerUtils";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthUser } from "aws-amplify/auth";
import { getOrCreateProfile } from "@/utils/getOrCreateProfile";
import { AmplifyServer } from "aws-amplify/adapter-core";
type Data = {
  user?: AuthUser;
  session?: any; // AuthSession, <- not exported?
  error?: string;
};

export default async function GET(
  request: NextApiRequest,
  response: NextApiResponse<Data>,
) {
  const amplifyAuthData = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec: AmplifyServer.ContextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        console.log({ contextSpec, session });
        const user = await getCurrentUser(contextSpec);
        const userAttributes = await fetchUserAttributes(contextSpec);
        const profile = await getOrCreateProfile(contextSpec);
        return { session, user, userAttributes, profile };
      } catch (error) {
        console.log(error);
        response.status(400).json({ error: (error as Error).message });
        return { error: (error as Error).message };
      }
    },
  });

  response.status(200).json(amplifyAuthData);
  return { amplifyAuthData };
}
