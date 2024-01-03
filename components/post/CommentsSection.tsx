import { Schema } from "@/amplify/data/resource";
import Comment from "./Comment";
import { ListDivider, Typography } from "@mui/joy";
import CommentCreateForm from "@/ui-components/CommentCreateForm";
import React from "react";
import { AuthUser, getCurrentUser } from "aws-amplify/auth";

export default function CommentsSection({
  post,
  comments,
}: {
  post?: Schema["Post"];
  comments: Schema["Comment"][];
}) {
  const [user, setUser] = React.useState<AuthUser>();
  React.useEffect(() => {
    const setup = async () => {
      const user = await getCurrentUser();
      setUser(user);
    };
    setup();
  }, []);
  return (
    <>
      <CommentCreateForm
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
            postCommentsId: post?.id,
          };
        }}
      />
      <div>
        <Typography level="h4" component="h1">
          <b>Comments:</b>
        </Typography>
      </div>

      {comments?.map((comment) => (
        <div key={comment.id} style={{ margin: "10px" }}>
          <Comment comment={comment} />
          <ListDivider inset={"startContent"} />
        </div>
      ))}
    </>
  );
}
