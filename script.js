document.addEventListener('DOMContentLoaded', () => {
    const verbalSelect = document.getElementById('verbal-phrase');
    const nonVerbalSelect = document.getElementById('non-verbal-package');
    const thermometerFill = document.getElementById('thermometer-fill');
    const resultTitle = document.getElementById('result-title');
    const resultDescription = document.getElementById('result-description');
    const resultDisplay = document.getElementById('result-display');

    // Definição dos pacotes não verbais
    // 'baseValue' é a "força" intrínseca do pacote não verbal (0-100)
    // 'impactType' descreve como ele geralmente afeta uma mensagem
    const nonVerbalPackages = [
        {
            id: 'nv-confident-open',
            text: 'Tom de voz confiante, contato visual firme, postura aberta, sorriso genuíno.',
            baseValue: 95,
            impactType: 'reinforce-positive' // Reforça positivamente
        },
        {
            id: 'nv-neutral-attentive',
            text: 'Tom de voz neutro, contato visual regular, postura receptiva.',
            baseValue: 60,
            impactType: 'neutral' // Efeito neutro, depende do verbal
        },
        {
            id: 'nv-hesitant-distracted',
            text: 'Tom de voz hesitante, olhar para baixo/desviado, ombros curvados.',
            baseValue: 30,
            impactType: 'undermine' // Mina a confiança, contradiz positivo
        },
        {
            id: 'nv-closed-tense',
            text: 'Braços cruzados, maxilar tenso, tom defensivo, pouco contato visual.',
            baseValue: 15,
            impactType: 'contradict-openness' // Contradiz abertura/positividade
        },
        {
            id: 'nv-sarcastic-dismissive',
            text: 'Tom de voz sarcástico, revirar de olhos, sorriso irônico.',
            baseValue: 5,
            impactType: 'highly-contradictory' // Altamente contraditório e negativo
        }
    ];

    // Popular o select de pacotes não verbais (exceto o primeiro "-- Selecione --")
    nonVerbalPackages.forEach(pkg => {
        const option = document.createElement('option');
        option.value = pkg.id;
        option.textContent = pkg.text;
        nonVerbalSelect.appendChild(option);
    });

    function updateDashboard() {
        const selectedVerbalOption = verbalSelect.options[verbalSelect.selectedIndex];
        const verbalIntent = selectedVerbalOption.dataset.intent; // 'positive', 'open', 'assertive', 'hesitant'
        const verbalText = selectedVerbalOption.text;

        const selectedNonVerbalId = nonVerbalSelect.value;

        // Estado inicial se nada for selecionado no pacote não verbal
        if (!selectedNonVerbalId) {
            thermometerFill.style.height = '0%';
            thermometerFill.className = 'thermometer-fill fill-neutral-default';
            resultDisplay.className = 'result-display result-neutral-default';
            resultTitle.textContent = 'Selecione as Opções';
            resultDescription.textContent = 'Escolha uma frase verbal e um pacote não verbal para ver a análise.';
            return;
        }

        const nvPackage = nonVerbalPackages.find(pkg => pkg.id === selectedNonVerbalId);

        let congruenceLevel; // 'congruent', 'ambiguous', 'contradictory'
        let thermometerHeight = nvPackage.baseValue; // Altura baseada no pacote NV
        let title = "";
        let description = `Frase: "${verbalText}"\nNão Verbal: "${nvPackage.text.substring(0, 70)}..."\n\nAnálise: `;

        // Lógica de Combinação (Simplificada - Pode ser expandida)
        switch (verbalIntent) {
            case 'positive':
            case 'assertive':
            case 'open':
                if (nvPackage.impactType === 'reinforce-positive') {
                    congruenceLevel = 'congruent';
                    title = "Mensagem Congruente e Impactante!";
                    description += "Sua comunicação não verbal reforça fortemente sua mensagem verbal, transmitindo confiança e clareza.";
                    thermometerHeight = Math.min(100, nvPackage.baseValue + 10); // Pequeno bônus
                } else if (nvPackage.impactType === 'neutral') {
                    congruenceLevel = 'ambiguous'; // Poderia ser 'congruent' mas menos forte
                    title = "Mensagem Clara, Potencial Neutro";
                    description += "Sua comunicação não verbal é neutra. A mensagem é entendida, mas poderia ter mais convicção ou calor, dependendo do objetivo.";
                } else if (nvPackage.impactType === 'undermine') {
                    congruenceLevel = 'contradictory';
                    title = "Mensagem Confusa: Insegurança Aparente";
                    description += "Sua comunicação não verbal sugere hesitação ou falta de confiança, o que enfraquece ou contradiz sua afirmação verbal.";
                    thermometerHeight = Math.max(0, nvPackage.baseValue - 10);
                } else if (nvPackage.impactType === 'contradict-openness' || nvPackage.impactType === 'highly-contradictory') {
                    congruenceLevel = 'contradictory';
                    title = "Forte Contradição: Baixa Credibilidade!";
                    description += "Sua comunicação não verbal contradiz fortemente sua mensagem verbal, gerando desconfiança e confusão sobre suas reais intenções.";
                }
                break;

            case 'hesitant':
                if (nvPackage.impactType === 'reinforce-positive' || nvPackage.impactType === 'neutral') {
                    congruenceLevel = 'ambiguous';
                    title = "Ambiguidade: Hesitação com Sinais Mistos";
                    description += "Você verbaliza hesitação, mas seu não verbal é mais confiante ou neutro. Isso pode confundir sobre o seu real nível de incerteza ou o que espera.";
                } else if (nvPackage.impactType === 'undermine') {
                    congruenceLevel = 'congruent'; // Congruente na hesitação
                    title = "Congruência na Incerteza";
                    description += "Sua comunicação verbal e não verbal alinham-se na hesitação. Isso transmite sua incerteza de forma clara, embora possa não inspirar confiança.";
                    thermometerHeight = Math.max(5, nvPackage.baseValue - 5); // Hesitação congruente não é "forte"
                } else if (nvPackage.impactType === 'contradict-openness' || nvPackage.impactType === 'highly-contradictory') {
                    congruenceLevel = 'contradictory';
                    title = "Contradição e Fechamento";
                    description += "Você verbaliza hesitação, mas seu não verbal parece defensivo ou até hostil. Isso cria uma barreira e dificulta a colaboração.";
                }
                break;

            default:
                congruenceLevel = 'ambiguous';
                title = "Análise Indisponível";
                description = "Não foi possível determinar a congruência para esta combinação específica.";
        }

        // Atualizar termômetro
        thermometerFill.style.height = `${thermometerHeight}%`;
        thermometerFill.className = `thermometer-fill fill-${congruenceLevel}`;

        // Atualizar display de resultado
        resultDisplay.className = `result-display result-${congruenceLevel}`;
        resultTitle.textContent = title;
        resultDescription.textContent = description;
    }

    // Event Listeners
    verbalSelect.addEventListener('change', updateDashboard);
    nonVerbalSelect.addEventListener('change', updateDashboard);

    // Estado inicial
    updateDashboard(); // Chama para configurar o estado inicial (com NV não selecionado)
});