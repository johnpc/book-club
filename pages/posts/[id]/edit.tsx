import PostUpdateForm from "@/ui-components/PostUpdateForm";
import { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import React from "react";
import { useRouter } from "next/router";
import { AuthUser, getCurrentUser } from "aws-amplify/auth";

const client = generateClient<Schema>();

export default function EditPost() {
  const router = useRouter();
  const [post, setPost] = React.useState<Schema["Post"]>();
  const [user, setUser] = React.useState<AuthUser>();
  React.useEffect(() => {
    const setup = async () => {
      if (!router.isReady) return;
      const postResponse = await client.models.Post.get({
        id: router.query.id as string,
      });
      setPost(postResponse.data);
      const user = await getCurrentUser();
      setUser(user);
    };
    setup();
  }, [router.isReady, post?.id]);

  return (
    <>
      <PostUpdateForm
        post={post}
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
  );
}
