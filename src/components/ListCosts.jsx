import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import Card from "./Card";

const ListCots = ({
  costs,
  setModalAvailable,
  modalAvailable,
  setCostState,
  filter,
  filterCosts,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gatos</Text>

      {filter
        ? filterCosts.map((cost) => (
            <Card
              cost={cost}
              key={cost.id}
              setModalAvailable={setModalAvailable}
              modalAvailable={modalAvailable}
              setCostState={setCostState}
            />
          ))
        : costs.map((cost) => (
            <Card
              cost={cost}
              key={cost.id}
              setModalAvailable={setModalAvailable}
              modalAvailable={modalAvailable}
              setCostState={setCostState}
            />
          ))}

      {(costs.length === 0 || (filterCosts.length === 0 && !!filter)) && (
        <Text style={styles.notCosts}>No hay gastos</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginBottom: 100,
  },
  title: {
    color: "#bad7ff",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "500",
    marginTop: 20,
  },
  notCosts: {
    //marginTop:20,
    textAlign: "center",
    fontSize: 15,
    marginVertical: 20,
  },
});

export default ListCots;
