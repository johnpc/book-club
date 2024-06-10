import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
// import "@/styles/globals.css";
import type { AppProps } from "next/app";
import config from "@/amplify_outputs.json";
import Header from "../components/Header";
Amplify.configure(config, { ssr: true });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />

      <Component {...pageProps} />
    </>
  );
}
