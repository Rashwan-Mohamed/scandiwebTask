import React, { Component } from 'react'
import { Query } from '@apollo/client/react/components'
import { Handle } from './context'
import Gallery from './gallery'
import Description from './description'
import {GET_SINGLE_PRODUCT} from './queries'


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
