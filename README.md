# GraphQL Crash Course

## Resources

- [Apollo Explorer](https://studio.apollographql.com/sandbox/explorer)
  - Allows you to test and send queries to a GraphQL server to see the given responses
- [Apollo Sandbox](https://www.apollographql.com/docs/graphos/explorer/sandbox/)
  - Opens a dummy GraphQL server

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
