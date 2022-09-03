import React, { Component } from 'react'
// recieve the gallery as prop, gallery is an array of src`s
//the main object is todisplay only three images at once, and create a pagination according to gallery length
//
export default class Gallery extends Component {
  constructor(props) {
    super(props)
    let initialImg = this.props.gallery[1] || this.props.gallery[0]
    this.state = {
      select: initialImg,
      checked: 0,
      start: 0,
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
    this.setState({ checked: index, start: index })
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
        <div className='megos'>
          {this.props.gallery
            .slice(this.state.start * 3, this.state.start * 3 + 3)
            .map((src, index) => {
              return (
                <img
                  onClick={() => this.setState({ select: src })}
                  className='select-image'
                  src={src}
                  key={index}
                  alt={this.props.name}
                />
              )
            })}
        </div>
      </article>
    )
  }
}
