import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { horizontalScale, moderateScale, verticalScale } from "./Metrics";

const HomeScreen = ({ navigation }) => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.container}>
        <Text style={[styles.titleText, { marginTop: verticalScale(130) }]}>
          Welcome
        </Text>
        <Text style={styles.description}>
          Your personal depression detection companion. We understand that
          taking care of your mental health can be challenging, which is why we
          created this app to help you detect early signs of depression and take
          proactive steps towards better mental health.
        </Text>
        <Text style={styles.message}>
          We believe that everyone deserves access to quality mental healthcare,
          and we hope that this app can be a valuable tool in your mental health
          journey. So why wait? Let's get started today and take the first step
          towards a happier, healthier life.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  welcomeText: {
    fontSize: 20,
    textAlign: "justify",
    margin: 10,
    color: "#ffa500",
  },
  titleText: {
    fontSize: verticalScale(50),
    fontWeight: "900",
    color: "#ffa500",
    marginRight: horizontalScale(140),
    margin: horizontalScale(1),
  },
  text: {
    borderTopLeftRadius: horizontalScale(130),
    fontSize: verticalScale(40),
    fontWeight: "700",
    color: "#ffa500",
  },
  description: {
    fontSize: verticalScale(20),
    marginTop: verticalScale(10),
    textAlign: "justify",
    color: "#ffa500",
    margin: horizontalScale(15),
    letterSpacing: -0.5,
  },
  message: {
    fontSize: verticalScale(18),
    textAlign: "justify",
    color: "#ffa500",
    margin: horizontalScale(15),
    marginBottom: verticalScale(200),
    fontStyle: "italic",
  },
});

export default HomeScreen;
