import React from "react";

const Movie = ({ match, history }) => {
  return (
    <div>
      <h1>Movie from {match.params.id}</h1>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/movies")}
      >
        Save
      </button>
    </div>
  );
};

export default Movie;
