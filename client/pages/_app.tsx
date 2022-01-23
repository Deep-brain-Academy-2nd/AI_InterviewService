import "../styles/globals.css";
import Head from 'next/head';
import { AppProps } from "next/app";
import Layout from "../components/layout";
import { Provider } from "react-redux";
import { compose, createStore, Store } from "redux";
import rootReducer from "../store/reducers";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../styles/theme";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// store 생성
const configureStore = (): Store => {
  const composeEnhancers = typeof (window as any) !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    composeEnhancers()
  );
  return store;
}

const store = configureStore()

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return (
    <>
      <Head>
        <title>AI Interview Service</title>
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    </>
  )
}

export default MyApp
