import { Pressable, Text, View } from "react-native";
import { styles } from '../../styles';

export function MenuBar( {navigation} ) {
  
  function openRecurringConfigurationPage(): void {
      navigation.navigate('RecurringConfigurationPage');
  }

    return (
      <View style={styles.menuBar}>
          <Pressable style={[styles.roundTabButton ]} onPress={ () => openRecurringConfigurationPage() }>
            <Text style={ styles.roundTabButtonText }>Ajout dépense</Text>
          </Pressable >
          <Pressable style={[styles.roundTabButton ]} onPress={ () => openRecurringConfigurationPage() }>
            <Text style={ styles.roundTabButtonText }>Ajout revenu</Text>
          </Pressable >
          <Pressable style={[styles.roundTabButton ]} onPress={ () => openRecurringConfigurationPage() }>
              <Text style={ styles.roundTabButtonText }>Transactions régulieres</Text>
          </Pressable >
      </View>
    );
}
