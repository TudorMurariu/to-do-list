import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput, Alert } from 'react-native';

export default function App() {

    const [title, setTitle] = useState("");
    const [descriere, setDescriere] = useState("");
    const [people, setPeople] = useState([

    ]);

    const AddElement = () => {
        if (title.length > 0)
            setPeople([
                ...people,
                { title: title, descriere: descriere, key: (Math.floor(Math.random() * 100000000000)).toString() }
            ]);
        else
            Alert.alert("OOPS", "Your todo has to have a titile", [{ text: "Understood" }]);
    }

    const RemoveElement = (key) => {
        console.log(key);
        let newList = [];
        for (let i = 0; i < people.length; i++)
            if (key == people[i].key) {
                for (let j = 0; j < i; j++)
                    newList.push(people[j]);
                for (let j = i + 1; j < people.length; j++)
                    newList.push(people[j]);
            }
        setPeople(newList)
    };

    return ( <View style = { styles.container } >
        <Text style = { styles.header } >
        To do list </Text>  
        <View style = { styles.item } >
            <View >
            <TextInput style = { styles.input }
        placeholder = "Title"
        onChangeText = {
            (val) => { setTitle(val) }
        }
        />  
        <TextInput style = { styles.input }
        placeholder = "Description"
        onChangeText = {
            (val) => { setDescriere(val) }
        }
        />  
        </View>  
        <View style = { styles.button } >
        <Button title = "+"
        onPress = { AddElement }
        />  
        </View> 
        </View>  
        <FlatList data = { people }
        renderItem = {
            ({ item }) => ( <View style = { styles.item }>
                <View>
                <Text style = { styles.input } > { item.title } </Text>  
                <Text style = { styles.input } > { item.descriere } </Text>  
                </View>

                <View style = { styles.button } >
                <Button title = "-"
                color = "red"
                onPress = {
                    () => RemoveElement(item.key)
                }
                />  </View>  
                </View>
            )
        }/>  
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flex: 1,
    },
    item: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 14,
        padding: 30,
        fontSize: 24,
        backgroundColor: 'lightpink',
        flexDirection: "row",
    },
    button: {
        height: 100,
        width: 50,
        flex: 1,
    },
    input: {
        borderWidth: 2,
        borderColor: "#777",
        marginLeft: 5,
        marginRight: 20,
        fontSize: 20,
        padding: 5,
        width: 250,
    },
    header: {
        textAlign: 'center',
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: 30,
        textDecorationLine: 'underline',
    },

});
