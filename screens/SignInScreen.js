// Import necessary components from React and React Native libraries
import * as React from 'react';
import  {useState} from 'react';
import { View, Text, ScrollView,StyleSheet, Image, TextInput, Dimensions, TouchableHighlight } from 'react-native';

// Import Firebase auth library and our firebase config file
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"

// Get device height and width for styling purposes
let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

// Define function component called SignInScreen that takes in navigation props
function SignInScreen({ navigation }) {

  // Initialize email and password state variables using useState hook
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // Define signInHandler function within SignInScreen component
  signInHandler = () => {
    // Use Firebase auth library's signInWithEmailAndPassword method to sign in user
    signInWithEmailAndPassword(auth, email,  password)
        .then((userCredential) => {
            // Once user signed in, navigate to Home screen
            navigation.navigate('Home')
        })
        .catch((error) => {
          // If there's an error, alert user with error message
          const errorCode = error.code;
          const errorMessage = error.message;
          alert('Error: '+ errorMessage)
        }); 
  }

  // Return the following JSX code as component's UI
  return (
      <ScrollView contentContainerStyle={styles.container}>
          <View>
              {/* Display logo on screen */}
              <Image
                  source={require('../assets/Logo.png')}
                  style={styles.logo}
              />
          </View>

          <View>
              {/* Display text object with 'Log in to your account' text */}
              <Text style={styles.text}>Log in to your account</Text>
          </View>
                  
          {/* Display email text input and email icon */}
          <View style={styles.LogoTextInputContainer}>
              <View style={styles.LogoContainer}>
                  <Image
                      source={require('../assets/email.png')}
                      style={styles.emailLogo}
                  />
              </View>
              <View style={styles.TextInputContainer}> 
                  <TextInput style={styles.TextInput}
                      placeholder="Email"
                      onChangeText={(email) => setEmail(email)}
                      value={email}
                  /> 
              </View>
          </View>

          {/* Display password text input and password icon */}
          <View style={styles.LogoTextInputContainer}>
              <View style={styles.LogoContainer}>
                  <Image
                      source={require('../assets/password_locked.png')}
                      style={styles.passwordLogo}
                  />
              </View>
              <View style={styles.TextInputContainer}> 
                  <TextInput style={styles.TextInput}
                      placeholder="Password"
                      secureTextEntry= {true}
                      onChangeText={(password) => setPassword(password)}
                      value={password}
                  /> 
              </View>
          </View>

          {/* Display sign in button */}
          <View style={styles.buttonContainer}>
              <TouchableHighlight 
                  onPress={() => { 
                      signInHandler()
                  }}
              >
                      <View style={styles.button}> 
                          <Text style={styles.buttonText}>Sign In</Text>
                      </View>
              </TouchableHighlight>
          </View>

          {/* Display 'Forget Password?' text link */}
          <View style={styles.LinkButton}> 
              <TouchableHighlight
                  onPress={() => { 
                      
                  }}
              >
                  <Text style={styles.LinkButtonText}>Forget Password?</Text>
              </TouchableHighlight>
          </View>

          {/* Display 'Don't have an account?' text link */}
          <View style={styles.LinkButton}> 
              <TouchableHighlight
                  onPress={() => { 
                      navigation.navigate('SignUp')
                  }}
              >
                  <Text style={styles.LinkButtonText}>Don't have an account?</Text>
              </TouchableHighlight>
          </View>
          <Image
               style={styles.logo3}
               source={require('../assets/users/logo3.jpeg')}
      />
      </ScrollView>
  );
}

// Export SignInScreen component as default
export default SignInScreen;

// Define component stylesheet as const called styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'black',
        paddingBottom: 210
        
    },
    logo: {
       height: 0.2 * deviceHeight,
        width: 0.8 * deviceWidth,
        resizeMode: "contain",
        marginTop:10
        
        

    },
    text: {
        fontSize: 24,
        marginTop: 10,
        marginBottom: 10,
        color: '#ff8c00',
    },
    LogoTextInputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        
    },
    LogoContainer: {
        height: 50,
        width: 1*deviceWidth/8,
        borderWidth: 1,
        borderColor: '#ff8c00',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    emailLogo: {
        height:  0.08 * deviceWidth,
        width: 0.08 * deviceWidth,
    },
    passwordLogo: {
        height: 0.08 * deviceWidth,
        width: 0.08 * deviceWidth,
    },
    TextInput: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 5,
        marginBottom: 0,
        fontWeight: 'bold'
        
    },
    TextInputContainer: {
        // height: 50,
        // width: 5*deviceWidth/8,
         borderWidth: 1,
        // borderColor: '#ff8c00',
        // justifyContent: 'center',
        // borderTopRightRadius: 0, 
         borderBottomRightRadius: 15,
        // color: "#ffa500",
        // fontWeight: 'bold'
        borderRadius: 20,
        width: "80%",
        height:"100%"

    },
    buttonContainer: {
        marginTop: 25,
       
    },
    button: {
        backgroundColor: '#ff8c00',
        height: 50,
        width: 6*deviceWidth/8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    LinkButton: {
        marginTop: 25
    },
    LinkButtonText: {
        fontWeight: 'bold',
        color: '#ffa500',
    },
    logo3:{
        width: '90%',
        height: '32%',
        position: "absolute",
        resizeMode: 'contain',
        bottom: 20,
      },

    
});