import { Pressable, Text, View } from "react-native";
import { styles } from '../../styles';

export function MenuBar( {navigation} ) {
  
  function openRecurringConfigurationPage(): void {
    navigation.navigate('RecurringConfigurationPage');
  }

  function addExpense(): void {
    navigation.navigate('EditTransactionItemPage', { item: null, isExpense: true });
  }

  function addIncome(): void {
    navigation.navigate('EditTransactionItemPage', { item: null, isExpense: false });
  }

    return (
      <View style={styles.menuBar}>
          <Pressable style={[styles.roundTabButton, { width: 100 } ]} onPress={ () => addExpense() }>
            <Text style={ styles.roundTabButtonText }>Ajout dépense</Text>
          </Pressable >
          <Pressable style={[styles.roundTabButton, { width: 100 } ]} onPress={ () => addIncome() }>
            <Text style={ styles.roundTabButtonText }>Ajout revenu</Text>
          </Pressable >
          <Pressable style={[styles.roundTabButton, { width: 100 } ]} onPress={ () => openRecurringConfigurationPage() }>
              <Text style={ styles.roundTabButtonText }>Transactions régulieres</Text>
          </Pressable >
      </View>
    );
}
