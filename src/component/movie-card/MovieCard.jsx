import React from "react";
import "./movie-card.scss";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import { category } from "../api/tmdbApi";
import apiConfig from "../api/apiConfig";
import { FaPlay } from "react-icons/fa";

export default function MovieCard(props) {
  const item = props.item;

  const link = "/details/" + 'tv' + "/" + item.id;

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
  return (
    <Link to={link}>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        <Button>
          <FaPlay></FaPlay>
        </Button>
      </div>
      <h3 className="text-success">{item.title || item.name}</h3>
    </Link>
  );
}
