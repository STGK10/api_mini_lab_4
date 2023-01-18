import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View, Text, TextInput } from 'react-native';
import { Avatar, Input, ListItem } from 'react-native-elements';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import ChatListItem from '../components/ChatListItem';
import { AntDesign, FontAwesome, Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { auth, db } from '../firebase';
import { collection, onSnapshot, where, query } from 'firebase/firestore';
import Icon from "react-native-vector-icons/FontAwesome"



const FindChatScreen = ({ navigation }) => {
    // Tracking and processing changes to the chat list
    const [chats, setChats] = useState([]);
    const [input, setInput] = useState('');

    // Here we are checking if the entered text matches with the beginning of the name, the name of the chat itself then output the chat
    useEffect(() => {
        const q = query(collection(db, "chats"), where("chatName", '!=', ""));
        const unsubscribe = onSnapshot(q, (querySnaphots) => {
            const chats = [];
            querySnaphots.forEach((doc) => {
                let flag = true;
                for (let i = 0; i < input.length; i++) {
                    if (doc.data().chatName[i] != input[i]) {
                        flag = false;
                    }
                }
                if (flag) {
                    chats.push({
                        id: doc.id,
                        data: doc.data()
                    });
                }
            });
            console.log(chats);
            setChats(chats);
        });
        return unsubscribe;
    }, [input])

    // Configuring the upper die contents before rendering the UI
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Find Chat",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black" },

            // Setting the markup of the parts to the left and right of the header
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>

                    <TouchableOpacity style={{ marginLeft: 10 }}
                        onPress={navigation.goBack}>
                        <Ionicons name="chevron-back-outline" size={24} color="green" />
                    </TouchableOpacity>

                </View>
            )
        })
    }, [navigation])
    
// Go to the chat screen; at the same time, we pass the id and name of the selected chat,
// to display the desired content on the chat screen 

    // (It would be necessary to stuff this component separately so that the code is not duplicated)
    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", { id, chatName, })
    }
    return (
        <SafeAreaView>
            <View>

                <Input placeholder='Enter a chat name' onChangeText={(text) => setInput(text)}></Input>

            </View>
            <ScrollView style={styles.container}>
                {chats.map(({ id, data: { chatName } }) => (
                    <ChatListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
};

export default FindChatScreen

const styles = StyleSheet.create({
    container: {
        height: "100%"
    }
})