import React, { useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import globalStyles from "../styles";
import { Picker } from "@react-native-picker/picker";


const Filter=({setFilter, filter, costs, setFilterCosts})=>{

    useEffect(()=>{
        if(filter === ''){
            setFilterCosts([])
        }else{
            const gastosFiltrado = costs.filter((cost)=> cost.category === filter)
            setFilterCosts(gastosFiltrado);
        }
    },[filter])

    return(
        <View style={styles.container}>
            <Text style={styles.label}>Filtrar Gastos</Text>

            <Picker
            
           // style={styles.input}
           selectedValue={filter}
            onValueChange={(value) => {
              setFilter(value);
            }}
           >
            <Picker.Item label="-- Seleccione --" value="" />
            <Picker.Item label="Ahorro" value="ahorro" />
            <Picker.Item label="Comida" value="comida" />
            <Picker.Item label="Casa" value="casa" />
            <Picker.Item label="Ocio" value="ocio" />
            <Picker.Item label="Suscripcion" value="suscripcion" />
            <Picker.Item label="Salud" value="salud" />
            <Picker.Item label="Varios" value="varios" />
          </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        ...globalStyles.container,
        transform:[{translateY:0}],
        marginTop:70,
    },
    label:{
        fontSize:16,
        fontWeight:'500',
        color:'#64748B',
    }
})

export default Filter