import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

export default function GameEndScreen({ navigation, route }) {
  const { score = 0, errors = 0, totalQuestions = 0 } = route.params ?? {};

  const chartData = [
    {
      name: "Acertos",
      population: score,
      color: "#4caf50",
      legendFontColor: "#333",
      legendFontSize: 16,
    },
    {
      name: "Erros",
      population: errors,
      color: "#f44336",
      legendFontColor: "#333",
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
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  statsContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  statText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#555",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
