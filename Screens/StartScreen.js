import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import styles from "../Styles/StartScreenStyles";
import { usePulseAnimation, useSlideAnimation } from "../Styles/Animations";

export default function StartScreen({ navigation }) {
  
  // Animações
  const pulseAnim1 = usePulseAnimation(1.2, 1500);
  const pulseAnim2 = usePulseAnimation(1.15, 1700);
  const slideAnim = useSlideAnimation(10, 2000);

  return (
    <View style={styles.bg}>

      <Animated.View
        style={[
          styles.circleTopLeft,
          {
            transform: [{ scale: pulseAnim1 }],
            opacity: pulseAnim1.interpolate({
              inputRange: [1, 1.2],
              outputRange: [0.15, 0.3],
            }),
          },
        ]}
      />
      <Animated.View
        style={[
          styles.circleBottomRight,
          {
            transform: [{ scale: pulseAnim2 }],
            opacity: pulseAnim2.interpolate({
              inputRange: [1, 1.15],
              outputRange: [0.15, 0.28],
            }),
          },
        ]}
      />
      <Animated.View
        style={[
          styles.diagonalLine,
          {
            transform: [
              { rotate: "25deg" },
              { translateX: slideAnim },
            ],
          },
        ]}
      />

      {/* Ícone de interrogação */}
      <FontAwesome5
        name="question-circle"
        size={100}
        color={styles.title.color}
        style={styles.icon}
        solid
      />

      <Text style={styles.title}>Quiz Game</Text>

      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => navigation.navigate("ChooseScreen")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Jogar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate("CreatorChooseScreen")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Criar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
