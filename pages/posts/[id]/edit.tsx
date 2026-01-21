import { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import React from "react";
import { useRouter } from "next/router";
import { AuthUser, getCurrentUser } from "aws-amplify/auth";
import EditPostForm from "@/components/post/EditPostForm";
import { Box, Typography } from "@mui/joy";

const client = generateClient<Schema>();

export default function EditPost() {
  const router = useRouter();
  const [user, setUser] = React.useState<AuthUser>();
  const [isAuthorized, setIsAuthorized] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const { id } = router.query;

  React.useEffect(() => {
    const checkAuth = async () => {
      if (!router.isReady) return;

      setIsLoading(true);
      try {
        // Get current user
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        // Get post to check ownership
        const postResponse = await client.models.Post.get({
          id: router.query.id as string,
        });

        // Check if user is authorized to edit this post
        // Either they are the owner or they have admin email
        if (postResponse.data) {
          const isOwner = postResponse.data.owner === currentUser.userId;
          const isAdmin =
            currentUser.signInDetails?.loginId === "john@johncorser.com";

          setIsAuthorized(isOwner || isAdmin);
        }
      } catch (error) {
        console.error("Error checking authorization:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router.isReady, router.query.id]);

  const handleEditSuccess = () => {
    router.push(`/posts/${id}`);
  };

  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", p: 4 }}>
        <Typography level="h4">Loading...</Typography>
      </Box>
    );
  }

  if (!isAuthorized) {
    return (
      <Box sx={{ textAlign: "center", p: 4 }}>
        <Typography level="h4">Not authorized</Typography>
        <Typography level="body-md" sx={{ mt: 2 }}>
          You don&apos;t have permission to edit this post.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <EditPostForm
        postId={id as string}
        userId={user?.userId}
        onSuccess={handleEditSuccess}
      />
    </Box>
  );
}
