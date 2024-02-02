import React, { Component } from 'react';
import './ListErrors.css'


class ListErrors extends Component {
  render() {
    const { errors } = this.props;
    if (errors) {
      return (
        <ul className="listErrors__item">
          {
            Object.keys(errors).map(key => {
              return (
                <li key={key}>
                  {key}:  {errors[key]}
                </li>
              );
            })
          }
        </ul>
      );
    } else {
      return null;
    }
  }
}

export default ListErrors;