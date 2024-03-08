import { GridItem } from "@chakra-ui/react";
import SignupCard from "./SignupCard";
import GridLayout from "../../components/GridLayout";

export default function Register() {
  return (
    <GridLayout title={"sign-up"}>
      <SignupCard />
    </GridLayout>
  );
}
