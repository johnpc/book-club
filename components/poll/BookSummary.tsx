import { BookInfo } from "@/utils/searchBooks";
import { Divider } from "@aws-amplify/ui-react";
import { Card } from "@mui/joy";
import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import ShowMoreText from "react-show-more-text";

export default function BookSummary({ bookInfo }: { bookInfo: BookInfo }) {
  return (
    <Card size="lg" variant="soft">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <Image
            src={bookInfo.imageUrl || "https://picsum.photos/50"}
            width={200}
            height={250}
            alt={bookInfo.title}
          />
        </Grid>
        <Grid item xs={12} sm={7}>
          <Typography color="text.secondary">
            <a href={bookInfo.googleBooksUrl}>{bookInfo.title}</a> (
            {bookInfo.publishDate})
          </Typography>{" "}
          <Typography variant="body2" color="text.secondary">
            by {bookInfo.author}
          </Typography>{" "}
          <Divider style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }} />
          <Typography variant="body2" color="text.tertiary">
            {bookInfo.pageCount} pages
          </Typography>{" "}
          <Typography variant="body2" color="text.tertiary">
            {bookInfo.price ? `$${bookInfo.price}` : ""}
          </Typography>{" "}
          <Divider style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }} />
          <Typography variant="body1" color="text.secondary">
            Description:
          </Typography>
          <Typography variant="body2" color="text.tertiary">
            <ShowMoreText
              lines={5}
              more="Show more"
              less="Show less"
              className="content-css"
              anchorClass="show-more-less-clickable"
              expanded={false}
              width={280}
              truncatedEndingComponent={"... "}
            >
              {bookInfo.description}
            </ShowMoreText>
          </Typography>{" "}
        </Grid>
      </Grid>
    </Card>
  );
}
