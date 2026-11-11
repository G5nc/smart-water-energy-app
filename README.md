# Smart Water & Energy App

Aplicativo mobile em React Native para monitoramento da estação de água e energia da Horta Inteligente.

## Integrante
- Gustavo Nobre Coppola (RM561423)

## Funcionalidades
- Dashboard com níveis, vazão e consumo.
- Gráfico de evolução do nível da água.
- Tela de histórico de alertas.
- **Integração com Data Science:** Exibição da previsão de consumo e perfil de operação gerados pelo modelo de IA (Python).
- **Tratamento de API Offline:** Aviso amigável se o backend estiver desligado.
- Navegação por abas (Dashboard e Alertas).

## Arquitetura
O app consome a API REST do backend (`smart-water-energy-api`), que por sua vez lê as previsões geradas pelo notebook de Data Science (`smart-water-energy-datascience`).

## Como Executar
1. Clone o repositório.
2. Instale as dependências: `npm install`.
3. Rode o app: `npx expo start`.
4. Abra no navegador (w) ou no celular (Expo Go).