import React, { Component } from "react";
import ListGroup from "../common/listGroup";
import Pagination from "../common/pagination";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService.js";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import _ from "lodash";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentGenre: "All",
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }
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
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = (genre) => {
    this.setState({ currentGenre: genre, currentPage: 1 });
  };

  handleSortMovies = (sortColumn) => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    let {
      currentPage,
      currentGenre,
      pageSize,
      movies: allMovies,
      sortColumn,
    } = this.state;

    let filtered;
    if (currentGenre === "All") filtered = allMovies;
    else
      filtered = currentGenre
        ? allMovies.filter((movie) => movie.genre.name === currentGenre)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };
  render() {
    let { length: moviesCount } = this.state.movies;
    let {
      currentPage,
      currentGenre,
      pageSize,
      genres: allGenres,
      sortColumn,
    } = this.state;
    const { totalCount, data: movies } = this.getPagedData();
    if (moviesCount === 0) return <p> There are no moves in the database!</p>;
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={allGenres}
            currentGenre={currentGenre}
            onItemsChange={this.handleGenreChange}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} movies from the list</p>

          <MoviesTable
            movies={movies}
            onLike={this.handleLikeMovie}
            onDelete={this.handleDeleteMovie}
            onSort={this.handleSortMovies}
            sortColumn={sortColumn}
          />
          <Pagination
            itemCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
