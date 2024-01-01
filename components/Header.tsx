import { Chip, Tab, TabList, Tabs, tabClasses } from "@mui/joy";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/router";
import React from "react";

export default function Header() {
  const router = useRouter();
  const onTabChange = async (e: React.ChangeEvent) => {
    const innerHTML = e.target.innerHTML;
    if (innerHTML.includes("Home")) {
      router.push("/");
    } else if (innerHTML.includes("Profile")) {
      router.push("/profile");
    } else if (innerHTML.includes("Sign Out")) {
      await signOut();
      router.push("/sign-in");
    }
  };
  return (
    <>
      <Tabs
        defaultValue={0}
        sx={{
          bgcolor: "transparent",
        }}
        onChange={(e) => onTabChange(e as React.ChangeEvent)}
      >
        <TabList
          tabFlex={1}
          size="sm"
          sx={{
            pl: { xs: 0, md: 4 },
            justifyContent: "left",
            [`&& .${tabClasses.root}`]: {
              fontWeight: "600",
              flex: "initial",
              color: "text.tertiary",
              [`&.${tabClasses.selected}`]: {
                bgcolor: "transparent",
                color: "text.primary",
                "&::after": {
                  height: "2px",
                  bgcolor: "primary.500",
                },
              },
            },
          }}
        >
          <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset value={0}>
            Home
          </Tab>
          <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset value={1}>
            Profile
          </Tab>
          <Tab sx={{ borderRadius: "6px 6px 0 0" }} indicatorInset value={2}>
            <Chip>Sign Out</Chip>
          </Tab>
        </TabList>
      </Tabs>
    </>
  );
}
