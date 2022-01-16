import Head from 'next/head'
import { AppProps } from "next/app";
import { ThemeProvider } from "../styles/styled-components";
import GlobalStyle from "../styles/global-styles";
import theme from "../styles/theme";
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <>
      <Head>
        <title>AI Interview Service</title>
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
