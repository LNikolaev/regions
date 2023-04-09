import Header from "./jsx/components/Header";
import Main from "./jsx/components/Main";
import Footer from "./jsx/components/Footer";

export default function App() {

  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, intial-scale=1.0"/>
      <title>Demo - Payments Team Frontend task</title>
      <link
        rel="stylesheet"
        href="https://www.ft.com/__origami/service/build/v3/bundles/css?components=o-footer@^9.2.6,o-header@^11.0.4,o-grid@^6.0.0,o-colors@^6.0.8,o-typography@^7.0.2,o-forms@^9.7.1,o-table@9.3.0,o-buttons@7.7.5&brand=master&system_code=origami"/>
    </head>
    <body className="o-colors-page-background o-typography-wrapper">
    <Header/>
    <Main/>
    <Footer/>
    </body>
    </html>
  );
}
