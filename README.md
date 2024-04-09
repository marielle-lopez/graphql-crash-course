# GraphQL Crash Course

## Resources

- [Apollo Explorer](https://studio.apollographql.com/sandbox/explorer)
  - Allows you to test and send queries to a GraphQL server to see the given responses
- [Apollo Sandbox](https://www.apollographql.com/docs/graphos/explorer/sandbox/)
  - Opens a dummy GraphQL server
- [GraphQL: Syntax Highlighting VS Code extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql-syntax)
- [TypeScript compiling issues](https://stackoverflow.com/questions/62619058/appending-js-extension-on-relative-import-statements-during-typescript-compilat)

## What is GraphQL?

- A query language, which is a language we use to query a server to request or mutate data
- Alternative to sending requests to REST APIs via endpoints
  - REST API is more of an architectural style and approach to serving and fetching data
- Still uses HTTP requests under the hood
  - GraphQL handles requests differently to REST APIs
- REST APIs traditionally use endpoints to understand what task it needs to do with the connected database
- Drawbacks of REST APIs:
  - Overfetching -- getting back more data than we need
  - Underfetching, which would typically involve needing to make additional requests to other endpoints
- When sending a request to a server using GraphQL, you typically use a single endpoint
- When sending a query to the server, it's done using GraphQL syntax
- GraphQL syntax involves specifying the data and fields you need
  - This resolves the issue of overfetching

```graphql
Query {
  courses {
    id,
    title,
    thumbnail_url
  }
}
```

- You can fetch nested related data within a single query
  - This resolves the issue of underfetching experienced with REST APIs

```graphql
Query {
  course(id: "1") {
    id,
    title,
    thumbnail_url,
    author {
      name,
      id,
      courses {
        id,
        title,
        thumbnail_url
      }
    }
  }
}
```

- With GraphQL, you can also perform mutations in order to ask the GraphQL server to add new data, update it, or delete it
  - Much like how a `POST` request asks a REST API to add new data to the database

## Making queries

You'll notice that you're able to specify certain data you want to get from the GraphQL server. This is unlike REST APIs, where you receive whatever the API gives.

- This is possible due to how you set up the relationships between data in your GraphQL server

```graphql
query <QueryName> {
  <data-resource> {
    <data-resource-property>,
    <data-resource-property>,
    <data-resource-property> {
      <data-resource-property>
    }
  }
}
```

```graphql
query ReviewsQuery {
  reviews {
    rating
    content
    author {
      name
    }
  }
}
```

```graphql
query {
  game(id: "2") {
    title
    review {
      rating
      author {
        name
      }
    }
  }
}
```

## Making a project with Apollo Server

- [Apollo Server documentation](https://www.apollographql.com/docs/apollo-server/getting-started)

## Schema

A schema describes the shape of the graph and the data available on it. Your GraphQL schema and the data available on it will be similar to the data you store in your database application.

Every GraphQL server uses a schema to define the structure of data that clients can query.

There are five basic scalar types you can use:

- `int`
- `float`
- `string`
- `boolean`
- `ID` -- this is used by GraphQL as a key for data objects

You can make your own types as well.

You can make fields required by adding `!` to the end of a defined property.

The `query` type is required when writing your 'typeDefs'. It defines the entry points to the graph and specifies the return types of such entry points. This is also a way of gatekeeping entry onto your graph.

## Type Definitions ('typeDefs')

Definitions of the different types of data we want expose on the graph. For example, you can make a 'typeDef' for an author data type and then specify the fields an author might have.

The combination of all of the 'typeDefs' and relationships between them, as well as the diffrent kinds of queries that can be made combine up to make something called a schema.

## Resolvers

Resolvers handle requests or queries for data. The schema and the type definitions set up is like a map for Apollo to structure the graph; they don't handle queries. On the other hand, resolvers handle the queries based on the schema and type.

## Query Variables

What if you wanted to fetch a specific review, say, a review with ID 1? You need to use query variables. You also need to add additional entry points to accommodate for this feature.
