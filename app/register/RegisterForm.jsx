"use client";

import { addCollection } from "../../utils/firebase.utils";
import useCreateMovie from "../../hook/useMovieById";
import { useRouter } from "next/navigation";
import { Container } from "@chakra-ui/react";
import Link from "next/link";

const RegisterForm = () => {
  const {
    error,
    payload,
    setPayload,
    submitting,
    setIsSubmitting,
    createAMovie,
    createCast,
  } = useCreateMovie();

  const router = useRouter();

  const onSubimit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const movie = await createAMovie(payload.id, payload.urlMovie);
      console.log(movie);
      if (movie) {
        const resp = await createCast(payload.id);
        console.log(resp);
        if (resp) await addCollection("movies", movie);
        router.push("/");
      } else {
        console.log("Somethin goes wrong...");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <Container
      alignItems="center"
      mx="auto"
      p={0}
      mt={10}
      maxW="none"
      centerContent
    >
      <h1 className="head_text text-center">
        <span className="dark_gradient">Post a new Movie!!</span>
      </h1>
      <p className="desc text-center max-w-md">
        Post a new movie here. You just need an Id and the url of the movie,
        where we can get the midia from.
      </p>
      <form
        onSubmit={onSubimit}
        className="mt-7 w-full max-w-2xl flex flex-col gap-5 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base">ID</span>
          <input
            type="number"
            value={payload.id}
            className="form_input"
            onChange={(e) => setPayload({ ...payload, id: e.target.value })}
            required
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base">
            URL Movie
          </span>
          <input
            type="text"
            value={payload.urlMovie}
            className="form_input"
            onChange={(e) =>
              setPayload({ ...payload, urlMovie: e.target.value })
            }
            required
          />
        </label>

        <div className="flex justify-end items-center  my-5 gap-4">
          <Link
            href="/"
            className="px-5 py-1.5 rounded-full text-sm border border-1"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-violet-500 rounded-full text-white"
          >
            {submitting ? "Postting..." : "Post"}
          </button>
        </div>
      </form>
    </Container>
  );
};

export default RegisterForm;
