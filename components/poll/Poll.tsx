import { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { BookOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Input,
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
import BookOption from "./BookOption";
import { BookInfo } from "@/utils/searchBooks";
import BookListItem from "./BookListItem";
const client = generateClient<Schema>();

export default function Poll({ poll }: { poll: Schema["Poll"] }) {
  const [options, setOptions] = React.useState<Schema["BookOption"][]>([]);
  const [disableVoteButton, setDisableVoteButton] =
    React.useState<boolean>(true);
  const [voted, setVoted] = React.useState<boolean>(false);
  const [selectedOption, setSelectedOption] =
    React.useState<Schema["BookOption"]>();
  const optionsRef = useRef<HTMLInputElement[]>([]);

  const sortOptions = (a: Schema["BookOption"], b: Schema["BookOption"]) =>
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

  const onRadioChange = (option: Schema["BookOption"]) => {
    setSelectedOption(option);
    setDisableVoteButton(false);
  };

  const onVote = async () => {
    await client.models.BookOption.update({
      id: selectedOption!.id,
      voteCount: selectedOption!.voteCount + 1,
    });
    setDisableVoteButton(true);
    setVoted(true);
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
            <RadioGroup
              aria-label="Your plan"
              name="people"
              defaultValue="Individual"
            >
              <List
                sx={{
                  minWidth: 240,
                  "--List-gap": "0.5rem",
                  "--ListItem-paddingY": "1rem",
                  "--ListItem-radius": "8px",
                }}
              >
                {options?.map((option, index) => (
                  <ListItem
                    variant="outlined"
                    key={option.id}
                    sx={{ boxShadow: "sm" }}
                  >
                    <ListItemDecorator>(+{option.voteCount})</ListItemDecorator>
                    <ListItemContent>
                      <BookListItem bookInfo={option as BookInfo} />
                      {/*
                      <Typography level="title-sm">Brunch this weekend?</Typography>
                      <Typography level="body-sm" noWrap>
                        {option.description?.substring(0, 250)}...
                      </Typography> */}
                    </ListItemContent>
                    <Radio
                      overlay
                      value={option.id}
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
                ))}
              </List>
            </RadioGroup>
            {options?.length ? (
              <Button
                onClick={() => onVote()}
                type="submit"
                variant="soft"
                disabled={voted || disableVoteButton}
                sx={{ marginY: "15px" }}
              >
                Vote!
              </Button>
            ) : (
              "Be the first to suggest a book!"
            )}
            <Divider sx={{ marginY: "15px" }} />
            <SuggestBook poll={poll} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
