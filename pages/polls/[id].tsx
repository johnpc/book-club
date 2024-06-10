import { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import React from "react";
import { useRouter } from "next/router";
import Poll from "@/components/poll/Poll";
const client = generateClient<Schema>();

const PollId = () => {
  const router = useRouter();
  const [poll, setPoll] = React.useState<Schema["Poll"]["type"]>();
  React.useEffect(() => {
    const setup = async () => {
      if (!router.isReady) return;
      const pollResponse = await client.models.Poll.get({
        id: router.query.id as string,
      });
      setPoll(pollResponse.data!);
    };
    setup();
  }, [router.isReady, poll?.id]);

  return (
    <div style={{ margin: "auto", minWidth: "50%", maxWidth: "600px" }}>
      <Poll poll={poll!} />
    </div>
  );
};
export default PollId;
