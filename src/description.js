import React, { Component } from 'react'
import { Handle } from './context'

export class Description extends Component {
  constructor(props) {
    super(props)
    let tribute = {}
    const { attributes } = this.props.data
    attributes.map((attribute) => {
      const { name, id, type, items } = attribute
      tribute[id] = ''
    })
    this.state = { selected: tribute, check: false,}
    this.sentItem = this.sentItem.bind(this)
    this.setAttribute = this.setAttribute.bind(this)
  }

  setAttribute({ id, name }) {
    this.setState({ selected: { ...this.state.selected, [name]: id } })
  }

  sentItem() {
    for (let att in this.state.selected) {
      if (!this.state.selected[att]) {
        return this.setState({ check: true })
      }
    }
    this.setState({ check: false })

    this.context.addToCart({
      data: this.props.data,
      attributes: this.state.selected,
      amount: 1,
    })
  }

    render() {
        const { added }=this.context
    const { name, description, prices, brand, attributes, id,inStock } = this.props.data
    const {
      amount,
      currency: { symbol },
    } = prices[this.props.currency]
    return (
      <article className='description'>
        <h3>{brand}</h3>
        <h4>{name}</h4>
        <section className='attributes'>
          {attributes.map((attribute) => {
            const { name, id, type, items } = attribute
            let bvb
            if (type === 'swatch') bvb = 'bvb'
            else bvb = 'black'
            return (
              <div key={id}>
                <h3 className='robto'>{name}:</h3>
                <div className='spans'>
                  {items.map((block) => {
                    const { id, displayValue, value } = block
                    return (
                      <span
                        className={`${
                          this.state.selected[name] === id ? bvb : 'undefined'
                        }`}
                        onClick={() => {
                          this.setAttribute({ name, id })
                        }}
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
        <div className='price'>
          <h3 className='robto'>Price:</h3>{' '}
          <span>
            {symbol}
            {amount}
          </span>
        </div>
        {inStock ? (
          <button
            onClick={() => {
              this.sentItem()
            }}
            className='add-cart'
          >
            ADD TO CART
          </button>
        ): <h5 className='cantBuy' >OUT OF STOCK</h5>  }

        {this.state.check && <p>All attributes must be selected! </p>}
        {added && <p>item added to cart. </p>}
        <div
          className='desc'
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </article>
    )
  }
}

Description.contextType = Handle

export default Description
