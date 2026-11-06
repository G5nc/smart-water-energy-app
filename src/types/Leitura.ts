export type StatusEstacao = 'NORMAL' | 'ALERTA' | 'CRITICO';

export type Leitura = {
  id: number;
  nivelAgua: number; // em %
  vazao: number; // em L/min
  consumoEnergia: number; // em kWh
  status: StatusEstacao;
};