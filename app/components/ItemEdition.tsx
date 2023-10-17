import { Alert, Button, Modal, Pressable, StyleSheet, Text, TextInput, View, Platform, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Transaction } from "../models/transaction";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction, removeTransaction, updateTransaction } from "../actions/transactions";
import { date } from "../services/DateAsString";
import { addCategory, removeCategory } from "../actions/categories";
import { Category } from "../models/Category";
import Ionicons from '@expo/vector-icons/Ionicons';


function CategoryItem(props) {
  const item: Category = props.item;

  function selectCategory(): void {
    props.onCategorySelected(item.label);
  }
  function removeItem(): void {
    props.onCategoryRemoved(item.label)
  }

  return (
    <Pressable style={[categoryItemStyle.item, { backgroundColor: item.color, flexDirection: "row"}]} onPress={() => selectCategory()} >
      <Text style={categoryItemStyle.text}>{item.label}</Text>
      <Ionicons name="md-trash-bin" size={20} color="#ff0054" style={{zIndex: 3, height: 20, marginLeft: "auto", alignSelf: "baseline" }} onPress={ () => removeItem()} />
    </Pressable>
  );
}

const categoryItemStyle = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold"
  },
  item: {
    backgroundColor: "#525174",
    color: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 1
  }
});


export function ItemEdition(props) {
  const item: Transaction = props.item;
  const isExpense: boolean = props.isExpense;

  const dispatch = useDispatch();

  const categories = useSelector( state => state.categories);
  
  
  const [newCategory, setNewCategory] = useState("Nouvelle catégorie");

  const [amountStr, setAmountStr] = useState(item.amount.toString());
  const [startDate, setStartDate] = useState(new Date(item.date));
  const [category, setCategory] = useState(item.category);
  const [label, setLabel] = useState(item.label);
  const [confimationModalVisible, setConfimationModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [saveDisabled, setSaveDisabled] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    if (amountStr && label) {
      setSaveDisabled(false);
    } else {
      setSaveDisabled(true);
    }

  }, [amountStr, label]);


  function saveItem() {
    if (validateAmountNumber() && !saveDisabled) {
      let amount = getCorrectNumber();
      const date = item.isReccuring ? undefined : startDate? new Date(startDate) : new Date();
      console.log(date)
      if(item.transaction_id) {
        dispatch(updateTransaction(item, label, amount, category, date));
      } else {
        dispatch(addTransaction(label, amount, category, date, item.isReccuring));
      }
      back();
    }
  }

  function back() {
    if(item.isReccuring) {
      navigation.navigate("RecurringConfigurationPage");
    } else {
      navigation.navigate("HomePage");
    }
  }

  function cancel(): void {
    back();
  }

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setStartDate(currentDate);
  };

  const showDatePicker = () => {
    validateAmountNumber();
    const today = new Date();
    if(Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: startDate ? startDate : new Date(),
        onChange: onStartDateChange,
        mode: 'date',
        maximumDate: today,
        minimumDate: new Date(today.getFullYear(), today.getMonth(), 1)
      });
    }
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


  function openConfirmModal() {
    setConfimationModalVisible(true);
  }


  function deleteTransaction() {
    setConfimationModalVisible(false);
    dispatch(removeTransaction(item));
    back();
  }

  function showCategoriesModal(): void {
    validateAmountNumber();
    setCategoryModalVisible(true);
  }
  
  function selectCategory(category: string): void {
    setCategory(category);
    setCategoryModalVisible(false);
  }

  function saveNewCategory(category: string): void {
    dispatch(addCategory(category));
    selectCategory(category);
  }

  return (
    <View style={{ paddingTop: 20 }}  >

      <View style={{ flexDirection: "row" }}>
        {item.transaction_id && <Pressable style={{ marginLeft: "auto", marginRight: 10 }} onPress={() => openConfirmModal()} >
          <Text style={{ color: "#ff0054" }}>Supprimer</Text>
        </Pressable>}
      </View>
      
      {isExpense ? <Text style={itemStyle.header}>Nom de la dépense</Text> : <Text style={itemStyle.header}>Nom du revenu</Text>}
      <TextInput selectTextOnFocus autoFocus style={itemStyle.container} value={label} onChangeText={(label) => { setLabel(label) }} />

      <Text style={itemStyle.header}>Montant</Text>
      <TextInput  selectTextOnFocus keyboardType={'numeric'} 
        style={[itemStyle.container]} 
        value={amountStr}
        onChangeText={(amount) => { setAmountStr(amount) }}
        onBlur={() => validateAmountNumber()}
      />

      { !item.isReccuring && Platform.OS === 'android' && 
        <>
          <Text style={itemStyle.header}>Date</Text>
          <Pressable onPress={() => showDatePicker()} style={itemStyle.container}>
            <Text style={[{ color: "#525174", fontSize: 15 }]}>{date.AsString(startDate)}</Text>
          </Pressable>
        </>
      }
      <>
        <Text style={itemStyle.header}>Catégorie</Text>
        <Pressable onPress={() => showCategoriesModal()} style={itemStyle.container}>
          <Text style={{ color: "#525174", fontSize: 15 }}>{ category }</Text>
        </Pressable>
      </>


      <View style={{ paddingTop: 20, flexDirection: "row", justifyContent: "space-around" }}  >
        <Button onPress={cancel} title="Annuler" color="#ff0054" />
        <Button onPress={saveItem} title="Sauver" color="#2ec4b6" disabled={saveDisabled} />
      </View>

      <View style={modalStyles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={confimationModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setConfimationModalVisible(!confimationModalVisible);
          }}>
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
              <Text style={modalStyles.modalText}>Supprimer cette transaction ?</Text>
              <View style={ {flexDirection: "row", justifyContent: "space-between"}}>
                <Button onPress={() => setConfimationModalVisible(false)} title="Non" color="#ff0054" />
                <Button onPress={deleteTransaction} title="Oui" color="#2ec4b6" />
              </View>
            </View>
          </View>
        </Modal>
      </View>


      <View style={modalStyles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={categoryModalVisible}>
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
              
              <View style={{ flex: 1}}>
                <Text>Choisissez une catégorie existante</Text>
                <FlatList 
                    data={categories}
                    renderItem={({item}) => <CategoryItem item={item} onCategorySelected={(category: string) => selectCategory(category)} onCategoryRemoved={(category: string) => dispatch(removeCategory(category)) }></CategoryItem>}
                />
              </View>
              <View style={{ marginBottom: 30}}>
                <Text>Ou entrez une nouvelle catégorie</Text>
                <TextInput selectTextOnFocus
                  style={[categoryItemStyle.item]} 
                  value={newCategory}
                  onChangeText={(label) => { setNewCategory(label) }}
                />
              </View>
              <View style={ {flexDirection: "row", justifyContent: "space-between"}}>
                <Button onPress={() => setCategoryModalVisible(false)} title="Annuler" color="#ff0054" />
                <Button onPress={() => saveNewCategory(newCategory)} title="Valider" color="#2ec4b6" />
              </View>
            </View>
          </View>
        </Modal>
      </View>

    </View>
  );
}

const itemStyle = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderColor: "#525174",
    borderWidth: 1,
    padding: 8,
    margin: 8,
    height: 40
  },
  header: {
    color: "#fff",
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