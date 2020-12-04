import React, { Component } from 'react';
import { AlignmentProvider } from 'contexts/alignment';

export default class Wrapper extends Component {
  render() {
    return <AlignmentProvider>{this.props.children}</AlignmentProvider>;
  }
}
