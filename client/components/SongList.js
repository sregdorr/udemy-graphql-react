import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

import fetchSongs from '../queries/fetchSongs';
import deleteSong from '../mutations/deleteSong';


class SongList extends Component {
  onDeleteClick(id) {
    this.props.mutate({
      variables: { id }
    }).then(() => this.props.data.refetch());
  }

  renderSongs() {
    const { songs } = this.props.data;

    return this.props.data.songs.map(song => {
      const { id, title } = song;
      return (
        <li
          key={id}
          className={'collection-item'}
        >
          <Link to={`/songs/${id}`}>{title}</Link>
          <i
            className='material-icons'
            onClick={() => this.onDeleteClick(id)}
          >
            delete
          </i>
        </li>
      )
    })
  }

  render() {
    if (this.props.data.loading) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <ul className={'collection'}>
          {this.renderSongs()}
        </ul>
        <Link
          to="/songs/new"
          className='btn-floating btn-large red right'
        >
          <i className='material-icons'>add</i>
        </Link>
      </div>
    );
  }
}

export default graphql(deleteSong)(
  graphql(fetchSongs)(SongList)
);