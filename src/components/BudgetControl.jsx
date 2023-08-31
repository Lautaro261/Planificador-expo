import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import globalStyles from '../styles';
import {formatearCantidad} from '../helpers';
import CircularProgress from 'react-native-circular-progress-indicator';

const BudgetControl = ({budget, costs}) => {
  const [availableAmount, setAvailableAmount] = useState(1); //dinero disponile
  const [expenses, setExponses] = useState(2); //dinero gastado
  const [percentage, setPercentage] =useState(0)

  useEffect(() => {
    // ------------------------------CALCULO DE GASTADO-------------------------------------------------
    const totalExpended = costs.reduce(
      (total, obj) => total + Number(obj.quantity),
      0,
    );
    //console.log('calculo de gastos: ', totalExpended);
    setExponses(totalExpended);
    //------------------------------CALCULO DISPONIBLE------------------------------------------------------
    const totalAvailableAmount = budget - totalExpended;
    //console.log('calculo de disponible:', totalAvailableAmount);
    setAvailableAmount(totalAvailableAmount);

    //-----------------------------CALCULO PORCENTAJE-----------------------------------------------------------
    const newPercentage = (((budget - totalAvailableAmount) / budget) * 100)
    setTimeout(()=>{
      setPercentage(newPercentage);
    }, 1000)
  }, [costs]);

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <CircularProgress 
        radius={150}
        value={percentage}
        valueSuffix={'%'}
        title='Gastado'
        inActiveStrokeColor='#F5F5F5'
        inActiveStrokeWidth={18}
        activeStrokeColor='#3B82F6'
        titleStyle={{fontWeight:'400', fontSize:20}}
        titleColor='#64748B'
        duration={1500}
        />
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