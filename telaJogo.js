import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // 👈 IMPORTANTE: Novo import aqui
import { SafeAreaView } from 'react-native-safe-area-context';

// Importe suas perguntas.
import { perguntasJogo } from './perguntas'; 

const { width, height } = Dimensions.get('window');

export default function TelaJogo({ route, navigation }) {
const tipoCelula = route?.params?.tipoCelula || 'animal';

  // Status vitais
  const [energia, setEnergia] = useState(100);
  const [saude, setSaude] = useState(100);
  const [estabilidade, setEstabilidade] = useState(100);
  const [defesa, setDefesa] = useState(100);
  
  // Controle de Jogo
  const [ciclo, setCiclo] = useState(1);
  const [progressoEvolucao, setProgressoEvolucao] = useState(0); 
  const [statusJogo, setStatusJogo] = useState('jogando'); 

  // UI
  const [modalVisivel, setModalVisivel] = useState(false);
  const [perguntaAtual, setPerguntaAtual] = useState(null);
  const [historico, setHistorico] = useState([]); 

  const imagemCelula = tipoCelula === 'vegetal' 
    ? require('./assets/celulaVegetal.png') 
    : require('./assets/celulaAnimal.png');

  const lidarComCiclo = () => {
    if (statusJogo !== 'jogando') return;

    const lista = tipoCelula === 'vegetal' ? perguntasJogo.vegetal : perguntasJogo.animal;
    const sorteada = lista[Math.floor(Math.random() * lista.length)];
    setPerguntaAtual(sorteada);
    setModalVisivel(true);
  };

  const responder = (opcao) => {
    const efeito = opcao.efeito;
    
    setEnergia(prev => Math.max(0, Math.min(100, prev + (efeito.energia || 0))));
    setSaude(prev => Math.max(0, Math.min(100, prev + (efeito.saude || 0))));
    setEstabilidade(prev => Math.max(0, Math.min(100, prev + (efeito.estabilidade || 0))));
    setDefesa(prev => Math.max(0, Math.min(100, prev + (efeito.defesa || 0))));
    
    const ganhoEvolucao = efeito.evolucao !== undefined ? efeito.evolucao : (efeito.saude > 0 ? 15 : 0);
    const novoProgresso = Math.min(100, progressoEvolucao + ganhoEvolucao);
    setProgressoEvolucao(novoProgresso);

    const mudancas = [];
    Object.entries(efeito).forEach(([chave, valor]) => {
      if (valor !== 0 && chave !== 'evolucao') {
        const icon = chave === 'energia' ? '⚡' : chave === 'saude' ? '❤️' : '🧬';
        mudancas.push({
          texto: `${valor > 0 ? '+' : ''}${valor}${icon}`,
          cor: valor > 0 ? '#2ecc71' : '#ff4757'
        });
      }
    });

    const novaEntrada = {
      id: Date.now().toString(),
      ciclo: ciclo,
      acao: opcao.texto.split(') ')[1] || opcao.texto,
      mudancas: mudancas
    };

    setHistorico(prev => [novaEntrada, ...prev].slice(0, 3));
    
    const proximoCiclo = ciclo + 1;
    setCiclo(proximoCiclo);
    setModalVisivel(false);

    if (novoProgresso >= 100 && proximoCiclo <= 11) { 
      setTimeout(() => setStatusJogo('vitoria'), 500);
    } else if (proximoCiclo > 10 && novoProgresso < 100) {
      setTimeout(() => setStatusJogo('derrota'), 500);
    }
  };

  const reiniciarJogo = () => {
    setEnergia(100); setSaude(100); setEstabilidade(100); setDefesa(100);
    setCiclo(1); setProgressoEvolucao(0); setHistorico([]); setStatusJogo('jogando');
  };

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
      </LinearGradient>

      <View style={styles.gameArea}>
        <View style={styles.perfilContainer}>
          <View style={styles.bordaImagem}>
            <Image source={imagemCelula} style={styles.imagemCelula} />
          </View>
          <View style={styles.textosHeader}>
            <Text style={styles.nomeCelula}>Célula {tipoCelula === 'vegetal' ? 'Vegetal' : 'Animal'}</Text>
            <Text style={styles.statusLabel}>Idade: {ciclo} ciclo</Text>
          </View>
        </View>

        <View style={styles.containerBarraVertical}>
          <View style={styles.iconeEstrelaTopo}>
            <Ionicons name="star" size={16} color="#fbc531" />
          </View>
          <View style={styles.trackVertical}>
            <View style={[styles.fillVertical, { height: `${progressoEvolucao}%` }]} />
          </View>
        </View>

        {/* 👈 SUBSTITUÍDO: Histórico com Degradê Branco translúcido (efeito vidro/glassmorphism) */}
        <LinearGradient 
          colors={['#EBE5FF', '#EBE5FF']}
          style={styles.historicoContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.historicoTitulo}>HISTÓRICO RECENTE</Text>
          {historico.length === 0 ? (
            <Text style={styles.textoVazio}>Clique em Ciclo para começar...</Text>
          ) : (
            historico.map(item => (
              <View key={item.id} style={styles.historicoItem}>
                <View style={styles.historicoLinha}>
                  <Text style={styles.historicoCiclo}>C{item.ciclo}</Text>
                  <Text style={styles.historicoAcao} numberOfLines={1}>{item.acao}</Text>
                </View>
                <View style={styles.mudancasRow}>
                  {item.mudancas.map((m, idx) => (
                    <Text key={idx} style={[styles.resultadoTexto, { color: m.cor }]}>{m.texto}  </Text>
                  ))}
                </View>
              </View>
            ))
          )}
        </LinearGradient>
      </View>

      <Modal visible={modalVisivel} transparent animationType="fade">
        {/* ... (mantido igual) ... */}
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalSub}>EVENTO DE CICLO</Text>
            <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
              <Text style={styles.modalDescription}>{perguntaAtual?.pergunta}</Text>
              {perguntaAtual?.opcoes.map((opcao, index) => (
                <TouchableOpacity key={index} style={styles.optionButton} onPress={() => responder(opcao)}>
                  <Text style={styles.optionText}>{opcao.texto}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal visible={statusJogo !== 'jogando'} transparent animationType="slide">
        {/* ... (mantido igual) ... */}
        <View style={[styles.modalOverlay, { backgroundColor: statusJogo === 'vitoria' ? 'rgba(46, 204, 113, 0.9)' : 'rgba(231, 76, 60, 0.9)' }]}>
          <View style={styles.modalFimJogo}>
            <Ionicons name={statusJogo === 'vitoria' ? "trophy" : "skull"} size={80} color={statusJogo === 'vitoria' ? "#fbc531" : "#c0392b"} />
            <Text style={styles.tituloFimJogo}>
              {statusJogo === 'vitoria' ? 'Evolução Concluída!' : 'Falha na Evolução!'}
            </Text>
            <Text style={styles.textoFimJogo}>
              {statusJogo === 'vitoria' 
                ? 'Sua célula atingiu a maturação máxima antes de 10 ciclos. Excelente trabalho biológico!' 
                : '10 ciclos se passaram e sua célula não conseguiu evoluir o suficiente para sobreviver.'}
            </Text>
            <TouchableOpacity style={styles.botaoReiniciar} onPress={reiniciarJogo}>
              <Text style={styles.textoBotaoReiniciar}>Tentar Novamente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.footerContainer}>
        <View style={[styles.ondaSuave, { top: 35 }]} />

        {/* 👈 SUBSTITUÍDO: Botão Ciclo agora tem um wrapper Touchable e o Gradient por dentro */}
        <TouchableOpacity style={styles.botaoCicloWrapper} onPress={lidarComCiclo} activeOpacity={0.8}>
          <LinearGradient 
            colors={['#52C370', '#43929F']} 
            style={styles.botaoCicloGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="play" size={28} color="white" style={{ marginLeft: 3 }} />
            <Text style={styles.textoBotaoCiclo}>ciclo</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.painelAtributos}>
          <Atributo label="Energia" valor={energia} cor="#2ecc71" icon="⚡" />
          <Atributo label="Saúde" valor={saude} cor="#fbc531" icon="❤️" /> 
          <Atributo label="Estabilidade" valor={estabilidade} cor="#3498db" icon="🧬" />
          <Atributo label="Defesa" valor={defesa} cor="#1abc9c" icon="🛡️" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const Atributo = ({ label, valor, cor, icon }) => (
  <View style={styles.atributoRow}>
    <View style={styles.labelContainer}>
      <Text style={styles.atributoIcon}>{icon}</Text>
      <Text style={styles.atributoText}>{label}</Text>
    </View>
    <View style={styles.barraBackground}>
      <View style={[styles.barraFill, { width: `${valor}%`, backgroundColor: cor }]} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EBE5FF'},
  
  header: {
    height: 80, 
    /* backgroundColor removido, pois agora usa LinearGradient */
    borderBottomLeftRadius: 35, borderBottomRightRadius: 35,
    justifyContent: 'center', alignItems: 'center', elevation: 10,

        shadowColor: '#ADA2D2',
    shadowOffset: { width: 0, height: 4 }, // Deslocamento (0 horizontal, 4 vertical)
    shadowOpacity: 0.9, // Transparência da sombra
    shadowRadius: 5, // Quão "espalhada" ela é
  },
  menuIcon: { width: 38, height: 38, borderRadius: 19, borderWidth: 1.5, borderColor: 'white', justifyContent: 'center', alignItems: 'center' },
  gameArea: { flex: 1, padding: 25 },
  perfilContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  bordaImagem: { width: 75, height: 75, borderRadius: 38, backgroundColor: 'white', borderWidth: 2, borderColor: '#a78bfa', justifyContent: 'center', alignItems: 'center', elevation: 5 },
  imagemCelula: { width: 55, height: 55, resizeMode: 'contain' },
  textosHeader: { marginLeft: 15 },
  nomeCelula: { fontSize: 22, fontWeight: 'bold', color: '#3d348b' },
  statusLabel: { fontSize: 15, color: '#666', fontWeight: '600' },

  containerBarraVertical: {
    position: 'absolute',
    right: 25,
    top: 130,
    bottom: 20, 
    width: 24,
    alignItems: 'center',
    zIndex: 10,
  },
  iconeEstrelaTopo: {
    backgroundColor: 'white',
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C5C1E0',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    marginBottom: -10, 
  },
  trackVertical: {
    flex: 1,
    width: 18,
    backgroundColor: '#C5C1E0', 
    borderRadius: 10,
    justifyContent: 'flex-end', 
    overflow: 'hidden',
  },
  fillVertical: {
    width: '100%',
    backgroundColor: '#2ecc71', 
    borderRadius: 10,
  },

  historicoContainer: { 
    /* backgroundColor removido */
    borderRadius: 20, padding: 15, borderWidth: 1, borderColor: 'white', marginRight: 40 
  }, 
  historicoTitulo: { fontSize: 11, fontWeight: '900', color: '#3d348b', opacity: 0.6, marginBottom: 10 },
  historicoItem: { marginBottom: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)', paddingBottom: 5 },
  historicoLinha: { flexDirection: 'row', alignItems: 'center' },
  historicoCiclo: { backgroundColor: '#3d348b', color: 'white', fontSize: 10, paddingHorizontal: 5, borderRadius: 4, marginRight: 8, fontWeight: 'bold' },
  historicoAcao: { fontSize: 14, color: '#333', fontWeight: '600', flex: 1 },
  mudancasRow: { flexDirection: 'row', marginTop: 2 },
  resultadoTexto: { fontSize: 13, fontWeight: 'bold' },
  textoVazio: { fontSize: 13, color: '#888', fontStyle: 'italic', textAlign: 'center' },

  footerContainer: {
    height: height * 0.32,
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden', 
  },
  ondaSuave: {
    position: 'absolute',
    width: width * 1.8,
    height: width * 1.8,
    borderRadius: width,
    backgroundColor: '#48425D',
    alignSelf: 'center',
    top: 40, 
  },
  
  /* 👈 ATENÇÃO: Estilos do botão alterados para acomodar o Gradient */
  botaoCicloWrapper: {
    position: 'absolute',
    top: 0, 
    alignSelf: 'center',
    elevation: 12,
    zIndex: 100,
  },
  botaoCicloGradient: {
    width: 75,
    height: 75,
    borderRadius: 40,
    borderWidth: 5,
    borderColor: '#e3d9ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  textoBotaoCiclo: { color: 'white', fontSize: 11, fontWeight: 'bold' },
  painelAtributos: {
    width: '100%',
    paddingHorizontal: 35,
    paddingBottom: 25,
    marginTop: 30, 
    zIndex: 50,
    top: 10,
  },
  atributoRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 3 },
  labelContainer: { flexDirection: 'row', alignItems: 'center', width: 110 },
  atributoIcon: { fontSize: 14, marginRight: 6 },
  atributoText: { color: 'white', fontSize: 13, fontWeight: 'bold' },
  barraBackground: {
    flex: 1,
    height: 14, 
    backgroundColor: '#342F44',
    borderRadius: 6,
    overflow: 'hidden',
  },
  barraFill: { height: '100%', borderRadius: 6 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', maxHeight: '75%', backgroundColor: 'white', borderRadius: 30, padding: 25, alignItems: 'center' },
  modalSub: { color: '#2ecc71', fontWeight: 'bold', fontSize: 12, marginBottom: 15 },
  modalDescription: { fontSize: 19, textAlign: 'center', marginBottom: 20, fontWeight: 'bold', color: '#222', lineHeight: 24 },
  optionButton: { width: '100%', backgroundColor: '#EBE5FF', padding: 18, borderRadius: 15, marginVertical: 6, borderWidth: 1, borderColor: '#EBE5FF' },
  optionText: { textAlign: 'center', fontWeight: 'bold', color: '#444' },

  modalFimJogo: { width: '85%', backgroundColor: 'white', borderRadius: 30, padding: 30, alignItems: 'center', elevation: 20 },
  tituloFimJogo: { fontSize: 24, fontWeight: 'bold', color: '#333', marginTop: 15, marginBottom: 10, textAlign: 'center' },
  textoFimJogo: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 25, lineHeight: 22 },
  botaoReiniciar: { backgroundColor: '#3d348b', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 25, width: '100%' },
  textoBotaoReiniciar: { color: 'white', fontWeight: 'bold', fontSize: 16, textAlign: 'center' },
});