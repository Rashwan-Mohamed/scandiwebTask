import { gql } from "@apollo/client";

export const GET_SINGLE_PRODUCT = gql`
  query GetProductById($productId: ID!) {
    getProductById(productId: $productId) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      brand
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query GetAllCategories($category: String!) {
    getAllProducts(category: $category) {
      id
      name
      inStock
      gallery
      description
      category

      brand
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
    }
  }
`;
export const GET_ALL_PRODUCTS_NAVBAR = gql`
  query GetAllCategories {
    getAllCategories {
      name
    }
  }
`;

export const GET_CURRENCIES_NAVBAR = gql`
  query GetAllCategories {
    GetCurrency {
      label
      symbol
    }
  }
`;
