import React from 'react';
import Image from '../images/link.jpg';
import MarkdownData from '../data/post.md';

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className='profile'>
        <img src={Image} />
        <h1>{MarkdownData.title}</h1>
        <div className='content' dangerouslySetInnerHTML={{__html: MarkdownData.__content}}></div>
      </div>
    )
  }
}