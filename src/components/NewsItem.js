// import { getByTitle } from '@testing-library/react'
import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
      let {title,description,imageURL,newsURL,author,publish} = this.props;
    return (
      <div>
          <div className="card" style={{width: "18rem"}}>
  <img src={imageURL} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}</p>
    <p className='card-text'><small className='text-muted'/><strong>By:</strong> {author?author:"Unknown"} </p>
    <p className='card-text'><small className='text-muted'/><strong>On:</strong> {new Date(publish).toGMTString()} </p>
    <a href={newsURL} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
        
      </div>
    )
  }
}
