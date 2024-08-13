import React from "react";
import { Header, Content, Footer } from "../components";
import MainHeader from "@/components/main/MainHeader";
import MainContent from "@/components/main/MainContent";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header>
        <MainHeader></MainHeader>
      </Header>
      <Content>
        <MainContent></MainContent>
      </Content>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
