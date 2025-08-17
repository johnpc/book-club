import React, { useState } from "react";
import {
  Button,
  Box,
  Stack,
  Typography,
  FormControl,
  FormLabel,
  Switch,
} from "@mui/joy";
import { FormControlLabel, TextField, TextareaAutosize } from "@mui/material";
import { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { useRouter } from "next/router";
import { getTodayInNewYork, normalizeDateForStorage } from "@/utils/dateUtils";

const client = generateClient<Schema>();

interface CreatePostFormProps {
  userId?: string;
  onSuccess?: () => void;
}

export default function CreatePostForm({
  userId,
  onSuccess,
}: CreatePostFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createPoll, setCreatePoll] = useState(true);

  // Form state
  const [formState, setFormState] = useState({
    title: "",
    date: getTodayInNewYork(), // Today's date in New York time zone
    description: `Join us for our next book club meeting!

Sign in to [audiobookshelf](https://audiobooks.jpc.io) to access the audiobook, or [calibre-web](https://ebooks.jpc.io) to access the epub. Both sites use credentials:

* username: \<your first name\>
* password: getthejelly

Both sites are PWAs, meaning you can add them to your Home Screen from the share sheet in order to remain signed in and for the best app experience to continue the book you're reading from wherever you left off.`,
    eventUrl: "",
    epubUrl: "https://ebooks.jpc.io",
    audiobookUrl: "https://audiobooks.jpc.io",
  });

  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formState.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formState.date) {
      newErrors.date = "Date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // First create the post
      const postResponse = await client.models.Post.create({
        title: formState.title,
        date: normalizeDateForStorage(formState.date),
        description: formState.description,
        eventUrl: formState.eventUrl || undefined,
        epubUrl: formState.epubUrl,
        audiobookUrl: formState.audiobookUrl,
        owner: userId,
      });

      const postId = postResponse.data?.id;

      // If createPoll is checked, create a poll and associate it with the post
      if (createPoll && postId) {
        const pollResponse = await client.models.Poll.create({
          prompt: `Let's choose a book for next month!`,
          postPollId: postId,
        });
      }

      // Reset form
      setFormState({
        title: "",
        date: getTodayInNewYork(),
        description: `Join us for our next book club meeting!

Sign in to [audiobookshelf](https://audiobooks.jpc.io) to access the audiobook, or [calibre-web](https://ebooks.jpc.io) to access the epub. Both sites use credentials:

* username: \<your first name\>
* password: getthejelly

Both sites are PWAs, meaning you can add them to your Home Screen from the share sheet in order to remain signed in and for the best app experience to continue the book you're reading from wherever you left off.`,
        eventUrl: "",
        epubUrl: "https://ebooks.jpc.io",
        audiobookUrl: "https://audiobooks.jpc.io",
      });

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      } else {
        // Navigate to home page
        router.push("/");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        p: 3,
        borderRadius: "md",
        boxShadow: "sm",
      }}
    >
      <Typography level="h4" mb={3}>
        Create New Book Club Post
      </Typography>

      <Stack spacing={3}>
        <FormControl error={!!errors.title}>
          <FormLabel>Book Title *</FormLabel>
          <TextField
            name="title"
            value={formState.title}
            onChange={handleInputChange}
            placeholder="Enter the book title"
            required
            fullWidth
            variant="outlined"
            error={!!errors.title}
            helperText={errors.title}
          />
        </FormControl>

        <FormControl error={!!errors.date}>
          <FormLabel>Meeting Date *</FormLabel>
          <TextField
            name="date"
            type="date"
            value={formState.date}
            onChange={handleInputChange}
            required
            fullWidth
            variant="outlined"
            error={!!errors.date}
            helperText={errors.date}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <TextareaAutosize
            name="description"
            value={formState.description}
            onChange={handleInputChange}
            minRows={3}
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "8px",
              borderColor: "#ccc",
              fontFamily: "inherit",
              fontSize: "inherit",
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Event URL (optional)</FormLabel>
          <TextField
            name="eventUrl"
            value={formState.eventUrl}
            onChange={handleInputChange}
            placeholder="https://meet.google.com/..."
            fullWidth
            variant="outlined"
          />
        </FormControl>

        <FormControl>
          <FormLabel>eBook URL</FormLabel>
          <TextField
            name="epubUrl"
            value={formState.epubUrl}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Audiobook URL</FormLabel>
          <TextField
            name="audiobookUrl"
            value={formState.audiobookUrl}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </FormControl>

        <FormControlLabel
          control={
            <Switch
              checked={createPoll}
              onChange={(e) => setCreatePoll(e.target.checked)}
            />
          }
          label="Create poll for next book"
        />

        <Box
          sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}
        >
          <Button
            type="button"
            variant="outlined"
            color="neutral"
            onClick={() => router.push("/")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Post"}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
