import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SingleProduct from './singleProduct'
import Products from './products'
import Home from './Home'
import { Handle } from './context'
import Bag from './Bag'
export default class App extends Component {

  render() {
    const { productId, path } = this.context
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}>
              <Route path=':id' element={<Products path={path} />} />
              <Route
                path='product/:single'
                element={<SingleProduct productId={productId} />}
              />
            <Route path='bag' element={<Bag/>} ></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    )
  }
}
App.contextType = Handle
