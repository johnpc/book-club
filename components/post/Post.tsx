import { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { BookmarkAdd, BookmarkAddOutlined } from "@mui/icons-material";
import { Button, Card, CardContent, IconButton, Typography } from "@mui/joy";
import Markdown from "../Markdown";
import Link from "next/link";
import React, { useEffect } from "react";
import { AuthUser, getCurrentUser } from "aws-amplify/auth";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import LikesSection from "./LikesSection";

const client = generateClient<Schema>();

export default function Post({
  post,
  comments,
  likes,
  showPostLink,
}: {
  post: Schema["Post"];
  comments: Schema["Comment"][];
  likes: Schema["Like"][];
  showPostLink: boolean;
}) {
  const [liked, setLiked] = React.useState<boolean>(false);
  const [profile, setProfile] = React.useState<Schema["Profile"]>();

  useEffect(() => {
    const setup = async () => {
      const meResponse = await fetch("/api/users/me");
      const me = await meResponse.json();
      setProfile(me.profile);
    };
    setup();
  }, []);
  const handleLikePost = async () => {
    const user = await getCurrentUser();
    const myLike = likes.find((like) => like.owner === user.userId);
    if (myLike) {
      await client.models.Like.update({
        id: myLike.id,
        isLiked: !myLike.isLiked,
      });
    } else {
      await client.models.Like.create({
        isLiked: true,
        postLikesId: post.id,
      });
    }
    setLiked(!liked);
  };
  return (
    <>
      <Card sx={{ width: "100%" }}>
        <div>
          <Typography level="title-lg">{post?.title}</Typography>
          <Typography level="body-sm">
            {new Date(post?.date ?? "").toDateString()}
          </Typography>
          <IconButton
            aria-label="bookmark post"
            variant="plain"
            color="neutral"
            size="sm"
            sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}
            onClick={handleLikePost}
          >
            {showPostLink ? (
              ""
            ) : liked ? (
              <BookmarkAdd />
            ) : (
              <BookmarkAddOutlined />
            )}
          </IconButton>
        </div>
        <AddToCalendarButton
          name={post?.title}
          startDate={post?.date}
          options={["Apple", "Google", "iCal"]}
          timeZone="America/New_York"
        ></AddToCalendarButton>

        {post ? (
          <Markdown className="markdown" key={post?.id}>
            {post?.description}
          </Markdown>
        ) : (
          ""
        )}

        <CardContent orientation="horizontal">
          <div>
            <LikesSection likes={likes} />
            <Typography level="body-xs">{comments?.length} comments</Typography>
          </div>
        </CardContent>
        {showPostLink ? (
          <>
            <Button
              variant="soft"
              size="md"
              aria-label="View post"
              sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
            >
              <Link href={`/posts/${post.id}`}>View Post</Link>
            </Button>
            {profile && profile?.email === "john@johncorser.com" ? (
              <Button
                variant="soft"
                size="md"
                aria-label="View post"
                sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
              >
                <Link href={`/posts/${post.id}/edit`}>Edit</Link>
              </Button>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
      </Card>
    </>
  );
}
