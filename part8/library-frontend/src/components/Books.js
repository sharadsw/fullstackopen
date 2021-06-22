import React, { useState, useEffect } from "react";

import { ALL_BOOKS } from "../queries/queries";
import { useLazyQuery } from "@apollo/client";

import BooksTable from "./BooksTable";

const Books = (props) => {
  const [getBooks, result] = useLazyQuery(ALL_BOOKS);
  const [filteredGenre, setFilteredGenre] = useState(null);
  const [genres, setGenres] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks({ variables: { genre: filteredGenre } });
  }, [filteredGenre]);

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
      if (!filteredGenre) {
        const b = result.data.allBooks.map(b => b.genres);
        setGenres(genres.concat.apply(genres, b));
      }
    }
  }, [result.data]);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>books</h2>

      {filteredGenre && (
        <span>
          Selected Genre: <b>{filteredGenre}</b>
        </span>
      )}

      <BooksTable books={books} />
      {[...new Set(genres)].map((g) => (
        <button key={g} onClick={() => setFilteredGenre(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => setFilteredGenre(null)}>all genres</button>
    </div>
  );
};

export default Books;
