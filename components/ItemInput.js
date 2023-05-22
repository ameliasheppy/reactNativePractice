import {View, TextInput, Button, StyleSheet, Modal, Image} from 'react-native'
import { useState } from 'react';
function ItemInput(props){
    const [enteredItemText, setEnteredItemText] = useState('');
    function itemInputHandler(enteredText){
        // console.log(enteredText)
        //updating the state to get with the other function below
        setEnteredItemText(enteredText)
      }

      function addItemHandler(){
        //call this func here manually to make sure that we forward the enteredItemText
        props.onAddItem(enteredItemText);
        //clear it when we add a new item
        setEnteredItemText('');
      }
    //we are interacting with state in App.js
    //talk to the parent by passing event handlers with props!
    //our onPress now holds a val that will be exe onPress
    //we are passing the func we want to do in our props from App.js to here. But now how will we get the user input and hand it here?
    return(
        <Modal visible={props.visible} animationType='slide'>
    <View style={styles.inputContainer}>
        <Image style={styles.image} source={require('../assets/pic.jpg')}/>
      <TextInput placeholder="Pet Shopping list!" style={styles.textInput} onChangeText={itemInputHandler}
      value={enteredItemText}/> 
      <View style={styles.buttonContainer}>
        <View style={styles.button}><Button title="Add Item" onPress={addItemHandler} color="#5e0acc"/></View>
        <View style={styles.button}><Button title="Cancel" onPress={props.onCancel} color="#f31282"/></View>
    </View>
      </View>
      </Modal>
    )
}

export default ItemInput;

const styles = StyleSheet.create({
    inputContainer:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        padding:16,
        borderBottomWidth:1,
        borderBottomColor:'grey',
      },
      image:{
        width:100,
        height:100,
        margin:20,
      },
      buttonContainer:{
        flexDirection:'row', 
        marginTop:16
      },
      textInput:{
        borderWidth:1,
        borderColor:'#e4d0ff',
        backgroundColor:"e4d0ff",
        color:'#120438',
        width:'100%',
        padding:8,
      },
      button:{
        width:'40%',
        marginHorizontal:8
      }
})