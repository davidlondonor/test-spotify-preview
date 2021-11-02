import "../styles/globals.css";
import type { AppProps } from "next/app";
// import Tracks from "../components/Tracks";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Component {...pageProps} />
			{/* <Tracks /> */}
		</>
	);
}

export default MyApp;
