// src/screens/DashboardScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { StatusCard } from '../components/StatusCard';
import { LineChartComponent } from '../components/LineChartComponent'; // NOVO: Import do gráfico
import { api, Estacao } from '../services/api';

export const DashboardScreen: React.FC = () => {
    const [leitura, setLeitura] = useState<Estacao | null>(null);
    const [historico, setHistorico] = useState<number[]>([]); // NOVO: Array de níveis
    const [loading, setLoading] = useState(true);
    const [apiOffline, setApiOffline] = useState(false);

    const carregarLeitura = async () => {
        try {
            setApiOffline(false);
            const dados = await api.getUltimaLeitura();
            setLeitura(dados);
            // Adiciona a leitura inicial ao histórico
            setHistorico([dados.nivelAgua]);
        } catch (error) {
            console.error(error);
            setApiOffline(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarLeitura();
    }, []);

    const handleSimular = async () => {
        try {
            setLoading(true);
            const novaLeitura = await api.simularLeitura();
            setLeitura(novaLeitura);
            // NOVO: Adiciona o novo nível ao histórico e mantém só os últimos 10
            setHistorico(prev => [...prev, novaLeitura.nivelAgua].slice(-10));
            setApiOffline(false);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível simular a leitura.');
            setApiOffline(true);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !leitura) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2E7D32" />
                <Text style={styles.loadingText}>Buscando dados da estação...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.titulo}>Horta Inteligente</Text>
                <Text style={styles.subtitulo}>Painel de Controle - Smart Station</Text>
            </View>

            {/* Aviso de API Offline */}
            {apiOffline && (
                <View style={styles.apiOfflineCard}>
                    <Text style={styles.apiOfflineText}>⚠️ API Offline: Não foi possível conectar ao servidor.</Text>
                </View>
            )}

            {/* Gráfico de Linha (NOVO) */}
            <LineChartComponent dados={historico} />

            {/* Cards de Status */}
            {leitura ? (
                <>
                    <StatusCard
                        titulo="Nível da Água"
                        valor={leitura.nivelAgua.toFixed(1)}
                        unidade="%"
                        status={leitura.status as any}
                        icone="💧"
                    />
                    <StatusCard
                        titulo="Vazão"
                        valor={leitura.vazao.toFixed(1)}
                        unidade="L/min"
                        status={leitura.status as any}
                        icone="🌊"
                    />
                    <StatusCard
                        titulo="Consumo Elétrico"
                        valor={leitura.consumoEnergia.toFixed(2)}
                        unidade="kWh"
                        status={leitura.status as any}
                        icone="⚡"
                    />
                </>
            ) : (
                !apiOffline && (
                    <Text style={styles.emptyText}>Nenhuma leitura encontrada. Clique em simular.</Text>
                )
            )}

            {/* Botões de Ação */}
            <View style={styles.acoes}>
                <TouchableOpacity style={styles.botaoPrimario} onPress={handleSimular} disabled={loading}>
                    <Text style={styles.textoBotao}>{loading ? 'Simulando...' : 'Simular Leitura'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoSecundario} onPress={() => Alert.alert('Aviso', 'Bomba desligada!')}>
                    <Text style={styles.textoBotaoSecundario}>Desligar Bomba</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F7FA' },
    content: { padding: 20, paddingTop: 60 },
    header: { marginBottom: 24, alignItems: 'center' },
    titulo: { fontSize: 28, fontWeight: 'bold', color: '#2E7D32', marginBottom: 4 },
    subtitulo: { fontSize: 16, color: '#666' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F7FA' },
    loadingText: { marginTop: 12, fontSize: 16, color: '#666' },
    apiOfflineCard: { backgroundColor: '#FFEBEE', padding: 16, borderRadius: 8, marginBottom: 16, borderWidth: 1, borderColor: '#F44336' },
    apiOfflineText: { color: '#D32F2F', fontWeight: 'bold', textAlign: 'center' },
    emptyText: { textAlign: 'center', color: '#666', marginTop: 20, fontSize: 16 },
    acoes: { marginTop: 20 },
    botaoPrimario: { backgroundColor: '#2E7D32', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12, elevation: 3 },
    textoBotao: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    botaoSecundario: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, alignItems: 'center', borderWidth: 2, borderColor: '#F44336' },
    textoBotaoSecundario: { color: '#F44336', fontSize: 18, fontWeight: 'bold' },
});