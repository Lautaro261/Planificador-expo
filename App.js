import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar, // Importa StatusBar
  Alert,
  Pressable,
  Image,
  Modal,
  ScrollView,
} from 'react-native';

import Header from './src/components/Header';
import NewBudget from './src/components/NewBudget';
import BudgetControl from './src/components/BudgetControl';
import Form from './src/components/Form';
import {idGenerator} from './src/helpers';
import ListCots from './src/components/ListCosts';
import Filter from './src/components/Filter';

const App = () => {
  const [isAvalidBudget, setIsAvalidBudget] = useState(false); //cambiar a false
  const [budget, setBudget] = useState(0);
  const [costs, setCosts] = useState([
    /* {id: 1, quantity: 10, name: 'Sushi', category: 'food'},
    {id: 2, quantity: 40, name: 'Netflix', category: 'subscriptions'},
    {id: 3, quantity: 50, name: 'Paseo', category: 'divers'}, */
  ]); // array de gastos (expenses)
  const [modalAvailable, setModalAvailable] = useState(false); //cambiar a false
  const [costState, setCostState] = useState({})
  const [filter, setFilter]=useState('')
  const [filterCosts, setFilterCosts]=useState([])


  StatusBar.setBackgroundColor('#3B82F6'); // Cambia el color aquí al que desees
  StatusBar.setBarStyle('light-content'); // Cambia el estilo de los iconos en la barra de notificaciones (light-content o dark-content)

  const handlerNewBudget = budget => {
    //console.log('Entre ! desde app', budget);
    if (Number(budget) > 0) {
      //console.log('valido');
      setIsAvalidBudget(true);
    } else {
      //console.log('no valido!');
      Alert.alert('Error', 'El presupuesto debe ser igual o mayor a 1', [
        {text: 'ok'},
      ]);
    }
  };

  const handlerCosts = cost => {    // HANDLER PARA FORMULARIO QUE CONTROLA EDITAR O ALERTA 'FALTAN DATOS'
    if ([cost.name, cost.category, cost.quantity].includes('')) {
      //console.log('falta che');
      Alert.alert('Error', 'Todos los campos son obligatorios', [{text: 'Ok'}]);
      return;
    }
    //console.log(cost);
    if(cost.id){
      //console.log('Edicion')
      const updatedCosts = costs.map((c)=> c.id === costState.id ? cost : c)
      setCosts(updatedCosts)
    }else{
      cost.id = idGenerator();
      cost.date = Date.now();
      setCosts([...costs, cost]);
    }
    setModalAvailable(!modalAvailable);
  };


  const eliminarCard=(id)=>{
    //console.log('eliminar',id)
    Alert.alert(
      '¿Deseas eliminar este gasto?',
      'En gasto eliminado no se puede recuperar',
      [
        {text: 'Cancelar', style:'cancel'}, 
        {text:'Si, Eliminar', onPress:()=>{
          const gastosActualizados = costs.filter((c)=>{c.id !== id}) // revisar el eliminador de card
          setCosts(gastosActualizados)
          setModalAvailable(!modalAvailable)
          setCostState({})
        }}
      ]
    )
    
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {isAvalidBudget ? (
            <BudgetControl costs={costs} budget={budget} />
          ) : (
            <NewBudget
              budget={budget}
              setBudget={setBudget}
              handlerNewBudget={handlerNewBudget}
            />
          )}
        </View>

        {isAvalidBudget && (

          <>
          <Filter
          filter={filter}
          setFilter={setFilter}
          costs={costs}
          setFilterCosts={setFilterCosts}
          />

          <ListCots 
          costs={costs} 
          setModalAvailable={setModalAvailable}
          modalAvailable={modalAvailable}
          setCostState={setCostState}
          filter={filter}
          filterCosts={filterCosts}
          />
          </>
        )}
      </ScrollView>

      {modalAvailable && (
        <Modal animationType="slide" visible={modalAvailable}>
          <Form
            modalAvailable={modalAvailable}
            setModalAvailable={setModalAvailable}
            handlerCosts={handlerCosts}
            setCostState={setCostState}
            costState={costState}
            eliminarCard={eliminarCard}
          />
        </Modal>
      )}

      {isAvalidBudget && (
        <View style={styles.ContainerImage}>
          <Pressable
            style={[styles.btnPressable]}
            onPress={() => {
              //console.log('click', modalAvailable);
              setModalAvailable(!modalAvailable);
              //console.log(modalAvailable);
            }}>
            {/* <Text>o</Text> */}
            <Image
              style={styles.image}
              source={require('./src/img/nuevo-gasto.png')}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#757575',
    flex: 1,
  },
  header: {
    backgroundColor: '#3B82F6',
    minHeight:380,  //Por si da problema la presupuesto
    paddingTop:40,
  },
  /* ContainerImage:{
    width:10,
    //height:80,
    position:'absolute',
    top:500,
    /* right:10 
  }, */
  btn: {
    borderWidth: 5,
    borderColor: 'red',
    position: 'absolute',
    top: 70,
    right: 30,
    // bottom:40
  },
  btnPressable:{
    //backgroundColor:'red',
    width:70,
    height:70,
    position:'absolute',
    bottom:40,
    right:30
  },
  image: {
    width: 70,
    height: 70,
  },
});

export default App;
