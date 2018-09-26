import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import { styles } from './styles.css';

export default class ProductInfo extends Component {
  static navigationOptions = {
    title: 'Product Info'
  };

  constructor(props) {
    super(props);
    this.state = { isLoading: true, book: {} };
  }

  async componentDidMount() {
    // Query the book database by ISBN code.
    // const isbn = '0984782850'; // Steve Jobs book
    const isbn = this.props.navigation.getParam('barcode', 0);

    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

    try {
      const res = await fetch(url);
      const results = await res.json();

      if (results.totalItems) {
        // There'll be only 1 book per ISBN
        const book = results.items[0];
        this.setState({
          isLoading: false,
          book
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { isLoading, book } = this.state;

    if (isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.productContainer}>
        <Image
          source={{ uri: book.volumeInfo.imageLinks.smallThumbnail }}
          resizeMode="contain"
          style={{ width: '100%', height: 200 }}
        />
        <View>
          <Text style={styles.text}>{book.volumeInfo.title}</Text>
          <Text style={styles.text}>{book.volumeInfo.subtitle}</Text>
          <Text style={styles.text}>Authors: {book.volumeInfo.authors}</Text>
          <Text style={styles.text}>
            Page Count: {book.volumeInfo.pageCount}
          </Text>
          <Text style={styles.text}>
            Publisher: {book.volumeInfo.publisher}
          </Text>
          <Text style={styles.text}>
            Publish Date: {book.volumeInfo.publishedDate}
          </Text>
          <Text style={styles.text}>{book.accessInfo.webReaderLink}</Text>
        </View>
      </View>
    );
  }
}
