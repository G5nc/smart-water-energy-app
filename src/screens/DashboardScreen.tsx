import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StatusCard } from '../components/StatusCard';
import { Leitura, StatusEstacao } from '../types/Leitura';

export const DashboardScreen: React.FC = () => {
  // Dados mockados (só para ver a tela)
  const [leitura, setLeitura] = useState<Leitura>({
    id: 1,
    nivelAgua: 85,
    vazao: 15.5,
    consumoEnergia: 2.4,
    status: 'NORMAL',
  });

  // Função para simular uma nova leitura (só para testar o botão)
  const simularLeitura = () => {
    const novoNivel = Math.floor(Math.random() * 100); // 0 a 100
    let novoStatus: StatusEstacao = 'NORMAL';
    
    if (novoNivel < 20) novoStatus = 'CRITICO';
    else if (novoNivel < 50) novoStatus = 'ALERTA';

    setLeitura({
      id: Math.random(),
      nivelAgua: novoNivel,
      vazao: Math.random() * 20,
      consumoEnergia: Math.random() * 5,
      status: novoStatus,
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.titulo}>🌱 Horta Inteligente</Text>
        <Text style={styles.subtitulo}>Painel de Controle - Smart Station</Text>
      </View>

      {/* Cards de Status */}
      <StatusCard 
        titulo="Nível da Água" 
        valor={leitura.nivelAgua} 
        unidade="%" 
        status={leitura.status} 
        icone="💧" 
      />
      
      <StatusCard 
        titulo="Vazão" 
        valor={leitura.vazao.toFixed(1)} 
        unidade="L/min" 
        status={leitura.status} 
        icone="🌊" 
      />

      <StatusCard 
        titulo="Consumo Elétrico" 
        valor={leitura.consumoEnergia.toFixed(2)} 
        unidade="kWh" 
        status={leitura.status} 
        icone="⚡" 
      />

      {/* Botões de Ação */}
      <View style={styles.acoes}>
        <TouchableOpacity style={styles.botaoPrimario} onPress={simularLeitura}>
          <Text style={styles.textoBotao}>🔄 Simular Leitura</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoSecundario} onPress={() => Alert.alert('Aviso', 'A bomba foi desligada!')}>
          <Text style={styles.textoBotaoSecundario}>🛑 Desligar Bomba</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA', // Fundo cinza claro
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32', // Verde escuro
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
  },
  acoes: {
    marginTop: 20,
  },
  botaoPrimario: {
    backgroundColor: '#2E7D32', // Verde
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  botaoSecundario: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F44336', // Vermelho
  },
  textoBotaoSecundario: {
    color: '#F44336',
    fontSize: 18,
    fontWeight: 'bold',
  },
});