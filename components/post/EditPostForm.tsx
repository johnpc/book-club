import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Stack,
  Typography,
  FormControl,
  FormLabel,
  Divider,
} from "@mui/joy";
import {
  FormControlLabel,
  TextField,
  TextareaAutosize,
  Switch,
} from "@mui/material";
import { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { useRouter } from "next/router";
import { formatDateToNewYork } from "@/utils/dateUtils";

const client = generateClient<Schema>();

interface EditPostFormProps {
  postId: string;
  userId?: string;
  onSuccess?: () => void;
}

export default function EditPostForm({
  postId,
  userId,
  onSuccess,
}: EditPostFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasPoll, setHasPoll] = useState(false);
  const [pollData, setPollData] = useState<Schema["Poll"]["type"] | null>(null);

  // Form state
  const [formState, setFormState] = useState({
    title: "",
    date: "",
    description: "",
    eventUrl: "",
    epubUrl: "https://ebooks.jpc.io",
    audiobookUrl: "https://audiobooks.jpc.io",
  });

  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load post data
  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;

      setIsLoading(true);
      try {
        // Get post data
        const postResponse = await client.models.Post.get({ id: postId });

        if (postResponse.data) {
          const post = postResponse.data;
          setFormState({
            title: post.title || "",
            date: post.date || "",
            description: post.description || "",
            eventUrl: post.eventUrl || "",
            epubUrl: post.epubUrl || "https://ebooks.jpc.io",
            audiobookUrl: post.audiobookUrl || "https://audiobooks.jpc.io",
          });

          // Check if post has an associated poll
          const pollsResponse = await client.models.Poll.list({
            filter: {
              postPollId: {
                eq: postId,
              },
            },
          });

          if (pollsResponse.data && pollsResponse.data.length > 0) {
            setHasPoll(true);
            setPollData(pollsResponse.data[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formState.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formState.date) {
      newErrors.date = "Date is required";
    }

    if (!formState.description.trim()) {
      newErrors.description = "Description is required";
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
      // Update the post
      await client.models.Post.update({
        id: postId,
        title: formState.title,
        date: formState.date,
        description: formState.description,
        eventUrl: formState.eventUrl || undefined,
        epubUrl: formState.epubUrl,
        audiobookUrl: formState.audiobookUrl,
      });

      // Create a poll if needed and one doesn't exist
      if (!hasPoll && !pollData) {
        const pollResponse = await client.models.Poll.create({
          prompt: `Let's choose a book for next month!`,
          postPollId: postId,
        });

        if (pollResponse.data) {
          setPollData(pollResponse.data);
          setHasPoll(true);
        }
      }

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      } else {
        // Navigate to post view page
        router.push(`/posts/${postId}`);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", p: 4 }}>
        <Typography level="h4">Loading post data...</Typography>
      </Box>
    );
  }

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
        Edit Book Club Post
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

        <FormControl error={!!errors.description}>
          <FormLabel>Description *</FormLabel>
          <TextareaAutosize
            name="description"
            value={formState.description}
            onChange={handleInputChange}
            minRows={6}
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "8px",
              borderColor: errors.description ? "#d32f2f" : "#ccc",
              fontFamily: "inherit",
              fontSize: "inherit",
            }}
          />
          {errors.description && (
            <Typography level="body-xs" color="danger" sx={{ mt: 0.5 }}>
              {errors.description}
            </Typography>
          )}
        </FormControl>

        <Divider sx={{ my: 2 }}>Additional Information</Divider>

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

        {!hasPoll && (
          <FormControlLabel
            control={
              <Switch
                checked={hasPoll}
                onChange={(e) => setHasPoll(e.target.checked)}
              />
            }
            label="Create poll for next book"
          />
        )}

        {hasPoll && (
          <Box sx={{ p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
            <Typography level="title-sm">
              This post has an associated poll
            </Typography>
            <Typography level="body-sm">
              Poll prompt:{" "}
              {pollData?.prompt || "Let's choose a book for next month!"}
            </Typography>
          </Box>
        )}

        <Box
          sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}
        >
          <Button
            type="button"
            variant="outlined"
            color="neutral"
            onClick={() => router.push(`/posts/${postId}`)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
