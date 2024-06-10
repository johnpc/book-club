import { Schema } from "@/amplify/data/resource";
import { BookInfo, searchBooks } from "@/utils/searchBooks";
import { Button } from "@mui/joy";
import { Autocomplete, TextField } from "@mui/material";
import { debounce } from "@mui/material/utils";
import { generateClient } from "aws-amplify/api";
import { useEffect, useMemo, useState } from "react";
import BookOption from "./BookOption";
const client = generateClient<Schema>();

export default function SuggestBook({ poll }: { poll: Schema["Poll"]["type"] }) {
  const [value, setValue] = useState<BookInfo | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<readonly BookInfo[]>([]);
  const fetch = useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly BookInfo[]) => void,
        ) => {
          searchBooks(request.input).then(callback);
        },
        400,
      ),
    [],
  );
  useEffect(() => {
    const runEffect = async () => {
      let active = true;
      if (inputValue === "") {
        setOptions([]);
        return undefined;
      }

      fetch({ input: inputValue }, (results?: readonly BookInfo[]) => {
        if (active) {
          let newOptions: readonly BookInfo[] = [];

          if (value) {
            newOptions = [value];
          }

          if (results) {
            newOptions = [...newOptions, ...results];
          }

          setOptions(newOptions);
        }
      });
      return () => {
        active = false;
      };
    };
    runEffect();
  }, [value, inputValue, fetch]);

  const onAddOption = async () => {
    const bookOptionFields = {
      pollOptionsId: poll.id,
      voteCount: 1,
      ...value,
    };
    await client.models.BookOption.create(bookOptionFields as any);
    setValue(null);
    setInputValue("");
    setOptions([]);
  };

  return (
    <>
      <Autocomplete
        id="suggest-book-search"
        autoComplete
        filterSelectedOptions
        filterOptions={(x) => x}
        options={options}
        value={value}
        getOptionLabel={(option) =>
          typeof option === "string"
            ? option
            : `${option.title} - ${option.author}`
        }
        noOptionsText="No books found"
        onChange={(event: any, newValue: BookInfo | null) => {
          setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Suggest a Book" fullWidth />
        )}
        renderOption={(props, option: BookInfo) => {
          return (
            <li {...props}>
              <BookOption bookInfo={option} />
            </li>
          );
        }}
      />
      {value ? <BookOption bookInfo={value} /> : ""}
      <Button
        disabled={!value}
        onClick={() => onAddOption()}
        type="submit"
        sx={{ marginY: "15px" }}
      >
        Suggest!
      </Button>
    </>
  );
}
