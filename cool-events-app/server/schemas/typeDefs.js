const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    events: [Event]
  }

  type Event {
    _id: ID
    eventText: String
    eventAuthor: String
    createdAt: String
    notes: [Note]
  }

  type Note {
    _id: ID
    noteText: String
    noteAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    events(username: String): [Event]
    event(eventId: ID!): Event
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addEvent(eventText: String!): Event
    addNote(eventId: ID!, noteText: String!): Event
    removeEvent(eventId: ID!): Event
    removeNote(eventId: ID!, noteId: ID!): Event
  }
`;

module.exports = typeDefs;
