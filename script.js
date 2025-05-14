document.addEventListener('DOMContentLoaded', () => {
    // --- BARRA DE PROGRESSO DA PÁGINA ---
    const progressBar = document.getElementById('page-progress-bar');
    if (progressBar) {
        const updateProgressBar = () => {
            const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = window.scrollY;
            const progress = scrollTotal > 0 ? (scrolled / scrollTotal) * 100 : 0;
            progressBar.style.width = `${Math.min(progress, 100)}%`;
        };
        window.addEventListener('scroll', updateProgressBar);
        updateProgressBar();
    }

    // --- CHECKLIST INTERATIVO ---
    const checklistItems = document.querySelectorAll('.checklist li');
    const checklistProgressBarFill = document.querySelector('.checklist-progress-fill');
    const checklistProgressText = document.querySelector('.checklist-progress-text');

    if (checklistItems.length > 0 && checklistProgressBarFill && checklistProgressText) {
        const totalChecklistItems = checklistItems.length;
        function updateChecklistProgress() {
            const checkedItems = document.querySelectorAll('.checklist li.checked').length;
            const progressPercentage = totalChecklistItems > 0 ? (checkedItems / totalChecklistItems) * 100 : 0;
            checklistProgressBarFill.style.width = `${progressPercentage}%`;
            checklistProgressText.textContent = `${checkedItems}/${totalChecklistItems}`;
        }
        checklistItems.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('checked');
                updateChecklistProgress();
            });
        });
        updateChecklistProgress();
    }

    // --- QUIZ DE CONGRUÊNCIA ---
    const situacoesCongruencia = [ { id: 1, texto: "Maria diz 'Estou muito feliz com o resultado!' sorrindo amplamente, com postura aberta e olhos brilhando.", respostaCorreta: "congruente", feedbackCongruente: "Correto! A linguagem verbal e não verbal de Maria estão alinhadas, transmitindo felicidade genuína. Isso gera confiança e clareza.", feedbackNaoCongruente: "Na verdade, esta situação é um exemplo de congruência. A linguagem verbal e não verbal de Maria estão perfeitamente alinhadas, o que é ideal." }, { id: 2, texto: "Carlos afirma 'Claro, estou prestando total atenção', enquanto olha para o celular e balança a perna rapidamente.", respostaCorreta: "nao-congruente", feedbackCongruente: "Incorreto. Apesar da afirmação verbal, a atenção ao celular e a perna inquieta são sinais claros de distração ou nervosismo, criando um ruído na comunicação.", feedbackNaoCongruente: "Correto! A fala de Carlos contradiz sua linguagem corporal. Essa incongruência gera desconfiança e pode levar a mal-entendidos sobre seu real nível de atenção." }, { id: 3, texto: "Ana diz 'Este projeto é prioridade máxima para mim', mas seu tom de voz é monocórdico e ela evita contato visual ao discutir os prazos.", respostaCorreta: "nao-congruente", feedbackCongruente: "Analise novamente. O tom de voz apático e a falta de contato visual de Ana contradizem sua afirmação de prioridade, sugerindo desinteresse ou insegurança.", feedbackNaoCongruente: "Correto! A incongruência entre as palavras de Ana e seus sinais não verbais (tom de voz, olhar) cria um ruído significativo, questionando seu comprometimento real com o projeto." }, { id: 4, texto: "Durante uma apresentação, o palestrante sorri constantemente, mesmo ao falar de dados preocupantes sobre o desempenho da empresa.", respostaCorreta: "nao-congruente", feedbackCongruente: "Pense bem. Um sorriso constante e inadequado ao contexto (dados preocupantes) é uma forma de incongruência. Pode transmitir nervosismo, falsidade ou falta de seriedade.", feedbackNaoCongruente: "Correto! O sorriso do palestrante é incongruente com a gravidade da informação. Isso pode confundir a audiência ou fazer com que não levem os dados a sério, gerando ruído." } ];
    let situacaoAtualIndex = 0;
    const situacaoTextoEl = document.getElementById('situacao-texto');
    const feedbackCongruenciaEl = document.getElementById('feedback-congruencia');
    const opcoesCongruenciaBotoes = document.querySelectorAll('.opcoes-congruencia button');
    const btnAnterior = document.getElementById('anterior-situacao');
    const btnProxima = document.getElementById('proxima-situacao');
    const quizProgressEl = document.getElementById('quiz-progress');

    function atualizarQuizProgressIndicator() { if (quizProgressEl) { quizProgressEl.textContent = `${situacaoAtualIndex + 1}/${situacoesCongruencia.length}`; } }
    function carregarSituacao(index) { if (!situacaoTextoEl || !feedbackCongruenciaEl || !opcoesCongruenciaBotoes.length || !btnAnterior || !btnProxima) return; const situacao = situacoesCongruencia[index]; situacaoTextoEl.firstChild.textContent = situacao.texto; feedbackCongruenciaEl.innerHTML = ''; feedbackCongruenciaEl.className = 'feedback'; opcoesCongruenciaBotoes.forEach(btn => btn.disabled = false); btnAnterior.disabled = index === 0; btnProxima.disabled = index === situacoesCongruencia.length - 1; atualizarQuizProgressIndicator(); }
    if (opcoesCongruenciaBotoes.length > 0 && btnProxima && btnAnterior) {
        opcoesCongruenciaBotoes.forEach(botao => {
            botao.addEventListener('click', () => {
                const respostaUsuario = botao.dataset.resposta;
                const situacaoAtual = situacoesCongruencia[situacaoAtualIndex];
                opcoesCongruenciaBotoes.forEach(btn => btn.disabled = true);
                if (respostaUsuario === situacaoAtual.respostaCorreta) {
                    feedbackCongruenciaEl.textContent = situacaoAtual.feedbackCongruente;
                    feedbackCongruenciaEl.classList.add('correto', 'correct-answer-glow'); // Adiciona brilho
                    setTimeout(() => { feedbackCongruenciaEl.classList.remove('correct-answer-glow'); }, 800);
                } else {
                    feedbackCongruenciaEl.textContent = situacaoAtual.feedbackNaoCongruente;
                    feedbackCongruenciaEl.classList.add('incorreto');
                }
            });
        });
        btnProxima.addEventListener('click', () => { if (situacaoAtualIndex < situacoesCongruencia.length - 1) { situacaoAtualIndex++; carregarSituacao(situacaoAtualIndex); } });
        btnAnterior.addEventListener('click', () => { if (situacaoAtualIndex > 0) { situacaoAtualIndex--; carregarSituacao(situacaoAtualIndex); } });
        carregarSituacao(situacaoAtualIndex);
    }

    // --- NOVO DESAFIO DE JORGE (Evitando Ruídos) ---
    const storyTextEl = document.getElementById('story-text');
    const storyChoicesEl = document.getElementById('story-choices');
    const audienceReactionEl = document.getElementById('audience-reaction');
    const assertividadeBarEl = document.getElementById('assertividade-bar');
    const reiniciarJogoBtn = document.getElementById('reiniciar-jogo');
    const gameEndFeedbackEl = document.getElementById('game-end-feedback');
    let assertividadeScore = 50;
    const storyNodes = [ { id: 0, text: "Reunião de equipe. Ana apresenta uma ideia, mas sua voz está baixa e ela evita contato visual, mexendo em uma caneta.", choices: [ { text: "Interromper e pedir para ela falar mais alto e olhar para o grupo.", effect: -10, reaction: "Ana parece constrangida. O grupo fica tenso.", nextNode: 1, correct: false }, { text: "Aguardar ela terminar, depois perguntar gentilmente se pode repetir os pontos chave, olhando para ela com encorajamento.", effect: 15, reaction: "Ana se sente mais à vontade e repete com mais clareza. O grupo engaja.", nextNode: 1, correct: true }, { text: "Ignorar a dificuldade de Ana e começar a discutir a ideia com base no pouco que entendeu.", effect: -15, reaction: "Ana se sente desvalorizada. A discussão fica confusa e com ruídos.", nextNode: 1, correct: false } ] }, { id: 1, text: "Carlos discorda de uma proposta de Bruno. Ele cruza os braços, franze a testa e diz com tom ríspido: 'Isso não vai funcionar de jeito nenhum.'", choices: [ { text: "Responder no mesmo tom: 'Claro que vai! Você que não entendeu!'", effect: -20, reaction: "O conflito escala. A reunião se torna improdutiva.", nextNode: 2, correct: false }, { text: "Manter a calma, validar o sentimento: 'Percebo que você tem fortes objeções, Carlos. Pode nos explicar seus principais pontos de preocupação?'", effect: 20, reaction: "Carlos se acalma um pouco e explica. Abre-se espaço para entendimento.", nextNode: 2, correct: true }, { text: "Ficar em silêncio e deixar Bruno se defender sozinho.", effect: -5, reaction: "A tensão permanece. Bruno se sente isolado.", nextNode: 2, correct: false } ] }, { id: 2, text: "Durante uma videochamada importante, você percebe que seu colega, Marcos, está claramente respondendo e-mails, olhando para outra tela.", choices: [ { text: "Chamar a atenção dele publicamente: 'Marcos, você poderia prestar atenção, por favor?'", effect: -10, reaction: "Marcos fica defensivo. O clima da reunião piora.", nextNode: 3, correct: false }, { text: "Enviar uma mensagem privada rápida: 'Marcos, sua contribuição é importante aqui. Tudo bem aí?'", effect: 10, reaction: "Marcos pede desculpas e volta o foco. A reunião prossegue melhor.", nextNode: 3, correct: true }, { text: "Não dizer nada e assumir que ele não está interessado.", effect: -5, reaction: "Você perde a contribuição de Marcos e pode gerar um ressentimento silencioso.", nextNode: 3, correct: false } ] }, { id: 3, text: "A habilidade de ler e gerenciar a comunicação não verbal é essencial para um ambiente de trabalho harmonioso e produtivo.", choices: [] } ];
    let currentNodeId = 0;
    function updateAssertividade(change) { if (!assertividadeBarEl) return; assertividadeScore += change; assertividadeScore = Math.max(0, Math.min(100, assertividadeScore)); assertividadeBarEl.style.width = assertividadeScore + '%'; assertividadeBarEl.textContent = assertividadeScore + '%'; if (assertividadeScore < 30) assertividadeBarEl.style.backgroundColor = 'var(--accent-color)'; else if (assertividadeScore < 70) assertividadeBarEl.style.backgroundColor = 'var(--secondary-color)'; else assertividadeBarEl.style.backgroundColor = 'rgb(46, 204, 113)'; }
    function getGameEndFeedback(score) { if (score >= 85) return "Excelente! Sua comunicação foi clara e assertiva, minimizando ruídos."; if (score >= 60) return "Bom trabalho! Você demonstrou boa percepção não verbal, continue atento aos detalhes."; if (score >= 30) return "Algumas escolhas foram boas, mas outras podem ter gerado ruído. A prática leva à melhoria!"; return "Sua comunicação precisa de mais atenção aos sinais não verbais para evitar desentendimentos. Tente novamente!"; }
    function loadStoryNode(nodeId) { if (!storyTextEl || !storyChoicesEl || !audienceReactionEl || !gameEndFeedbackEl || !reiniciarJogoBtn) return; const node = storyNodes.find(n => n.id === nodeId); if (!node) return; currentNodeId = nodeId; storyTextEl.textContent = node.text; storyChoicesEl.innerHTML = ''; if (gameEndFeedbackEl) gameEndFeedbackEl.textContent = ''; if (node.choices.length === 0) { if(audienceReactionEl) audienceReactionEl.textContent = `Sua pontuação final de clareza foi ${assertividadeScore}%.`; if(gameEndFeedbackEl) gameEndFeedbackEl.textContent = getGameEndFeedback(assertividadeScore); reiniciarJogoBtn.style.display = 'block'; reiniciarJogoBtn.focus(); return; } reiniciarJogoBtn.style.display = 'none'; node.choices.forEach(choice => { const button = document.createElement('button'); button.textContent = choice.text; button.classList.add('modern-button'); button.addEventListener('click', () => { updateAssertividade(choice.effect); if(audienceReactionEl) audienceReactionEl.textContent = choice.reaction; if (choice.correct) { button.classList.add('correct-choice-glow'); setTimeout(() => { button.classList.remove('correct-choice-glow'); }, 800); } loadStoryNode(choice.nextNode); }); storyChoicesEl.appendChild(button); }); if(storyChoicesEl.firstChild) storyChoicesEl.firstChild.focus(); }
    if (reiniciarJogoBtn && storyTextEl) { reiniciarJogoBtn.addEventListener('click', () => { assertividadeScore = 50; updateAssertividade(0); if(audienceReactionEl) audienceReactionEl.textContent = "Aguardando sua primeira ação..."; loadStoryNode(0); }); loadStoryNode(currentNodeId); updateAssertividade(0); }

    // --- DECODIFICADOR COM TOOLTIP NO HOVER ---
    const bodyPoints = document.querySelectorAll('.body-point');
    const decoderTooltip = document.getElementById('decoder-tooltip');
    const tooltipTitleEl = document.getElementById('tooltip-title');
    const tooltipTextEl = document.getElementById('tooltip-text');
    const bodyInfo = { head: { title: "Cabeça e Rosto", text: "Expressões faciais são cruciais. Sorrisos genuínos conectam, testas franzidas indicam preocupação ou desacordo. Acenos de cabeça podem significar concordância ou encorajamento." }, eyes: { title: "Olhos", text: "Contato visual firme (sem encarar) transmite confiança e interesse. Desviar o olhar pode indicar insegurança, desonestidade ou desinteresse. Piscar excessivamente pode denotar nervosismo." }, shoulders: { title: "Ombros", text: "Ombros eretos e relaxados indicam confiança e abertura. Ombros curvados ou tensos podem sinalizar submissão, estresse ou desânimo." }, torso: { title: "Torso", text: "Inclinar-se para frente demonstra interesse e engajamento. Inclinar-se para trás pode indicar ceticismo ou distanciamento. Uma postura ereta é sinal de autoconfiança." }, arm_left: { title: "Braço Esquerdo (Personagem)", text: "Gestos com o braço esquerdo podem complementar a fala. Braços abertos sugerem receptividade, enquanto cruzá-los pode indicar defesa ou fechamento." }, arm_right: { title: "Braço Direito (Personagem)", text: "Similar ao braço esquerdo, o posicionamento e gestos do braço direito contribuem para a mensagem geral de abertura ou reserva." }, hand_left: { title: "Mão Esquerda (Personagem)", text: "Gestos com as mãos são poderosos. A mão esquerda pode ser usada para enfatizar pontos. Palmas abertas indicam honestidade; esconder as mãos pode gerar desconfiança." }, hand_right: { title: "Mão Direita (Personagem)", text: "A mão direita frequentemente lidera gestos de cumprimento ou ênfase. Mãos inquietas podem denunciar nervosismo." }, legs: { title: "Pernas e Pés", text: "Pernas descruzadas e pés apontados para o interlocutor geralmente indicam abertura. Pernas cruzadas ou pés apontando para a saída podem sinalizar desconforto ou desejo de encerrar a conversa." } };

    if (decoderTooltip && tooltipTitleEl && tooltipTextEl && bodyPoints.length > 0) {
        bodyPoints.forEach(point => {
            point.addEventListener('mouseenter', (event) => {
                const area = point.dataset.area;
                if (bodyInfo[area]) {
                    tooltipTitleEl.textContent = bodyInfo[area].title;
                    tooltipTextEl.textContent = bodyInfo[area].text;
                    const pointRect = point.getBoundingClientRect();
                    decoderTooltip.style.left = '0px'; decoderTooltip.style.top = '0px'; // Reset para cálculo
                    decoderTooltip.classList.add('visible'); // Visível para pegar dimensões
                    const tooltipWidth = decoderTooltip.offsetWidth;
                    const tooltipHeight = decoderTooltip.offsetHeight;

                    let x = pointRect.left + (pointRect.width / 2) - (tooltipWidth / 2);
                    let y = pointRect.top - tooltipHeight - 12; // 12px de margem acima

                    if (y < 10) { y = pointRect.bottom + 12; }
                    if (x < 10) { x = 10; }
                    if (x + tooltipWidth > window.innerWidth - 10) { x = window.innerWidth - tooltipWidth - 10; }

                    decoderTooltip.style.transform = 'translateY(0) scale(1)'; // Garante que a animação de entrada comece do lugar certo
                    decoderTooltip.style.left = `${x}px`;
                    decoderTooltip.style.top = `${y}px`;
                }
            });
            point.addEventListener('mouseleave', () => {
                decoderTooltip.classList.remove('visible');
                decoderTooltip.style.transform = 'translateY(15px) scale(0.95)'; // Reset para próxima animação
            });
        });
    }

    // --- SLIDER DE CITAÇÕES ---
    const quotesSlider = document.querySelector('.quotes-slider');
    if (quotesSlider) {
        const quoteSlides = quotesSlider.querySelectorAll('.quote-slide');
        const prevQuoteBtn = quotesSlider.parentElement.querySelector('.prev-quote');
        const nextQuoteBtn = quotesSlider.parentElement.querySelector('.next-quote');
        let currentQuoteIndex = 0;
        function showQuote(index) { quoteSlides.forEach((slide, i) => { slide.classList.remove('active-quote', 'exiting-quote-left', 'exiting-quote-right'); if (i === index) { slide.classList.add('active-quote'); } }); }
        function slideQuote(direction) { const oldIndex = currentQuoteIndex; quoteSlides[oldIndex].classList.add(direction === 'next' ? 'exiting-quote-left' : 'exiting-quote-right'); if (direction === 'next') { currentQuoteIndex = (currentQuoteIndex + 1) % quoteSlides.length; } else { currentQuoteIndex = (currentQuoteIndex - 1 + quoteSlides.length) % quoteSlides.length; } setTimeout(() => { showQuote(currentQuoteIndex); }, 50); }
        if (prevQuoteBtn && nextQuoteBtn && quoteSlides.length > 0) { prevQuoteBtn.addEventListener('click', () => slideQuote('prev')); nextQuoteBtn.addEventListener('click', () => slideQuote('next')); showQuote(currentQuoteIndex); }
    }

    // --- ANIMAÇÃO DE ROLAGEM ---
    const animatedElements = document.querySelectorAll('[data-animate-on-scroll]');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const scrollObserver = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                if (!entry.target.matches('.checklist li')) { observerInstance.unobserve(entry.target); }
            } else {
                if (entry.target.matches('.checklist li')) { entry.target.classList.remove('is-visible'); }
            }
        });
    }, observerOptions);
    animatedElements.forEach(el => scrollObserver.observe(el));
    document.querySelectorAll('.checklist li:not([data-animate-on-scroll])').forEach(item => {
        scrollObserver.observe(item);
    });
});