import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, StyleSheet, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import globalStyles from '../styles';

const Form = ({
  modalAvailable, 
  setModalAvailable, 
  handlerCosts, 
  setCostState,
  costState,
  eliminarCard
 }) => {

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [id, setId]=useState('');
  const [date, setDate] = useState('');

  useEffect(()=>{
    if(costState?.name){
      setName(costState.name)
      setQuantity(costState.quantity)//arreglar problema con string o numero
      setCategory(costState.category)
      setId(costState.id)
      setDate(costState.date)

    }else{

    }
  },[costState])


  return (
    <View style={styles.container}>
      <View style={styles.ButtonsContainer}>
        <Pressable
          style={[styles.btn,styles.btnCancelar]}
          onPress={() => {
            setModalAvailable(!modalAvailable)
            setCostState({})
            }}>
          <Text style={styles.btnText}>Cancelar</Text>
        </Pressable>

        { !!id && (
        <Pressable
          style={[styles.btn, styles.btnEliminar]}
          onPress={()=>{
            eliminarCard(id)
          }}
          >
          <Text style={styles.btnText}>Eliminar</Text>
        </Pressable>

        )}


        
      </View>

      <View style={styles.form}>
        <Text style={styles.title}>{costState?.name? 'Editar': 'Nuevo'} Gasto</Text>
        <View style={styles.campo}>
          <Text style={styles.label}>Nombre Gasto</Text>
          <TextInput
            placeholder="Ej.: Comida"
            style={styles.input}
            value={name}
            onChangeText={value => {
              setName(value);
            }}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Cantidad</Text>
          <TextInput
            placeholder="Ej.: $400"
            keyboardType="numeric"
            style={styles.input}
            value={quantity}
            onChangeText={value => {
              setQuantity(value);
            }}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Categoria de Gastos</Text>
          <Picker
            selectedValue={category}
            style={styles.input}
            onValueChange={value => {
              setCategory(value);
            }}>
            <Picker.Item label="-- Seleccione --" value="" />
            <Picker.Item label="Ahorro" value="saving" />
            <Picker.Item label="Comida" value="food" />
            <Picker.Item label="Casa" value="home" />
            <Picker.Item label="Ocio" value="recreation" />
            <Picker.Item label="Suscripciones" value="subscriptions" />
            <Picker.Item label="Salud" value="health" />
            <Picker.Item label="Varios" value="divers" />
          </Picker>
        </View>

        <Pressable
          onPress={() => {
            handlerCosts({name, quantity, category, id, date});
          }}
          style={styles.submitBtn}>
          <Text style={styles.submitText}>{costState?.name? 'Guardar': 'Agregar'} Gasto</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E40AF',
    flex: 1,
  },
  form: {
    ...globalStyles.container,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
    color: '#64748B',
  },
  campo: {
    marginVertical: 10,
  },
  label: {
    color: '#64748B',
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  submitBtn: {
    backgroundColor: '#3B82F6',
    padding: 10,
    marginTop: 20,
  },
  submitText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '400',
    textTransform: 'uppercase',
  },
  ButtonsContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  btn:{
    padding: 5,
    marginTop: 30,
    marginHorizontal: 10,
    borderRadius: 10,
    flex:1

  },
  btnCancelar: {
    backgroundColor: '#DD2777',
    padding: 5,
    marginTop: 30,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  btnText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#FFF',
  },
  btnEliminar:{
    backgroundColor:'red'
  }
});
export default Form;