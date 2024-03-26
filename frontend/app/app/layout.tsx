import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import Main from "./components/layouts/Main";
import Toast from "./features/toast";
import Providers from "./providers";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webfolio-Review",
  description:
    "Webfolio-Review: webエンジニアのためのポートフォリオ共有プラットフォーム。",
  openGraph: {
    images: ["/Webfolio-Review.png"]
  }
};

interface Props {
  children: React.ReactNode;
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="ja">
      <body>
        <Providers>
          <Header />
          <Main>{children}</Main>
          <Footer />
          <Toast />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
