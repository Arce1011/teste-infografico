document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const verbalPhraseDisplayEl = document.getElementById('verbal-phrase-display');
    const nonVerbalOptionsContainer = document.getElementById('non-verbal-options');
    const submitChoiceButton = document.getElementById('submit-choice');
    const nextChallengeButton = document.getElementById('next-challenge');

    const thermometerFill = document.getElementById('thermometer-fill');
    const resultTitleEl = document.getElementById('result-title');
    const resultDescriptionEl = document.getElementById('result-description');
    const resultDisplay = document.getElementById('result-display');

    let currentChallenge;
    let challenges = [];
    let currentChallengeIndex = 0;
    let userSelectedNonVerbalId = null;

    // BANCO DE DESAFIOS
    // Cada desafio tem:
    // - id: Identificador único para o desafio/frase verbal
    // - verbalPhrase: A frase verbal fixa para este desafio
    // - nonVerbalOptions: Um array de possíveis comportamentos não verbais, cada um com:
    //   - id: Identificador único para esta opção não verbal
    //   - text: Descrição do comportamento não verbal
    //   - congruence: 'congruent', 'ambiguous', 'contradictory' (Análise desta combinação)
    //   - explanation: Por que esta combinação resulta nessa congruência
    //   - thermometerValue: O valor para o termômetro (0-100)
    challenges = [
        {
            id: 'challenge1',
            verbalPhrase: "Preciso que este relatório esteja pronto até amanhã, é muito importante.",
            nonVerbalOptions: [
                {
                    id: 'nv1a', text: "Tom de voz firme e direto, contato visual constante, postura ereta, sem rodeios.",
                    congruence: 'congruent', thermometerValue: 90,
                    explanation: "EXCELENTE ESCOLHA! Este comportamento não verbal transmite clareza, urgência e autoridade de forma apropriada, reforçando a importância da tarefa. Sua mensagem será levada a sério."
                },
                {
                    id: 'nv1b', text: "Tom de voz suave, quase pedindo desculpas, olhando para baixo e mexendo as mãos nervosamente.",
                    congruence: 'contradictory', thermometerValue: 25,
                    explanation: "NÃO É O IDEAL. Este comportamento mina a urgência e importância da sua solicitação. Pode parecer que você não tem certeza da necessidade ou que não se sente confortável em pedir, diminuindo a probabilidade de cumprimento."
                },
                {
                    id: 'nv1c', text: "Tom de voz neutro, olhando para o computador enquanto fala, sem muita expressão facial.",
                    congruence: 'ambiguous', thermometerValue: 55,
                    explanation: "PODERIA SER MELHOR. Embora a mensagem verbal seja clara, a falta de engajamento não verbal pode fazer com que a importância não seja totalmente percebida. A pessoa pode não sentir a urgência como deveria."
                },
                 {
                    id: 'nv1d', text: "Tom de voz irritado, punho cerrado levemente, olhar fixo e intimidador.",
                    congruence: 'contradictory', thermometerValue: 10, // Contraditório no sentido de profissionalismo
                    explanation: "CUIDADO! Embora transmita urgência, a irritação e a intimidação criam um ambiente negativo e podem gerar ressentimento ou medo, em vez de colaboração eficaz. A mensagem de 'importância' se perde na agressividade."
                }
            ]
        },
        {
            id: 'challenge2',
            verbalPhrase: "Gostaria de parabenizá-lo pelo excelente trabalho neste projeto!",
            nonVerbalOptions: [
                {
                    id: 'nv2a', text: "Sorriso largo e genuíno, tom de voz entusiasmado, contato visual direto e um aperto de mão firme (se apropriado).",
                    congruence: 'congruent', thermometerValue: 98,
                    explanation: "PERFEITO! Sua expressão não verbal é totalmente congruente com o elogio, transmitindo sinceridade e apreço genuíno. Isso maximiza o impacto positivo do seu feedback."
                },
                {
                    id: 'nv2b', text: "Diz rapidamente, quase como uma formalidade, olhando para os papéis na mesa e sem mudar a expressão facial.",
                    congruence: 'contradictory', thermometerValue: 30,
                    explanation: "OPORTUNIDADE PERDIDA. Um elogio entregue desta forma soa vazio e protocolar. A falta de entusiasmo e contato visual não verbal faz com que o reconhecimento perca quase todo o seu valor."
                },
                {
                    id: 'nv2c', text: "Tom de voz um pouco sarcástico, um leve sorriso de canto de boca e levantando uma sobrancelha.",
                    congruence: 'contradictory', thermometerValue: 5,
                    explanation: "ALTAMENTE NEGATIVO! Este comportamento transforma o elogio em uma crítica velada ou sarcasmo. É pior do que não dizer nada, pois pode gerar desconfiança e ressentimento."
                }
            ]
        },
        // Adicione mais desafios aqui!
    ];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function loadChallenge(index) {
        if (index >= challenges.length) {
            verbalPhraseDisplayEl.textContent = "Todos os desafios foram concluídos!";
            nonVerbalOptionsContainer.innerHTML = ""; // Limpa opções
            submitChoiceButton.style.display = 'none';
            resultDisplay.className = 'result-display result-neutral-default';
            resultTitleEl.textContent = "Fim do Treinamento";
            resultDescriptionEl.textContent = "Parabéns por praticar suas habilidades de comunicação! Esperamos que tenha sido útil.";
            thermometerFill.style.height = '0%';
            thermometerFill.className = 'thermometer-fill fill-neutral-default';
            nextChallengeButton.style.display = 'none';
            return;
        }

        currentChallenge = challenges[index];
        verbalPhraseDisplayEl.textContent = currentChallenge.verbalPhrase;

        nonVerbalOptionsContainer.innerHTML = ""; // Limpa opções anteriores
        currentChallenge.nonVerbalOptions.forEach(option => {
            const button = document.createElement('button');
            button.dataset.id = option.id;
            button.textContent = option.text;
            nonVerbalOptionsContainer.appendChild(button);
        });

        // Resetar estado
        userSelectedNonVerbalId = null;
        submitChoiceButton.disabled = true;
        resultDisplay.className = 'result-display result-neutral-default';
        resultTitleEl.textContent = 'Aguardando sua Escolha...';
        resultDescriptionEl.textContent = 'Selecione um comportamento não verbal para a situação apresentada.';
        thermometerFill.style.height = '0%';
        thermometerFill.className = 'thermometer-fill fill-neutral-default';
        nonVerbalOptionsContainer.style.display = 'flex';
        submitChoiceButton.style.display = 'inline-block';
        nextChallengeButton.style.display = 'none';
    }

    nonVerbalOptionsContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            document.querySelectorAll('.options-group-column button').forEach(btn => btn.classList.remove('selected'));
            e.target.classList.add('selected');
            userSelectedNonVerbalId = e.target.dataset.id;
            submitChoiceButton.disabled = false;
        }
    });

    submitChoiceButton.addEventListener('click', () => {
        if (!userSelectedNonVerbalId) return;

        const chosenOption = currentChallenge.nonVerbalOptions.find(opt => opt.id === userSelectedNonVerbalId);

        if (!chosenOption) return; // Segurança

        resultTitleEl.textContent = `Análise da sua Escolha: ${chosenOption.congruence.charAt(0).toUpperCase() + chosenOption.congruence.slice(1)}`;
        resultDescriptionEl.textContent = chosenOption.explanation;

        resultDisplay.className = `result-display result-${chosenOption.congruence}`;
        thermometerFill.style.height = `${chosenOption.thermometerValue}%`;
        thermometerFill.className = `thermometer-fill fill-${chosenOption.congruence}`;

        submitChoiceButton.style.display = 'none';
        // nonVerbalOptionsContainer.style.display = 'none'; // Ou desabilitar botões
         document.querySelectorAll('.options-group-column button').forEach(btn => btn.disabled = true);

        nextChallengeButton.style.display = 'inline-block';
    });

    nextChallengeButton.addEventListener('click', () => {
         document.querySelectorAll('.options-group-column button').forEach(btn => btn.disabled = false);
        currentChallengeIndex++;
        loadChallenge(currentChallengeIndex);
    });

    // Inicialização
    shuffleArray(challenges); // Embaralha os desafios
    loadChallenge(currentChallengeIndex);
});