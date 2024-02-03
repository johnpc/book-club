import { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import React from "react";
import { useRouter } from "next/router";
import Post from "@/components/post/Post";
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
      <Post post={post!} showPostLink={true} />
    </>
  );
};
export default PostId;
