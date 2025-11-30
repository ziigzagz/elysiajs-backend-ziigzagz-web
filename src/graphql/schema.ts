export const typeDefs = `
  type User {
    id: Int!
    email: String!
    name: String
    createdAt: String!
  }

  type Query {
    users: [User!]!
    user(id: Int!): User
    me: User
  }

  type Mutation {
    register(email: String!, password: String!, name: String): User!
    login(email: String!, password: String!): AuthPayload!
  }

  type AuthPayload {
    accessToken: String!
    refreshToken: String!
  }
`;
