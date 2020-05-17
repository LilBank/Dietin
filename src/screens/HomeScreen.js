import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caloriesRemaining: 0,
      caloriesConsumed: 0,
      caloriesBurnOut: 0,
    };
  }
  componentDidMount = async () => {
    const user = await auth().currentUser;
    firestore()
      .collection('calories')
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.data().userId === user.uid) {
          console.log(documentSnapshot.data());
        }
      });
  };

  onEatPress = () => {};

  onWorkOutPress = () => {};

  onResetPress = () => {
    this.setState({
      caloriesRemaining: 0,
      caloriesConsumed: 0,
      caloriesBurnOut: 0,
    });
  };

  onSignOut = () => {
    auth()
      .signOut()
      .then(() => {
        alert('User signed out!');
        this.props.navigation.navigate('Login');
      });
  };

  render() {
    const {caloriesRemaining, caloriesConsumed, caloriesBurnOut} = this.state;
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 25, marginBottom: 30, marginTop: 10}}>
          Calories Remaining
        </Text>
        <Text style={{fontSize: 30, marginBottom: 30}}>
          {caloriesRemaining}
        </Text>
        <Text style={{fontSize: 25, marginBottom: 30}}>
          Consumed {caloriesConsumed}
        </Text>
        <Text style={{fontSize: 25, marginBottom: 45}}>
          Burn Out {caloriesBurnOut}
        </Text>
        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={this.onEatPress}>
          <Text style={{fontSize: 16}}>Eat</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={this.onWorkOutPress}>
          <Text style={{fontSize: 16}}>Workout</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={this.onResetPress}>
          <Text style={{fontSize: 16}}>Reset</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={this.onSignOut}>
          <Text style={{fontSize: 16}}>Sign out</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 10,
    backgroundColor: 'white',
    opacity: 0.7,
    borderColor: 'black',
    borderWidth: 1,
  },
  image: {
    width: 125,
    height: 125,
    marginBottom: 25,
  },
});
