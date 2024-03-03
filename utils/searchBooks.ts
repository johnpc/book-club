const googleBooksEndpoint = "https://www.googleapis.com/books/v1/volumes?q=";
export type BookInfo = {
  title: string;
  author: string;
  publishDate: string;
  description: string;
  pageCount: number;
  imageUrl: string;
  googleBooksUrl: string;
  price: number;
};
export const searchBooks = async (input: string): Promise<BookInfo[]> => {
  const apiResponse = await fetch(
    `${googleBooksEndpoint}${encodeURIComponent(input)}`,
  );
  const apiResponseJson = await apiResponse.json();
  const bookInfoArray = apiResponseJson.items
    .map((apiResponseDoc: any) => ({
      title: apiResponseDoc.volumeInfo.title,
      author: apiResponseDoc.volumeInfo.authors?.[0],
      publishDate: apiResponseDoc.volumeInfo.publishedDate,
      description: apiResponseDoc.volumeInfo.description,
      pageCount: apiResponseDoc.volumeInfo.pageCount,
      imageUrl: apiResponseDoc.volumeInfo.imageLinks?.thumbnail,
      googleBooksUrl: apiResponseDoc.saleInfo?.buyLink,
      price: apiResponseDoc.saleInfo.listPrice?.amount,
    }))
    .filter(
      (bookInfo: BookInfo) =>
        bookInfo.title &&
        bookInfo.author &&
        bookInfo.publishDate &&
        bookInfo.pageCount,
    );
  return bookInfoArray.slice(0, 10);
};
