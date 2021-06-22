require("dotenv").config();
const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql,
  PubSub,
} = require("apollo-server");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const pubsub = new PubSub();

const Book = require("./model/book");
const Author = require("./model/author");
const User = require("./model/user");

const SECRET_KEY = process.env.SECRET_KEY;
const MONGO_URI = process.env.MONGO_URI;

console.log("connecting to", MONGO_URI);

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("connected"))
  .catch((error) => console.log("error occcured", error.message));

mongoose.set("debug", true);

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
    recommendedBooks: [Book!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favouriteGenre: String!): User

    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filteredBooks = await Book.find({}).populate("author");
      // if (args.author) {
      //   filteredBooks = filteredBooks.filter(b => b.author === args.author)
      // }

      if (args.genre) {
        filteredBooks = await Book.find({
          genres: { $in: [args.genre] },
        }).populate("author");
      }

      return filteredBooks;
    },
    allAuthors: () => {
      console.log("all authors");
      return Author.find({});
    },
    me: (root, args, context) => context.currentUser,
    recommendedBooks: async (root, args, context) => {
      const favouriteGenre = context?.currentUser?.favouriteGenre;
      return Book.find({
        genres: { $in: [favouriteGenre] },
      }).populate("author");
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const name = args.author;
      let author = await Author.findOne({ name });

      if (!author) {
        author = new Author({ name });
        try {
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }

      const book = new Book({
        title: args.title,
        published: parseInt(args.published),
        author: author,
        genres: args.genres,
      });

      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      if (author) {
        author.bookCount = await Book.find({ author }).countDocuments();
        await author.save();
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      let author = await Author.findOne({ name: args.name });

      if (!author) return null;

      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return author;
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userToken = {
        username: user.username,
        id: user._id,
      };

      return {
        value: jwt.sign(userToken, SECRET_KEY),
      };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), SECRET_KEY);

      const user = await User.findById(decodedToken.id);
      return { currentUser: user };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subs at ${subscriptionsUrl}`);
});
