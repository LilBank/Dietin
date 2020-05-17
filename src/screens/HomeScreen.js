import React, {Component} from 'react';
import {View, Text, Modal, StyleSheet, TextInput} from 'react-native';
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
      isModalEatVisible: false,
      isModalWorkOutVisible: false,
      workOutValue: 0,
      eatValue: 0,
    };
  }

  componentDidMount = async () => {
    const user = auth().currentUser;
    if (user) {
      try {
        const snapshot = await firestore()
          .collection('calories')
          .get();

        snapshot.forEach(documentSnapshot => {
          const caloriesData = documentSnapshot.data();
          if (user.uid === caloriesData.user_id)
            this.setState({
              caloriesRemaining: caloriesData.calories,
              caloriesConsumed: caloriesData.consume,
              caloriesBurnOut: caloriesData.burn_out,
            });
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  onEatPress = () => {
    this.setState({isModalEatVisible: true});
  };

  onWorkOutPress = () => {
    this.setState({isModalWorkOutVisible: true});
  };

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
        this.props.navigation.navigate('SignIn');
      });
  };

  render() {
    const {
      caloriesRemaining,
      caloriesConsumed,
      caloriesBurnOut,
      isModalEatVisible,
      isModalWorkOutVisible,
    } = this.state;
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalEatVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.container}>
            <Text>Eat</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="?"
                underlineColorAndroid="transparent"
                onChangeText={eatValue => this.setState({eatValue})}
              />
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalWorkOutVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.container}>
            <Text>Work Out</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="?"
                underlineColorAndroid="transparent"
                onChangeText={workOutValue => this.setState({workOutValue})}
              />
            </View>
          </View>
        </Modal>
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
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
});
