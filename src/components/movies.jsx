import React, { Component } from "react";
import ListGroup from "../common/listGroup";
import Pagination from "../common/pagination";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService.js";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./../common/searchBox";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentGenre: "All",
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
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
    this.setState({ currentGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentGenre: null, currentPage: 1 });
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
      searchQuery,
    } = this.state;

    let filtered = allMovies;
    if (currentGenre === "All") filtered = allMovies;
    else if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (currentGenre)
      filtered = allMovies.filter((m) => m.genre.name === currentGenre);

    //
    // else
    //   filtered = currentGenre
    //     ? allMovies.filter((movie) => movie.genre.name === currentGenre)
    //     : allMovies;

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
      searchQuery,
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
          <Link
            style={{ marginBottom: 20 }}
            to="/movies/new"
            className="btn btn-primary"
          >
            New Movie
          </Link>
          <p>Showing {totalCount} movies from the list</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />

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
