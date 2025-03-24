import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNowPlaying, getTopRated, getPopular } from "../../api/tmdb-api";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";
import Spinner from "../spinner";

function MovieListPageTemplate({ movies, title, action, setMovies = null }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [sortFilter, setSortFilter] = useState("now-playing");
  const genreId = Number(genreFilter);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["movies", sortFilter],
    queryFn: () => {
      if (sortFilter === "top-rated") return getTopRated();
      if (sortFilter === "popular") return getPopular();
      return getNowPlaying();
    },
    enabled: !setMovies,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const fetchedMovies = setMovies ? setMovies : data.results || [];

  const displayedMovies = fetchedMovies
    .filter((m) => m.title.toLowerCase().includes(nameFilter.toLowerCase()))
    .filter((m) => (genreId > 0 ? m.genre_ids.includes(genreId) : true));

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "sort" && !setMovies) setSortFilter(value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid key="find" size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} sx={{ padding: "20px" }}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            sortFilter={sortFilter}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies} />
      </Grid>
    </Grid>
  );
}

export default MovieListPageTemplate;
