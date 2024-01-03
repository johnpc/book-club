import { Schema } from "@/amplify/data/resource";
import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/material/Divider";
import { generateClient } from "aws-amplify/api";
import PostCreateForm from "@/ui-components/PostCreateForm";
import Post from "@/components/post/Post";
import { AuthUser, getCurrentUser } from "aws-amplify/auth";
const client = generateClient<Schema>();

export type LoadedPost = {
  id: string;
  title: string;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  comments: any[];
  likes: any[];
};
export default function Home() {
  const [posts, setPosts] = React.useState<LoadedPost[]>([]);
  const [user, setUser] = React.useState<AuthUser>();
  const loadPosts = async (posts: Schema["Post"][]) => {
    posts.sort((a, b) =>
      new Date(a.date).getTime() > new Date(b.date).getTime() ? 1 : -1,
    );

    const postPromises = posts.map(
      async (post): Promise<LoadedPost> => ({
        ...post,
        comments: (await post.comments()).data as Schema["Comment"][],
        likes: (await post.likes()).data as Schema["Like"][],
      }),
    );

    setPosts(await Promise.all(postPromises));
  };
  React.useEffect(() => {
    const fetchProfile = async () => {
      const listPostsResponse = await client.models.Post.list();
      loadPosts(listPostsResponse.data);
      const user = await getCurrentUser();
      setUser(user);
    };
    fetchProfile();
    const sub = client.models.Post.observeQuery().subscribe(({ items }) => {
      const posts = [...items];
      loadPosts(posts);
    });

    return () => sub.unsubscribe();
  }, []);
  return (
    <>
      {user && user.signInDetails?.loginId === "john@johncorser.com" ? (
        <>
          <h1>Create a post</h1>
          <PostCreateForm
            overrides={{
              owner: {
                disabled: true,
                isRequired: false,
                isReadOnly: true,
              },
            }}
            onSubmit={(fields) => {
              return {
                ...fields,
                owner: user?.userId,
              };
            }}
          />
        </>
      ) : (
        ""
      )}
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
              comments={post.comments}
              likes={post.likes}
              showPostLink
            />
          </div>
        ))}
      </Grid>
    </>
  );
}
