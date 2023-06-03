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

  function goHome(): void {
    navigation.navigate('HomePage');
  }

  function openConfiguration(): void {
  }



  return (

    <View style={{ flexDirection: "row", margin: 5, alignItems: "center" }}>
      <View style={{ flex: 1 }}>
        { isRecurring ?
          <Ionicons name="md-arrow-back" size={32} color="#fff" onPress={ () => goHome() } />
          :
          <Pressable style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginRight: "auto" }} onPress={() => openConfiguration()}>
            {/* <Ionicons name="md-settings" size={15} color="#fff" style={{ zIndex: 4, height: 15, marginBottom: 5 }} />
            <Text style={{ color: "#fff", marginRight: 5, fontSize: 10, alignSelf: "baseline" }}>Configuration</Text> */}
            <Ionicons name="md-settings" size={15} color="#303030" style={{ zIndex: 4, height: 15, marginBottom: 5 }} />
            <Text style={{ color: "#303030", marginRight: 5, fontSize: 10, alignSelf: "baseline" }}>Configuration</Text>
          </Pressable >
        }
      </View>

      <View style={{ flexDirection: "row", marginLeft: "auto", marginRight: "auto", marginBottom: -20 }}>
        <Ionicons name="md-add-circle" size={70} style={{zIndex: 3, bottom: 25 }} color="#1ee9a4" onPress={ () => addIncome() } />
        <Ionicons name="md-remove-circle" size={70} color="#e91e63" style={{zIndex: 3, bottom: 25 }} onPress={ () => addExpense() } />
      </View>

      <View style={{ flex: 1 }}>
        { !isRecurring &&
          <Pressable style={ { marginLeft: "auto", flexDirection: "column", justifyContent: "center", alignItems: "center", alignContent: "center" }} onPress={ () => openRecurringConfigurationPage() }>
              <Ionicons name="md-sync-circle-outline" size={15} color="#fff" style={{zIndex: 3, height: 15, marginBottom: 5 }} />
              <Text style={ { color: "#fff", marginRight: 5, fontSize: 10} }>Transactions</Text>
              <Text style={ { color: "#fff", marginRight: 5, fontSize: 10} }>récurrentes</Text>
            </Pressable >
        }
      </View>

    </View>
  
    // <View style={{ height: 70 }} >
    //   <View style={{ flexDirection: "row", justifyContent: "flex-start", alignContent: "flex-start", alignSelf: 'center', backgroundColor: '#303030', 
    //                  width: 135, height: 50, 
    //                  borderBottomEndRadius: 30, borderBottomStartRadius: 30, left: 0, bottom: 0, zIndex: 2 }}>
    //     <Ionicons name="md-add-circle" size={70} color="#1ee9a4" style={{zIndex: 3, bottom: 20, height: 70 }} onPress={ () => addIncome() } />
    //     <Ionicons name="md-remove-circle" size={70} color="#e91e63" style={{zIndex: 3, bottom: 20, height: 70}} onPress={ () => addExpense() } />
    //   </View>
    //   <View style={{ position: 'absolute', backgroundColor: '#303030', bottom: 0, zIndex: 1, width: '100%', height: 60, 
    //     flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 10 }}>
        
    //     { isRecurring && <View style={{flex: 1, marginRight: "auto"}}>
    //       <Ionicons name="md-arrow-back" size={32} color="#fff" onPress={ () => goHome() } />
    //     </View> }

    //     { !isRecurring &&
    //       <Pressable  style={ { flexDirection: "column", justifyContent: "center", alignItems: "center", marginRight: "auto" }} onPress={ () => openConfiguration() }>
    //         <Ionicons name="md-settings" size={15} color="#fff" style={{zIndex: 4, height: 15, marginBottom: 5 }} />
    //         <Text style={ { color: "#fff", marginRight: 5, fontSize: 10, alignSelf: "baseline"} }>Configuration</Text>
    //       </Pressable >
    //     }

    //     {/* { !isRecurring && <Ionicons name="md-settings" size={15} color="#fff" /> } */}
    //     {/* { isRecurring && <Ionicons name="md-arrow-back" size={32} color="#fff" onPress={ () => goHome() } /> } */}
        

    //     { !isRecurring &&
    //       <Pressable style={ { marginLeft: "auto", flexDirection: "column", justifyContent: "center", alignItems: "center" }} onPress={ () => openRecurringConfigurationPage() }>
    //         <Ionicons name="md-sync-circle-outline" size={15} color="#fff" style={{zIndex: 3, height: 15, marginBottom: 5 }} />
    //         <Text style={ { color: "#fff", marginRight: 5, fontSize: 10, alignSelf: "baseline"} }>Transactions</Text>
    //         <Text style={ { color: "#fff", marginRight: 5, fontSize: 10, alignSelf: "baseline"} }>récurrentes</Text>
    //       </Pressable >
    //     }

        
    //     {/* <View style={{ flexDirection: 'row' }}>
          
    //       { !isRecurring && <Ionicons name="md-calendar" size={32} color="#fff" style={{ marginLeft: 20 }} onPress={ () => openRecurringConfigurationPage() }/> }
    //     </View> */}
    //   </View>
    // </View>
  );
}
