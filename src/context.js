import React, { Component } from 'react'

export const Handle = React.createContext('')

export default class Context extends Component {
  constructor(props) {
    super(props)
    this.state = {
      path: 'all',
      productId: '',
      currency: 0,
      symbol: '$',
      cart: [],
      added: false,
      id: '',
      summ: 0,
      totalPrice: 0,
      tax: 0,
    }
    this.recievePath = this.recievePath.bind(this)
    this.recieveId = this.recieveId.bind(this)
    this.setCurrency = this.setCurrency.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.modifyCart = this.modifyCart.bind(this)
  }

  componentWillUnmount() {
    clearTimeout(this.state.id)
  }

  componentDidUpdate() {
    let price = 0
    this.state.cart.map((item) => {
      const {
        amount,
        data: { prices },
      } = item

      return (price = price + prices[this.state.currency].amount * amount)
    })

    price = parseFloat(0.21 * price).toFixed(2)
    if (price !== this.state.totalPrice) {
      this.setState({
        totalPrice: price,
        tax: parseFloat(0.21 * price).toFixed(2),
      })
    }
  }
  recievePath(path) {
    this.setState({ path })
  }
  recieveId(productId) {
    this.setState({ productId })
  }
  setCurrency({ currency, symbol }) {
    this.setState({ currency, symbol })
  }
  addToCart({ data, attributes, amount }) {
    let newItem = { data, attributes, amount }
    let yt = false

    this.state.cart.forEach((item) => {
      if (
        JSON.stringify(newItem.data) === JSON.stringify(item.data) &&
        JSON.stringify(newItem.attributes) === JSON.stringify(item.attributes)
      ) {
        yt = true
        item.amount++
        return this.setState({
          cart: [...this.state.cart],
        })
      }
    })
    if (!yt) {
      this.setState({
        cart: [...this.state.cart, { data, attributes, amount }],
      })
    }
    this.setState({ added: true })
    let id = setTimeout(() => {
      this.setState({ added: false })
    }, 2000)
    this.setState({ id })
    this.calcSum('add')
  }

  modifyCart(index, oper) {
    this.calcSum(oper)
    let mutation = {}
    if (oper === 'add') {
      this.state.cart.forEach((item, num) => {
        if (num === index) {
          mutation = { ...item }
          mutation.amount += 1
        }
      })
      this.setState((old) => ({
        cart: [
          ...old.cart.slice(0, index),
          mutation,
          ...old.cart.slice(index + 1),
        ],
      }))
    }

    if (oper === 'remove') {
      if (this.state.cart[index].amount <= 1) {
        return this.setState((prevState) => ({
          cart: prevState.cart.filter((_, i) => i !== index),
        }))
      } else {
        this.state.cart.forEach((item, num) => {
          if (num === index) {
            mutation = { ...item }
            mutation.amount -= 1
          }
        })
        this.setState((old) => ({
          cart: [
            ...old.cart.slice(0, index),
            mutation,
            ...old.cart.slice(index + 1),
          ],
        }))
      }
    }
  }

  calcSum(oper) {
    if (oper === 'add') {
      this.setState(() => ({
        summ: this.state.summ + 1,
      }))
    }
    if (oper === 'remove') {
      this.setState(() => ({
        summ: this.state.summ - 1,
      }))
    }
  }

  render() {
    return (
      <Handle.Provider
        value={{
          recievePath: this.recievePath,
          recieveId: this.recieveId,
          setCurrency: this.setCurrency,
          addToCart: this.addToCart,
          modifyCart: this.modifyCart,
          path: this.state.path,
          productId: this.state.productId,
          currency: this.state.currency,
          symbol: this.state.symbol,
          added: this.state.added,
          summ: this.state.summ,
          cart: this.state.cart,
          totalPrice: this.state.totalPrice,
          tax: this.state.tax,
        }}
      >
        {this.props.children}
      </Handle.Provider>
    )
  }
}
