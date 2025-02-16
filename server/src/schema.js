const gql = require("graphql-tag");
const typeDefs = gql`
  type Query {
    product(id: String!): Product
    category(input: CategoryInput!): Category
    categories: [Category]!
    currencies: [Currency]!
  }
  """
  """
  type Product {
    id: ID!
    name: String!
    description: String!
    gallery: [String]!
    inStock: Boolean!
    attributes: [Attribute]!
    prices: [Price]!
    brand: String!
  }

  type Attribute {
    name: String!
    type: String!
    id: String!
    items: [AttributeItem]!
  }

  type AttributeItem {
    displayValue: String!
    value: String!
    id: String!
  }

  type Price {
    currency: Currency!
    amount: Float!
  }

  type Currency {
    label: String!
    symbol: String!
  }

  type Category {
    name: String!
    products: [Product]!
  }

  input CategoryInput {
    title: String!
  }
`;

module.exports = typeDefs;
