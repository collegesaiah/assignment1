import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const AddToMustWatchIcon = ({ movie }) => {
      const context = useContext(MoviesContext);
    
      const handleAddToMustWatch = (e) => {
        e.preventDefault();
        context.addToMustWatch(movie);
        console.log("Current Must Watch list:", context.mustWatch); // Added console.log
        console.log("Added movie:", movie.title, "with ID:", movie.id); // Added movie details
      };
    
      return (
        <IconButton aria-label="add to must watch" onClick={handleAddToMustWatch}>
          <PlaylistAddIcon color="primary" fontSize="large" />
        </IconButton>
      );
    };

export default AddToMustWatchIcon;