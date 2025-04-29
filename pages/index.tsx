import { Schema } from "@/amplify/data/resource";
import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/joy/Typography";
import { generateClient } from "aws-amplify/api";
import Post from "@/components/post/Post";
const client = generateClient<Schema>();

export default function Home() {
  const [posts, setPosts] = React.useState<Schema["Post"]["type"][]>([]);
  const loadPosts = async (posts: Schema["Post"]["type"][]) => {
    // Sort posts by date in New York time zone
    posts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime(); // Most recent first
    });
    setPosts(posts);
  };
  React.useEffect(() => {
    const fetchProfile = async () => {
      const listPostsResponse = await client.models.Post.list();
      loadPosts(listPostsResponse.data);
    };
    fetchProfile();
    const sub = client.models.Post.observeQuery().subscribe(({ items }) => {
      const posts = [...items];
      loadPosts(posts);
    });
    return () => {
      sub.unsubscribe();
    };
  }, [posts.length]);
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
        <Typography padding={"15px"} level="h4" gutterBottom>
          Book Club Schedule
        </Typography>
        {posts.map((post) => (
          <div key={post.id} style={{ padding: "5px" }}>
            <Post
              post={post as unknown as Schema["Post"]["type"]}
              showPostLink={true}
            />
          </div>
        ))}
      </Grid>
    </div>
  );
}
