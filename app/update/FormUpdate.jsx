"use client";

import useMovieByTitle from "../../hook/useMovieByTItle";
import { useEffect, useState } from "react";
import useUpdate from "../../hook/useUpdate";
import Footer from "../../components/Footer";
import { Container } from "@chakra-ui/layout";
import Form from "../../components/Form";

export default function FormUpdate({ slug }) {
  const { data } = useMovieByTitle(decodeURI(slug));
  const { updateMovie } = useUpdate();
  const [movie, setMovie] = useState();
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (data) {
      setMovie({
        title: data?.title,
        genre: data?.genre,
        director: data?.director,
        year: data?.year,
        description: data?.description,
        popularity: data?.popularity,
        urlMovie: data?.urlMovie,
      });
    }
  }, [data, slug]);

  const onSubimit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateMovie(data?.id, movie);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxW={"full"} height={"75.5vh"} p={0}>
      <Form
        type="Update"
        movie={movie}
        handleSubmit={onSubimit}
        submitting={submitting}
        setMovie={setMovie}
      />
      <Footer />
    </Container>
  );
}
