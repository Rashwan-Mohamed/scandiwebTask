const gql = require("graphql-tag");
const typeDefs = gql`
  type Query {
    getAllCategories: [Category!]!
    getAllProducts(category: String!): [Product!]!
    getProductsByCategory(category: String!): [Product!]!
    getProductById(productId: ID!): Product
    GetCurrency: Currency!
  }
  type Category {
    name: String!
  }

  type Attribute {
    id: String!
    displayValue: String!
    value: String!
  }

  type AttributeSet {
    id: String!
    name: String!
    type: String!
    items: [Attribute!]!
  }

  type Currency {
    label: String!
    symbol: String!
  }

  type Price {
    amount: Float!
    currency: Currency!
  }

  type Product {
    id: ID!
    name: String!
    inStock: Boolean!
    gallery: [String!]!
    description: String!
    category: String!
    attributes: [AttributeSet!]!
    prices: [Price!]!
    brand: String!
  }
`;

module.exports = typeDefs;
