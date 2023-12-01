import * as React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const AnalyzeInfo = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}> 
            <Text style={styles.titleText}>How to use Analyze Image?</Text>
        </View>
        <View style={styles.horizontal}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/far.jpg')}
                    style={{ width: 200, height: 200 }}
                />
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/cross.png')}
                    style={{ width: 70, height: 70 }}
                />
            </View>
        </View>
        <View style={styles.horizontal}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/sad.jpg')}
                    style={{ width: 200, height: 200 }}
                />
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/check.png')}
                    style={{ width: 70, height: 70 }}
                />
            </View>
        </View>
        <View style={styles.instructionContainer}> 
            <View style={styles.bulletContainer}>
                <Text style={styles.instructionText}>• Select a selfie from photo album</Text>
            </View>
            <View style={styles.bulletContainer}>
                <Text style={styles.instructionText}>• Make sure you face directly towards camera</Text>
            </View>
            <View style={styles.bulletContainer}>
                <Text style={styles.instructionText}>• The photo shows your entire face</Text>
            </View>
            <View style={styles.bulletContainer}>
                <Text style={styles.instructionText}>• Don't stand too far from camera</Text>
            </View>
            <View style={styles.bulletContainer}>
                <Text style={styles.instructionText}>• Zoom in and crop the photo if necessary</Text>
            </View>
        </View>
        <View style={styles.noteContainer}>
                <Text style={styles.noteText}>Note: This feature sends the image to the server and 
                receives a response indicating the probability of depression. As the server is currently 
                utilizing a free plan, receiving the result may take a few minutes. However, after multiple
                 analyses, there might be errors encountered due to potential memory limitations on the server."
                </Text>
        </View>
    </ScrollView>
  );
};

export default AnalyzeInfo;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'black',
    },
    titleContainer:{
        marginTop: deviceHeight/100,
        marginBottom: deviceHeight/100,
    },
    titleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer:{
        margin: deviceWidth/20,
    },
    instructionContainer:{
        justifyContent: 'center',
        marginTop: deviceHeight/70,
    },
    bulletContainer:{
        marginBottom: deviceHeight/100,
    },
    instructionText:{
        color: 'white',
        fontSize: 18,
    },
    noteContainer:{
        marginTop: deviceHeight/30,
        marginBottom: deviceHeight/15,
    },
    noteText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 25,
        textAlign: 'justify'
    }
});
