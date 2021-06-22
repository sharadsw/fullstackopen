import React from "react";

import { useQuery } from "@apollo/client";
import { ME, RECOMMENDED_BOOKS } from "../queries/queries";

import BooksTable from "./BooksTable";

export default (props) => {
  const result = useQuery(RECOMMENDED_BOOKS);
  const user = useQuery(ME);

  if (!props.show) {
    return null;
  }

  if (result.loading || user.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>recommendation</h2>
      <span>
        books in your favourite genre: <b>{user.data.me.favouriteGenre}</b>
      </span>
      <BooksTable books={result.data ? result.data.recommendedBooks : []} />
    </div>
  );
};
