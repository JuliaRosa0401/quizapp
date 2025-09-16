# 🏆 Quiz App - Julia de Moura Rosa

> Status do Projeto: Em aprimoramento 💡

---

### Tabela de Conteúdos
* [Descrição do Projeto](#descrição-do-projeto)
* [Demonstração da Aplicação](#demonstração-da-aplicação)
* [Funcionalidades](#-funcionalidades)
* [Tecnologias Utilizadas](#️-tecnologias-utilizadas)
* [Como Rodar o Projeto Localmente](#️-como-rodar-o-projeto-localmente)
* [Funcionalidade Adicional](#-funcionalidade-adicional)
* [Autor](#-autor)

---

### Descrição do Projeto
<p align="center">
Este projeto é um aplicativo de Quiz multiplataforma, desenvolvido com React Native e Expo, como projeto final do curso de programação. O aplicativo apresenta um questionário com feedback instantâneo, tela de resultados e a possibilidade de jogar novamente.
</p>

---

### Demonstração da Aplicação
<p align="center">
  <img src="" alt="Demonstração do App" width="300"/>
</p>

---

### 🚀 Funcionalidades

- **Quiz Interativo:** Fluxo de perguntas e respostas com validação.
- **Feedback Visual:** Respostas são marcadas como corretas ou incorretas instantaneamente.
- **Placar:** Pontuação é calculada e atualizada a cada rodada.
- **Tela de Resultados:** Ao final do quiz, uma tela exibe a pontuação final.
- **Jogar Novamente:** O usuário pode reiniciar o quiz a partir da tela de resultados.
- **Funcionalidade Adicional:** **[Nome da sua nova funcionalidade]** (ex: Cronômetro regressivo por pergunta).

---

### 🛠️ Tecnologias Utilizadas

- **[React Native](https://reactnative.dev/)**
- **[Expo](https://expo.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**

---

### ⚙️ Como Rodar o Projeto Localmente

```bash
# 1. Clone o repositório
$ git clone [link-do-seu-repositorio]

# 2. Navegue até o diretório do projeto
$ cd quiz-app

# 3. Instale as dependências
$ npm install

# 4. Inicie o servidor de desenvolvimento
$ npm start
```
Após executar `npm start`, pressione `w` para abrir no navegador ou escaneie o QR Code com o app Expo Go no seu celular.

---

## ✨ Funcionalidade Adicional:

## 1 Modo de Jogo com Tempo (Timed Mode)
**Descrição:** Adicionei um modo de jogo com tempo, onde o jogador tem um tempo limitado (15 segundos) para responder a cada pergunta. Se o tempo acabar, a pergunta é automaticamente marcada como incorreta. Este modo oferece um desafio extra e uma experiência mais dinâmica.

**Desafios e Aprendizados:** Para implementar o timer, usei o hook useEffect do React para gerenciar o estado do tempo e o setInterval para a contagem regressiva. O maior desafio foi garantir que o timer reiniciasse corretamente a cada nova pergunta e parasse quando uma opção fosse selecionada ou o tempo esgotasse.

## 2 Sistema de Dicas (Hint System)
**Descrição:** O quiz agora oferece uma "Dica dos Deuses". Cada pergunta tem uma dica associada que pode ser visualizada pelo jogador, auxiliando nas respostas mais difíceis. A quantidade de dicas usadas é contabilizada e exibida na tela de resultados.

**Desafios e Aprendizados:** A principal dificuldade foi a criação de um modal reutilizável (HintModal.tsx) para exibir a dica de forma elegante, garantindo que ele não interrompesse o fluxo do jogo de forma abrupta. Além disso, foi necessário gerenciar o estado do modal e o contador de dicas a partir do componente principal (index.tsx).

## 3 Seleção de Nível e Modo de Jogo
**Descrição:** O fluxo de jogo foi aprimorado para permitir que o jogador primeiro escolha o nível de dificuldade (Fácil, Médio, Difícil) e, em seguida, o modo de jogo (com tempo ou sem tempo). Isso oferece uma flexibilidade e controle muito maior sobre a experiência de jogo.

**Desafios e Aprendizados:** A navegação entre as diferentes telas (HomeScreen, LevelSelectionScreen, TimeScreen, QuizScreen) foi o ponto central aqui. A solução foi gerenciar o estado da tela atual (currentScreen) no componente principal (index.tsx), garantindo uma transição fluida e intuitiva entre os diferentes estágios do quiz.





### Demonstração da Nova Funcionalidade
<p align="center">
  <img src="link-para-seu-gif-ou-screenshot.png" alt="Demonstração da Nova Funcionalidade" width="300"/>
</p>

---

### 👨‍💻 Autor

Desenvolvido por **Julia Rosa**.

Sob a orientação do **Prof. Rafael Ribas**.