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
    const GLOW_EFFECT_DURATION = 800;

    function atualizarQuizProgressIndicator() { if (quizProgressEl) { quizProgressEl.textContent = `${situacaoAtualIndex + 1}/${situacoesCongruencia.length}`; } }
    function carregarSituacao(index) { if (!situacaoTextoEl || !feedbackCongruenciaEl || !opcoesCongruenciaBotoes.length || !btnAnterior || !btnProxima) return; const situacao = situacoesCongruencia[index]; situacaoTextoEl.firstChild.textContent = situacao.texto; feedbackCongruenciaEl.innerHTML = ''; feedbackCongruenciaEl.className = 'feedback'; opcoesCongruenciaBotoes.forEach(btn => btn.disabled = false); btnAnterior.disabled = index === 0; btnProxima.disabled = index === situacoesCongruencia.length - 1; atualizarQuizProgressIndicator(); }
    if (opcoesCongruenciaBotoes.length > 0 && btnProxima && btnAnterior && situacaoTextoEl && feedbackCongruenciaEl) {
        opcoesCongruenciaBotoes.forEach(botao => {
            botao.addEventListener('click', () => {
                const respostaUsuario = botao.dataset.resposta;
                const situacaoAtual = situacoesCongruencia[situacaoAtualIndex];
                opcoesCongruenciaBotoes.forEach(btn => btn.disabled = true);
                if (respostaUsuario === situacaoAtual.respostaCorreta) {
                    feedbackCongruenciaEl.textContent = situacaoAtual.feedbackCongruente;
                    feedbackCongruenciaEl.classList.add('correto', 'correct-answer-glow');
                    setTimeout(() => { feedbackCongruenciaEl.classList.remove('correct-answer-glow'); }, GLOW_EFFECT_DURATION);
                } else {
                    feedbackCongruenciaEl.textContent = situacaoAtual.feedbackNaoCongruente;
                    feedbackCongruenciaEl.classList.add('incorreto');
                }
            });
        });
        btnProxima.addEventListener('click', () => { if (situacaoAtualIndex < situacoesCongruencia.length - 1) { situacaoAtualIndex++; carregarSituacao(situacaoAtualIndex); } });
        btnAnterior.addEventListener('click', () => { if (situacaoAtualIndex > 0) { situacaoAtualIndex--; carregarSituacao(situacaoAtualIndex); } });
        if (situacaoTextoEl.firstChild) { // Garante que o nó de texto existe
            carregarSituacao(situacaoAtualIndex);
        }
    }

    // --- DESAFIO DE JORGE (Evitando Ruídos) ---
    const storyTextEl = document.getElementById('story-text');
    const storyChoicesEl = document.getElementById('story-choices');
    const audienceReactionEl = document.getElementById('audience-reaction');
    const assertividadeBarEl = document.getElementById('assertividade-bar');
    const reiniciarJogoBtn = document.getElementById('reiniciar-jogo');
    const gameEndFeedbackEl = document.getElementById('game-end-feedback');
    const INITIAL_ASSERTIVENESS_SCORE = 50;
    let assertividadeScore = INITIAL_ASSERTIVENESS_SCORE;
    const storyNodes = [ { id: 0, text: "Reunião de equipe. Ana apresenta uma ideia, mas sua voz está baixa e ela evita contato visual, mexendo em uma caneta.", choices: [ { text: "Interromper e pedir para ela falar mais alto e olhar para o grupo.", effect: -10, reaction: "Ana parece constrangida. O grupo fica tenso.", nextNode: 1, correct: false }, { text: "Aguardar ela terminar, depois perguntar gentilmente se pode repetir os pontos chave, olhando para ela com encorajamento.", effect: 15, reaction: "Ana se sente mais à vontade e repete com mais clareza. O grupo engaja.", nextNode: 1, correct: true }, { text: "Ignorar a dificuldade de Ana e começar a discutir a ideia com base no pouco que entendeu.", effect: -15, reaction: "Ana se sente desvalorizada. A discussão fica confusa e com ruídos.", nextNode: 1, correct: false } ] }, { id: 1, text: "Carlos discorda de uma proposta de Bruno. Ele cruza os braços, franze a testa e diz com tom ríspido: 'Isso não vai funcionar de jeito nenhum.'", choices: [ { text: "Responder no mesmo tom: 'Claro que vai! Você que não entendeu!'", effect: -20, reaction: "O conflito escala. A reunião se torna improdutiva.", nextNode: 2, correct: false }, { text: "Manter a calma, validar o sentimento: 'Percebo que você tem fortes objeções, Carlos. Pode nos explicar seus principais pontos de preocupação?'", effect: 20, reaction: "Carlos se acalma um pouco e explica. Abre-se espaço para entendimento.", nextNode: 2, correct: true }, { text: "Ficar em silêncio e deixar Bruno se defender sozinho.", effect: -5, reaction: "A tensão permanece. Bruno se sente isolado.", nextNode: 2, correct: false } ] }, { id: 2, text: "Durante uma videochamada importante, você percebe que seu colega, Marcos, está claramente respondendo e-mails, olhando para outra tela.", choices: [ { text: "Chamar a atenção dele publicamente: 'Marcos, você poderia prestar atenção, por favor?'", effect: -10, reaction: "Marcos fica defensivo. O clima da reunião piora.", nextNode: 3, correct: false }, { text: "Enviar uma mensagem privada rápida: 'Marcos, sua contribuição é importante aqui. Tudo bem aí?'", effect: 10, reaction: "Marcos pede desculpas e volta o foco. A reunião prossegue melhor.", nextNode: 3, correct: true }, { text: "Não dizer nada e assumir que ele não está interessado.", effect: -5, reaction: "Você perde a contribuição de Marcos e pode gerar um ressentimento silencioso.", nextNode: 3, correct: false } ] }, { id: 3, text: "A habilidade de ler e gerenciar a comunicação não verbal é essencial para um ambiente de trabalho harmonioso e produtivo.", choices: [] } ];
    let currentNodeId = 0;
    function updateAssertividade(change) { if (!assertividadeBarEl) return; assertividadeScore += change; assertividadeScore = Math.max(0, Math.min(100, assertividadeScore)); assertividadeBarEl.style.width = assertividadeScore + '%'; assertividadeBarEl.textContent = assertividadeScore + '%'; if (assertividadeScore < 30) assertividadeBarEl.style.backgroundColor = 'var(--accent-color)'; else if (assertividadeScore < 70) assertividadeBarEl.style.backgroundColor = 'var(--secondary-color)'; else assertividadeBarEl.style.backgroundColor = 'rgb(46, 204, 113)'; }
    function getGameEndFeedback(score) { if (score >= 85) return "Excelente! Sua comunicação foi clara e assertiva, minimizando ruídos."; if (score >= 60) return "Bom trabalho! Você demonstrou boa percepção não verbal, continue atento aos detalhes."; if (score >= 30) return "Algumas escolhas foram boas, mas outras podem ter gerado ruído. A prática leva à melhoria!"; return "Sua comunicação precisa de mais atenção aos sinais não verbais para evitar desentendimentos. Tente novamente!"; }
    function loadStoryNode(nodeId) { if (!storyTextEl || !storyChoicesEl || !audienceReactionEl || !gameEndFeedbackEl || !reiniciarJogoBtn) return; const node = storyNodes.find(n => n.id === nodeId); if (!node) return; currentNodeId = nodeId; storyTextEl.textContent = node.text; storyChoicesEl.innerHTML = ''; if (gameEndFeedbackEl) gameEndFeedbackEl.textContent = ''; if (node.choices.length === 0) { if(audienceReactionEl) audienceReactionEl.textContent = `Sua pontuação final de clareza foi ${assertividadeScore}%.`; if(gameEndFeedbackEl) gameEndFeedbackEl.textContent = getGameEndFeedback(assertividadeScore); reiniciarJogoBtn.classList.remove('hidden'); reiniciarJogoBtn.focus(); return; } reiniciarJogoBtn.classList.add('hidden'); node.choices.forEach(choice => { const button = document.createElement('button'); button.textContent = choice.text; button.classList.add('modern-button'); button.addEventListener('click', () => { updateAssertividade(choice.effect); if(audienceReactionEl) audienceReactionEl.textContent = choice.reaction; if (choice.correct) { button.classList.add('correct-choice-glow'); setTimeout(() => { button.classList.remove('correct-choice-glow'); }, GLOW_EFFECT_DURATION); } loadStoryNode(choice.nextNode); }); storyChoicesEl.appendChild(button); }); if(storyChoicesEl.firstChild) storyChoicesEl.firstChild.focus(); }
    if (reiniciarJogoBtn && storyTextEl) { reiniciarJogoBtn.addEventListener('click', () => { assertividadeScore = INITIAL_ASSERTIVENESS_SCORE; updateAssertividade(0); if(audienceReactionEl) audienceReactionEl.textContent = "Aguardando sua primeira ação..."; loadStoryNode(0); }); loadStoryNode(currentNodeId); updateAssertividade(0); }

    // --- DECODIFICADOR COM TOOLTIP ---
    const bodyPoints = document.querySelectorAll('.body-point');
    const decoderTooltip = document.getElementById('decoder-tooltip');
    const tooltipTitleEl = document.getElementById('tooltip-title');
    const tooltipTextEl = document.getElementById('tooltip-text');
    const bodyInfo = { head: { title: "Cabeça e Rosto", text: "Expressões faciais são cruciais. Sorrisos genuínos conectam, testas franzidas indicam preocupação ou desacordo. Acenos de cabeça podem significar concordância ou encorajamento." }, eyes: { title: "Olhos", text: "Contato visual firme (sem encarar) transmite confiança e interesse. Desviar o olhar pode indicar insegurança, desonestidade ou desinteresse. Piscar excessivamente pode denotar nervosismo." }, shoulders: { title: "Ombros", text: "Ombros eretos e relaxados indicam confiança e abertura. Ombros curvados ou tensos podem sinalizar submissão, estresse ou desânimo." }, torso: { title: "Torso", text: "Inclinar-se para frente demonstra interesse e engajamento. Inclinar-se para trás pode indicar ceticismo ou distanciamento. Uma postura ereta é sinal de autoconfiança." }, arm_left: { title: "Braço Esquerdo", text: "Gestos com o braço esquerdo podem complementar a fala. Braços abertos sugerem receptividade, enquanto cruzá-los pode indicar defesa ou fechamento." }, arm_right: { title: "Braço Direito", text: "Similar ao braço esquerdo, o posicionamento e gestos do braço direito contribuem para a mensagem geral de abertura ou reserva." }, hand_left: { title: "Mão Esquerda", text: "Gestos com as mãos são poderosos. A mão esquerda pode ser usada para enfatizar pontos. Palmas abertas indicam honestidade; esconder as mãos pode gerar desconfiança." }, hand_right: { title: "Mão Direita", text: "A mão direita frequentemente lidera gestos de cumprimento ou ênfase. Mãos inquietas podem denunciar nervosismo." }, legs: { title: "Pernas e Pés", text: "Pernas descruzadas e pés apontados para o interlocutor geralmente indicam abertura. Pernas cruzadas ou pés apontando para a saída podem sinalizar desconforto ou desejo de encerrar a conversa." } };

    if (decoderTooltip && tooltipTitleEl && tooltipTextEl && bodyPoints.length > 0) {
        bodyPoints.forEach(point => {
            point.addEventListener('mouseenter', (event) => {
                const area = point.dataset.area;
                if (bodyInfo[area]) {
                    tooltipTitleEl.textContent = bodyInfo[area].title;
                    tooltipTextEl.textContent = bodyInfo[area].text;
                    decoderTooltip.style.left = '0px'; decoderTooltip.style.top = '0px';
                    decoderTooltip.style.transform = 'translateY(15px) scale(0.95)';
                    decoderTooltip.classList.add('visible');
                    const tooltipRect = decoderTooltip.getBoundingClientRect();
                    let x = event.clientX + 20;
                    let y = event.clientY - (tooltipRect.height / 2);
                    if (x + tooltipRect.width > window.innerWidth - 15) { x = event.clientX - tooltipRect.width - 20; }
                    if (y < 15) { y = 15; }
                    if (y + tooltipRect.height > window.innerHeight - 15) { y = window.innerHeight - tooltipRect.height - 15; }
                    if (x < 15) { x = 15; }
                    decoderTooltip.style.left = `${x}px`;
                    decoderTooltip.style.top = `${y}px`;
                    void decoderTooltip.offsetWidth; // Força reflow
                    decoderTooltip.style.transform = 'translateY(0) scale(1)';
                }
            });
            point.addEventListener('mouseleave', () => { decoderTooltip.classList.remove('visible'); });
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

    // --- ACCORDION PARA RUÍDOS DE COMUNICAÇÃO ---
    const ruidoHeaders = document.querySelectorAll('.ruido-item-header');
    if (ruidoHeaders.length > 0) {
        ruidoHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const isExpanded = header.getAttribute('aria-expanded') === 'true';
                header.setAttribute('aria-expanded', String(!isExpanded));

                if (!isExpanded) { // Vai expandir
                    content.removeAttribute('hidden');
                    requestAnimationFrame(() => { // Garante que 'hidden' foi removido antes de calcular scrollHeight
                        content.style.maxHeight = content.scrollHeight + 'px';
                        content.style.opacity = '1';
                        content.style.paddingTop = 'var(--spacing-xs)'; // Restaurar padding
                        content.style.paddingBottom = 'var(--spacing-md)';
                    });
                } else { // Vai colapsar
                    content.style.maxHeight = '0px';
                    content.style.opacity = '0';
                    content.style.paddingTop = '0';
                    content.style.paddingBottom = '0';
                    content.addEventListener('transitionend', function handler() {
                        if (header.getAttribute('aria-expanded') === 'false') { // Re-check state
                           content.setAttribute('hidden', 'true');
                        }
                        content.removeEventListener('transitionend', handler);
                    }, { once: true });
                }
            });
        });
    }

    // --- MÓDULO INTERATIVO: COMUNICAÇÃO EM AÇÃO ---
    const historiaDisplayEl = document.getElementById('historia-comunicacao-display');
    const baseHistoriaEl = document.getElementById('historia-comunicacao-original');
    const ruidoToggleButtons = document.querySelectorAll('.ruido-toggle-button');
    const resetComunicacaoBtn = document.getElementById('resetar-comunicacao');

    if (historiaDisplayEl && baseHistoriaEl && ruidoToggleButtons.length > 0 && resetComunicacaoBtn) {
        const MAX_RUIDOS = 3;
        let textoBase = baseHistoriaEl.textContent.trim();
        let activeRuidoIds = new Set();
        let isTyping = false;

        const definicoesRuido = {
            incongruencia: { nome: "Incongruência", aplicar: (texto) => texto.replace("apresentou claramente", "apresentou de forma um pouco hesitante").replace("tom de voz era confiante e calmo", "tom de voz era um pouco vacilante, apesar de tentar parecer calma").replace("postura era aberta e receptiva", "postura estava um pouco tensa, com os braços cruzados disfarçadamente").replace("sentindo-se motivada, informada e alinhada", "sentindo-se um pouco confusa sobre as reais prioridades, mas tentando demonstrar otimismo") },
            sinais_mistos: { nome: "Sinais Mistos", aplicar: (texto) => texto.replace("respondendo às perguntas com paciência e encorajamento", "respondendo às perguntas com um sorriso forçado e olhando para o relógio repetidamente").replace("A equipe saiu da reunião sentindo-se motivada", "A equipe saiu da reunião com uma sensação estranha, apesar das palavras positivas").replace("equilibrado com todos os membros", "evasivo com alguns membros") },
            cultural: { nome: "Má Interpretação Cultural", aplicar: (texto) => { let novoTexto = texto; if (!novoTexto.includes("Um gesto")) { novoTexto += " Durante a apresentação, Sofia fez um gesto com a mão que, para um membro da equipe de outra cultura, pareceu desrespeitoso, causando um mal-estar silencioso."; } return novoTexto.replace("informada e alinhada com as metas", "um pouco desconfortável e questionando as intenções por trás de algumas falas"); } },
            ambiente: { nome: "Ambiente Ruidoso", aplicar: (texto) => { let novoTexto = texto; if (!novoTexto.startsWith("Com o barulho")) { novoTexto = "Com o barulho constante de uma construção próxima invadindo a sala, " + texto.charAt(0).toLowerCase() + texto.slice(1); } return novoTexto.replace("apresentou claramente os objetivos", "tentou apresentar os objetivos, mas partes importantes foram perdidas pelo barulho").replace("A equipe saiu da reunião sentindo-se motivada, informada", "A equipe saiu da reunião frustrada, com apenas uma compreensão parcial"); } },
            preconceito: { nome: "Preconceito/Viés", aplicar: (texto) => texto.replace("com todos os membros da equipe", "com a maioria dos membros da equipe, mas pareceu dar menos atenção às contribuições de um colega mais novo").replace("respondendo às perguntas com paciência e encorajamento", "respondendo às perguntas de forma mais completa para alguns do que para outros").replace("sentindo-se motivada, informada e alinhada", "alguns sentindo-se valorizados, enquanto outros questionavam se suas opiniões eram de fato consideradas") }
        };

        function typeWriter(element, text, onComplete) {
            if (isTyping) return; isTyping = true; element.innerHTML = ''; let i = 0; const speed = 20;
            const textNode = document.createTextNode(''); element.appendChild(textNode);
            const cursorSpan = document.createElement('span'); cursorSpan.className = 'typing-cursor'; element.appendChild(cursorSpan);
            function type() { if (i < text.length) { textNode.nodeValue += text.charAt(i); i++; setTimeout(type, speed); } else { cursorSpan.remove(); isTyping = false; if (onComplete) onComplete(); } } type();
        }

        function atualizarHistoria() {
            let historiaModificada = textoBase; activeRuidoIds.forEach(id => { if (definicoesRuido[id]) { historiaModificada = definicoesRuido[id].aplicar(historiaModificada); } });
            historiaDisplayEl.classList.add('comunicacao-flash');
            setTimeout(() => { historiaDisplayEl.classList.remove('comunicacao-flash'); typeWriter(historiaDisplayEl, historiaModificada); }, 500);
        }

        function toggleRuido(event) {
            const button = event.currentTarget; const ruidoId = button.dataset.ruidoId;
            if (activeRuidoIds.has(ruidoId)) { activeRuidoIds.delete(ruidoId); }
            else { if (activeRuidoIds.size < MAX_RUIDOS) { activeRuidoIds.add(ruidoId); } else { alert(`Você pode selecionar no máximo ${MAX_RUIDOS} ruídos.`); return; } }
            atualizarBotoesEstado(); atualizarHistoria();
        }

        function atualizarBotoesEstado() {
            ruidoToggleButtons.forEach(btn => {
                const rId = btn.dataset.ruidoId;
                btn.disabled = (!activeRuidoIds.has(rId) && activeRuidoIds.size >= MAX_RUIDOS);
                if (activeRuidoIds.has(rId)) btn.classList.add('active'); else btn.classList.remove('active');
            });
        }
        ruidoToggleButtons.forEach(button => button.addEventListener('click', toggleRuido));
        resetComunicacaoBtn.addEventListener('click', () => { activeRuidoIds.clear(); atualizarBotoesEstado(); atualizarHistoria(); });
        typeWriter(historiaDisplayEl, textoBase); atualizarBotoesEstado();
    }

    // --- ANIMAÇÃO DE ROLAGEM ---
    const animatedElements = document.querySelectorAll('[data-animate-on-scroll]');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const scrollObserver = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Não desobservar itens do checklist para que possam re-animar se saírem e voltarem à vista
                if (!entry.target.matches('.checklist li')) {
                     // E também não desobservar os cards de consequência para permitir re-animação se necessário (opcional)
                    if (!entry.target.closest('#consequencias-ruido .consequencia-card')) {
                        observerInstance.unobserve(entry.target);
                    }
                }
            } else {
                // Remover 'is-visible' para re-animar ao rolar de volta (opcional, mas bom para checklist)
                if (entry.target.matches('.checklist li') || entry.target.closest('#consequencias-ruido .consequencia-card')) {
                    entry.target.classList.remove('is-visible');
                }
            }
        });
    }, observerOptions);
    animatedElements.forEach(el => scrollObserver.observe(el));
    // Certificar que os itens de checklist sem o atributo data-animate-on-scroll também sejam observados
    document.querySelectorAll('.checklist li:not([data-animate-on-scroll])').forEach(item => {
        scrollObserver.observe(item);
    });
});