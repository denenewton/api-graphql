"use client";

import {
  Flex,
  Box,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
} from "../../utils/firebase.utils";
import { useForm } from "react-hook-form";
import InputRegister from "../../components/InputRegister";
import Footer from "../../components/Footer";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { displayName, email, confirmPassword, password } = data;

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      if (user) {
        await createUserDocumentFromAuth(user, { displayName });
      }

      alert("Sign Up and LogIn was successfully done!");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          alert("This email is invalid!");
          break;
        case "auth/email-already-in-use":
          alert("Cannot create user, email already in use");
          break;
        case "auth/weak-password":
          alert("Password should be at least 6 characters");
          break;
        default:
          console.log("user creation encountered an error", error);
          break;
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
        <Stack
          spacing={8}
          mx={"auto"}
          maxW={"lg"}
          pb={3}
          px={6}
          marginTop="1.5rem"
        >
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Sign up with your email and password
            </Text>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 glassmorphism"
          >
            <Stack spacing={4}>
              <InputRegister
                lable="Display Name"
                register={register}
                errors={errors}
                type="text"
                name="displayName"
              />
              <InputRegister
                lable="Email address"
                register={register}
                errors={errors}
                type="email"
                name="email"
              />
              <HStack>
                <Box>
                  <label>Password</label>
                  <InputGroup>
                    <input
                      className="form_input"
                      {...register("password", {
                        required: true,
                        minLength: 3,
                      })}
                      type={showPassword ? "text" : "password"}
                    />
                    <InputRightElement h={"full"} mt={1}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                    {errors.name?.type == "required" && (
                      <p>This fild must be fill out.</p>
                    )}
                    {errors.name?.type == "minLength" && (
                      <p>The name must be at least 3 characters.</p>
                    )}
                  </InputGroup>
                </Box>
                <Box>
                  <label>Confirm Password</label>
                  <InputGroup>
                    <input
                      className="form_input"
                      {...register("confirmPassword", {
                        required: true,
                        minLength: 3,
                      })}
                      type={showPassword ? "text" : "password"}
                    />
                    <InputRightElement h={"full"} mt={1}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                    {errors.name?.type == "required" && (
                      <p>This fild must be fill out.</p>
                    )}
                    {errors.name?.type == "minLength" && (
                      <p>The name must be at least 3 characters.</p>
                    )}
                  </InputGroup>
                </Box>
              </HStack>
              ;
              <Stack spacing={10} pt={2}>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-md bg-violet-500 rounded-lg text-white"
                >
                  Sign Up
                </button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link href="/sign-in" color={"blue.400"}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Flex>
      <Footer />
    </>
  );
}
