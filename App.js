import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, Image} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GoalItem from './components/GoalItem';
import ItemInput from './components/ItemInput';
//put styling in {{}} One denotes that it is a style obj, the other shows that it is JS
//margin takes a num and RN translates it to px according to device

//below is a style obj, full of objs
//style objs are great! Why? They allow us to see auto-completion on our styles AND let us have validation that what we are using as styles is correct. If not, we will get an error or a warning
//official styling docs https://reactnative.dev/docs/style   https://reactnative.dev/docs/colors   https://reactnative.dev/docs/view    https://reactnative.dev/docs/view-style-props
//every view by default uses FlexBox!



//taking this out from below!
    //   {/* <Text style={styles.otherText}>Cats</Text>
    //   <Text style={{margin:16, borderColor:"red", borderWidth:3, padding:16}}>This is gonna be dogs</Text>
    // <Button title="Click Me" /> */}
export default function App() {
  //manage our items, set to initial empty arr
  const [purchaseItem, setPurchaseItem] = useState([])
  //the button/modal state
  //initially false bc not seen initally
  const [modalIsVisible, setModalIsVisible] = useState(false)

    //these are the funcs we are pointing at for React to use when a state change registers to them
  //store it as state to use
  function startAddItemHandler(){
    setModalIsVisible(true)
  }

  function endAddItemHandler(){
    setModalIsVisible(false)
  }

  //need to connect this func to the button below with onPress. No click for mobile
  function addItemHandler(enteredItemText){
    //could add to state this way:
    // setPurchaseItem([...purchaseItem, enteredItemText])
    //but best way is to do a prevState function!! this will be called automatically by React, get the existing state and add to it
    setPurchaseItem((currentItems) =>[...currentItems, {text:enteredItemText, key:Math.random().toString()},]);
    //now we want to output our list!
    //we have an arr of vals to output. map it! in the return below

    //close the modal after an item is entered
    endAddItemHandler()
  };

  //we can use built in functions with RN to handle events. They want a func as an arg, so pass in a pointer to the func

  //when we add a new item, we can pass it in as an obj with a key gen'd above. look at the add func FlatList automatically looks for the keys
  //be sure that we access the text prop on our items bc they have a text and a key prop
  //when setting up the obj, call it a key! Not an id. don't make things confusing for RN
  //if needed, we can use a keyExtractor func!

  //Now we want to be able to delete things
  //get the id so that we can know what to delete
  function deleteItemHandler(id){
    console.log('Deleted!')
    setPurchaseItem((currentItems) =>{
      //can call filter, to return a new arr and remove stuff
      //will return true if no match
      //if it matches the id, the id's are equal and it will drop the new ones.
      return currentItems.filter((item) => item.id !== id);
    });
  }
  //the button controls the app's visibility, so of course we need state
  return (
    <><StatusBar style='light'/><View style={styles.container}>
      <Button title="Add New Goal" color="blue" onPress={startAddItemHandler} />
      <ItemInput visible={modalIsVisible} onAddItem={addItemHandler} onCancel={endAddItemHandler} />
      <View style={styles.shoppingContainer}>
        <FlatList
          data={purchaseItem} renderItem={(itemData) => {
            itemData.index;
            return <GoalItem text={itemData.item.text} onDeleteItem={deleteItemHandler} id={itemData.item.id} />;
          } } /></View>

      <View style={{ padding: 50, flexDirection: 'row' }}>
        <View
          style={{
            backgroundColor: 'red',
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>1</Text>
        </View>
        <View
          style={{
            backgroundColor: 'blue',
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>2</Text>
        </View>
        <View
          style={{
            backgroundColor: 'green',
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>3</Text>
        </View>
      </View>

    </View></>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop:50,
    paddingHorizontal:16,
    backgroundColor: "#1e085a",
  },
  // otherText:{
  //   margin:18,
  //   padding:40,
  //   borderWidth: 1,
  //   borderBottomColor: "green",
  // },
  shoppingContainer:{
    flex:3,
  }
});
