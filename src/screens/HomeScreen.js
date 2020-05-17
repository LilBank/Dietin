import React, {Component} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentId: '',
      caloriesRemaining: 1800,
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
              documentId: documentSnapshot.ref.id,
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
    firestore()
      .collection('calories')
      .doc(documentId)
      .update({
        calories: 1800,
        consume: 0,
        burn_out: 0,
      });
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

  onEatSubmit = () => {
    const {documentId, eatValue, caloriesRemaining} = this.state;
    const currentCalories = caloriesRemaining - eatValue;
    firestore()
      .collection('calories')
      .doc(documentId)
      .update({
        calories: currentCalories,
        consume: eatValue,
      })
      .then(() => {
        alert('Updated!');
        this.setState({
          caloriesRemaining: currentCalories,
          caloriesConsumed: eatValue,
          isModalEatVisible: false,
        });
      });
  };

  onWorkOutSubmit = () => {
    const {documentId, workOutValue, caloriesRemaining} = this.state;
    const currentCalories = caloriesRemaining + workOutValue;
    firestore()
      .collection('calories')
      .doc(documentId)
      .update({
        calories: currentCalories,
        burn_out: workOutValue,
      })
      .then(() => {
        alert('Updated!');
        this.setState({
          caloriesRemaining: currentCalories,
          caloriesBurnOut: workOutValue,
          isModalWorkOutVisible: false,
        });
      });
  };
  s;

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
          visible={isModalEatVisible}
          onRequestClose={() => {
            this.setState({isModalEatVisible: false});
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
            <TouchableHighlight
              style={styles.buttonContainer}
              onPress={this.onEatSubmit}>
              <Text>Submit</Text>
            </TouchableHighlight>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          visible={isModalWorkOutVisible}
          onRequestClose={() => {
            this.setState({isModalWorkOutVisible: false});
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
            <TouchableHighlight
              style={styles.buttonContainer}
              onPress={this.onWorkOutSubmit}>
              <Text>Submit</Text>
            </TouchableHighlight>
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
    backgroundColor: '#DCDCDC',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
