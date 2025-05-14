document.addEventListener('DOMContentLoaded', () => {
    const verbalSelect = document.getElementById('verbal-phrase');
    const nonVerbalSelect = document.getElementById('non-verbal-package');
    const thermometerFill = document.getElementById('thermometer-fill');
    const resultTitle = document.getElementById('result-title');
    const resultDescription = document.getElementById('result-description');
    const resultDisplay = document.getElementById('result-display');

    // data-intent nas opções verbais:
    // positive-assertive, open-collaborative, positive-appreciative,
    // assertive-confident, hesitant-uncertain, receptive-neutral, determined-positive

    const nonVerbalPackages = [
        {
            id: 'nv-confident-open',
            text: 'Tom firme e claro, contato visual direto e amigável, postura ereta e aberta, gestos congruentes, sorriso genuíno.',
            baseValue: 95,
            impactType: 'strongly-reinforces-positive' // Reforça fortemente positividade e confiança
        },
        {
            id: 'nv-attentive-receptive',
            text: 'Tom de voz calmo e neutro, escuta ativa (acenar com a cabeça), contato visual regular, postura relaxada e receptiva.',
            baseValue: 70,
            impactType: 'reinforces-neutral-open' // Reforça neutralidade, abertura, receptividade
        },
        {
            id: 'nv-hesitant-distracted',
            text: 'Tom de voz baixo ou hesitante, olhar desviado ou para baixo, ombros curvados, tiques nervosos (mexer as mãos).',
            baseValue: 30,
            impactType: 'signals-uncertainty-low-confidence' // Sinaliza incerteza, baixa confiança
        },
        {
            id: 'nv-closed-tense-defensive',
            text: 'Braços cruzados firmemente, maxilar tenso, tom de voz cortante ou defensivo, olhar fixo e desafiador ou evitação de contato.',
            baseValue: 15,
            impactType: 'signals-disagreement-resistance' // Sinaliza discordância, resistência, fechamento
        },
        {
            id: 'nv-sarcastic-dismissive-bored',
            text: 'Tom de voz sarcástico ou monótono, revirar de olhos, bocejos disfarçados, sorriso debochado, postura desleixada.',
            baseValue: 5,
            impactType: 'strongly-contradicts-undermines' // Contradiz fortemente, mina a mensagem, desrespeitoso
        },
        {
            id: 'nv-anxious-avoidant',
            text: 'Voz trêmula, dificuldade em manter contato visual, rubor, inquietação excessiva, postura encolhida.',
            baseValue: 20,
            impactType: 'signals-anxiety-discomfort' // Sinaliza ansiedade, desconforto, falta de preparo
        }
    ];

    nonVerbalPackages.forEach(pkg => {
        const option = document.createElement('option');
        option.value = pkg.id;
        option.textContent = pkg.text;
        nonVerbalSelect.appendChild(option);
    });

    function updateDashboard() {
        const selectedVerbalOption = verbalSelect.options[verbalSelect.selectedIndex];
        const verbalIntent = selectedVerbalOption.dataset.intent;
        const verbalText = selectedVerbalOption.text;
        const selectedNonVerbalId = nonVerbalSelect.value;

        if (!selectedNonVerbalId) {
            thermometerFill.style.height = '0%';
            thermometerFill.className = 'thermometer-fill fill-neutral-default';
            resultDisplay.className = 'result-display result-neutral-default';
            resultTitle.textContent = 'Aguardando sua Análise...';
            resultDescription.textContent = 'Combine uma frase verbal com um comportamento não verbal para ver o "termômetro" da sua comunicação em ação.';
            return;
        }

        const nvPackage = nonVerbalPackages.find(pkg => pkg.id === selectedNonVerbalId);
        let congruenceLevel = 'ambiguous'; // Default
        let thermometerHeight = nvPackage.baseValue;
        let title = "";
        let analysis = "";

        // Lógica de Congruência Mais Detalhada
        if (verbalIntent.includes('positive') || verbalIntent.includes('assertive') || verbalIntent.includes('determined')) {
            if (nvPackage.impactType === 'strongly-reinforces-positive') {
                congruenceLevel = 'congruent';
                title = "Comunicação Poderosa e Coerente!";
                analysis = "Sua mensagem verbal positiva/assertiva é perfeitamente amplificada pelo seu não verbal. Isso transmite máxima confiança, clareza e credibilidade. Excelente!";
                thermometerHeight = Math.min(100, nvPackage.baseValue + 5);
            } else if (nvPackage.impactType === 'reinforces-neutral-open') {
                congruenceLevel = 'congruent'; // Ainda congruente, mas menos intenso
                title = "Comunicação Clara e Receptiva";
                analysis = "Seu não verbal apoia sua mensagem de forma calma e aberta. A mensagem é bem recebida, embora possa não ter o mesmo 'punch' de um não verbal mais explicitamente confiante.";
                thermometerHeight = nvPackage.baseValue;
            } else if (nvPackage.impactType.includes('uncertainty') || nvPackage.impactType.includes('anxiety')) {
                congruenceLevel = 'contradictory';
                title = "Sinais Mistos: Confiança Minada";
                analysis = "Apesar das palavras positivas/assertivas, seu não verbal transmite incerteza ou ansiedade. Isso gera dúvida sobre sua real convicção e pode diminuir o impacto da sua mensagem.";
                thermometerHeight = nvPackage.baseValue - 10;
            } else if (nvPackage.impactType.includes('disagreement') || nvPackage.impactType.includes('undermines')) {
                congruenceLevel = 'contradictory';
                title = "Forte Contradição: Mensagem Anulada!";
                analysis = "Seu não verbal hostil, defensivo ou desdenhoso destrói completamente a credibilidade da sua mensagem verbal positiva/assertiva. Isso pode ser percebido como falsidade ou sarcasmo.";
                thermometerHeight = Math.max(0, nvPackage.baseValue - 20);
            }
        } else if (verbalIntent.includes('open') || verbalIntent.includes('receptive')) {
            if (nvPackage.impactType === 'strongly-reinforces-positive' || nvPackage.impactType === 'reinforces-neutral-open') {
                congruenceLevel = 'congruent';
                title = "Abertura Genuína e Convidativa";
                analysis = "Seu não verbal demonstra claramente sua receptividade e abertura para colaboração ou feedback. Isso cria um ambiente positivo e construtivo.";
            } else if (nvPackage.impactType.includes('uncertainty') || nvPackage.impactType.includes('anxiety')) {
                congruenceLevel = 'ambiguous';
                title = "Abertura Tímida ou Insegura?";
                analysis = "Você diz estar aberto(a), mas seu não verbal sugere desconforto ou hesitação. As pessoas podem questionar o quão genuína é sua abertura ou se sentir receosas em contribuir.";
            } else if (nvPackage.impactType.includes('disagreement') || nvPackage.impactType.includes('undermines')) {
                congruenceLevel = 'contradictory';
                title = "Falsa Abertura: Barreira Não Verbal";
                analysis = "Suas palavras convidam à interação, mas seu não verbal cria uma barreira (defensivo, desinteressado). Isso é confuso e desencorajador para os outros.";
            }
        } else if (verbalIntent.includes('hesitant') || verbalIntent.includes('uncertain')) {
            if (nvPackage.impactType.includes('uncertainty') || nvPackage.impactType.includes('anxiety')) {
                congruenceLevel = 'congruent';
                title = "Incerteza Expressa com Coerência";
                analysis = "Tanto suas palavras quanto seu não verbal comunicam sua hesitação ou incerteza. Embora não inspire confiança em uma solução, a mensagem é clara sobre seu estado atual.";
                thermometerHeight = Math.max(10, nvPackage.baseValue); // Não é negativo ser congruente na incerteza
            } else if (nvPackage.impactType === 'strongly-reinforces-positive') {
                congruenceLevel = 'ambiguous';
                title = "Confusão: Palavras Hesitantes, Postura Confiante";
                analysis = "Você diz não ter certeza, mas seu não verbal é forte e confiante. Isso é intrigante. Você está minimizando sua confiança, sendo falsamente modesto, ou há algo mais não dito?";
            } else if (nvPackage.impactType === 'reinforces-neutral-open') {
                congruenceLevel = 'ambiguous';
                title = "Hesitação com Nuances";
                analysis = "Sua incerteza verbal é acompanhada por um não verbal calmo/receptivo. Pode indicar que você está ponderando ou aberto a ajuda, mas a falta de convicção é notável.";
            } else if (nvPackage.impactType.includes('disagreement') || nvPackage.impactType.includes('undermines')) {
                congruenceLevel = 'contradictory';
                title = "Negatividade Além da Incerteza";
                analysis = "Além da hesitação verbal, seu não verbal parece defensivo ou hostil. Isso sugere que a incerteza pode estar mascarando descontentamento ou resistência, tornando a comunicação difícil.";
            }
        } else { // Fallback genérico
            congruenceLevel = 'ambiguous';
            title = "Combinação Peculiar";
            analysis = "A interação entre esta frase verbal e este comportamento não verbal cria um resultado particular que merece reflexão sobre a clareza e o impacto desejado.";
        }


        thermometerFill.style.height = `${Math.max(0, Math.min(100, thermometerHeight))}%`;
        thermometerFill.className = `thermometer-fill fill-${congruenceLevel}`;

        resultDisplay.className = `result-display result-${congruenceLevel}`;
        resultTitle.textContent = title;
        resultDescription.textContent = `Frase Escolhida: "${verbalText}"\nComportamento Não Verbal: "${nvPackage.text.substring(0, 80)}..."\n\nAnálise do Impacto: ${analysis}`;
    }

    verbalSelect.addEventListener('change', updateDashboard);
    nonVerbalSelect.addEventListener('change', updateDashboard);
    updateDashboard();
});