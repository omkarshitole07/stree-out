import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { auth } from "../firebase";
import { horizontalScale, moderateScale, verticalScale } from "./Metrics";

import { getDatabase, ref, update } from "firebase/database";

const questions = [
  "Have you felt sad or empty most of the day nearly every day?",
  "Have you lost interest in activities that you used to enjoy?",
  "Have you experienced significant weight loss or gain without trying?",
  "Have you experienced insomnia or hypersomnia?",
  "Have you had thoughts of self-harm or suicide?",
];

const updateUserWithQuizResults = (userId, lastQuizResults) => {
  const db = getDatabase();
  const userRef = ref(db, "users/" + userId);

  try {
    update(userRef, {
      lastQuizResults: lastQuizResults,
    });
    console.log("Last quiz results updated successfully.");
  } catch (error) {
    console.error("Error updating last quiz results:", error);
  }
};

const MessageScreen = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finishedQuiz, setFinishedQuiz] = useState(false);
  const [lastQuizResults, setLastQuizResults] = useState(null);

  const handleAnswer = (answer) => {
    if (answer === "yes") {
      setScore(score + 1);
    }

    if (questionIndex === questions.length - 1) {
      if (score >= 3) {
        const quizResults = {
          score: score * 2,
          depression: score >= 3 ? true : false,
          assessmentDate: new Date().toISOString(),
          assessmentType: "Depression Assessment",
          severity: determineSeverity(score),
          resources: {
            crisisHelpline: "123-456-7890",
            selfHelpWebsite: "https://example.com/self-help",
          },
          userComments: "",
          followUpActions: [
            "Contact a mental health professional",
            "Start a daily journal",
          ],
        };

        function determineSeverity(score) {
          if (score < 1) {
            return "Not at all";
          } else if (score < 2) {
            return "Mild";
          } else if (score < 3) {
            return "Moderate";
          } else if (score < 4) {
            return "Severe";
          } else {
            return "Very Severe";
          }
        }

        setLastQuizResults(quizResults);
        alert(
          "You may be experiencing depression. Please consult with a mental health professional."
        );
        const userId = auth.currentUser.uid;
        updateUserWithQuizResults(userId, quizResults);
      } else {
        setLastQuizResults(null);
        alert(
          "You may not be experiencing depression. However, please consult with a mental health professional if you have concerns."
        );
        const userId = auth.currentUser.uid;
        updateUserWithQuizResults(userId, null);
      }

      setFinishedQuiz(true);
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const handleRetakeQuiz = () => {
    setScore(0);
    setQuestionIndex(0);
    setFinishedQuiz(false);
    setLastQuizResults(null);
  };

  if (finishedQuiz) {
    return (
      <View style={styles.container}>
        <Button
          title="Retake Quiz"
          onPress={handleRetakeQuiz}
          color="#ff8c00"
          titleStyle={styles.boldButton}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={[styles.question, { marginVertical: verticalScale(40) }]}>
          {questions[questionIndex]}
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Yes"
            onPress={() => handleAnswer("yes")}
            color="#ff8c00"
            titleStyle={styles.boldButton}
          />
          <Button
            title="No"
            onPress={() => handleAnswer("no")}
            color="#ff8c00"
            titleStyle={styles.boldButton}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  question: {
    fontSize: verticalScale(24),
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: verticalScale(40),
    color: "#ffa500",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  boldButton: {
    fontWeight: "bold",
    color: "#ff8c00",
  },
});

export default MessageScreen;
