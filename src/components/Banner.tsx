/* eslint-disable camelcase */
import { FC, useState, useEffect } from "react";

import axios from "axios-instance";
import requests from "../request";
import "components/Banner.scss";

type movieProps = {
  title?: string;
  name?: string;
  orignal_name?: string;
  backdrop_path?: string;
  overview?: string;
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

const Banner: FC = () => {
  const [movie, setMovie] = useState<movieProps>({});

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get<Res>(requests.feachNetflixOriginals);
      console.log(request.data.results);
      // apiからランダムで値を取得している
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );

      return request;
    };
    void fetchData();
  }, []);
  console.log(movie);

  const truncate = (str: string | undefined, n: number) => {
    // undefinedを弾く
    if (str !== undefined) {
      return str.length > n ? `${str?.substr(0, n - 1)}...` : str;
    }

    return "";
  };

  return (
    <header
      className="Banner"
      style={{
        backgroundSize: "cover",
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
        backgroundPosition: "center center",
      }}
    >
      <div className="Banner-contents">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.orignal_name}
        </h1>
        <div className="Banner-buttons">
          <button type="button" className="Banner-button">
            Play
          </button>
          <button type="button" className="Banner-button">
            My List
          </button>
        </div>

        <h1 className="Banner-description">{truncate(movie?.overview, 150)}</h1>
      </div>

      <div className="Banner-fadeBottom" />
    </header>
  );
};

export default Banner;
