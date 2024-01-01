import { Schema } from "@/amplify/data/resource";
import React from "react";
import Like from "./Like";
import { Typography, Card, List, ListItem } from "@mui/joy";

export default function LikesSection({ likes }: { likes: Schema["Like"][] }) {
  const filteredLikes = likes.filter((like) => like.isLiked);
  return (
    <>
      <Card>
        <Typography level="body-xs">
          Interested ({filteredLikes.length}):
        </Typography>
        <List orientation="horizontal">
          {filteredLikes.map((like) => (
            <ListItem key={like.id}>
              <Like like={like} />
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  );
}
