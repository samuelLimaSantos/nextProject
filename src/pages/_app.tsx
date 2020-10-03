import GlobalStyle from '../styles/GlobalStyle';

const MyApp: React.FC = ({ Component, pageProps }: any) => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
