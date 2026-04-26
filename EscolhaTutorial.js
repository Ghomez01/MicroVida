import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function EscolhaTutorial({ navigation }) {

  function irParaTutorial() {
    navigation.navigate('Tutorial');
  }

  function pularTutorial() {
    navigation.navigate('Escolha');
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Deseja conferir o tutorial?
      </Text>

      <View style={styles.botoesContainer}>

        {/* BOTÃO SIM */}
        <TouchableOpacity 
          style={[styles.botao, styles.sim]}
          onPress={irParaTutorial}
        >
          <Text style={styles.textoBotao}>Sim</Text>
        </TouchableOpacity>

        {/* BOTÃO NÃO */}
        <TouchableOpacity 
          style={[styles.botao, styles.nao]}
          onPress={() => navigation.navigate('Escolha')}
        >
          <Text style={styles.textoBotao}>Não</Text>
        </TouchableOpacity>

      </View>

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
    fontSize: 20,
    marginBottom: 40,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%'
  },

  botao: {
    flex: 1,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 5
  },

  sim: {
    backgroundColor: '#22c55e'
  },

  nao: {
    backgroundColor: '#ef4444'
  },

  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});