import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
    amountSummary: {
        height: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    white: {
        color: "#fff"
    },
    roundTabButton: {
        backgroundColor: "#fff",
        borderRadius: 40,
        elevation: 6,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginRight: 5,
        marginLeft: 5
    },
    roundTabButtonSelected: {
        backgroundColor: "#74b3ce",
    },
    roundTabButtonText: {

    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        elevation: 6,
        backgroundColor: '#FFD700'
    },
    vCenterContent: {
        marginTop: "auto",
        marginBottom: 50
    },
    actionText: {
        color: "#525174",
        fontSize: 20,
        textAlign: "center",
    },
    content: {
        backgroundColor: "#525174",
        flex: 1
    },
    bgDark: {
        // backgroundColor: "#525174",
        backgroundColor: "#525174",
        // backgroundColor: "#513B56",
        // backgroundColor: "#348AA7",
    },
    menuBar: {
        // flex: 1,
        height: 50,
        // backgroundColor: "#74B3CE",
        // backgroundColor: "#525174",
        backgroundColor: "#fff",
        // marginTop: "auto",
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 20,
        borderColor: "#fff"
    }
  });