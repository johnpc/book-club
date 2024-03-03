import { BookInfo } from "@/utils/searchBooks";
import { Divider } from "@aws-amplify/ui-react";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";

export default function BookListItem({ bookInfo }: { bookInfo: BookInfo }) {
  return (
    <>
      <Grid sx={{ paddingTop: "1rem" }} container spacing={2}>
        <Grid item xs={6} md={8}>
          <Image
            src={bookInfo.imageUrl || "https://picsum.photos/50"}
            width={100}
            height={125}
            style={{ padding: "10px" }}
            alt={bookInfo.title}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography color="text.secondary">{bookInfo.title}</Typography>{" "}
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
        </Grid>
      </Grid>
    </>
  );
  return (
    <>
      <Grid container alignItems="center">
        <Grid
          item
          sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
        ></Grid>
      </Grid>
    </>
  );
}
