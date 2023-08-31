import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import globalStyles from '../styles';
import {formatearCantidad} from '../helpers';

const BudgetControl = ({budget, costs}) => {
  const [availableAmount, setAvailableAmount] = useState(1); //dinero disponile
  const [expenses, setExponses] = useState(2); //dinero gastado

  useEffect(() => {
    // ------------------------------CALCULO DE GASTADO-------------------------------------------------
    const totalExpended = costs.reduce(
      (total, obj) => total + Number(obj.quantity),
      0,
    );
    console.log('calculo de gastos: ', totalExpended);
    setExponses(totalExpended);
    //------------------------------CALCULO DISPONIBLE------------------------------------------------------
    const totalAvailableAmount = budget - totalExpended;
    console.log('calculo de disponible:', totalAvailableAmount);
    setAvailableAmount(totalAvailableAmount);
  }, [costs]);

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Image style={styles.image} source={require('../img/grafico.jpg')} />
      </View>

      <View style={styles.textContainer}>
        {/* PRESUPUETO */}
        <Text style={styles.value}>
          <Text style={styles.label}>Presupuesto: </Text>
          {formatearCantidad(budget)}
        </Text>
        {/* DISPONIBLE */}
        <Text style={styles.value}>
          <Text style={styles.label}>Disponible: </Text>
          {formatearCantidad(availableAmount)}
        </Text>
        {/* GASTADO */}
        <Text style={styles.value}>
          <Text style={styles.label}>Gastado: </Text>
          {formatearCantidad(expenses)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  center: {
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
  textContainer: {
    marginTop: 50,
  },
  value: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: '600',
    color: '#3B82F6',
  },
});

export default BudgetControl;