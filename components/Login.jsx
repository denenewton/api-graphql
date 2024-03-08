"use client";

import {
  Flex,
  Checkbox,
  Stack,
  Link,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { signInAuthUserWithEmailAndPassword } from "../utils/firebase.utils";
import InputRegister from "../components/InputRegister";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";

export default function Login() {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      push("/");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  return (
    <>
      <Flex
        minH={"80.5vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool <Link color={"blue.400"}>features</Link>{" "}
              ✌️
            </Text>
          </Stack>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 glassmorphism"
          >
            <Stack spacing={2}>
              <InputRegister
                lable="Email address"
                register={register}
                errors={errors}
                type="email"
                name="email"
              />
              <InputRegister
                lable="Password"
                register={register}
                errors={errors}
                type="password"
                name="password"
              />
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-md bg-violet-500 rounded-lg text-white"
                >
                  Sign in
                </button>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Flex>
      <Footer />
    </>
  );
}
