import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function DevsScreen({ navigation }) {

  const devs = [
    {
      nome: 'Otavio Ribeiro',
      email: 'otribeiro122@gmail.com',
      foto: require('./assets/dev1.jpeg')
    },
    {
      nome: 'Gustavo Gomes',
      email: 'Gustavo@gmail.com',
      foto: require('./assets/dev2.png')
    },
    {
      nome: 'Leonni',
      email: 'Leonni@gmail.com',
      foto: require('./assets/dev3.jpeg')
    },
    {
      nome: 'Metheus Santana',
      email: 'Matheus@gmail.com',
      foto: require('./assets/dev4.jpeg')
    },
    {
      nome: 'Henzo',
      email: 'Henzo@gmail.com',
      foto: require('./assets/dev5.jpeg')
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      
      <LinearGradient 
        colors={['#52C370', '#43929F']} 
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity 
          style={styles.menuIcon}
          onPress={() => navigation.openDrawer()}
        >
          <Ionicons name="menu" size={26} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Desenvolvedores</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.lista}>
        {devs.map((dev, index) => (
          <View key={index} style={styles.card}>
            
            <Image source={dev.foto} style={styles.foto} />

            <Text style={styles.nome}>{dev.nome}</Text>

            <Text style={styles.email}>{dev.email}</Text>

          </View>
        ))}
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#EBE5FF' 
  },

  header: {
    height: 80,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    position: 'relative'
  },

  menuIcon: {
    position: 'absolute',
    left: 20,
    top: 25,
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },

  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },

  lista: {
    padding: 20,
    alignItems: 'center'
  },

  card: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5
  },

  foto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10
  },

  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3d348b',
    marginBottom: 5
  },

  email: {
    fontSize: 14,
    color: '#666'
  }
});