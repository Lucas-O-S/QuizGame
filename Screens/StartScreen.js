import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../Styles/StartScreenStyles";

export default function StartScreen({ navigation }) {
  return (

    <View style={styles.bg}>
      <Text style={styles.title}>Quiz Game</Text>

      <View style={styles.container}>
        <TouchableOpacity style={styles.button1}
          onPress={() => navigation.navigate("ChooseScreen")}
        >
          <Text style={styles.buttonText}>Jogar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2}
          onPress={() => navigation.navigate("CreatorChooseScreen")}
        >
          <Text style={styles.buttonText}>Criar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}