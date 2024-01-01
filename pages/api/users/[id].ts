import { runWithAmplifyServerContext } from "@/utils/amplifyServerUtils";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthUser } from "aws-amplify/auth";
import { AmplifyServer } from "aws-amplify/adapter-core";
import { getProfileById } from "@/utils/getProfileById";
type Data = {
  user?: AuthUser;
  session?: any;
  error?: string;
};

export default async function GET(
  request: NextApiRequest,
  response: NextApiResponse<Data>,
) {
  const { id } = request.query;
  const amplifyAuthData = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec: AmplifyServer.ContextSpec) => {
      try {
        const profile = await getProfileById(contextSpec, id as string);
        return { profile };
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
