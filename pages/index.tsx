import { Schema } from "@/amplify/data/resource";
import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/material/Divider";
import { generateClient } from "aws-amplify/api";
import Post from "@/components/post/Post";
const client = generateClient<Schema>();

export default function Home() {
  const [posts, setPosts] = React.useState<Schema["Post"][]>([]);
  const loadPosts = async (posts: Schema["Post"][]) => {
    posts.sort((a, b) =>
      new Date(a.date).getTime() > new Date(b.date).getTime() ? 1 : -1,
    );
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
    <>
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
        <Typography padding={"15px"} level="h4" gutterBottom>
          Book Club Schedule
        </Typography>
        <Divider />
        {posts.map((post) => (
          <div key={post.id} style={{ padding: "5px" }}>
            <Post
              post={post as unknown as Schema["Post"]}
              showPostLink={true}
            />
          </div>
        ))}
      </Grid>
    </>
  );
}
