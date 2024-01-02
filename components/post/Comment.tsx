import { Schema } from "@/amplify/data/resource";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import {
  AspectRatio,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Typography,
} from "@mui/joy";
import React from "react";
const dateToString = (date: Date) => {
  const isPm = date.getHours() > 12;
  const hours =
    date.getHours() === 0 ? 12 : isPm ? date.getHours() - 12 : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${date.toDateString()} at ${hours}:${minutes}${isPm ? "pm" : "am"}`;
};
export default function Comment({ comment }: { comment: Schema["Comment"] }) {
  const [profile, setProfile] = React.useState<Schema["Profile"]>();
  React.useEffect(() => {
    const setup = async () => {
      const profileResponse = await fetch(`/api/users/${comment.owner}`);
      const profile = await profileResponse.json();
      setProfile(profile.profile as Schema["Profile"]);
    };
    setup();
  }, []);
  return (
    <>
      <ListItem sx={{ padding: "5px" }}>
        <ListItemDecorator>
          <AspectRatio
            ratio="1"
            maxHeight={50}
            sx={{ flex: 1, minWidth: 50, borderRadius: "100%", padding: "5px" }}
          >
            <StorageImage
              alt={profile?.name ?? profile?.email}
              imgKey={profile?.avatarKey!}
              accessLevel="guest"
              fallbackSrc="https://fdocizdzprkfeigbnlxy.supabase.co/storage/v1/object/public/arbor-eats-app-files/missing-avatar.png"
            />
            ;
          </AspectRatio>{" "}
        </ListItemDecorator>
        <ListItemContent>
          {comment?.content}
          <Typography level="body-xs">
            {profile?.name ?? profile?.email}
          </Typography>
        </ListItemContent>
        <Typography level="body-xs">
          &nbsp;{dateToString(new Date(comment?.createdAt))}
        </Typography>
      </ListItem>
    </>
  );
}
