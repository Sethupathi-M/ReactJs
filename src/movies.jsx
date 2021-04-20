import React, { Component } from "react";
import Like from "./common/Like";
import { getMovies } from "./services/fakeMovieService";
class Movies extends Component {
  state = { movies: getMovies(), movieCount: 0 };

  handleDeleteMovie = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLikeMovie = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  getTableBodyTags() {
    let movies = Array.from(this.state.movies);
    return movies.map((movie) => (
      <tr key={movie._id}>
        <td>{movie.title}</td>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRate}</td>
        <td>{movie.publishDate}</td>
        <td>
          <Like
            liked={movie.liked}
            onClick={() => this.handleLikeMovie(movie)}
          />
        </td>
        <td>
          <button
            onClick={() => this.handleDeleteMovie(movie)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  }

  render() {
    let { length: moviesCount } = this.state.movies;
    if (moviesCount === 0) return <p> There are no moves in the database!</p>;
    return (
      <React.Fragment>
        <p>Showing {moviesCount} movies from the list</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Number In Stock</th>
              <th scope="col">Daily Rental Rate</th>
              <th scope="col">Publish Date</th>
              <th scope="col">Like</th>
            </tr>
          </thead>
          <tbody>{this.getTableBodyTags()}</tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
