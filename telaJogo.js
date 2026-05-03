import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import ConfettiCannon from 'react-native-confetti-cannon';

// Importes internos
import { perguntasJogo } from './perguntas'; 
import { useMusic } from './MusicContext'; 

const { width, height } = Dimensions.get('window');

export default function TelaJogo({ route, navigation }) {
  const { isMuted, toggleMute } = useMusic();
  const tipoCelula = route?.params?.tipoCelula || 'animal';

  // Status vitais
  const [energia, setEnergia] = useState(100);
  const [saude, setSaude] = useState(100);
  const [estabilidade, setEstabilidade] = useState(100);
  const [defesa, setDefesa] = useState(100);
  
  // Controle de Jogo
  const [ciclo, setCiclo] = useState(1);
  const [progressoMaturacao, setProgressoMaturacao] = useState(0); 
  const [statusJogo, setStatusJogo] = useState('jogando'); 

  // UI e Sons
  const [modalVisivel, setModalVisivel] = useState(false);
  const [perguntaAtual, setPerguntaAtual] = useState(null);
  const [historico, setHistorico] = useState([]); 
  const [somVitoria, setSomVitoria] = useState(null);

  const imagemCelula = tipoCelula === 'vegetal' 
    ? require('./assets/celulaVegetal.png') 
    : require('./assets/celulaAnimal.png');

  // Lógica de Som de Vitória
  async function tocarSomVitoria() {
    if (isMuted) return;
    try {
      const { sound } = await Audio.Sound.createAsync(require('./assets/vitoria.mp3'));
      setSomVitoria(sound);
      await sound.playAsync();
    } catch (e) { console.log("Erro ao tocar som: ", e); }
  }

  useEffect(() => {
    if (statusJogo === 'vitoria') tocarSomVitoria();
  }, [statusJogo]);

  useEffect(() => {
    return somVitoria ? () => { somVitoria.unloadAsync(); } : undefined;
  }, [somVitoria]);

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
    
    const ganhoMaturacao = efeito.evolucao !== undefined ? efeito.evolucao : (efeito.saude > 0 ? 15 : 0);
    const novoProgresso = Math.min(100, progressoMaturacao + ganhoMaturacao);
    setProgressoMaturacao(novoProgresso);

    const mudancas = [];
    Object.entries(efeito).forEach(([chave, valor]) => {
      if (valor !== 0 && chave !== 'evolucao') {
        const icon = chave === 'energia' ? '⚡' : chave === 'saude' ? '❤️' : '🧬';
        mudancas.push({ texto: `${valor > 0 ? '+' : ''}${valor}${icon}`, cor: valor > 0 ? '#2ecc71' : '#ff4757' });
      }
    });

    setHistorico(prev => [{ id: Date.now().toString(), ciclo, acao: opcao.texto.split(') ')[1] || opcao.texto, mudancas }, ...prev].slice(0, 3));
    
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
    setCiclo(1); setProgressoMaturacao(0); setHistorico([]); setStatusJogo('jogando');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER LIMPO COM BOTÃO DE MÚSICA */}
      <LinearGradient colors={['#52C370', '#43929F']} style={styles.header} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={26} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.musicIcon} onPress={toggleMute}>
          <Ionicons name={isMuted ? "volume-mute" : "volume-high"} size={22} color="white" />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.gameArea}>
        <View style={styles.perfilContainer}>
          <View style={styles.bordaImagem}>
            <Image source={imagemCelula} style={styles.imagemCelula} />
          </View>
          <View style={styles.textosHeader}>
            <Text style={styles.nomeCelula}>Célula {tipoCelula === 'vegetal' ? 'Vegetal' : 'Animal'}</Text>
            <Text style={styles.statusLabel}>Ciclo Celular: {ciclo}/10</Text>
          </View>
        </View>

        {/* BARRA DE MATURAÇÃO VERTICAL */}
        <View style={styles.containerBarraVertical}>
          <View style={styles.iconeEstrelaTopo}>
            <Ionicons name="sparkles" size={16} color="#fbc531" />
          </View>
          <View style={styles.trackVertical}>
            <View style={[styles.fillVertical, { height: `${progressoMaturacao}%` }]} />
          </View>
        </View>

        {/* HISTÓRICO */}
        <LinearGradient colors={['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.5)']} style={styles.historicoContainer}>
          <Text style={styles.historicoTitulo}>HISTÓRICO DE PROCESSOS</Text>
          {historico.length === 0 ? (
            <Text style={styles.textoVazio}>Toque no botão central para iniciar o ciclo...</Text>
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

      {/* MODAL DE EVENTO */}
      <Modal visible={modalVisivel} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalSub}>ESTÍMULO AMBIENTAL</Text>
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

      {/* MODAL DE VITÓRIA (MATURAÇÃO COMPLETA) */}
      <Modal visible={statusJogo === 'vitoria'} transparent animationType="fade">
        <View style={styles.modalOverlayVitoria}>
          <ConfettiCannon count={200} origin={{x: width/2, y: height}} fadeOut={true} />
          <View style={styles.modalFimJogoVitoria}>
            <LinearGradient colors={['#fbc531', '#f39c12']} style={styles.circuloTrofeu}>
              <Ionicons name="trophy" size={60} color="white" />
            </LinearGradient>
            <Text style={styles.tituloVitoria}>SUCESSO!</Text>
            <Text style={styles.subtituloVitoria}>MATURAÇÃO CONCLUÍDA</Text>
            <View style={styles.dividerVitoria} />
            <Text style={styles.textoFimJogo}>Sua célula atingiu a diferenciação e maturação máxima! Homeostase alcançada com sucesso.</Text>
            <TouchableOpacity style={styles.botaoReiniciarVitoria} onPress={reiniciarJogo}>
              <Text style={styles.textoBotaoReiniciar}>Iniciar Novo Ciclo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL DE DERROTA */}
      <Modal visible={statusJogo === 'derrota'} transparent animationType="slide">
        <View style={[styles.modalOverlay, { backgroundColor: 'rgba(231, 76, 60, 0.8)' }]}>
          <View style={styles.modalFimJogo}>
            <Ionicons name="alert-circle" size={80} color="#c0392b" />
            <Text style={styles.tituloFimJogo}>APOPTOSE CELULAR</Text>
            <Text style={styles.textoFimJogo}>A célula não conseguiu manter sua integridade e cessou suas funções vitais.</Text>
            <TouchableOpacity style={styles.botaoReiniciar} onPress={reiniciarJogo}>
              <Text style={styles.textoBotaoReiniciar}>Tentar Novamente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* FOOTER */}
      <View style={styles.footerContainer}>
        <View style={styles.ondaSuave} />
        <TouchableOpacity style={styles.botaoCicloWrapper} onPress={lidarComCiclo} activeOpacity={0.8}>
          <LinearGradient colors={['#52C370', '#43929F']} style={styles.botaoCicloGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <Ionicons name="refresh" size={28} color="white" />
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
    height: 80, borderBottomLeftRadius: 35, borderBottomRightRadius: 35,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', elevation: 10,
  },
  menuIcon: { position: 'absolute', left: 20, width: 38, height: 38, borderRadius: 19, borderWidth: 1.5, borderColor: 'white', justifyContent: 'center', alignItems: 'center' },
  musicIcon: { position: 'absolute', right: 20, width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  gameArea: { flex: 1, padding: 25 },
  perfilContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  bordaImagem: { width: 75, height: 75, borderRadius: 38, backgroundColor: 'white', borderWidth: 2, borderColor: '#a78bfa', justifyContent: 'center', alignItems: 'center', elevation: 5 },
  imagemCelula: { width: 55, height: 55, resizeMode: 'contain' },
  textosHeader: { marginLeft: 15 },
  nomeCelula: { fontSize: 22, fontWeight: 'bold', color: '#3d348b' },
  statusLabel: { fontSize: 15, color: '#666', fontWeight: '600' },
  containerBarraVertical: { position: 'absolute', right: 25, top: 130, bottom: 20, width: 24, alignItems: 'center', zIndex: 10 },
  iconeEstrelaTopo: { backgroundColor: 'white', width: 28, height: 28, borderRadius: 8, borderWidth: 1, borderColor: '#C5C1E0', justifyContent: 'center', alignItems: 'center', zIndex: 2, marginBottom: -10 },
  trackVertical: { flex: 1, width: 18, backgroundColor: '#C5C1E0', borderRadius: 10, justifyContent: 'flex-end', overflow: 'hidden' },
  fillVertical: { width: '100%', backgroundColor: '#2ecc71', borderRadius: 10 },
  historicoContainer: { borderRadius: 20, padding: 15, borderWidth: 1, borderColor: 'white', marginRight: 40 }, 
  historicoTitulo: { fontSize: 11, fontWeight: '900', color: '#3d348b', opacity: 0.6, marginBottom: 10 },
  historicoItem: { marginBottom: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)', paddingBottom: 5 },
  historicoLinha: { flexDirection: 'row', alignItems: 'center' },
  historicoCiclo: { backgroundColor: '#3d348b', color: 'white', fontSize: 10, paddingHorizontal: 5, borderRadius: 4, marginRight: 8, fontWeight: 'bold' },
  historicoAcao: { fontSize: 14, color: '#333', fontWeight: '600', flex: 1 },
  mudancasRow: { flexDirection: 'row', marginTop: 2 },
  resultadoTexto: { fontSize: 13, fontWeight: 'bold' },
  textoVazio: { fontSize: 13, color: '#888', fontStyle: 'italic', textAlign: 'center' },
  footerContainer: { height: height * 0.32, justifyContent: 'flex-end', alignItems: 'center', overflow: 'hidden' },
  ondaSuave: { position: 'absolute', width: width * 1.8, height: width * 1.8, borderRadius: width, backgroundColor: '#48425D', alignSelf: 'center', top: 40 },
  botaoCicloWrapper: { position: 'absolute', top: 0, alignSelf: 'center', elevation: 12, zIndex: 100 },
  botaoCicloGradient: { width: 75, height: 75, borderRadius: 40, borderWidth: 5, borderColor: '#e3d9ff', justifyContent: 'center', alignItems: 'center' },
  textoBotaoCiclo: { color: 'white', fontSize: 11, fontWeight: 'bold' },
  painelAtributos: { width: '100%', paddingHorizontal: 35, paddingBottom: 25, marginTop: 30, zIndex: 50, top: 10 },
  atributoRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 3 },
  labelContainer: { flexDirection: 'row', alignItems: 'center', width: 110 },
  atributoIcon: { fontSize: 14, marginRight: 6 },
  atributoText: { color: 'white', fontSize: 13, fontWeight: 'bold' },
  barraBackground: { flex: 1, height: 14, backgroundColor: '#342F44', borderRadius: 6, overflow: 'hidden' },
  barraFill: { height: '100%', borderRadius: 6 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', maxHeight: '75%', backgroundColor: 'white', borderRadius: 30, padding: 25, alignItems: 'center' },
  modalSub: { color: '#2ecc71', fontWeight: 'bold', fontSize: 12, marginBottom: 15 },
  modalDescription: { fontSize: 19, textAlign: 'center', marginBottom: 20, fontWeight: 'bold', color: '#222', lineHeight: 24 },
  optionButton: { width: '100%', backgroundColor: '#EBE5FF', padding: 18, borderRadius: 15, marginVertical: 6, borderWidth: 1, borderColor: '#EBE5FF' },
  optionText: { textAlign: 'center', fontWeight: 'bold', color: '#444' },
  modalOverlayVitoria: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center' },
  modalFimJogoVitoria: { width: '85%', backgroundColor: 'white', borderRadius: 35, padding: 30, alignItems: 'center', borderWidth: 4, borderColor: '#fbc531' },
  circuloTrofeu: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginTop: -80, elevation: 15 },
  tituloVitoria: { fontSize: 32, fontWeight: '900', color: '#f39c12', marginTop: 15 },
  subtituloVitoria: { fontSize: 14, color: '#3d348b', fontWeight: 'bold', marginBottom: 10, textTransform: 'uppercase' },
  dividerVitoria: { width: '50%', height: 2, backgroundColor: '#eee', marginVertical: 15 },
  botaoReiniciarVitoria: { backgroundColor: '#2ecc71', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 25, width: '100%', marginTop: 10 },
  modalFimJogo: { width: '85%', backgroundColor: 'white', borderRadius: 30, padding: 30, alignItems: 'center', elevation: 20 },
  tituloFimJogo: { fontSize: 24, fontWeight: 'bold', color: '#333', marginTop: 15, marginBottom: 10 },
  textoFimJogo: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 25, lineHeight: 22 },
  botaoReiniciar: { backgroundColor: '#3d348b', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 25, width: '100%' },
  textoBotaoReiniciar: { color: 'white', fontWeight: 'bold', fontSize: 16, textAlign: 'center' },
});