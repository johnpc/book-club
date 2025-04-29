import { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import React from "react";
import { useRouter } from "next/router";
import Post from "@/components/post/Post";
import { Typography } from "@mui/joy";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import { Button } from "@mui/joy";
const client = generateClient<Schema>();

const PostId = () => {
  const router = useRouter();
  const [post, setPost] = React.useState<Schema["Post"]["type"]>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const setup = async () => {
      if (!router.isReady) return;

      setIsLoading(true);
      try {
        const postResponse = await client.models.Post.get({
          id: router.query.id as string,
        });

        if (postResponse.data) {
          setPost(postResponse.data);
        } else {
          setError("Post not found");
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Error loading post");
      } finally {
        setIsLoading(false);
      }
    };
    setup();
  }, [router.isReady, router.query.id]);

  if (isLoading) {
    return (
      <div
        style={{
          margin: "auto",
          minWidth: "50%",
          maxWidth: "600px",
          textAlign: "center",
          padding: "40px",
        }}
      >
        <Typography level="body-lg">Loading post...</Typography>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div
        style={{
          margin: "auto",
          minWidth: "50%",
          maxWidth: "600px",
          textAlign: "center",
          padding: "40px",
        }}
      >
        <Typography level="h4" color="danger">
          {error || "Post not found"}
        </Typography>
        <Button component={Link} href="/" variant="outlined" sx={{ mt: 2 }}>
          Return to Home
        </Button>
      </div>
    );
  }

  return (
    <div style={{ margin: "auto", minWidth: "50%", maxWidth: "600px" }}>
      <Grid
        item
        xs={8}
        md={8}
        sx={{
          "& .markdown": {
            py: 3,
          },
        }}
      >
        <div style={{ display: "flex", alignItems: "center", padding: "15px" }}>
          <Typography level="h4" gutterBottom>
            Book Details
          </Typography>
          <Button
            component={Link}
            href="/"
            variant="outlined"
            size="sm"
            sx={{ ml: "auto" }}
          >
            Back to Schedule
          </Button>
        </div>
        <div style={{ padding: "5px" }}>
          <Post post={post} showPostLink={false} />
        </div>
      </Grid>
    </div>
  );
};

export default PostId;
