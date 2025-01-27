import React from "react";
import { useParams } from "react-router";

import PageHeader from "../page-header/PageHeader";

import { category as cate } from "../api/tmdbApi";
import MovieGrid from "../movie-grid/MovieGrid";
import '../css/categories.css'
export default function Catalog() {
  const { category } = useParams();
  return (
    <div>
      <PageHeader>
        {category === cate.movie ? "Movies" : "TMovies"}
      </PageHeader>
      <div className="container details">
        <div className="section pb-5 ">
          <MovieGrid category={category} />
        </div>
      </div>
    </div>
  );
}
