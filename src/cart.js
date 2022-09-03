import React, { Component } from 'react'
import { Handle } from './context'
import { Link } from 'react-router-dom'
export class Cart extends Component {
  constructor(props) {
    super(props)
    this.modifyIt = this.modifyIt.bind(this)
    this.detectClick = React.createRef()
    this.state = { sure: false }
    this.closeDetect = this.closeDetect.bind(this)
  }

  componentDidMount() {
    window.addEventListener('click', this.closeDetect)
  }
  // the state named sure was added cuz I encourted a weired bug, when the last element in the cart is removed closeDetect doesn`t consider it a child anymore and closes
  //the bag, this occurs only with the last element and not the other ones,
  closeDetect(e) {
    if (
      !this.props.cartClose.current.contains(e.target) &&
      !this.detectClick.current.contains(e.target) &&
      !this.state.sure
    ) {
      this.props.changeMessage('close')
    }
    this.setState({ sure: false })
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.closeDetect)
  }
  modifyIt(index, oper) {
    if (oper === 'add') {
      this.context.modifyCart(index, oper)
    }
    if (oper === 'remove') {
      this.context.modifyCart(index, oper)
    }
  }

  render() {
    const { summ, cart } = this.context

    return (
      <>
        <section ref={this.detectClick} className='bag'>
          {' '}
          <h4>
            <span>My Bag, </span>
            {summ} items
          </h4>
          {cart.length > 0 && (
            <div className='all-items'>
              {cart.map((item, index) => {
                const { data, attributes, amount } = item
                const { name, brand, prices } = data
                const {
                  currency: { symbol },
                } = prices[this.context.currency]
                return (
                  <div key={index} className='details'>
                    {' '}
                    <article className=' cart-items'>
                      <h3>{brand}</h3>
                      <h4>{name}</h4>
                      <div className='price'>
                        <span>
                          {symbol}
                          {prices[this.context.currency].amount}
                        </span>
                      </div>
                      <section className='attributes'>
                        {' '}
                        {data.attributes.map((attribute) => {
                          const { name, id, type, items } = attribute
                          let bvb
                          if (type === 'swatch') bvb = 'bvb'
                          else bvb = 'black'
                          return (
                            <div key={id}>
                              <h3 className='robto'>{name}:</h3>
                              <div className='spans'>
                                {items.map((block) => {
                                  const { id, value } = block
                                  return (
                                    <span
                                      className={`${
                                        id === attributes[name]
                                          ? bvb
                                          : 'undefined'
                                      }`}
                                      style={{
                                        backgroundColor:
                                          type === 'swatch' ? value : 'initial',
                                      }}
                                      key={id}
                                    >
                                      {type === 'swatch' ? '' : value}
                                    </span>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        })}
                      </section>
                    </article>
                    <div className='incremnet'>
                      <div>
                        <button
                          onClick={() => {
                            this.modifyIt(index, 'add')
                          }}
                        >
                          <svg
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M12 8V16'
                              stroke='#1D1F22'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                            <path
                              d='M8 12H16'
                              stroke='#1D1F22'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                            <rect
                              x='0.5'
                              y='0.5'
                              width='23'
                              height='23'
                              stroke='#1D1F22'
                            />
                          </svg>
                        </button>
                        {amount}
                        <button
                          onClick={() => {
                            this.setState({ sure: true })
                            this.modifyIt(index, 'remove')
                          }}
                        >
                          <svg
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M8 12H16'
                              stroke='#1D1F22'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                            <rect
                              x='0.5'
                              y='0.5'
                              width='23'
                              height='23'
                              stroke='#1D1F22'
                            />
                          </svg>
                        </button>
                      </div>

                      <img src={data.gallery[0]} alt='' />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
          <footer className='finish'>
            <h3>Total</h3>
            <h3>
              {' '}
              {this.context.symbol}
              {this.context.totalPrice}
            </h3>
            <Link
              onClick={() => {
                this.props.changeMessage('close')
              }}
              to='/bag'
            >
              VIEW BAG
            </Link>
            <button>CHECK OUT</button>
          </footer>
        </section>
      </>
    )
  }
}
Cart.contextType = Handle
export default Cart
