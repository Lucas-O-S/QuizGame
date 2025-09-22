import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function StartScreen({ navigation }) {
  return (
    <View >
      <TouchableOpacity>
        <Text>Jogar</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Criar</Text>
      </TouchableOpacity>
    </View>
  );
}