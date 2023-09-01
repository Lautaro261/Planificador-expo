import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import globalStyles from "../styles";
import { formatearCantidad, formatearFecha } from "../helpers";

const diccionaryIcons = {
  ahorro: require("../img/icono_ahorro.png"),
  comida: require("../img/icono_comida.png"),
  casa: require("../img/icono_casa.png"),
  suscripcion: require("../img/icono_suscripciones.png"),
  salud: require("../img/icono_salud.png"),
  ocio: require("../img/icono_ocio.png"),
  varios: require("../img/icono_gastos.png"),
};

const Card = ({ cost, setModalAvailable, modalAvailable, setCostState }) => {
  const { name, category, id, quantity, date } = cost;

  const handlerPress = () => {
    setModalAvailable(!modalAvailable);
    setCostState(cost);
  };

  return (
    <Pressable onPress={handlerPress}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.contentImage}>
            <Image style={styles.image} source={diccionaryIcons[category]} />
          </View>

          <View style={styles.containerText}>
            <Text style={styles.category}>{category}</Text>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.date}>Fecha: {formatearFecha(date)}</Text>
          </View>
          <Text style={styles.quantity}>{formatearCantidad(quantity)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    marginBottom: 10,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentImage: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  containerText: {
    flex: 1,
    /* backgroundColor:'red' */
  },
  category: {
    color: "#666666",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  name: {
    fontSize: 18,
    color: "#64748B",
    marginBottom: 5,
  },
  date: {
    fontWeight: "400",
    color: "#DB2777",
  },
  quantity: {
    fontSize: 20,
    fontWeight: "600",
    color: "#242424",
  },
});

export default Card;
