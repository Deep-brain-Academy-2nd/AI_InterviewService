import "../styles/globals.css";
//import { useEffect } from "react";
import Head from 'next/head';
import App, { AppProps, AppContext } from "next/app";
import Layout from "../components/layout";
import { Provider } from "react-redux";
import { compose, createStore, Store } from "redux";
import rootReducer from "../store/reducers";

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

  // useEffect(() => {
  //   const jssStyles = document.querySelector('#jss-server-side'); 
  //   if (jssStyles) { 
  //     jssStyles.parentNode.removeChild(jssStyles); 
  //   }

  // }, [])

  return (
    <>
      <Head>
        <title>AI Interview Service</title>
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  )
}

export default MyApp
