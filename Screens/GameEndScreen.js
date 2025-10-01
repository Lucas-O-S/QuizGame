import { View, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import styles from "../Styles/GameEndScreenStyles";
import Colors from "../Styles/Colors";

export default function GameEndScreen({ navigation, route }) {
  const { score = 0, errors = 0, totalQuestions = 0 } = route.params ?? {};

  const chartData = [
    {
      name: "Acertos",
      population: score,
      color: Colors.secondary,
      legendFontColor: Colors.textPrimary,
      legendFontSize: 16,
    },
    {
      name: "Erros",
      population: errors,
      color: Colors.primary,
      legendFontColor: Colors.textPrimary,
      legendFontSize: 16,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Fim do Jogo!</Text>

      <PieChart
        data={chartData}
        width={Dimensions.get("window").width - 40} // ajusta à largura da tela
        height={220}
        chartConfig={{
          backgroundColor: Colors.background,
          backgroundGradientFrom: Colors.background,
          backgroundGradientTo: Colors.background,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      <View style={styles.statsContainer}>
        <Text style={styles.statText}>Total de Perguntas: {totalQuestions}</Text>
        <Text style={styles.statText}>Acertos: {score}</Text>
        <Text style={styles.statText}>Erros: {errors}</Text>
        <Text style={styles.statText}>
          Porcentagem de Acertos: {((score / totalQuestions) * 100).toFixed(1)}%
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ChooseScreen")}
      >
        <Text style={styles.buttonText}>Voltar ao Início</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}