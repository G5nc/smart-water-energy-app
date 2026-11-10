// src/components/LineChartComponent.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

type Props = {
    dados: number[];
};

export const LineChartComponent: React.FC<Props> = ({ dados }) => {
    // Se não tiver dados suficientes, não desenha o gráfico
    if (dados.length < 2) {
        return (
            <View style={styles.container}>
                <Text style={styles.emptyText}>Aguardando dados para o gráfico...</Text>
            </View>
        );
    }

    // Pega a largura da tela para o gráfico ser responsivo
    const screenWidth = Dimensions.get('window').width;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Evolução do Nível da Água</Text>
            <LineChart
                data={{
                    labels: dados.map((_, index) => `${index + 1}`),
                    datasets: [{ data: dados }]
                }}
                width={screenWidth - 40} // Largura da tela menos as margens
                height={220}
                yAxisSuffix="%"
                chartConfig={{
                    backgroundColor: '#FFFFFF',
                    backgroundGradientFrom: '#FFFFFF',
                    backgroundGradientTo: '#FFFFFF',
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`, // Verde
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: { borderRadius: 16 },
                    propsForDots: { r: '4', strokeWidth: '2', stroke: '#2E7D32' }
                }}
                bezier // Deixa a linha curva (mais bonito)
                style={styles.chart}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { alignItems: 'center', marginVertical: 16 },
    title: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 8 },
    chart: { borderRadius: 16 },
    emptyText: { color: '#666', fontStyle: 'italic' }
});