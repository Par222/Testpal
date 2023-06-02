import "../styles/globals.css";
import TestProvider from "../components/context/TestContext";
import AuthProvider from "../components/context/AuthContext";
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <TestProvider>
        <Component {...pageProps} />
      </TestProvider>
    </AuthProvider>
  );
}
export default MyApp;
