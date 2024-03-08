"use client";

import GridLayout from "../../components/GridLayout";
import { Container } from "@chakra-ui/react";
import RegisterForm from "./RegisterForm";
import Footer from "../../components/Footer";

const page = () => {
  return (
    <GridLayout pathname={`/register`}>
      <Container maxW={"full"} height={"75.5vh"}>
        <RegisterForm />
      </Container>
      <Footer />
    </GridLayout>
  );
};

export default page;
