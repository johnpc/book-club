import { searchBooks } from "@/utils/searchBooks";

const main = async () => {
  const response = await searchBooks("Baby Teeth");
  console.log({ response });
};
main();
