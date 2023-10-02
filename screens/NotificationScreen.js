// Import necessary components from React Native library
import React from "react";
import { StyleSheet, Text, View, Linking } from "react-native";
import { horizontalScale, verticalScale, moderateScale } from "./Metrics";

// Define Notification component that takes stressLevel and stressDuration props
// and renders a notification with breathing and meditation exercises suggestions,
// reminders to take breaks and practice self-care, and a resource for seeking professional help.
function Notification({
  stressLevel,
  stressDuration,
  onPressBreathingExercise,
  onPressMeditation,
}) {
  return (
    <View style={styles.container}>
      {/* Render breathing exercise resources */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText1}>Try Breathing Exercise</Text>
        <View style={styles.resourceText}>
          <Text
            style={styles.resourceLink}
            onPress={() =>
              Linking.openURL("https://www.healthline.com/health/box-breathing")
            }
          >
            Box Breathing
          </Text>
          <Text
            style={styles.resourceLink}
            onPress={() =>
              Linking.openURL(
                "https://www.medicalnewstoday.com/articles/324417"
              )
            }
          >
            4-7-8 Breathing
          </Text>
          <Text
            style={styles.resourceLink}
            onPress={() =>
              Linking.openURL(
                "https://www.yogajournal.com/practice/almost-instant-stress-relief/"
              )
            }
          >
            Alternate Nostril Breathing
          </Text>
          <Text
            style={styles.resourceLink}
            onPress={() =>
              Linking.openURL(
                "https://www.yogajournal.com/practice/almost-instant-stress-relief/"
              )
            }
          >
            Lion's Breath
          </Text>
          <Text
            style={styles.resourceLink}
            onPress={() =>
              Linking.openURL(
                "https://www.mayoclinic.org/healthy-lifestyle/stress-management/in-depth/decrease-stress-by-using-your-breath/art-20267197"
              )
            }
          >
            Deep Breathing with Equal Counts
          </Text>
        </View>
      </View>

      {/* Render meditation resources */}
      <Text style={styles.summaryText1}>Try Meditation Exercise</Text>
      <View style={styles.resourceText}>
        <Text
          style={styles.resourceLink}
          onPress={() =>
            Linking.openURL("https://www.youtube.com/watch?v=inpok4MKVLM")
          }
        >
          10-Minute Guided Meditation for Stress
        </Text>
        <Text
          style={styles.resourceLink}
          onPress={() =>
            Linking.openURL("https://www.youtube.com/watch?v=4pLUleLdwY4")
          }
        >
          5-Minute Guided Meditation for Stress and Anxiety
        </Text>
        <Text
          style={styles.resourceLink}
          onPress={() =>
            Linking.openURL("https://www.youtube.com/watch?v=F28MGLlpP90")
          }
        >
          15-Minute Guided Meditation for Stress and Anxiety
        </Text>
        <Text
          style={styles.resourceLink}
          onPress={() =>
            Linking.openURL("https://www.youtube.com/watch?v=MIr3RsUWrdo")
          }
        >
          20-Minute Guided Meditation for Stress and Anxiety
        </Text>
        <Text
          style={styles.resourceLink}
          onPress={() =>
            Linking.openURL("https://www.youtube.com/watch?v=6wenE_c1mmA")
          }
        >
          30-Minute Guided Meditation for Stress and Anxiety
        </Text>
      </View>

      {/* Render a reminder to take breaks and practice self-care */}
      <View style={styles.reminderContainer}>
        <Text style={styles.reminderText}>
          Remember to take breaks and practice self-care throughout the day.
        </Text>
      </View>

      {/* Render a resource for seeking professional help */}
      <View style={styles.resourceContainer}>
        <Text style={styles.resourceText}>
          If you need professional help, consider seeking counseling or calling
          a hotline.
        </Text>
      </View>
    </View>
  );
}

// Define styles for components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  summaryText1: {
    fontSize: horizontalScale(30), // Scale font size based on width
    textAlign: "center",
    fontWeight: "bold",
    color: "#ff8c00",
    marginBottom: verticalScale(1), // Scale margin based on height
  },
  summaryContainer: {
    marginBottom: moderateScale(40),
  },
  resourceText: {
    fontSize: moderateScale(16),
    textAlign: "center",
    color: "#ff8c00",
    marginTop: moderateScale(10),
  },
  resourceLink: {
    color: "white",
    textDecorationLine: "underline",
    marginVertical: moderateScale(5),
    fontSize: moderateScale(15),
    textAlign: "center",
    marginTop: moderateScale(10),
  },
  reminderContainer: {
    marginBottom: moderateScale(20),
    marginTop: moderateScale(20),
  },
  reminderText: {
    fontSize: moderateScale(16),
    textAlign: "center",
    color: "#ff8c00",
  },
  resourceContainer: {
    marginBottom: moderateScale(10),
    marginTop: moderateScale(10),
  },
});

export default Notification;
