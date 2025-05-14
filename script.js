document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const verbalStatementEl = document.getElementById('verbal-statement');
    const nonVerbalBehaviorEl = document.getElementById('non-verbal-behavior');
    const userOptionsContainer = document.getElementById('user-options');
    const submitAnalysisButton = document.getElementById('submit-analysis');
    const nextScenarioButton = document.getElementById('next-scenario');

    const thermometerFill = document.getElementById('thermometer-fill');
    const resultTitleEl = document.getElementById('result-title');
    const resultDescriptionEl = document.getElementById('result-description');
    const resultDisplay = document.getElementById('result-display');

    let currentScenario;
    let scenarios = [];
    let currentScenarioIndex = 0;
    let userAnswer = null;

    // BANCO DE CENÁRIOS
    // Cada cenário tem:
    // - verbal: A frase dita
    // - nonVerbal: O comportamento não verbal
    // - correctAnswer: 'congruent', 'ambiguous', 'contradictory' (A análise correta)
    // - explanation: Por que essa é a análise correta
    // - thermometerValue: O valor para o termômetro (0-100)
    scenarios = [
        {
            verbal: "Estou muito feliz com os resultados deste trimestre!",
            nonVerbal: "Diz isso com um sorriso largo, tom de voz entusiasmado, olhando diretamente para a equipe e gesticulando abertamente.",
            correctAnswer: 'congruent',
            explanation: "Perfeito! A linguagem corporal e o tom de voz entusiasmados reforçam a mensagem verbal de felicidade, transmitindo alta credibilidade e sinceridade.",
            thermometerValue: 95
        },
        {
            verbal: "Sim, sua sugestão é interessante, vamos considerar.",
            nonVerbal: "Fala em tom monótono, sem contato visual, olhando para o computador e mexendo distraidamente em uma caneta.",
            correctAnswer: 'contradictory',
            explanation: "Atenção! Apesar das palavras de consideração, o não verbal (tom monótono, falta de contato visual, distração) contradiz fortemente a mensagem. Isso sugere desinteresse ou que a sugestão não será levada a sério.",
            thermometerValue: 20
        },
        {
            verbal: "Não se preocupe, o projeto está totalmente sob controle.",
            nonVerbal: "Diz com a voz um pouco trêmula, engolindo em seco e evitando olhar diretamente para o chefe.",
            correctAnswer: 'contradictory',
            explanation: "Sinais de alerta! As palavras tentam transmitir segurança, mas o não verbal (voz trêmula, engolir em seco, evitação de olhar) indica nervosismo e falta de confiança, minando a credibilidade da afirmação.",
            thermometerValue: 30
        },
        {
            verbal: "Estou aberto a discutir novas abordagens para este problema.",
            nonVerbal: "Mantém os braços cruzados, maxilar tenso e olha para o interlocutor com uma expressão cética.",
            correctAnswer: 'contradictory',
            explanation: "Cuidado! A frase verbal sugere abertura, mas a postura defensiva (braços cruzados, maxilar tenso) e a expressão cética comunicam o oposto. A mensagem se torna confusa e pouco crível.",
            thermometerValue: 15
        },
        {
            verbal: "Entendo sua preocupação e quero ajudar a resolver.",
            nonVerbal: "Fala em tom calmo, mantém contato visual empático, inclina-se levemente para frente e usa gestos que demonstram atenção.",
            correctAnswer: 'congruent',
            explanation: "Excelente! A comunicação não verbal (tom calmo, contato visual, postura atenta) está em total harmonia com a mensagem verbal de empatia e disposição para ajudar. Isso constrói confiança.",
            thermometerValue: 90
        },
        {
            verbal: "Este feedback é muito importante para mim.",
            nonVerbal: "Responde rapidamente, quase interrompendo, com um leve revirar de olhos e um sorriso forçado.",
            correctAnswer: 'contradictory',
            explanation: "Alerta de sarcasmo! O revirar de olhos e o sorriso forçado contradizem a afirmação de que o feedback é importante. Isso pode ser percebido como desdém ou falsidade.",
            thermometerValue: 10
        },
        {
            verbal: "Preciso de um pouco mais de tempo para finalizar esta tarefa.",
            nonVerbal: "Diz olhando para baixo, com tom de voz baixo e ombros ligeiramente curvados.",
            correctAnswer: 'congruent', // Congruente na hesitação/pedido
            explanation: "Coerente. A linguagem corporal (olhar para baixo, tom baixo, ombros curvados) é congruente com um pedido que pode envolver alguma dificuldade ou receio. A mensagem é clara, embora possa não transmitir proatividade.",
            thermometerValue: 50 // Não é super positivo, mas é congruente
        },
        {
            verbal: "Claro, pode contar comigo para essa apresentação!",
            nonVerbal: "Afirma com entusiasmo, mas depois coça a nuca e desvia o olhar rapidamente.",
            correctAnswer: 'ambiguous',
            explanation: "Sinais mistos! O entusiasmo inicial é positivo, mas coçar a nuca e desviar o olhar podem indicar alguma reserva, dúvida ou desconforto não expresso verbalmente. Gera uma leve ambiguidade.",
            thermometerValue: 65
        }
        // Adicione mais cenários aqui!
    ];

    function shuffleArray(array) { // Para embaralhar cenários
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }


    function loadScenario(index) {
        if (index >= scenarios.length) {
            // Fim dos cenários
            verbalStatementEl.textContent = "Todos os cenários foram apresentados!";
            nonVerbalBehaviorEl.textContent = "Parabéns por praticar!";
            userOptionsContainer.style.display = 'none';
            submitAnalysisButton.style.display = 'none';
            resultDisplay.className = 'result-display result-neutral-default';
            resultTitleEl.textContent = "Fim da Análise";
            resultDescriptionEl.textContent = "Você completou todos os cenários. Esperamos que tenha sido uma experiência de aprendizado valiosa!";
            thermometerFill.style.height = '0%';
            thermometerFill.className = 'thermometer-fill fill-neutral-default';
            nextScenarioButton.style.display = 'none';
            return;
        }

        currentScenario = scenarios[index];
        verbalStatementEl.textContent = currentScenario.verbal;
        nonVerbalBehaviorEl.textContent = currentScenario.nonVerbal;

        // Resetar estado
        userAnswer = null;
        document.querySelectorAll('.options-group button').forEach(btn => btn.classList.remove('selected'));
        submitAnalysisButton.disabled = true;
        resultDisplay.className = 'result-display result-neutral-default';
        resultTitleEl.textContent = 'Aguardando sua Análise...';
        resultDescriptionEl.textContent = 'Analise o cenário acima e envie sua resposta.';
        thermometerFill.style.height = '0%';
        thermometerFill.className = 'thermometer-fill fill-neutral-default';
        userOptionsContainer.style.display = 'flex';
        submitAnalysisButton.style.display = 'inline-block';
        nextScenarioButton.style.display = 'none';
    }

    userOptionsContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            document.querySelectorAll('.options-group button').forEach(btn => btn.classList.remove('selected'));
            e.target.classList.add('selected');
            userAnswer = e.target.dataset.answer;
            submitAnalysisButton.disabled = false;
        }
    });

    submitAnalysisButton.addEventListener('click', () => {
        if (!userAnswer) return;

        const isCorrect = userAnswer === currentScenario.correctAnswer;
        let feedbackText = isCorrect ? "<span class='feedback-correct'>Correto!</span>" : "<span class='feedback-incorrect'>Incorreto.</span>";

        resultTitleEl.innerHTML = `${feedbackText} A análise correta é: ${currentScenario.correctAnswer.charAt(0).toUpperCase() + currentScenario.correctAnswer.slice(1)}`;
        resultDescriptionEl.textContent = currentScenario.explanation;

        // Define a classe de resultado com base na resposta correta, não na do usuário
        resultDisplay.className = `result-display result-${currentScenario.correctAnswer}`;
        thermometerFill.style.height = `${currentScenario.thermometerValue}%`;
        thermometerFill.className = `thermometer-fill fill-${currentScenario.correctAnswer}`;

        submitAnalysisButton.style.display = 'none';
        userOptionsContainer.style.display = 'none'; // Esconde opções após análise
        nextScenarioButton.style.display = 'inline-block';
    });

    nextScenarioButton.addEventListener('click', () => {
        currentScenarioIndex++;
        loadScenario(currentScenarioIndex);
    });

    // Inicialização
    shuffleArray(scenarios); // Embaralha os cenários para variedade
    loadScenario(currentScenarioIndex);
});