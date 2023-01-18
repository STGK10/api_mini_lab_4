import { StyleSheet, View } from 'react-native';
import { Input, Button, Text, Avatar } from 'react-native-elements';
import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebase';
import { deafultPicURL } from '../utils';
import { collection } from 'firebase/firestore';


const ProfileScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Avatar size="large" rounded source={{ uri: auth?.currentUser?.photoURL }}></Avatar>
            <br></br>
            <View style={styles.texts}>
                <Text UserInfo>UserName: {auth.currentUser.displayName}</Text>
                <br></br>
                <Text UserInfo>Email: {auth.currentUser.email}</Text>
            </View>
        </View>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: 'white',
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    inputContainer: {
        width: 300
    },
    texts: {
        alignItems: "center",
        justifyContent: "center",
    }

});