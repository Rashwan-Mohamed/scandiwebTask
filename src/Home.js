import React, { Component } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

export class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { path: 'all' }
    this.recieveHandle = this.recieveHandle.bind(this)
  }
  recieveHandle(path) {
    this.setState({ path })
  }

  render() {
    return (
      <>
        <Navbar recieve={this.recieveHandle} />
        <Outlet />
      </>
    )
  }
}

export default Home
