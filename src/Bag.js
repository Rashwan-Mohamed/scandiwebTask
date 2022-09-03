import React, { Component } from 'react'
import { Handle } from './context'

export class Bag extends Component {
  constructor(props) {
    super(props)

    this.state = { pic: 0 }
    this.modifyIt = this.modifyIt.bind(this)
    this.changeIt = this.changeIt.bind(this)
  }
  componentDidMount() {
    let nemo = {}
    this.context.cart.map((item, index) => {
      return (nemo[index] = 0)
    })
    this.setState({ pic: nemo })
  }
  modifyIt(index, oper) {
    if (oper === 'add') {
      this.context.modifyCart(index, oper)
    }
    if (oper === 'remove') {
      this.context.modifyCart(index, oper)
    }
  }
  changeIt(index, oper, len) {
    let ewDFo = {}
    if (oper === 'next') {
      if (this.state.pic[index] >= len - 1) {
        for (let [key, value] of Object.entries(this.state.pic)) {
          if (Number(key) === Number(index)) {
            value = 0
          }
          ewDFo[key] = value
        }
        this.setState({ pic: ewDFo })
      } else {
        for (let [key, value] of Object.entries(this.state.pic)) {
          if (Number(key) === Number(index)) {
            value += 1
          }
          ewDFo[key] = value
        }
        this.setState({ pic: ewDFo })
      }
    }
    if (oper === 'prev') {
      if (this.state.pic[index] <= 0) {
        for (let [key, value] of Object.entries(this.state.pic)) {
          if (Number(key) === Number(index)) {
            value = len - 1
          }
          ewDFo[key] = value
        }
        this.setState({ pic: ewDFo })
      } else {
        for (let [key, value] of Object.entries(this.state.pic)) {
          if (Number(key) === Number(index)) {
            value -= 1
          }
          ewDFo[key] = value
        }
        this.setState({ pic: ewDFo })
      }
    }
  }
  render() {
    const { cart } = this.context

    return (
      <section className=' last '>
        <h4>Cart</h4>

        <div className='all-items'>
          {cart.map((item, index) => {
            const { data, attributes, amount } = item
            const { name, brand, prices } = data
            const {
              currency: { symbol },
            } = prices[this.context.currency]
            let len = data.gallery.length
            return (
              <div key={index} className='details'>
                {' '}
                <article className=' cart-items' key={attributes}>
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
                                    id === attributes[name] ? bvb : 'undefined'
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
                  {len > 1 && (
                    <div className='toggle'>
                      <svg
                        onClick={() => {
                          this.changeIt(index, 'next', len)
                        }}
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <rect
                          width='24'
                          height='24'
                          fill='black'
                          fillOpacity='0.73'
                        />
                        <path
                          d='M14.25 6.06857L8.625 11.6876L14.25 17.3066'
                          stroke='white'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                      <svg
                        onClick={() => {
                          this.changeIt(index, 'prev', len)
                        }}
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <rect
                          width='24'
                          height='24'
                          transform='matrix(-1 0 0 1 24 0)'
                          fill='black'
                          fillOpacity='0.73'
                        />
                        <path
                          d='M9.75 6.06808L15.375 11.6871L9.75 17.3062'
                          stroke='white'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </div>
                  )}

                  <img src={data.gallery[this.state.pic[index]]} alt='' />
                </div>
              </div>
            )
          })}
        </div>

        <footer className='finish'>
          <h3>Tax 21%:</h3>
          <h3>
            {this.context.symbol}
            {this.context.tax}
          </h3>
          <h3>Quantity:</h3>
          <h3>{this.context.summ}</h3>
          <h3>Total:</h3>
          <h3>
            {' '}
            {this.context.symbol}
            {this.context.totalPrice}
          </h3>
        </footer>
      </section>
    )
  }
}
Bag.contextType = Handle
export default Bag
