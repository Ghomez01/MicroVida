import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

export default function HomeScreen({ navigation }) {
  
  const [fontsLoaded] = useFonts({
    'Urban Constructed-Regular': require('./assets/fonts/UrbanConstructed-Regular.ttf'), 
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>

      <LinearGradient
        colors={['#C93BC3', '#8C64B3']}
        locations={[0, 0.9]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.topo}
      >
      </LinearGradient>

      <Image 
        source={require('./assets/Nome.png')} 
        style={styles.imagem}
      />

      <View style={styles.botoesDiv}>
        <TouchableOpacity onPress={() => navigation.navigate('Escolha-Tutorial')}>
          <View style={styles.CaixaText}>
            <Text style={styles.buttonText}>Jogar</Text>
          </View>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBE5FF',
    alignItems: 'center',
  },

  imagem: {
  width: 250,
  height: 250,
  resizeMode: 'contain', // mantém proporção
},

  topo: {
    width: '100%',
    height: 80,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',

    // --- PROPRIEDADES DE SOMBRA ---
    
    // Para Android
    elevation: 8, 
    
    // Para iOS
    shadowColor: '#ADA2D2',
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.9, 
    shadowRadius: 5, 
    
   
    backgroundColor: '#C93BC3', 
  },

  

  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },

  botoesDiv: {
    width: '80%',
    gap: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 21,
    textAlign: 'center',
    width: '100%',
    fontFamily: 'Urban Constructed-Regular',
    
  },

  CaixaText: {
    backgroundColor: '#C93BC3',
    padding: 25,
    borderRadius: 10,
    alignItems: 'center',
  
    shadowColor: '#ADA2D2',
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.9, 
    shadowRadius: 5, 
    
   
  },
});