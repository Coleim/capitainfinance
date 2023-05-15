import { Pressable, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export function MenuBar(props) {
  
  const isRecurring: boolean = props.recurring;
  const { navigation } = props;
  
  function openRecurringConfigurationPage(): void {
    navigation.navigate('RecurringConfigurationPage');
  }

  function addExpense(): void {
    navigation.navigate('EditTransactionItemPage', { item: null, isExpense: true, recurring: isRecurring });
  }

  function addIncome(): void {
    navigation.navigate('EditTransactionItemPage', { item: null, isExpense: false, recurring: isRecurring });
  }



  return (
  
    <View style={{ height: 70 }} >
      <View style={{ flexDirection: "row", justifyContent: "flex-start", alignContent: "flex-start", alignSelf: 'center', backgroundColor: '#303030', 
                     width: 135, height: 50, 
                     borderBottomEndRadius: 30, borderBottomStartRadius: 30, left: 0, bottom: 0, zIndex: 2 }}>
        <Ionicons name="md-add-circle" size={70} color="#1ee9a4" style={{zIndex: 3, bottom: 20, height: 70 }} onPress={ () => addIncome() } />
        <Ionicons name="md-remove-circle" size={70} color="#e91e63" style={{zIndex: 3, bottom: 20, height: 70}} onPress={ () => addExpense() } />
      </View>
      <View style={{ position: 'absolute', backgroundColor: '#303030', bottom: 0, zIndex: 1, width: '100%', height: 60, 
        flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 10 }}>
        
        {/* { !isRecurring && <Ionicons name="md-settings" size={15} color="#fff" /> } */}
        {/* { isRecurring && <Ionicons name="md-arrow-back" size={32} color="#fff" onPress={ () => goHome() } /> } */}
        

        
        {/* <View style={{ flexDirection: 'row' }}>
          
          { !isRecurring && <Ionicons name="md-calendar" size={32} color="#fff" style={{ marginLeft: 20 }} onPress={ () => openRecurringConfigurationPage() }/> }
        </View> */}
      </View>
    </View>
  );
}
