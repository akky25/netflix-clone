/* eslint-disable camelcase */
import { FC, useState, useEffect } from "react";

import axios from "axios-instance";
import "components/Row.scss";

const baseUrl = "https://image.tmdb.org/t/p/original";

type Props = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

type Movie = {
  id: string;
  name: string;
  title: string;
  original_name: string;
  poster_path: string;
  backdrop_path: string;
};

type Res = {
  results: Movie[];
};

const Row: FC<Props> = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get<Res>(fetchUrl);
      // const tmp = request.data.results;
      // console.log(tmp[0].backdrop_path);
      setMovies(request.data.results);
    };
    void fetchData();
  }, [fetchUrl]);

  return (
    <div className="Row">
      <h2>{title}</h2>
      <div className="Row-posters">
        {/* ポスターコンテンツ */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            className={`Row-poster ${isLargeRow && "Row-poster-large"}`}
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
