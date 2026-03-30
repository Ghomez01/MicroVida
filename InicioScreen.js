import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('./assets/fundo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>

        <Text style={styles.title}>MicroVida</Text>

        <View style={styles.abaixo}>
 
          <View style={styles.imagem}>
            <Image 
              source={require('./assets/celulaInicio.png')} 
              style={styles.img} 
              resizeMode="contain"
            />
          </View>

          <View style={styles.rightSide}>

            <TouchableOpacity>
              <Text style={styles.buttonText}>Começar</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.buttonText}>Opções</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Desenvolvedores')}>
              <Text style={styles.buttonText}>Desenvolvedores</Text>
            </TouchableOpacity>

          </View>

        </View>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%', 
    height: '100%',
  },

  container: {
    flex: 1,
    overflow: 'hidden', 
  },

  abaixo: {
    flex: 1,
    flexDirection: 'row', 
  },

  imagem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  img: {
    width: '200%',  
    height: '80%',
    marginLeft: 150
  },

  rightSide: {
    flex: 1,
    justifyContent: 'center',
    gap: 35,
    marginRight: 20,
    marginTop: 15

  },

  title: {
    fontSize: 35,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
  },

  buttonText: {
    color: '#fff',
    fontSize: 21,
    fontWeight: 'bold',
  },
});