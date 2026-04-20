import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <LinearGradient
        colors={['#8E44AD', '#D94FCF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.topo}
      >
      </LinearGradient>

      <Image 
        source={require('./assets/Nome.png')} 
        style={styles.imagem}
      />

      <View style={styles.botoesDiv}>
        <TouchableOpacity onPress={() => navigation.navigate('Desenvolvedores')}>
          <View style={styles.CaixaText}>
            <Text style={styles.buttonText}>Jogar</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.CaixaText}>
            <Text style={styles.buttonText}>Como funciona?</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3d9ff',
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
    fontWeight: 'bold',
    textAlign: 'center',
  },

  CaixaText: {
    backgroundColor: '#B93CC3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
});