import React, { Component } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import axios from 'axios';
import { styles } from './styles.css';

export default class ProductList extends Component {
  static navigationOptions = {
    title: 'Book List'
  };

  constructor(props) {
    super(props);
    this.state = { isLoading: true, books: {} };
  }

  async componentDidMount() {
    try {
      const { data: books } = await axios.get(
        'http://f042a9f0.ngrok.io/api/books'
      );
      this.setState({ books, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { isLoading, books } = this.state;

    if (isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, padding: 20 }}>
        {books.map(book => (
          <Text key={book.id} style={[styles.mTop, styles.titleText]}>
            {book.title}
          </Text>
        ))}
      </View>
    );
  }
}
