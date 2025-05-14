document.addEventListener('DOMContentLoaded', () => {
    // --- PARTE 1: CONGRUÊNCIA ---
    const situacoesCongruencia = [
        { id: 1, texto: "Maria diz 'Estou muito feliz com o resultado!' sorrindo amplamente, com postura aberta e olhos brilhando.", respostaCorreta: "congruente", feedbackCongruente: "Correto! A linguagem verbal e não verbal de Maria estão alinhadas, transmitindo felicidade genuína.", feedbackNaoCongruente: "Na verdade, é congruente. A linguagem verbal e não verbal de Maria estão alinhadas." },
        { id: 2, texto: "Carlos afirma 'Claro, estou prestando total atenção', enquanto olha para o celular e balança a perna rapidamente.", respostaCorreta: "nao-congruente", feedbackCongruente: "Incorreto. A atenção ao celular e a perna inquieta indicam distração ou nervosismo.", feedbackNaoCongruente: "Correto! Apesar da afirmação verbal, a linguagem não verbal indica distração ou nervosismo." },
        { id: 3, texto: "Ana diz 'Este projeto é prioridade máxima', mas entrega o relatório com atraso e evita contato visual.", respostaCorreta: "nao-congruente", feedbackCongruente: "Incorreto. A ação (atraso) e a evitação do contato visual contradizem a afirmação verbal.", feedbackNaoCongruente: "Correto! A ação e a linguagem não verbal contradizem a fala, gerando desconfiança." },
        { id: 4, texto: "Durante uma negociação, o cliente cruza os braços, mas diz: 'Sua proposta parece interessante'.", respostaCorreta: "nao-congruente", feedbackCongruente: "Observe melhor. Braços cruzados são um sinal de defesa ou desacordo, contrastando com a fala.", feedbackNaoCongruente: "Correto! Os sinais não verbais indicam hesitação, apesar da fala positiva. Um alerta!" }
    ];

    let situacaoAtualIndex = 0;
    const situacaoTextoEl = document.getElementById('situacao-texto');
    const feedbackCongruenciaEl = document.getElementById('feedback-congruencia');
    const opcoesCongruenciaBotoes = document.querySelectorAll('.opcoes-congruencia button');
    const btnAnterior = document.getElementById('anterior-situacao');
    const btnProxima = document.getElementById('proxima-situacao');
    const quizProgressEl = document.getElementById('quiz-progress');

    function atualizarQuizProgress() {
        quizProgressEl.textContent = `Situação ${situacaoAtualIndex + 1} de ${situacoesCongruencia.length}`;
    }

    function carregarSituacao(index) {
        const situacao = situacoesCongruencia[index];
        situacaoTextoEl.textContent = situacao.texto;
        feedbackCongruenciaEl.innerHTML = '';
        feedbackCongruenciaEl.className = 'feedback';
        opcoesCongruenciaBotoes.forEach(btn => btn.disabled = false);
        btnAnterior.disabled = index === 0;
        btnProxima.disabled = index === situacoesCongruencia.length - 1;
        atualizarQuizProgress();
    }

    opcoesCongruenciaBotoes.forEach(botao => {
        botao.addEventListener('click', () => {
            const respostaUsuario = botao.dataset.resposta;
            const situacaoAtual = situacoesCongruencia[situacaoAtualIndex];
            opcoesCongruenciaBotoes.forEach(btn => btn.disabled = true);

            if (respostaUsuario === situacaoAtual.respostaCorreta) {
                feedbackCongruenciaEl.textContent = situacaoAtual.feedbackCongruente;
                feedbackCongruenciaEl.classList.add('correto');
            } else {
                feedbackCongruenciaEl.textContent = situacaoAtual.feedbackNaoCongruente;
                feedbackCongruenciaEl.classList.add('incorreto');
            }
        });
    });

    btnProxima.addEventListener('click', () => {
        if (situacaoAtualIndex < situacoesCongruencia.length - 1) {
            situacaoAtualIndex++;
            carregarSituacao(situacaoAtualIndex);
        }
    });

    btnAnterior.addEventListener('click', () => {
        if (situacaoAtualIndex > 0) {
            situacaoAtualIndex--;
            carregarSituacao(situacaoAtualIndex);
        }
    });

    // --- PARTE 2: JOGO DE DECISÕES ---
    const storyTextEl = document.getElementById('story-text');
    const storyChoicesEl = document.getElementById('story-choices');
    const audienceReactionEl = document.getElementById('audience-reaction');
    const assertividadeBarEl = document.getElementById('assertividade-bar');
    const reiniciarJogoBtn = document.getElementById('reiniciar-jogo');
    const gameEndFeedbackEl = document.getElementById('game-end-feedback');

    let assertividadeScore = 50;
    const storyNodes = [
        { id: 0, text: "Jorge está se preparando. Ao entrar na sala de reunião para apresentar aos acionistas, ele...", choices: [
            { text: "Entra com passos firmes, olhando para os acionistas e cumprimentando com um leve aceno de cabeça.", effect: 15, reaction: "Os acionistas parecem receptivos e atentos.", nextNode: 1 },
            { text: "Entra apressado, olhando para suas anotações, sem fazer contato visual.", effect: -10, reaction: "Alguns acionistas trocam olhares, parecendo um pouco desconfortáveis.", nextNode: 1 },
            { text: "Hesita na porta, respira fundo visivelmente e entra com ombros curvados.", effect: -15, reaction: "A hesitação de Jorge é palpável, gerando uma leve tensão.", nextNode: 1 }
        ]},
        { id: 1, text: "Jorge se posiciona. Antes de iniciar sua fala, ele...", choices: [
            { text: "Ajusta o microfone, pausa brevemente para varrer a sala com o olhar e abre um leve sorriso confiante.", effect: 10, reaction: "A calma e confiança de Jorge começam a tranquilizar.", nextNode: 2 },
            { text: "Começa a falar imediatamente, voz trêmula, folheando papéis nervosamente.", effect: -10, reaction: "A pressa e o nervosismo são evidentes, dificultando a conexão.", nextNode: 2 },
            { text: "Limpa a garganta ruidosamente e olha fixamente para um ponto acima dos acionistas.", effect: -5, reaction: "A audiência percebe um certo distanciamento.", nextNode: 2 }
        ]},
        { id: 2, text: "No meio da apresentação, um acionista o interrompe com uma pergunta desafiadora. Jorge...", choices: [
            { text: "Mantém a calma, ouve atentamente, faz contato visual e responde: 'Excelente pergunta. Isso se deve a um investimento estratégico que detalharei adiante.'", effect: 20, reaction: "Os acionistas apreciam a resposta direta e o controle da situação.", nextNode: 3 },
            { text: "Fica visivelmente abalado, gagueja e diz: 'Hum... bem... podemos falar depois?'", effect: -20, reaction: "A insegurança de Jorge levanta dúvidas sobre sua preparação.", nextNode: 3 },
            { text: "Responde defensivamente, elevando a voz: 'Se me permitir terminar, eu já ia chegar nesse ponto!'", effect: -15, reaction: "A defensividade cria um clima desconfortável.", nextNode: 3 }
        ]},
        { id: 3, text: "Ao final da apresentação, Jorge agradece. Para encerrar, ele...", choices: [
            { text: "Sorri, faz contato visual com vários acionistas e diz com convicção: 'Estou à disposição para perguntas e confiante no futuro.'", effect: 15, reaction: "A apresentação termina em alta, com os acionistas demonstrando aprovação.", nextNode: 4 },
            { text: "Recolhe seus papéis rapidamente, murmura um 'obrigado' e evita olhar para a plateia.", effect: -10, reaction: "O final abrupto deixa uma impressão de insegurança.", nextNode: 4 },
            { text: "Permanece rígido, olhando para o presidente e pergunta: 'Alguma pergunta?' de forma seca.", effect: -5, reaction: "A formalidade excessiva não convida ao diálogo.", nextNode: 4 }
        ]},
        { id: 4, text: "A apresentação de Jorge terminou. Sua performance não verbal foi crucial.", choices: [] }
    ];
    let currentNodeId = 0;

    function updateAssertividade(change) {
        assertividadeScore += change;
        assertividadeScore = Math.max(0, Math.min(100, assertividadeScore)); // Clamps between 0 and 100
        assertividadeBarEl.style.width = assertividadeScore + '%';
        assertividadeBarEl.textContent = assertividadeScore + '%';
        if (assertividadeScore < 30) assertividadeBarEl.style.backgroundColor = 'var(--danger-color)';
        else if (assertividadeScore < 70) assertividadeBarEl.style.backgroundColor = 'var(--warning-color)';
        else assertividadeBarEl.style.backgroundColor = 'var(--success-color)';
    }

    function getGameEndFeedback(score) {
        if (score >= 85) return "Excelente! Sua comunicação não verbal foi muito assertiva e inspirou confiança.";
        if (score >= 60) return "Bom trabalho! Você demonstrou boa assertividade, mas há espaço para refinar alguns sinais.";
        if (score >= 30) return "Sua comunicação teve momentos de assertividade, mas alguns sinais não verbais podem ter prejudicado sua mensagem. Continue praticando!";
        return "Parece que sua comunicação não verbal não foi muito eficaz desta vez. Revise os conceitos e tente novamente para melhorar sua assertividade.";
    }

    function loadStoryNode(nodeId) {
        const node = storyNodes.find(n => n.id === nodeId);
        if (!node) return;

        currentNodeId = nodeId;
        storyTextEl.textContent = node.text;
        storyChoicesEl.innerHTML = '';
        gameEndFeedbackEl.textContent = ''; // Limpa feedback anterior

        if (node.choices.length === 0) {
            audienceReactionEl.textContent = `Sua pontuação final de assertividade foi ${assertividadeScore}%.`;
            gameEndFeedbackEl.textContent = getGameEndFeedback(assertividadeScore);
            reiniciarJogoBtn.style.display = 'block';
            reiniciarJogoBtn.focus(); // Foco no botão de reiniciar
            return;
        }
        reiniciarJogoBtn.style.display = 'none';

        node.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.addEventListener('click', () => {
                updateAssertividade(choice.effect);
                audienceReactionEl.textContent = choice.reaction;
                loadStoryNode(choice.nextNode);
            });
            storyChoicesEl.appendChild(button);
        });
        if(storyChoicesEl.firstChild) storyChoicesEl.firstChild.focus(); // Foco na primeira opção
    }
    
    reiniciarJogoBtn.addEventListener('click', () => {
        assertividadeScore = 50;
        updateAssertividade(0);
        audienceReactionEl.textContent = "Aguardando sua primeira ação...";
        loadStoryNode(0);
    });

    // --- PARTE 3: INFOGRÁFICO CRIATIVO ---
    const bodyPoints = document.querySelectorAll('.body-point');
    const popupOverlay = document.getElementById('info-popup-overlay');
    const popup = document.getElementById('body-info-popup');
    const popupTitle = document.getElementById('popup-title');
    const popupText = document.getElementById('popup-text');
    const closePopupButton = document.getElementById('close-popup');
    let lastFocusedElement = null; // Para retornar o foco

    const bodyInfo = {
        head: { title: "Cabeça e Rosto", text: "Expressões faciais são cruciais. Sorrisos genuínos conectam, testas franzidas indicam preocupação. Acenos de cabeça podem significar concordância." },
        eyes: { title: "Olhos", text: "Contato visual firme transmite confiança. Desviar o olhar pode indicar insegurança. Piscar excessivamente pode denotar nervosismo." },
        shoulders: { title: "Ombros", text: "Eretos e relaxados indicam confiança. Curvados ou tensos podem sinalizar submissão ou estresse." },
        arms: { title: "Braços", text: "Descruzados e gesticulando abertamente sugerem receptividade. Cruzados podem indicar defesa ou fechamento." },
        hands: { title: "Mãos", text: "Gestos podem enfatizar pontos. Mãos nos bolsos podem parecer desinteresse. Esconder as mãos gera desconfiança." },
        torso: { title: "Torso", text: "Inclinar-se para frente demonstra interesse. Inclinar-se para trás pode indicar ceticismo. Postura ereta é sinal de autoconfiança." },
        legs: { title: "Pernas e Pés", text: "Descruzadas e pés apontados para o interlocutor indicam abertura. Pernas cruzadas podem sinalizar desconforto." }
    };

    function openPopup(area) {
        if (bodyInfo[area]) {
            lastFocusedElement = document.activeElement; // Salva o elemento focado
            popupTitle.textContent = bodyInfo[area].title;
            popupText.textContent = bodyInfo[area].text;
            popupOverlay.classList.add('visible');
            closePopupButton.focus(); // Foca no botão de fechar dentro do popup
        }
    }

    function closePopup() {
        popupOverlay.classList.remove('visible');
        if (lastFocusedElement) {
            lastFocusedElement.focus(); // Retorna o foco ao elemento original
        }
    }

    bodyPoints.forEach(point => {
        point.addEventListener('click', () => {
            const area = point.dataset.area;
            openPopup(area);
        });
    });

    closePopupButton.addEventListener('click', closePopup);
    popupOverlay.addEventListener('click', (event) => {
        if (event.target === popupOverlay) { // Só fecha se clicar no overlay, não no popup
            closePopup();
        }
    });
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && popupOverlay.classList.contains('visible')) {
            closePopup();
        }
    });

    // Inicializar as partes
    carregarSituacao(situacaoAtualIndex);
    loadStoryNode(currentNodeId);
    updateAssertividade(0);
});