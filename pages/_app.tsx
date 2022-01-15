import Head from 'next/head'
import { AppProps } from "next/app";
import { ThemeProvider } from "../styles/styled-components";
import GlobalStyle from "../styles/global-styles";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>AI Interview Service</title>
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
    
  )  
}

export default MyApp
