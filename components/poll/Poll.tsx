import { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import {
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/joy";
import React, { useRef } from "react";
import Link from "next/link";
import SuggestBook from "./SuggestBook";
import { BookInfo } from "@/utils/searchBooks";
import BookListItem from "./BookListItem";
import { Box } from "@mui/material";
import { useCookies } from "react-cookie";
const client = generateClient<Schema>();

export default function Poll({ poll }: { poll: Schema["Poll"]["type"] }) {
  const [options, setOptions] = React.useState<Schema["BookOption"]["type"][]>(
    [],
  );
  const [cookies, setCookie, removeCookie] = useCookies();
  const [selectedOption, setSelectedOption] =
    React.useState<Schema["BookOption"]["type"]>();
  const optionsRef = useRef<HTMLInputElement[]>([]);

  const sortOptions = (
    a: Schema["BookOption"]["type"],
    b: Schema["BookOption"]["type"],
  ) =>
    new Date(a.voteCount).getTime() < new Date(b.voteCount).getTime() ? 1 : -1;
  React.useEffect(() => {
    const setup = async () => {
      const optionsResponse = await poll?.options();
      const options = optionsResponse?.data ?? [];
      options?.sort(sortOptions);
      setOptions(options);
    };
    setup();

    const sub = client.models.BookOption.observeQuery({
      filter: {
        pollOptionsId: {
          eq: poll?.id,
        },
      },
    }).subscribe(({ items }) => {
      const options = [...items];
      options?.sort(sortOptions);
      setOptions(options);
    });

    return () => sub.unsubscribe();
  }, [poll?.id]);

  const onRadioChange = (option: Schema["BookOption"]["type"]) => {
    setSelectedOption(option);
  };

  const onVote = async () => {
    await client.models.BookOption.update({
      id: selectedOption!.id,
      voteCount: selectedOption!.voteCount + 1,
    });
    setCookie(selectedOption!.id, true);
  };

  return (
    <>
      <Card sx={{ width: "100%" }}>
        <div>
          <Typography level="title-lg">{poll?.prompt}</Typography>
          <Typography level="body-sm">
            <Link href={`/polls/${poll?.id}`}>(permalink)</Link>
          </Typography>
        </div>

        <CardContent orientation="horizontal">
          <div style={{ width: "100%" }}>
            <SuggestBook poll={poll} />
            <Divider sx={{ marginY: "15px" }} />
            <Box>Vote on the current suggestions:</Box>
            <RadioGroup>
              <List
                sx={{
                  minWidth: 240,
                  "--List-gap": "0.5rem",
                  "--ListItem-paddingY": "1rem",
                  "--ListItem-radius": "8px",
                }}
              >
                {options?.map((option, index) => (
                  <>
                    <ListItem
                      variant={cookies[option.id] ? "soft" : "outlined"}
                      key={option.id}
                      sx={{ boxShadow: "sm" }}
                    >
                      <ListItemDecorator>
                        (+{option.voteCount})
                      </ListItemDecorator>
                      <ListItemContent>
                        <BookListItem bookInfo={option as BookInfo} />
                      </ListItemContent>
                      <Radio
                        overlay
                        value={option.id}
                        disabled={cookies[option.id]}
                        onChange={() => onRadioChange(option)}
                        sx={{ flexGrow: 1, flexDirection: "row-reverse" }}
                        slotProps={{
                          input: {
                            ref: (optionsRef as any)[
                              index
                            ] as React.MutableRefObject<HTMLInputElement>,
                          },
                          action: ({ checked }) => ({
                            sx: (theme) => ({
                              ...(checked && {
                                inset: -1,
                                border: "2px solid",
                                borderColor: theme.vars.palette.primary[500],
                              }),
                            }),
                          }),
                        }}
                      />
                    </ListItem>
                    {option.googleBooksUrl ? (
                      <a href={option.googleBooksUrl}>
                        (more about &quot;{option.title}&quot;)
                      </a>
                    ) : (
                      ""
                    )}
                  </>
                ))}
              </List>
            </RadioGroup>
            {options?.length ? (
              <Button
                onClick={() => onVote()}
                type="submit"
                variant="soft"
                sx={{ marginY: "15px" }}
              >
                Vote!
              </Button>
            ) : (
              <Card>No suggestions yet. Be the first to suggest a book!</Card>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
