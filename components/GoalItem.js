import { StyleSheet, Text, View, Pressable } from "react-native";
//we can use props bc this is just React!
function GoalItem(props){
    //we need to get the id of the item so that we will be able to delete them
    //we can use the .bind() method to grab the id
    //bind allows us to pre-configre a func for future exe
    //the first val we pass to bind sets the this keyword to be exe in the func
    //second val is the first param to be rec'd by the to-be-called func
    //we want the id, so pass props.id
    return (
        <View style={styles.goalItem}><Pressable android_ripple={{color:'red'}} onPress={props.onDeleteItem.bind(this, props.id)}><Text style={styles.itemText}>{props.text}</Text></Pressable></View>
    )
}
export default GoalItem;

const styles = StyleSheet.create({
    goalItem:{
        margin: 8,
        borderRadius:11,
        backgroundColor: "#530acc",
      },
      itemText:{
        color:'white',
        padding:8
      }
});
