import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caloriesRemaining: 0,
      caloriesConsumed: 0,
      caloriesBurnOut: 0,
    };
  }
  componentDidMount() {
    this.setState({caloriesRemaining: 1500});
  }

  render() {
    const {caloriesRemaining, caloriesConsumed, caloriesBurnOut} = this.state;
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20, marginBottom: 30, marginTop: 30}}>
          Calories{'\n'}Remaining
        </Text>
        <Text style={{fontSize: 20, marginBottom: 30}}>
          {caloriesRemaining}
        </Text>
        <Text style={{fontSize: 20, marginBottom: 30}}>
          Consumed {caloriesConsumed}
        </Text>
        <Text style={{fontSize: 20, marginBottom: 30}}>
          Burn Out {caloriesBurnOut}
        </Text>
        <TouchableHighlight style={styles.buttonContainer} onPress={() => {}}>
          <Text>Eat</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.buttonContainer} onPress={() => {}}>
          <Text>Workout</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.buttonContainer} onPress={() => {}}>
          <Text>Reset</Text>
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
