import { Schema } from "@/amplify/data/resource";
import { Button, Card, CardContent, Typography, Stack, Link as JoyLink, Divider } from "@mui/joy";
import Markdown from "../Markdown";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AuthUser, getCurrentUser } from "aws-amplify/auth";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import { BookInfo, searchBooks } from "@/utils/searchBooks";
import BookSummary from "../poll/BookSummary";
import Poll from "../poll/Poll";
import { generateClient } from "aws-amplify/api";

const client = generateClient<Schema>();

export default function Post({
  post,
  showPostLink,
}: {
  post: Schema["Post"]["type"];
  showPostLink: boolean;
}) {
  const [user, setUser] = useState<AuthUser>();
  const [bookInfo, setBookInfo] = useState<BookInfo>();
  const [pollData, setPollData] = useState<Schema["Poll"]["type"] | null>(null);
  const [isLoadingPoll, setIsLoadingPoll] = useState<boolean>(false);

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
      
      // Load poll data if this post has an associated poll
      if (post?.id) {
        setIsLoadingPoll(true);
        try {
          // Find polls where postPollId equals this post's ID
          const pollsResponse = await client.models.Poll.list({
            filter: {
              postPollId: {
                eq: post.id
              }
            }
          });
          
          if (pollsResponse.data && pollsResponse.data.length > 0) {
            setPollData(pollsResponse.data[0]);
          }
        } catch (error) {
          console.error("Error loading poll data:", error);
        } finally {
          setIsLoadingPoll(false);
        }
      }
    };
    setup();
  }, [post]);

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
        
        {/* Event calendar button */}
        <AddToCalendarButton
          name={post?.title}
          startDate={post?.date}
          options={["Apple", "Google", "iCal"]}
          timeZone="America/New_York"
          location={post?.eventUrl || ""}
        ></AddToCalendarButton>

        {/* Description */}
        {post ? (
          <Markdown className="markdown" key={post?.id}>
            {post?.description}
          </Markdown>
        ) : (
          ""
        )}
        
        {/* Book info */}
        {bookInfo ? <BookSummary bookInfo={bookInfo} /> : ""}
        
        {/* Book links */}
        {(post?.epubUrl || post?.audiobookUrl) && (
          <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 2 }}>
            {post?.epubUrl && (
              <Button 
                component={JoyLink}
                href={post.epubUrl} 
                target="_blank" 
                variant="outlined"
                size="sm"
              >
                eBook
              </Button>
            )}
            {post?.audiobookUrl && (
              <Button 
                component={JoyLink}
                href={post.audiobookUrl} 
                target="_blank" 
                variant="outlined"
                size="sm"
              >
                Audiobook
              </Button>
            )}
          </Stack>
        )}
        
        {/* Event link */}
        {post?.eventUrl && (
          <Button 
            component={JoyLink}
            href={post.eventUrl} 
            target="_blank" 
            variant="solid"
            size="md"
            sx={{ mb: 2 }}
          >
            Join Event
          </Button>
        )}
        
        {/* Inline Poll */}
        {pollData && (
          <>
            <Divider sx={{ my: 3 }}>Book Poll</Divider>
            {isLoadingPoll ? (
              <Typography level="body-sm" sx={{ textAlign: 'center', py: 2 }}>
                Loading poll...
              </Typography>
            ) : (
              <Poll poll={pollData} />
            )}
          </>
        )}

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
