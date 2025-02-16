import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import { Handle } from "./context";
import Gallery from "./gallery";
import Description from "./description";
import { GET_SINGLE_PRODUCT } from "./queries";

class SingleProduct extends Component {
  render() {
    const { currency } = this.context;

    return (
      <>
        <Query
          query={GET_SINGLE_PRODUCT}
          variables={{
            productId: this.props.productId
              ? this.props.productId
              : String(window.location.pathname.split("/")[2]),
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return "laoding";
            if (error) return "error";
            console.log(data.getProductById);

            const { getProductById } = data;
            const { name, gallery } = getProductById;

            return (
              <section className="singleProduct">
                <Gallery gallery={gallery} name={name}></Gallery>
                <Description
                  currency={currency}
                  data={getProductById}
                ></Description>
              </section>
            );
          }}
        </Query>
      </>
    );
  }
}

SingleProduct.contextType = Handle;
export default SingleProduct;
