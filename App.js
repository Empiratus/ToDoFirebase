import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCDf3ncWKBRZmmNHBcylMktDzM4w8m9XPU",
  authDomain: "react-firebase-todo-test.firebaseapp.com",
  databaseURL: "https://react-firebase-todo-test.firebaseio.com",
  projectId: "react-firebase-todo-test",
  storageBucket: "react-firebase-todo-test.appspot.com", 
}

firebase.initializeApp(firebaseConfig);

import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = ({
      email: '',
      password: ''
    })
  }

  signUpUser = (email, password) =>{
    try{
      if (this.state.email.length == 0) {
        alert("Please enter an email address.")
        return;
      }
      else if (this.state.password.length == 0) {
        alert("Please enter a password.")
        return;
      }
      else if (this.state.password.length < 6) {
        alert("Password must be at least 6 characters long.")
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email, password)
    }
    catch(error){
      console.log(error.toString())
    }
  }

  loginUser = (email, password) => {
    try{
      if (this.state.email.length == 0) {
        alert("Please enter an email address.")
        return;
      }
      else if (this.state.password.length == 0) {
        alert("Please enter a password.")
        return;
      }

      firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
        console.log(user)
      })
    }
    catch(error){
      console.log(error.toString())
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({email})}
            />
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(password) => this.setState({password})}
            />
          </Item>

          <Button style={{ marginTop: 10 }}
            full
            rounded
            success
            onPress={()=> this.loginUser(this.state.email, this.state.password)}
          >
            <Text style={{ color: 'white' }}>Login</Text>
          </Button>

          <Button style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={()=> this.signUpUser(this.state.email, this.state.password)}
          >
            <Text style={{ color: 'white' }}>Sign Up</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10,
  },
});
