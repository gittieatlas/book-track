import React, { Component } from 'react';
import { Text } from 'react-native';

export default class ProductList extends Component {
  static navigationOptions = {
    title: 'Product List'
  };
  render() {
    return <Text>Show Product List Here</Text>;
  }
}
