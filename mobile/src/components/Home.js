import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { styles } from './styles.css';

const Button = props => {
  return (
    <TouchableOpacity style={[styles.button]} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Book Track'
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container2}>
        <Image
          style={styles.bookImage}
          source={require('../../../assets/256x256.png')}
        />
        <Text style={styles.text}>
          Book Track is a powerful book management app that gives you access to
          your entire book catalog, anywhere.
        </Text>
        <Text style={styles.text}>
          It allows you to quickly find any book in your library, share your
          favorite books, and keep track of borrowed and lent books.
        </Text>

        <Button text="View Books" onPress={() => navigate('List')} />
        <Button text="Add a book" onPress={() => navigate('Scan')} />
      </View>
    );
  }
}

// navigate('Product Info', { barcode: isbn })
