import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import Tabs from "@mui/joy/Tabs";
import TabPanel from "@mui/joy/TabPanel";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { StorageManager } from "@aws-amplify/ui-react-storage";
import { Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { CircularProgress } from "@mui/joy";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/router";
import { Link } from "@aws-amplify/ui-react";
import CreatePostForm from "@/components/post/CreatePostForm";

const client = generateClient<Schema>();

export default function Profile() {
  const router = useRouter();
  const [profile, setProfile] = React.useState<Schema["Profile"]["type"]>();
  const [isEditingImage, setIsEditingImage] = React.useState<boolean>();
  const [isUpdating, setIsUpdating] = React.useState<boolean>();
  const [activeTab, setActiveTab] = React.useState(0);
  const nameRef = React.useRef<HTMLInputElement>();

  React.useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("/api/users/me");
      const jsonResponse = await response.json();
      const { profile } = jsonResponse;
      setProfile(profile);
    };
    fetchProfile();
  }, []);

  const updateProfile = async (updatedFields: {
    name?: string;
    avatarKey?: string;
  }) => {
    if (!profile) {
      return;
    }

    const updatedProfile = await client.models.Profile.update({
      id: profile.id,
      userId: profile.userId,
      email: profile.email,
      avatarKey: profile.avatarKey,
      name: profile.name,
      ...updatedFields,
    });
    setProfile(updatedProfile.data!);
    setIsUpdating(false);
    setIsEditingImage(false);
  };

  const onUpdateProfile = () => {
    setIsUpdating(true);
    updateProfile({ name: nameRef.current!.value });
  };

  const onEditProfileImageClick = async () => {
    setIsEditingImage(true);
  };

  const onUploadSuccess = (event: { key?: string }) => {
    setIsUpdating(true);
    updateProfile({ avatarKey: event.key });
  };

  const logOut = async () => {
    await signOut();
    router.push("/sign-in");
  };

  const handlePostCreationSuccess = () => {
    // Navigate to home page or show success message
    router.push("/");
  };

  return (
    <Box sx={{ py: 2, px: { xs: 2, md: 6 } }}>
      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <Button onClick={() => logOut()} variant="outlined">
          Log Out
        </Button>
        <Button component={Link} href="/polls/create" variant="outlined">
          Create Poll
        </Button>
        <Button component={Link} href="/polls" variant="outlined">
          List Polls
        </Button>
      </Stack>

      <Tabs
        value={activeTab}
        onChange={(_, value) => setActiveTab(value as number)}
        sx={{ borderRadius: "lg", mb: 4 }}
      >
        <TabList>
          <Tab>Profile</Tab>
          <Tab>Create Post</Tab>
        </TabList>

        <TabPanel value={0} sx={{ p: 0, pt: 3 }}>
          <Card>
            <Box sx={{ mb: 1 }}>
              <Typography level="title-md">Personal info</Typography>
              <Typography level="body-sm">
                Customize your profile information.
              </Typography>
            </Box>
            <Divider />
            <Stack
              direction="row"
              spacing={3}
              sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
            >
              <Stack direction="column" spacing={1}>
                {isEditingImage ? (
                  <StorageManager
                    acceptedFileTypes={["image/*"]}
                    accessLevel="guest"
                    maxFileCount={1}
                    onUploadSuccess={onUploadSuccess}
                    isResumable
                  />
                ) : (
                  <>
                    <IconButton
                      aria-label="upload new picture"
                      size="sm"
                      variant="outlined"
                      color="neutral"
                      onClick={onEditProfileImageClick}
                      sx={{
                        bgcolor: "background.body",
                        position: "absolute",
                        zIndex: 2,
                        borderRadius: "50%",
                        left: 100,
                        top: 170,
                        boxShadow: "sm",
                      }}
                    >
                      <EditRoundedIcon />
                    </IconButton>
                  </>
                )}
              </Stack>

              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <Stack spacing={1}>
                  <FormLabel>Name</FormLabel>
                  <FormControl
                    sx={{
                      display: { sm: "flex-column", md: "flex-row" },
                      gap: 2,
                    }}
                  >
                    <Input
                      key={profile?.name!}
                      slotProps={{
                        input: {
                          ref: nameRef as React.MutableRefObject<HTMLInputElement>,
                        },
                      }}
                      size="sm"
                      placeholder="Name"
                      defaultValue={profile?.name!}
                    />
                  </FormControl>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      size="sm"
                      type="email"
                      startDecorator={<EmailRoundedIcon />}
                      placeholder="email"
                      disabled
                      defaultValue={profile?.email}
                      value={profile?.email}
                      sx={{ flexGrow: 1 }}
                    />
                  </FormControl>
                </Stack>
              </Stack>
            </Stack>
            <CardOverflow
              sx={{ borderTop: "1px solid", borderColor: "divider" }}
            >
              <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                <Button size="sm" variant="outlined" color="neutral">
                  Cancel
                </Button>
                <Button onClick={onUpdateProfile} size="sm" variant="solid">
                  {isUpdating ? <CircularProgress /> : "Save"}
                </Button>
              </CardActions>
            </CardOverflow>
          </Card>
        </TabPanel>

        <TabPanel value={1} sx={{ p: 0, pt: 3 }}>
          <CreatePostForm
            userId={profile?.userId}
            onSuccess={handlePostCreationSuccess}
          />
        </TabPanel>
      </Tabs>
    </Box>
  );
}
