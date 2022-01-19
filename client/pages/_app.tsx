import "../styles/globals.css"
import Head from 'next/head'
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

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps }
}

export default MyApp
