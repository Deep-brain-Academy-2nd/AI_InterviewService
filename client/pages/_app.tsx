import "../styles/globals.css"
import Head from 'next/head'
import { AppProps } from "next/app";
import Layout from "../components/layout";
import {Provider} from "react-redux";
import {createStore} from "redux";
import rootReducer from "../store/reducers";

const store = createStore(rootReducer)

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (

    <Provider store={store}>
      <Head>
        <title>AI Interview Service</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>

  )
}

export default MyApp
