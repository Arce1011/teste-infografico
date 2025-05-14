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
        if (quizProgressEl) { // Verifica se o elemento existe
            quizProgressEl.textContent = `Situação ${situacaoAtualIndex + 1} de ${situacoesCongruencia.length}`;
        }
    }

    function carregarSituacao(index) {
        if (!situacaoTextoEl) return; // Sai se os elementos do quiz não existirem

        const situacao = situacoesCongruencia[index];
        situacaoTextoEl.firstChild.textContent = situacao.texto + ' '; // Atualiza apenas o texto, mantém o span
        feedbackCongruenciaEl.innerHTML = '';
        feedbackCongruenciaEl.className = 'feedback';
        opcoesCongruenciaBotoes.forEach(btn => btn.disabled = false);
        btnAnterior.disabled = index === 0;
        btnProxima.disabled = index === situacoesCongruencia.length - 1;
        atualizarQuizProgress();
    }

    if (opcoesCongruenciaBotoes.length > 0) {
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
    }
    if (btnProxima) {
        btnProxima.addEventListener('click', () => {
            if (situacaoAtualIndex < situacoesCongruencia.length - 1) {
                situacaoAtualIndex++;
                carregarSituacao(situacaoAtualIndex);
            }
        });
    }
    if (btnAnterior) {
        btnAnterior.addEventListener('click', () => {
            if (situacaoAtualIndex > 0) {
                situacaoAtualIndex--;
                carregarSituacao(situacaoAtualIndex);
            }
        });
    }

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
        if (!assertividadeBarEl) return;
        assertividadeScore += change;
        assertividadeScore = Math.max(0, Math.min(100, assertividadeScore));
        assertividadeBarEl.style.width = assertividadeScore + '%';
        assertividadeBarEl.textContent = assertividadeScore + '%';
        if (assertividadeScore < 30) assertividadeBarEl.style.backgroundColor = 'var(--danger-color)';
        else if (assertividadeScore < 70) assertividadeBarEl.style.backgroundColor = 'var(--warning-color)';
        else assertividadeBarEl.style.backgroundColor = 'var(--accent-color)'; // Usando accent no lugar de success
    }

    function getGameEndFeedback(score) {
        if (score >= 85) return "Excelente! Sua comunicação não verbal foi muito assertiva e inspirou confiança.";
        if (score >= 60) return "Bom trabalho! Você demonstrou boa assertividade, mas há espaço para refinar alguns sinais.";
        if (score >= 30) return "Sua comunicação teve momentos de assertividade, mas alguns sinais não verbais podem ter prejudicado sua mensagem. Continue praticando!";
        return "Parece que sua comunicação não verbal não foi muito eficaz desta vez. Revise os conceitos e tente novamente para melhorar sua assertividade.";
    }

    function loadStoryNode(nodeId) {
        if (!storyTextEl) return; // Sai se os elementos do jogo não existirem

        const node = storyNodes.find(n => n.id === nodeId);
        if (!node) return;

        currentNodeId = nodeId;
        storyTextEl.textContent = node.text;
        storyChoicesEl.innerHTML = '';
        if(gameEndFeedbackEl) gameEndFeedbackEl.textContent = '';

        if (node.choices.length === 0) {
            audienceReactionEl.textContent = `Sua pontuação final de assertividade foi ${assertividadeScore}%.`;
            if(gameEndFeedbackEl) gameEndFeedbackEl.textContent = getGameEndFeedback(assertividadeScore);
            reiniciarJogoBtn.style.display = 'block';
            reiniciarJogoBtn.focus();
            return;
        }
        if(reiniciarJogoBtn) reiniciarJogoBtn.style.display = 'none';

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
        if(storyChoicesEl.firstChild) storyChoicesEl.firstChild.focus();
    }
    
    if (reiniciarJogoBtn) {
        reiniciarJogoBtn.addEventListener('click', () => {
            assertividadeScore = 50;
            updateAssertividade(0);
            if(audienceReactionEl) audienceReactionEl.textContent = "Aguardando sua primeira ação...";
            loadStoryNode(0);
        });
    }

    // --- PARTE 3: INFOGRÁFICO CRIATIVO (DECODIFICADOR) ---
    const bodyPoints = document.querySelectorAll('.body-point');
    const popupOverlay = document.getElementById('info-popup-overlay');
    const popup = document.getElementById('body-info-popup');
    const popupTitle = document.getElementById('popup-title');
    const popupText = document.getElementById('popup-text');
    const closePopupButton = document.getElementById('close-popup');
    let lastFocusedElement = null;

    const bodyInfo = {
        head: { title: "Cabeça e Rosto", text: "Expressões faciais são cruciais. Sorrisos genuínos conectam, testas franzidas indicam preocupação ou desacordo. Acenos de cabeça podem significar concordância ou encorajamento." },
        eyes: { title: "Olhos", text: "Contato visual firme (sem encarar) transmite confiança e interesse. Desviar o olhar pode indicar insegurança, desonestidade ou desinteresse. Piscar excessivamente pode denotar nervosismo." },
        shoulders: { title: "Ombros", text: "Ombros eretos e relaxados indicam confiança e abertura. Ombros curvados ou tensos podem sinalizar submissão, estresse ou desânimo." },
        torso: { title: "Torso", text: "Inclinar-se para frente demonstra interesse e engajamento. Inclinar-se para trás pode indicar ceticismo ou distanciamento. Uma postura ereta é sinal de autoconfiança." },
        arm_left: { title: "Braço Esquerdo (Personagem)", text: "Gestos com o braço esquerdo podem complementar a fala. Braços abertos sugerem receptividade, enquanto cruzá-los pode indicar defesa ou fechamento." },
        arm_right: { title: "Braço Direito (Personagem)", text: "Similar ao braço esquerdo, o posicionamento e gestos do braço direito contribuem para a mensagem geral de abertura ou reserva." },
        hand_left: { title: "Mão Esquerda (Personagem)", text: "Gestos com as mãos são poderosos. A mão esquerda pode ser usada para enfatizar pontos. Palmas abertas indicam honestidade; esconder as mãos pode gerar desconfiança." },
        hand_right: { title: "Mão Direita (Personagem)", text: "A mão direita frequentemente lidera gestos de cumprimento ou ênfase. Mãos inquietas podem denunciar nervosismo." },
        legs: { title: "Pernas e Pés", text: "Pernas descruzadas e pés apontados para o interlocutor geralmente indicam abertura. Pernas cruzadas ou pés apontando para a saída podem sinalizar desconforto ou desejo de encerrar a conversa." }
    };

    function openPopup(area) {
        if (bodyInfo[area] && popupOverlay && popupTitle && popupText && closePopupButton) { // Verifica elementos
            lastFocusedElement = document.activeElement;
            popupTitle.textContent = bodyInfo[area].title;
            popupText.textContent = bodyInfo[area].text;
            popupOverlay.classList.add('visible');
            closePopupButton.focus();
        }
    }

    function closePopup() {
        if (popupOverlay) {
            popupOverlay.classList.remove('visible');
            if (lastFocusedElement) {
                lastFocusedElement.focus();
            }
        }
    }

    if (bodyPoints.length > 0) {
        bodyPoints.forEach(point => {
            point.addEventListener('click', () => {
                const area = point.dataset.area;
                openPopup(area);
            });
        });
    }
    if (closePopupButton) {
        closePopupButton.addEventListener('click', closePopup);
    }
    if (popupOverlay) {
        popupOverlay.addEventListener('click', (event) => {
            if (event.target === popupOverlay) {
                closePopup();
            }
        });
    }
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && popupOverlay && popupOverlay.classList.contains('visible')) {
            closePopup();
        }
    });

    // --- ANIMAÇÃO DE ROLAGEM ---
    const animatedElements = document.querySelectorAll('[data-animate-on-scroll]');
    const flowBlocksToAnimate = document.querySelectorAll('.flow-block'); // Animar todos os flow-blocks

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Um pouco mais cedo para flow-blocks maiores
    };

    const scrollObserver = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                if (!entry.target.hasAttribute('data-animate-on-scroll')) { // Para os flow-blocks, animar uma vez
                    observerInstance.unobserve(entry.target);
                } else if (entry.target.closest('.stats-grid .stat-item')) { // Elementos dentro do grid, podem reanimar se quiser
                    // observerInstance.unobserve(entry.target); // Descomente para animar uma vez os stat-items
                }
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => scrollObserver.observe(el));
    flowBlocksToAnimate.forEach(el => scrollObserver.observe(el)); // Observar também os flow-blocks


    // Inicializar as partes que existem
    if (document.getElementById('situacao-texto')) {
        carregarSituacao(situacaoAtualIndex);
    }
    if (document.getElementById('story-text')) {
        loadStoryNode(currentNodeId);
        updateAssertividade(0);
    }
});