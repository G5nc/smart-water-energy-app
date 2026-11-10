// src/services/api.ts

// ATENÇÃO: Se for rodar no celular físico, troque 'localhost' pelo IP da sua máquina (ex: 192.168.1.10)
const API_URL = 'http://localhost:8080/api/estacao';

export type Estacao = {
    id: number;
    nivelAgua: number;
    vazao: number;
    consumoEnergia: number;
    status: string;
    dataHora: string;
};

export const api = {
    // Busca a última leitura
    getUltimaLeitura: async (): Promise<Estacao> => {
        const response = await fetch(`${API_URL}/atual`);
        if (!response.ok) throw new Error('Erro ao buscar última leitura');
        return response.json();
    },

    // Envia o comando para simular uma nova leitura
    simularLeitura: async (): Promise<Estacao> => {
        const response = await fetch(`${API_URL}/simular`, {
            method: 'POST',
        });
        if (!response.ok) throw new Error('Erro ao simular leitura');
        return response.json();
    }
};