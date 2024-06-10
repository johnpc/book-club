import { Schema } from "@/amplify/data/resource";
import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/material/Divider";
import { generateClient } from "aws-amplify/api";
import PollCreateForm from "@/ui-components/PollCreateForm";
import Poll from "@/components/poll/Poll";
import Head from "next/head";
const client = generateClient<Schema>({
  authMode: "iam",
});

export default function Home() {
  const [polls, setPolls] = React.useState<Schema["Poll"]["type"][]>([]);
  React.useEffect(() => {
    const setup = async () => {
      const listPollsResponse = await client.models.Poll.list();
      console.log({ listPollsResponse });
      setPolls(listPollsResponse.data.length ? listPollsResponse.data : []);
    };
    setup();
    const sub = client.models.Poll.observeQuery().subscribe(({ items }) => {
      if (items.length) {
        const polls = [...items];
        setPolls(polls);
      }
    });

    return () => sub.unsubscribe();
  }, []);
  return (
    <>
      <Head>
        <title>A2 Poll</title>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div style={{ margin: "auto", minWidth: "50%", maxWidth: "600px" }}>
        <h1>Create a poll</h1>
        <PollCreateForm
          overrides={{
            owner: {
              disabled: true,
              isRequired: false,
              isReadOnly: true,
            },
          }}
        />
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            "& .markdown": {
              py: 3,
            },
          }}
        >
          <Typography gutterBottom>Poll List!</Typography>
          <Divider />
          {polls.map((poll) => (
            <div key={poll.id} style={{ padding: "5px" }}>
              <Poll poll={poll} />
            </div>
          ))}
        </Grid>
      </div>
    </>
  );
}
