import { BookInfo } from "@/utils/searchBooks";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";

export default function BookOption({ bookInfo }: { bookInfo: BookInfo }) {
  return (
    <>
      <Box>
        <Image
          src={bookInfo.imageUrl || "https://picsum.photos/50"}
          width={50}
          height={50}
          style={{ padding: "10px" }}
          alt={bookInfo.title}
        />
      </Box>
      <Grid container alignItems="center">
        <Grid item sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}>
          {bookInfo.title} ({new Date(bookInfo.publishDate).getFullYear()})
          <Typography variant="body2" color="text.secondary">
            {bookInfo.author}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
