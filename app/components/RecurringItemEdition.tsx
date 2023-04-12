import { Alert, Button, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { styles } from "../../styles";
import { database } from "../services/DbServices";
import { date } from "../services/DateAsString";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Checkbox from 'expo-checkbox';

export function RecurringItemEdition(props) {
  const item: database.Transaction = props.item;
  const isExpense: boolean = props.isExpense;

  const [amountStr, setAmountStr] = useState(item.amount.toString());
  const [isLimited, setIsLimited] = useState(false);
  const [startDate, setStartDate] = useState(item.date);
  // const [category, setCategory] = useState(item.category);
  const [label, setLabel] = useState(item.label);
  const [modalVisible, setModalVisible] = useState(false);
  const [saveDisabled, setSaveDisabled] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    if (amountStr && label) {
      setSaveDisabled(false);
    } else {
      setSaveDisabled(true);
    }

  });


  async function saveItem(): Promise<void> {
    if (validateAmountNumber() && !saveDisabled) {
      let amount = getCorrectNumber();
      if(item.isReccuring) {
        await database.UpdateRecurringTransactions(item.transaction_id, label, amount.toFixed(2));
        navigation.navigate("RecurringConfigurationPage");
      }
    }
  }

  function cancel(): void {
    if(item.isReccuring) {
      navigation.navigate("RecurringConfigurationPage");
    }
  }

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    // setDate(currentDate);
  };

  const showStartDatePicker = () => {
    DateTimePickerAndroid.open({
      value: startDate ? startDate : new Date(),
      onChange: onStartDateChange,
      mode: 'date'
    });
  };

  const getCorrectNumber = () => {
    let amountNbr = Math.abs(Number(amountStr));
    if (isExpense) {
      amountNbr *= -1;
    }
    return amountNbr;
  }
  


  const validateAmountNumber = () => {
    let amountNbr = getCorrectNumber();
    if (Number.isNaN(amountNbr)) {
      setAmountStr(item.amount.toFixed(2));
      return false;
    } else {
      setAmountStr(amountNbr.toFixed(2));
    }
    return true;
  }


  async function openConfirmModal(): Promise<void> {
    setModalVisible(true);
  }


  async function removeTransaction() {
    setModalVisible(false);
    if(item.isReccuring) {
      await database.DeleteRecurringTransactions(item.transaction_id);
      navigation.navigate("RecurringConfigurationPage");
    }
  }

  return (
    <View style={{ paddingTop: 20 }}  >

      <View style={{ flexDirection: "row" }}>
        {isExpense ? <Text style={itemStyle.header}>Nom de la dépense</Text> : <Text style={itemStyle.header}>Nom du revenu</Text>}
        {item.transaction_id && <Pressable style={{ marginLeft: "auto", marginRight: 10 }} onPress={() => openConfirmModal()} >
          <Text style={{ color: "#ff0054" }}>Supprimer</Text>
        </Pressable>}
      </View>

      <TextInput selectTextOnFocus autoFocus style={itemStyle.container} value={label} onChangeText={(label) => { setLabel(label) }} />
      <Text style={itemStyle.header}>Montant</Text>
      <TextInput selectTextOnFocus keyboardType={'numeric'} style={itemStyle.container} value={amountStr}
        onChangeText={(amount) => { setAmountStr(amount) }}
        onBlur={() => validateAmountNumber()}
      />
      {/* <Text style={itemStyle.header}>Catégorie</Text>
      <TextInput selectTextOnFocus style={itemStyle.container} value={category} onChangeText={(category) => { setCategory(category) }} /> */}

      <View style={{ paddingTop: 20, flexDirection: "row", justifyContent: "space-around" }}  >
        <Button onPress={cancel} title="Annuler" color="#ff0054" />
        <Button onPress={saveItem} title="Sauver" color="#2ec4b6" disabled={saveDisabled} />
      </View>

      <View style={modalStyles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
              <Text style={modalStyles.modalText}>Supprimer cette transaction ?</Text>
              <View style={ {flexDirection: "row", justifyContent: "space-between"}}>
                <Button onPress={() => setModalVisible(false)} title="Non" color="#ff0054" />
                <Button onPress={removeTransaction} title="Oui" color="#2ec4b6" />
              </View>
            </View>
          </View>
        </Modal>
      </View>

      {/* <View style={checkBoxStyles.section}>
            <Checkbox style={checkBoxStyles.checkbox} value={isLimited} onValueChange={setIsLimited} />
            <Pressable onPress={() => setIsLimited(!isLimited) }>
                <Text style={checkBoxStyles.paragraph}>Limité dans le temps ?</Text>
            </Pressable>
        </View> */}

      {/* <Pressable onPress={() => showStartDatePicker() } style={ itemStyle.container }>
            <Text style={ { color: "#525174", fontSize: 15 } } >{date.AsString(item.startDate)}</Text>
        </Pressable> */}

    </View>
  );
}

const checkBoxStyles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  paragraph: {
    fontSize: 15,
    color: "#fff"
  },
  checkbox: {
    margin: 10,
  },
});

const itemStyle = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderColor: "#525174",
    borderWidth: 1,
    padding: 8,
    margin: 8,
  },
  header: {
    color: "#fff",
    margin: 4,
    marginLeft: 10,
    fontSize: 17,
    fontWeight: "bold"
  }
});


const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});