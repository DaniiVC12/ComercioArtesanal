import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="descripcion" content={description} />
        <meta name="palabrasclave" content={keywords} />
        <meta name="autor" content={author} />
        <title>{title}</title>
      </Helmet>
            <Header/>
            <main style= {{ minHeight: "70vh" }}>
            <Toaster />
            {children}</main>
            <Footer/>
        </div>
    );
};

export default Layout;