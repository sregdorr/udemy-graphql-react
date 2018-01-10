import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import likeLyric from '../mutations/likeLyric';

class LyricList extends Component {

  handleThumbsUp(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typname: 'Mutation',
        likeLyric: {
          id: id,
          __typename: 'LyricType',
          likes: likes + 1,
        }
      },
    });
  }

  renderLyrics() {
    return (
      this.props.lyrics.map(({ id, content, likes }) => {
        return (
          <li key={id} className='collection-item'>
            {content}
            <div className='vote-box'>
              {likes}
              <i
                className='material-icons'
                onClick={() => this.handleThumbsUp(id, likes)}
              >
                thumb_up
              </i>
            </div>
          </li>
        )
      })
    )
  }

  render() {
    return (
      <ul className='collection'>
        {this.renderLyrics()}
      </ul>
    );
  }
}

export default graphql(likeLyric)(LyricList);
