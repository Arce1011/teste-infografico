document.addEventListener('DOMContentLoaded', () => {
    // --- PARTE 1: CONGRUÊNCIA ---
    const situacoesCongruencia = [
        {
            id: 1,
            texto: "Maria diz 'Estou muito feliz com o resultado!' sorrindo amplamente, com postura aberta e olhos brilhando.",
            respostaCorreta: "congruente",
            feedbackCongruente: "Correto! A linguagem verbal (fala) e não verbal (sorriso, postura, olhar) de Maria estão alinhadas, transmitindo felicidade genuína.",
            feedbackNaoCongruente: "Na verdade, é congruente. A linguagem verbal (fala) e não verbal (sorriso, postura, olhar) de Maria estão alinhadas, transmitindo felicidade genuína."
        },
        {
            id: 2,
            texto: "Carlos afirma 'Claro, estou prestando total atenção', enquanto olha para o celular e balança a perna rapidamente.",
            respostaCorreta: "nao-congruente",
            feedbackCongruente: "Na verdade, não é congruente. Apesar da afirmação verbal, a atenção ao celular e a perna inquieta indicam distração ou nervosismo.",
            feedbackNaoCongruente: "Correto! Apesar da afirmação verbal, a atenção ao celular e a perna inquieta indicam distração ou nervosismo, uma clara incongruência."
        },
        {
            id: 3,
            texto: "Ana diz 'Este projeto é prioridade máxima', mas entrega o relatório com duas semanas de atraso e evita contato visual ao falar sobre ele.",
            respostaCorreta: "nao-congruente",
            feedbackCongruente: "Incorreto. A ação (atraso) e a evitação do contato visual contradizem a afirmação verbal de prioridade.",
            feedbackNaoCongruente: "Correto! A ação (atraso) e a evitação do contato visual contradizem a afirmação verbal de prioridade. Isso gera desconfiança."
        },
        {
            id: 4,
            texto: "Durante uma negociação tensa, o cliente cruza os braços e franze a testa, mas diz: 'Sua proposta parece interessante, vamos prosseguir'.",
            respostaCorreta: "nao-congruente",
            feedbackCongruente: "Observe melhor. Os braços cruzados e a testa franzida são sinais de defesa ou desacordo, contrastando com a fala positiva. É importante investigar essa incongruência.",
            feedbackNaoCongruente: "Correto! Os sinais não verbais (braços cruzados, testa franzida) indicam hesitação ou desacordo, apesar da fala positiva. É um sinal de alerta."
        }
    ];

    let situacaoAtualIndex = 0;
    const situacaoTextoEl = document.getElementById('situacao-texto');
    const feedbackCongruenciaEl = document.getElementById('feedback-congruencia');
    const opcoesCongruenciaBotoes = document.querySelectorAll('.opcoes-congruencia button');
    const btnAnterior = document.getElementById('anterior-situacao');
    const btnProxima = document.getElementById('proxima-situacao');

    function carregarSituacao(index) {
        const situacao = situacoesCongruencia[index];
        situacaoTextoEl.textContent = situacao.texto;
        feedbackCongruenciaEl.innerHTML = '';
        feedbackCongruenciaEl.className = 'feedback'; // Limpa classes de correto/incorreto
        opcoesCongruenciaBotoes.forEach(btn => btn.disabled = false);

        btnAnterior.disabled = index === 0;
        btnProxima.disabled = index === situacoesCongruencia.length - 1;
    }

    opcoesCongruenciaBotoes.forEach(botao => {
        botao.addEventListener('click', () => {
            const respostaUsuario = botao.dataset.resposta;
            const situacaoAtual = situacoesCongruencia[situacaoAtualIndex];
            opcoesCongruenciaBotoes.forEach(btn => btn.disabled = true); // Desabilita após resposta

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

    let assertividadeScore = 50; // Começa em 50%

    const storyNodes = [
        { // 0: Início
            id: 0,
            text: "Jorge está se preparando. Ao entrar na sala de reunião para apresentar aos acionistas, ele...",
            choices: [
                { text: "Entra com passos firmes, olhando para os acionistas e cumprimentando com um leve aceno de cabeça.", effect: 15, reaction: "Os acionistas parecem receptivos e atentos.", nextNode: 1 },
                { text: "Entra apressado, olhando para suas anotações, sem fazer contato visual.", effect: -10, reaction: "Alguns acionistas trocam olhares, parecendo um pouco desconfortáveis com a aparente falta de confiança.", nextNode: 1 },
                { text: "Hesita na porta, respira fundo visivelmente e entra com ombros curvados.", effect: -15, reaction: "A hesitação de Jorge é palpável, gerando uma leve tensão na sala.", nextNode: 1 }
            ]
        },
        { // 1: Posicionamento
            id: 1,
            text: "Jorge se posiciona diante dos acionistas. Antes de iniciar sua fala, ele...",
            choices: [
                { text: "Ajusta o microfone, faz uma pausa breve para varrer a sala com o olhar e abre um leve sorriso confiante.", effect: 10, reaction: "A calma e confiança de Jorge começam a tranquilizar a audiência.", nextNode: 2 },
                { text: "Começa a falar imediatamente, com a voz um pouco trêmula, folheando os papéis nervosamente.", effect: -10, reaction: "A pressa e o nervosismo de Jorge são evidentes, dificultando a conexão inicial.", nextNode: 2 },
                { text: "Limpa a garganta ruidosamente e olha fixamente para um ponto acima das cabeças dos acionistas.", effect: -5, reaction: "A audiência percebe um certo distanciamento, aguardando que ele se conecte.", nextNode: 2 }
            ]
        },
        { // 2: Durante a apresentação
            id: 2,
            text: "No meio da apresentação de um slide crucial sobre resultados financeiros, um acionista o interrompe com uma pergunta desafiadora sobre uma queda inesperada nos lucros. Jorge...",
            choices: [
                { text: "Mantém a calma, ouve atentamente a pergunta, faz contato visual e responde: 'Excelente pergunta. Essa queda se deve a um investimento estratégico que detalharei no próximo slide, e que projetamos trará retornos significativos.'", effect: 20, reaction: "Os acionistas apreciam a resposta direta, calma e o controle da situação.", nextNode: 3 },
                { text: "Fica visivelmente abalado, gagueja um pouco e diz: 'Hum... bem... isso é complicado, podemos falar depois?'", effect: -20, reaction: "A insegurança de Jorge levanta dúvidas sobre sua preparação e a solidez dos resultados.", nextNode: 3 },
                { text: "Responde de forma defensiva, elevando um pouco a voz: 'Se o senhor me permitir terminar, eu já ia chegar nesse ponto!'", effect: -15, reaction: "A defensividade de Jorge cria um clima desconfortável e pode ser vista como arrogância ou despreparo.", nextNode: 3 }
            ]
        },
        { // 3: Conclusão
            id: 3,
            text: "Ao final da apresentação, Jorge agradece a atenção. Para encerrar, ele...",
            choices: [
                { text: "Sorri, faz contato visual com vários acionistas e diz com convicção: 'Estou à disposição para perguntas e confiante no futuro promissor que delineamos.'", effect: 15, reaction: "A apresentação termina em alta, com os acionistas demonstrando aprovação e interesse.", nextNode: 4 },
                { text: "Recolhe seus papéis rapidamente, murmura um 'obrigado' e evita olhar para a plateia.", effect: -10, reaction: "O final abrupto deixa uma impressão de insegurança, apesar do conteúdo da apresentação.", nextNode: 4 },
                { text: "Permanece rígido, olhando para o presidente do conselho e pergunta: 'Alguma pergunta?' de forma seca.", effect: -5, reaction: "A formalidade excessiva e a falta de abertura no final não convidam ao diálogo.", nextNode: 4 }
            ]
        },
        { // 4: Fim do Jogo
            id: 4,
            text: "A apresentação de Jorge terminou. Sua performance não verbal foi crucial para a percepção dos acionistas.",
            choices: [] // Sem mais escolhas
        }
    ];

    let currentNodeId = 0;

    function updateAssertividade(change) {
        assertividadeScore += change;
        if (assertividadeScore > 100) assertividadeScore = 100;
        if (assertividadeScore < 0) assertividadeScore = 0;
        assertividadeBarEl.style.width = assertividadeScore + '%';
        assertividadeBarEl.textContent = assertividadeScore + '%';
        
        if (assertividadeScore < 30) assertividadeBarEl.style.backgroundColor = '#dc3545'; // Vermelho
        else if (assertividadeScore < 70) assertividadeBarEl.style.backgroundColor = '#ffc107'; // Amarelo
        else assertividadeBarEl.style.backgroundColor = '#28a745'; // Verde
    }

    function loadStoryNode(nodeId) {
        const node = storyNodes.find(n => n.id === nodeId);
        if (!node) return;

        currentNodeId = nodeId;
        storyTextEl.textContent = node.text;
        storyChoicesEl.innerHTML = ''; // Limpa escolhas anteriores

        if (node.choices.length === 0) { // Fim do jogo
            audienceReactionEl.textContent = `Sua pontuação final de assertividade foi ${assertividadeScore}%. Veja como suas escolhas impactaram a percepção!`;
            reiniciarJogoBtn.style.display = 'block';
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
    }
    
    reiniciarJogoBtn.addEventListener('click', () => {
        assertividadeScore = 50; // Reseta
        updateAssertividade(0); // Atualiza a barra
        audienceReactionEl.textContent = "Aguardando sua primeira ação...";
        loadStoryNode(0); // Volta para o início
    });


    // --- PARTE 3: INFOGRÁFICO CRIATIVO ---
    const bodyParts = document.querySelectorAll('.body-part');
    const popup = document.getElementById('body-info-popup');
    const popupTitle = document.getElementById('popup-title');
    const popupText = document.getElementById('popup-text');
    const closePopupButton = document.getElementById('close-popup');

    const bodyInfo = {
        head: { title: "Cabeça e Rosto", text: "Expressões faciais são cruciais. Sorrisos genuínos conectam, testas franzidas indicam preocupação ou desacordo. Acenos de cabeça podem significar concordância ou encorajamento." },
        eyes: { title: "Olhos", text: "Contato visual firme (sem encarar) transmite confiança e interesse. Desviar o olhar pode indicar insegurança, desonestidade ou desinteresse. Piscar excessivamente pode denotar nervosismo." },
        shoulders: { title: "Ombros", text: "Ombros eretos e relaxados indicam confiança e abertura. Ombros curvados ou tensos podem sinalizar submissão, estresse ou desânimo." },
        arms: { title: "Braços", text: "Braços descruzados e ao lado do corpo ou gesticulando abertamente sugerem receptividade. Braços cruzados podem indicar defesa, fechamento ou discordância." },
        hands: { title: "Mãos", text: "Gestos com as mãos podem enfatizar pontos e transmitir energia. Mãos nos bolsos podem parecer desinteresse. Esconder as mãos pode gerar desconfiança. Palmas abertas indicam honestidade." },
        torso: { title: "Torso", text: "Inclinar-se para frente demonstra interesse e engajamento. Inclinar-se para trás pode indicar ceticismo ou distanciamento. Uma postura ereta é sinal de autoconfiança." },
        legs: { title: "Pernas e Pés", text: "Pernas descruzadas e pés apontados para o interlocutor geralmente indicam abertura. Pernas cruzadas ou pés apontando para a saída podem sinalizar desconforto ou desejo de encerrar a conversa." }
    };

    bodyParts.forEach(part => {
        part.addEventListener('click', () => {
            const area = part.dataset.area;
            if (bodyInfo[area]) {
                popupTitle.textContent = bodyInfo[area].title;
                popupText.textContent = bodyInfo[area].text;
                popup.style.display = 'block';
            }
        });
    });

    closePopupButton.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Fechar popup se clicar fora dele (opcional)
    window.addEventListener('click', (event) => {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    });

    // Inicializar as partes
    carregarSituacao(situacaoAtualIndex);
    loadStoryNode(currentNodeId);
    updateAssertividade(0); // Inicializa a barra de progresso
});