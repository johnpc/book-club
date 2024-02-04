import { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import React from "react";
import { useRouter } from "next/router";
import Post from "@/components/post/Post";
import { Typography } from "@mui/joy";
const client = generateClient<Schema>();

const PostId = () => {
  const router = useRouter();
  const [post, setPost] = React.useState<Schema["Post"]>();
  React.useEffect(() => {
    const setup = async () => {
      if (!router.isReady) return;
      const postResponse = await client.models.Post.get({
        id: router.query.id as string,
      });
      setPost(postResponse.data);
    };
    setup();
  }, [router.isReady, post?.id]);

  return (
    <>
      <div style={{ margin: "auto", minWidth: "50%", maxWidth: "600px" }}>
        <Typography padding={"15px"} level="h4" gutterBottom>
          {post?.title}
        </Typography>
        <Post post={post!} showPostLink={true} />

      </div>
    </>
  );
};
export default PostId;
