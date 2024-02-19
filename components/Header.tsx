import { Tab, TabList, Tabs, tabClasses } from "@mui/joy";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

export default function Header() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>A2 Book Club</title>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Tabs
        defaultValue={0}
        sx={{
          bgcolor: "transparent",
        }}
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
            <div onClick={() => router.push("/")}>Home</div>
          </Tab>
        </TabList>
      </Tabs>
    </>
  );
}
