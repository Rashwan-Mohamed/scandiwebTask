import { gql } from '@apollo/client'


export const GET_SINGLE_PRODUCT = gql`
  query product($id: String!) {
    product(id: $id) {
      id
      name
      description
      gallery
      inStock
      attributes {
        name
        type
        id
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`

export const GET_ALL_PRODUCTS = gql`
  query products($path: String!) {
    category(input: { title: $path }) {
      name
      products {
        id
        name
        description
        gallery
        inStock
        attributes {
          name
          type
          id
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`
export const GET_ALL_PRODUCTS_NAVBAR = gql`
  query categories {
    categories {
      name
    }
  }
`

export const GET_CURRENCIES_NAVBAR = gql`
  query currence {
    currencies {
      label
      symbol
    }
  }
`

