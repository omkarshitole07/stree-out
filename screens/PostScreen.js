import React, { useState } from 'react';
import { Button, Image, View, Text, ScrollView, TouchableHighlight, StyleSheet, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { manipulateAsync } from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';

let predictionValue = "";

const PostScreen = () => {
  // State to store the URI of the selected image
  const [imageUri, setImageUri] = useState(null);
  const [prediction, setPrediction] = useState(false);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  // Handler for when an image is picked from the gallery or taken from the camera
  const handleImagePickerResult = (result) => {
    if (!result.canceled) {
      setImageUri(result.uri);
    }
  };

  // Handler for when the "Pick Image from Gallery" button is pressed
  const handleImagePickPress = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
      handleImagePickerResult(result);
    } catch (error) {
      console.error(error);
      alert('An error occurred while picking the image.');
    }
  };

  // Handler for when the "Take Photo with Camera" button is pressed
  const handleCameraPress = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({ quality: 1 });

      handleImagePickerResult(result);
    } catch (error) {
      console.error(error);
      alert('An error occurred while taking the photo.');
    }
  };

  // Handler for when the "Upload" button is pressed
  const handleUploadPress = async () => {
    // Check if an image has been selected
    if (!imageUri) {
      alert('Please select an image to upload!');
      return;
    }
  
    // Get the current user's ID and Firestore document reference
    const auth = getAuth();
    const storage = getStorage();
    const db = getFirestore();
    const userID = auth.currentUser.uid;
    const userRef = doc(db, 'users', userID);

    try {
      // Compress the image
      const compressedImage = await manipulateAsync(imageUri, [{ resize: { width: 500 } }], {
        compress: 0.5,
        format: 'jpeg',
        base64: false,
      });
      if (!compressedImage || !compressedImage.uri) {
        alert('An error occurred while compressing the image.');
        return;
      }
      const compressedImageUri = compressedImage.uri;
      if (!compressedImageUri) {
        alert('An error occurred while compressing the image.');
        return;
      }

      // Upload the image to Firebase Storage
      const response = await fetch(compressedImageUri);
      if (!response.ok) {
        alert(`An error occurred while uploading the image: ${response.status}`);
        return;
      }
      // This code block uses the response blob from an uploaded image to store it in Firebase Storage.
      const blob = await response.blob();
      // It first extracts the file name from the compressedImageUri, 
      //and then creates a reference to the Firebase Storage location where it will be stored. 
      const filename = compressedImageUri.split('/').pop();
      const storageRef = ref(storage, `${userID}/${filename}`);
      // The uploadBytes function is then called with the storage reference and the blob as arguments,
      // causing the image to be uploaded to Firebase.
      await uploadBytes(storageRef, blob);

      // Get the download URL of the uploaded image and store it in the user's Firestore document
      const downloadURL = await getDownloadURL(storageRef);
      // This code uses the updateDoc function to store the downloadURL of an uploaded image in Firestore.
      await updateDoc(userRef, { downloadURL });
      // If the URL is successfully stored, it logs a success message to the console, displays an alert to the user, 
      console.log('Image URL stored in Firestore successfully!',downloadURL);
      alert('Image uploaded successfully!');
      // and resets the imageUri to null. If there is an error, it logs the error to the console and 
      setImageUri(null);
    } 
    // displays an error alert to the user.
    catch (error) {
      console.error(error);
      alert('An error occurred while uploading the image.');
    }
  };

  // 11/01/2023 by Yuxiang Liu
  const handleAnalyzePress = async () => {
    setPrediction(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.6,
    });

    if (!result.canceled) {
      // Convert the selected image to base64
      try {
        const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const jsonBody = {
          "image": base64
        };
        sendJSONToAPI(jsonBody);
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  const sendJSONToAPI = async (jsonBody) => {
    try {
      startTimer();
      setLoading(true);
      const apiUrl = 'https://render-detection-api.onrender.com'; 
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonBody),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }else{
        const jsonResponse = await response.json();
        console.log('API response:', jsonResponse);
        if(jsonResponse.prediction=="<0.01"){
          predictionValue = "\nless than 1%";
        }else{
          let roundedNumber = Math.round(Number(jsonResponse.prediction) * 100);
          predictionValue = roundedNumber + "%";
        }
        setLoading(false);
        clearTimeout(timer1);
        clearTimeout(timer2);
        setStatus('');
        setPrediction(true);
      }
    } catch (error) {
      setLoading(false);
      clearTimeout(timer1);
      clearTimeout(timer2);
      setStatus('');
      console.error('Error sending JSON to API:', error);
      alert('Falied to analyze image \n Please try again later');
    }
  };
  const startTimer = () => {
    setStatus('Activating server...');
    timer1 = setTimeout(() => {
      setStatus('Sending image...');
      timer2 = setTimeout(() => {
        setStatus('Analyzing image...');
      }, 2000);
    }, 3000);
  };

   // Return JSX elements to draw UI
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 300, height: 300, marginTop: 150}} />}
      </View>
      <View style={styles.buttonContainer}>
          <TouchableHighlight 
              onPress={() => { 
                handleImagePickPress();
              }}
          >
                  <View style={styles.button}> 
                      <Text style={styles.buttonText}>Pick Image from Gallery</Text>
                  </View>
          </TouchableHighlight>
      </View>
      <View style={styles.buttonContainer}>
          <TouchableHighlight 
              onPress={() => { 
                handleCameraPress();
              }}
          >
                  <View style={styles.button}> 
                      <Text style={styles.buttonText}>Take Photo with Camera</Text>
                  </View>
          </TouchableHighlight>
      </View>
      <View style={styles.buttonContainer}>
          <TouchableHighlight 
              onPress={() => { 
                handleUploadPress();
              }}
          >
                  <View style={styles.button}> 
                      <Text style={styles.buttonText}>Upload</Text>
                  </View>
          </TouchableHighlight>
      </View>
      <View style={styles.buttonContainer}>
          <TouchableHighlight 
              onPress={() => { 
                handleAnalyzePress();
              }}
          >
                  <View style={styles.button}> 
                      <Text style={styles.buttonText}>Analyze image</Text>
                  </View>
          </TouchableHighlight>
      </View>
        <View style={styles.horizontal}>
          <View style={styles.progressBox}>
            {loading && (
              <ActivityIndicator size="small" color="#ff8c00" />
            )}
          </View>
          <View style={styles.analyzeBox}>
            {status && <Text style={styles.analyzeText}>{status}</Text>}
            {prediction && <Text style={styles.analyzeText}>The probability of depression is: {predictionValue}</Text>}
          </View>
        </View>
      </ScrollView>

  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 150,
    backgroundColor: 'black'
},
  buttonContainer: {
    margin: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ff8c00',
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  horizontal: {
    flexDirection: 'row',
  },
  progressBox:{
    marginRight: 10,
    marginTop: 2,
  },
  analyzeBox:{
    marginBottom: 20,
  },
  analyzeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
