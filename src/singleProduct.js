import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Query } from '@apollo/client/react/components'
import { gql } from '@apollo/client'
import { Link } from 'react-router-dom'
import { Handle } from './context'
import Gallery from './gallery'
import Description from './description'

const GET_SINGLE_PRODUCT = gql`
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

class SingleProduct extends Component {
  render() {
    const { currency } = this.context

    return (
      <>
        <Query
          query={GET_SINGLE_PRODUCT}
          variables={{
            id: this.props.productId
              ? this.props.productId
              : window.location.pathname.split('/')[2],
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return 'laoding'
            if (error) return 'error'

            const { name, gallery } = data.product

            return (
              <section className='singleProduct'>
                <Gallery gallery={gallery} name={name}></Gallery>
                <Description
                  currency={currency}
                  data={data.product}
                  
                ></Description>
              </section>
            )
          }}
        </Query>
      </>
    )
  }
}

SingleProduct.contextType = Handle
export default SingleProduct
