import React, { useState, useEffect } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";

import { BOOK_ADDED, ALL_BOOKS } from "./queries/queries";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommendation from "./components/Recommendation";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const updateCacheWith = (addedBook, queryObj) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery(queryObj);
    console.log(dataInStore);
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        ...queryObj,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newBook = subscriptionData.data.bookAdded;
      window.alert(`New book added: ${newBook.title}`);
      updateCacheWith(newBook, {
        query: ALL_BOOKS,
        variables: { genre: null },
      });
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("user-token");
    if (token) setToken(token);
  }, []);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("user-token");
    client.resetStore();
  };

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recs")}>recommendations</button>
        <button onClick={handleLogout}>logout</button>
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} updateCacheWith={updateCacheWith} />

      <Recommendation show={page === "recs"} />
    </div>
  );
};

export default App;
