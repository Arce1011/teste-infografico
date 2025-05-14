document.addEventListener('DOMContentLoaded', () => {
    const verbalSelect = document.getElementById('verbal-phrase');
    const nonVerbalSelect = document.getElementById('non-verbal-package');
    const thermometerFill = document.getElementById('thermometer-fill');
    const resultTitle = document.getElementById('result-title');
    const resultDescription = document.getElementById('result-description');
    const resultDisplay = document.getElementById('result-display');

    // Definição dos pacotes não verbais
    // 'value' representa a porcentagem de preenchimento do termômetro (0-100)
    // 'type' para classe CSS e lógica
    const nonVerbalPackages = [
        {
            id: 'congruent-positive',
            text: 'Tom de voz confiante, contato visual firme, postura aberta, sorriso genuíno.',
            type: 'congruent',
            value: 95, // Alto no termômetro
            description: 'Sua comunicação não verbal reforça positivamente sua mensagem verbal. Alta credibilidade e clareza!'
        },
        {
            id: 'neutral-attentive',
            text: 'Tom de voz neutro, contato visual regular, postura receptiva.',
            type: 'neutral',
            value: 60, // Meio do termômetro
            description: 'Sua comunicação não verbal é neutra e atenta. A mensagem é clara, mas poderia ter mais impacto positivo.'
        },
        {
            id: 'hesitant-distracted',
            text: 'Tom de voz hesitante, olhar para baixo/desviado, ombros curvados.',
            type: 'contradictory',
            value: 30, // Baixo no termômetro
            description: 'Sua comunicação não verbal sugere hesitação ou falta de confiança, contradizendo uma mensagem positiva. Gera dúvida.'
        },
        {
            id: 'crossed-tense',
            text: 'Braços cruzados, maxilar tenso, tom de voz defensivo, pouco contato visual.',
            type: 'contradictory',
            value: 10, // Muito baixo no termômetro
            description: 'Sua comunicação não verbal indica fechamento ou defesa, contradizendo fortemente mensagens de abertura ou acordo. Baixa credibilidade e mensagem confusa.'
        },
        {
            id: 'sarcastic-eye-roll',
            text: 'Tom de voz sarcástico, revirar de olhos, sorriso irônico.',
            type: 'contradictory',
            value: 5, // Quase no fundo
            description: 'Sua comunicação não verbal é abertamente sarcástica ou desdenhosa, minando completamente a mensagem verbal positiva. Gera desconfiança e hostilidade.'
        }
    ];

    // Popular o select de pacotes não verbais
    nonVerbalPackages.forEach(pkg => {
        const option = document.createElement('option');
        option.value = pkg.id;
        option.textContent = pkg.text;
        nonVerbalSelect.appendChild(option);
    });

    function updateDashboard() {
        const selectedVerbal = verbalSelect.options[verbalSelect.selectedIndex].text;
        const selectedNonVerbalId = nonVerbalSelect.value;
        const selectedPackage = nonVerbalPackages.find(pkg => pkg.id === selectedNonVerbalId);

        if (!selectedPackage) {
            // Estado inicial ou se algo der errado
            thermometerFill.style.height = '0%';
            thermometerFill.className = 'thermometer-fill'; // Reset classes
            resultDisplay.className = 'result-display'; // Reset classes
            resultTitle.textContent = 'Selecione as opções';
            resultDescription.textContent = 'A combinação será analisada aqui.';
            return;
        }

        // Atualizar termômetro
        thermometerFill.style.height = `${selectedPackage.value}%`;
        thermometerFill.className = `thermometer-fill fill-${selectedPackage.type}`;

        // Atualizar display de resultado
        resultDisplay.className = `result-display result-${selectedPackage.type}`; // Adiciona classe de cor

        switch (selectedPackage.type) {
            case 'congruent':
                resultTitle.textContent = 'Mensagem Congruente e Clara!';
                break;
            case 'neutral':
                resultTitle.textContent = 'Mensagem Neutra/Ambígua';
                break;
            case 'contradictory':
                resultTitle.textContent = 'Mensagem Confusa/Baixa Credibilidade!';
                break;
        }
        resultDescription.textContent = `Frase: "${selectedVerbal}" + Não Verbal: "${selectedPackage.text.substring(0,50)}..." \nResultado: ${selectedPackage.description}`;
    }

    // Event Listeners
    verbalSelect.addEventListener('change', updateDashboard);
    nonVerbalSelect.addEventListener('change', updateDashboard);

    // Estado inicial
    nonVerbalSelect.selectedIndex = 0; // Seleciona o primeiro pacote não verbal por padrão
    updateDashboard(); // Chama para configurar o estado inicial
});