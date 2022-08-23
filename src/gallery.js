import React, { Component } from 'react'

export default class Gallery extends Component {
  constructor(props) {
    super(props)
    let sliced = []
    let combined = []
    let len = this.props.gallery.length
    let i = 0
    while (len > 0) {
      len -= 3
      sliced = this.props.gallery.slice(i * 3, i * 3 + 3)
      combined.push(sliced)
      i++
    }
    this.state = {
      select: this.props.gallery[0],
      paginted: this.props.gallery.slice(0, 3),
      gallSet: combined,
      checked: 0,
    }
    this.turnIt = this.turnIt.bind(this)
  }

  checkPagintion(gallery) {
    let arraer = []
    let len = gallery.length
    if (len <= 3) {
      return []
    }
    while (len > 0) {
      len -= 3
      arraer.push(len)
    }
    return arraer
  }

  turnIt(index) {
    this.setState({ checked: index })
    this.setState({ paginted: this.state.gallSet[index] })
  }
  render() {
    return (
      <article className='gallery'>
        <img
          className='main-image'
          src={this.state.select}
          alt={this.props.name}
        />

        <div className='pagintion'>
          {this.checkPagintion(this.props.gallery).map((i, index) => {
            return (
              <span
                className={`${
                  this.state.checked === index ? 'checked' : 'undefined'
                }`}
                onClick={() => {
                  this.turnIt(index)
                }}
                key={index}
              ></span>
            )
          })}
            </div>
            <div className='megos' >
            {this.state.paginted.map((img, index) => {
          return (
            <img
              onClick={() => this.setState({ select: img })}
              className='select-image'
              src={img}
              alt={this.props.name}
              key={img}
            />
          )
        })}

            </div>
      </article>
    )
  }
}
