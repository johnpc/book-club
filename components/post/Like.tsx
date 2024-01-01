import { Schema } from "@/amplify/data/resource";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import { AspectRatio } from "@mui/joy";
import React from "react";

export default function Like({ like }: { like: Schema["Like"] }) {
  const [profile, setProfile] = React.useState<Schema["Profile"]>();
  React.useEffect(() => {
    const setup = async () => {
      const profileResponse = await fetch(`/api/users/${like.owner}`);
      const profile = await profileResponse.json();
      setProfile(profile.profile as Schema["Profile"]);
    };
    setup();
  }, []);
  return (
    <>
      <AspectRatio
        ratio="1"
        maxHeight={50}
        sx={{ flex: 1, width: 50, borderRadius: "100%", padding: "5px" }}
      >
        <StorageImage
          alt={profile?.email}
          imgKey={profile?.avatarKey!}
          accessLevel="guest"
          fallbackSrc="https://fdocizdzprkfeigbnlxy.supabase.co/storage/v1/object/public/arbor-eats-app-files/missing-avatar.png"
        />
        ;
      </AspectRatio>{" "}
    </>
  );
}
