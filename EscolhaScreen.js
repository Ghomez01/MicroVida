import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function EscolhaScreen({ navigation }) {

// Dentro de EscolhaScreen.js
function escolherCelula(tipo) {
  navigation.navigate('Jogo', {
    screen: 'Jogo Atual', // <--- O nome deve ser igual ao 'name' no Drawer.Screen
    params: { tipoCelula: tipo }
  });
}

  return (
    <View style={styles.container}>

      {/* Fundo escuro */}
      <View style={styles.overlay} />

      <Text style={styles.titulo}>
        Qual tipo de celula você deseja começar?
      </Text>

      <TouchableOpacity 
        style={[styles.card, styles.animal]}
        onPress={() => escolherCelula('animal')}
      >
        <Image 
          source={require('./assets/celulaAnimal.png')} // troca depois
          style={styles.imagem}
        />
        <Text style={styles.texto}>Celula Animal</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.card, styles.vegetal]}
        onPress={() => escolherCelula('vegetal')}
      >
        <Image 
          source={require('./assets/celulaVegetal.png')} // troca depois
          style={styles.imagem}
        />
        <Text style={styles.texto}>Celula Vegetal</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f2a44',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  titulo: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  card: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 5
  },

  animal: {
    borderColor: '#a855f7',
    borderWidth: 3
  },

  vegetal: {
    borderColor: '#22c55e',
    borderWidth: 3
  },

  imagem: {
    width: 60,
    height: 60,
    marginRight: 15
  },

  texto: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});
