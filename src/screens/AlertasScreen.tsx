import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { api, Estacao } from '../services/api';

export const AlertasScreen: React.FC = () => {
    const [alertas, setAlertas] = useState<Estacao[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const carregarAlertas = async () => {
            try {
                // Supondo que o backend tenha um endpoint para buscar todas as leituras
                // e o app filtre as que não são NORMAL
                const response = await fetch('http://localhost:8080/api/estacao/leituras');
                const data = await response.json();
                const apenasAlertas = data.filter((leitura: Estacao) => leitura.status !== 'NORMAL');
                // Ordena do mais recente para o mais antigo
                setAlertas(apenasAlertas.reverse());
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        carregarAlertas();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#2E7D32" style={{ marginTop: 50 }} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titulo}>Histórico de Alertas</Text>
            </View>
            <FlatList
                data={alertas}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhum alerta registrado. Tudo normal!</Text>}
                renderItem={({ item }) => (
                    <View style={[styles.card, { borderLeftColor: item.status === 'CRITICO' ? '#F44336' : '#FF9800' }]}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardStatus}>{item.status}</Text>
                            <Text style={styles.cardData}>{new Date(item.dataHora).toLocaleString('pt-BR')}</Text>
                        </View>
                        <Text>Nível: {item.nivelAgua.toFixed(1)}% | Vazão: {item.vazao.toFixed(1)} L/min</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F7FA' },
    header: { padding: 20, backgroundColor: '#FFF', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
    titulo: { fontSize: 22, fontWeight: 'bold', color: '#2E7D32' },
    list: { padding: 16 },
    card: { backgroundColor: '#FFF', padding: 16, borderRadius: 8, marginBottom: 12, borderLeftWidth: 6, elevation: 2 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    cardStatus: { fontWeight: 'bold', fontSize: 16 },
    cardData: { color: '#666', fontSize: 12 },
    emptyText: { textAlign: 'center', marginTop: 40, color: '#666', fontSize: 16 }
});