import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import { writeUserData, auth, getUserData } from "../firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function ProfileScreen({ navigation }) {
  const currentUser = auth.currentUser;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [activityHistory, setActivityHistory] = useState("");
  const [lastQuizResults, setLastQuizResults] = useState(null);

  useEffect(() => {
    getUserData(currentUser.uid).then((userData) => {
      if (userData) {
        setName(userData.name);
        setGender(userData.gender);
        setAge(userData.age);
        setDateOfBirth(userData.dateOfBirth);
        setMedicalHistory(userData.medicalHistory);
        setActivityHistory(userData.activityHistory);
        setLastQuizResults(userData.lastQuizResults);
      }
    });
  }, [currentUser.uid]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    writeUserData(
      currentUser.uid,
      name,
      gender,
      age,
      dateOfBirth,
      medicalHistory,
      activityHistory,
      lastQuizResults
    )
      .then(() => {
        console.log("Profile data saved successfully.");
        toggleEdit();
        Keyboard.dismiss(); // Dismiss the keyboard after saving
      })
      .catch((error) => {
        console.error("Error saving profile data:", error);
      });
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraScrollHeight={20} // Adjust as needed
      extraHeight={-20} // Adjust as needed
    >
      <Text style={styles.title}>Welcome {currentUser.email}</Text>
      <Text style={styles.info}>Name: {name}</Text>
      <Text style={styles.info}>Gender: {gender}</Text>
      <Text style={styles.info}>Age: {age}</Text>
      <Text style={styles.info}>Date of Birth: {dateOfBirth}</Text>
      <Text style={styles.info}>Medical History: {medicalHistory}</Text>
      <Text style={styles.info}>Activity History: {activityHistory}</Text>
      <Text style={styles.info}>
        Last Quiz Results: {lastQuizResults ? lastQuizResults.severity : "N/A"}
      </Text>

      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={(text) => setName(text)}
            value={name}
          />

          <TextInput
            style={styles.input}
            placeholder="Gender"
            onChangeText={(text) => setGender(text)}
            value={gender}
          />
          <TextInput
            style={styles.input}
            placeholder="Age"
            onChangeText={(text) => setAge(text)}
            value={age}
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Birth"
            onChangeText={(text) => setDateOfBirth(text)}
            value={dateOfBirth}
          />
          <TextInput
            style={styles.input}
            placeholder="Medical History"
            onChangeText={(text) => setMedicalHistory(text)}
            value={medicalHistory}
          />
          <TextInput
            style={styles.input}
            placeholder="Activity History"
            onChangeText={(text) => setActivityHistory(text)}
            value={activityHistory}
          />
          <TouchableOpacity onPress={handleSaveProfile} style={styles.button}>
            <Text style={styles.buttonText}>Save Profile</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text>Name: {name}</Text>
          <Text>Gender: {gender}</Text>
          <Text>Age: {age}</Text>
          <Text>Date of Birth: {dateOfBirth}</Text>
          <Text>Medical History: {medicalHistory}</Text>
          <Text>Activity History: {activityHistory}</Text>
          <Text>
            Last Quiz Results:{" "}
            {lastQuizResults ? lastQuizResults.severity : "N/A"}
          </Text>

          <TouchableOpacity onPress={toggleEdit} style={styles.button}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </>
      )}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ff8c00",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: "100%",
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  info: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: -2,
    color: "white",
    alignSelf: "flex-start",
  },
});

export default ProfileScreen;
