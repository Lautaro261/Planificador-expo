import React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import Card from './Card';

const ListCots = ({costs, setModalAvailable, modalAvailable, setCostState}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gatos</Text>

      {costs.length === 0 ? (
        <Text style={styles.notCosts}>No hay gastos Agregados</Text>
      ) : (
        costs.map(cost => <Card 
            cost={cost} 
            key={cost.id}
            setModalAvailable={setModalAvailable}
            modalAvailable={modalAvailable}
            setCostState={setCostState}
             />)
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 70,
    marginBottom: 100,
  },
  title: {
    color: '#bad7ff',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 20,
  },
  notCosts: {
    //marginTop:20,
    textAlign: 'center',
    fontSize: 15,
    marginVertical: 20,
  },
});

export default ListCots;