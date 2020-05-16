import React, {Component} from 'react';
import {View, Text, Button} from 'native-base';

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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Calories Remaining</Text>
        <Text>{caloriesRemaining}</Text>
        <Text>Consumed {caloriesConsumed}</Text>
        <Text>Burn Out {caloriesBurnOut}</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Button transparent>Eat</Button>
          <Button transparent>Workout</Button>
        </View>
      </View>
    );
  }
}
