import { Schema } from "@/amplify/data/resource";
import { Button, Card, CardContent, Typography } from "@mui/joy";
import Markdown from "../Markdown";
import Link from "next/link";
import React, { useEffect } from "react";
import { AuthUser, getCurrentUser } from "aws-amplify/auth";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import { BookInfo, searchBooks } from "@/utils/searchBooks";
import BookSummary from "../poll/BookSummary";

export default function Post({
  post,
  showPostLink,
}: {
  post: Schema["Post"];
  showPostLink: boolean;
}) {
  const [user, setUser] = React.useState<AuthUser>();
  const [bookInfo, setBookInfo] = React.useState<BookInfo>();
  useEffect(() => {
    const setup = async () => {
      try {
        const authUser = await getCurrentUser();
        setUser(authUser);
      } catch (e) {
        console.warn(e);
      }
      const searchResults = await searchBooks(post.title);
      setBookInfo(searchResults[0]);
    };
    setup();
  }, []);
  return (
    <>
      <Card sx={{ width: "100%" }}>
        <div>
          <Typography level="title-lg">{post?.title}</Typography>
          <Typography level="body-sm">
            {new Date(post?.date ?? "").toDateString()}
          </Typography>
          {showPostLink ? (
            <>
              <Button
                variant="soft"
                size="md"
                aria-label="permalink"
                sx={{
                  ml: "auto",
                  alignSelf: "center",
                  fontWeight: 600,
                  margin: "10px",
                }}
              >
                <Link href={`/posts/${post?.id}`}>Permalink</Link>
              </Button>
            </>
          ) : (
            ""
          )}
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
        {bookInfo ? <BookSummary bookInfo={bookInfo} /> : ""}

        <CardContent orientation="horizontal">
          {user && user?.signInDetails?.loginId === "john@johncorser.com" ? (
            <Button
              variant="soft"
              size="md"
              aria-label="View Details"
              sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
            >
              <Link href={`/posts/${post?.id}/edit`}>Edit</Link>
            </Button>
          ) : (
            ""
          )}
        </CardContent>
      </Card>
    </>
  );
}
