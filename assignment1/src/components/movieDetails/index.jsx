import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import { getCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {  // Don't miss this!
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const { data: credits, error, isPending, isError } = useQuery({
    queryKey: ["credits", movie.id],
    queryFn: () => getCredits(movie.id),
  });

  if (isPending) return <Spinner />;
  if (isError) return <Typography variant="h6" color="error">{error.message}</Typography>;

  const cast = credits?.cast?.slice(0, 5);
  const directors = credits?.crew?.filter(member => member.job === "Director");

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>

      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
      
      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Production Countries" sx={{...chip}} color="primary" />
        </li>
        {movie.production_countries.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>

      <Typography variant="h5" component="h3" sx={{ marginTop: 2 }}>Cast</Typography>
      <Paper component="ul" sx={{...root}}>
        {cast?.map((actor) => (
          <li key={actor.id}>
            <Chip label={`${actor.name} as ${actor.character}`} sx={{...chip}} />
          </li>
        ))}
      </Paper>

      <Typography variant="h5" component="h3" sx={{ marginTop: 2 }}>Director(s)</Typography>
      <Paper component="ul" sx={{...root}}>
        {directors?.map((director) => (
          <li key={director.id}>
            <Chip label={director.name} sx={{...chip}} color="secondary" />
          </li>
        ))}
      </Paper>

      <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
      </>
  );
};
export default MovieDetails;
