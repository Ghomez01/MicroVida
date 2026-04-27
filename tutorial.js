import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TutorialScreen({ navigation, route }) {
  const tipoCelula = route?.params?.tipoCelula;

  function irParaJogo() {
    navigation.navigate('Jogo', {
      screen: 'Jogo',
      params: { tipoCelula }
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <LinearGradient 
        colors={['#52C370', '#43929F']} 
        style={styles.header}
      >
        <Text style={styles.tituloHeader}>Tutorial</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scroll}>

        <View style={styles.card}>
          <Image 
            source={require('./assets/tutorial1.png')} 
            style={styles.imagem}
          />
          <Text style={styles.texto}>
            Aqui você acompanha a idade/ciclo em que sua célula está.
          </Text>
        </View>

        <View style={styles.card}>
          <Image 
            source={require('./assets/tutorial2.png')} 
            style={styles.imagem}
          />
          <Text style={styles.texto}>
            Esse é o histórico de dos ciclos da célula, onde aparece suas respostas nas perguntas e suas consequências, como, por exemplo, a perca de energia e o ganho de saúde.
          </Text>
        </View>

        <View style={styles.card}>
          <Image 
            source={require('./assets/tutorial3.png')} 
            style={styles.imagem}
          />
          <Text style={styles.texto}>
            Essa barra indica a evolução da sua célula, com base em seus acertos e erros nas respostas.
          </Text>
        </View>

<View style={styles.card}>
  <Image 
    source={require('./assets/tutorial4.png')} 
    style={styles.imagem}
  />
  <Text style={styles.texto}>
    Com esse botão você avança para o próximo ciclo, a cada ciclo você irá receber uma nova pergunta com suas alternativas.
  </Text>
</View>

<View style={styles.card}>
  <Image 
    source={require('./assets/tutorial6.png')} 
    style={styles.imagem}
  />
  <Text style={styles.texto}>
    Aqui você responde a pergunta de cada ciclo, tendo consequências diferentes caso você erre ou acerte.
  </Text>
</View>

<View style={styles.card}>
  <Image 
    source={require('./assets/tutorial5.png')} 
    style={styles.imagem}
  />
  <Text style={styles.texto}>
    Por aqui você acompanha como esta o status de Energia, Saúde, Estabilidade e Defesa da sua célula, a cada pergunta a barra pode minuir, aumentar ou se manter do jeito que está, dependendo da sua resposta.
  </Text>
</View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.botao}  onPress={() => navigation.navigate('Escolha')}>
          <LinearGradient 
            colors={['#52C370', '#43929F']} 
            style={styles.botaoGradient}
          >
            <Text style={styles.textoBotao}>Concluir tutorial</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

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
  },

  tituloHeader: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },

  scroll: {
    padding: 20,
    paddingBottom: 100
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    elevation: 5
  },

  imagem: {
    width: '100%',
    height: 150,
    borderRadius: 15,
    marginBottom: 10,
    resizeMode: 'cover'
  },

  texto: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500'
  },

  footer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center'
  },

  botao: {
    width: '80%',
  },

  botaoGradient: {
    padding: 18,
    borderRadius: 30,
    alignItems: 'center'
  },

  textoBotao: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});