// Troca de Páginas
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0,0);
}

// Lógica da Calculadora de Impacto
let currentFactor = 0;
function openCalc(name, factor) {
    currentFactor = factor;
    document.getElementById('calc-title').innerText = name;
    document.getElementById('modal-calc').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal-calc').style.display = 'none';
    document.getElementById('calc-result').innerText = '';
}

function calculate() {
    const area = document.getElementById('input-area').value;
    if(!area) return alert("Por favor, digite a área.");
    const result = area * currentFactor;
    document.getElementById('calc-result').innerText = `Economia estimada: ${result.toFixed(2)} toneladas de CO₂ por ano!`;
}

// Lógica do Simulador de Umidade
let umidade = 30;
let irrigando = false;
let interval;

function updateDisplay() {
    const needle = document.getElementById('needle');
    const valText = document.getElementById('val-umidade');
    const msg = document.getElementById('msg-solo');
    
    // Rotação de -90deg (0%) a 90deg (100%)
    const angle = (umidade * 1.8) - 90;
    needle.style.transform = `rotate(${angle}deg)`;
    valText.innerText = Math.round(umidade);

    if(umidade < 40) {
        msg.innerText = "Solo Crítico! Irrigação necessária.";
        msg.className = "alert";
    } else if (umidade >= 40 && umidade <= 75) {
        msg.innerText = "Umidade Ideal.";
        msg.className = "alert ok";
    } else {
        msg.innerText = "Excesso de Água!";
        msg.className = "alert";
    }
}

function toggleIrrigation() {
    const btn = document.getElementById('btn-irrigar');
    const anim = document.getElementById('sprinkler-animation');
    
    if(!irrigando) {
        irrigando = true;
        btn.innerText = "Desligar Irrigadores";
        btn.style.background = "#c0392b";
        anim.classList.remove('hidden');
        interval = setInterval(() => {
            if(umidade < 100) {
                umidade += 1.5;
                updateDisplay();
            } else {
                toggleIrrigation();
            }
        }, 300);
    } else {
        irrigando = false;
        btn.innerText = "Ligar Irrigadores";
        btn.style.background = "#2e7d32";
        anim.classList.add('hidden');
        clearInterval(interval);
    }
}

// Inicializa o simulador
updateDisplay();
