import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusEstacao } from '../types/Leitura';

type Props = {
  titulo: string;
  valor: string | number;
  unidade: string;
  status: StatusEstacao;
  icone: string; // Vamos usar emojis para ficar rápido e bonito
};

export const StatusCard: React.FC<Props> = ({ titulo, valor, unidade, status, icone }) => {
  // Define a cor da borda/status com base no status
  const getCorStatus = () => {
    switch (status) {
      case 'NORMAL': return '#4CAF50'; // Verde
      case 'ALERTA': return '#FF9800'; // Laranja
      case 'CRITICO': return '#F44336'; // Vermelho
      default: return '#9E9E9E'; // Cinza
    }
  };

  return (
    <View style={[styles.card, { borderLeftColor: getCorStatus(), borderLeftWidth: 6 }]}>
      <View style={styles.header}>
        <Text style={styles.icone}>{icone}</Text>
        <Text style={styles.titulo}>{titulo}</Text>
      </View>
      <View style={styles.valorContainer}>
        <Text style={styles.valor}>{valor}</Text>
        <Text style={styles.unidade}>{unidade}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra no Android
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icone: {
    fontSize: 24,
    marginRight: 8,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
  },
  valorContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  valor: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  unidade: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },
});