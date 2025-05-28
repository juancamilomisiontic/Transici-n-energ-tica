document.addEventListener("DOMContentLoaded",function(){

    // esta línea obtiene una referencia al botón de cálculo mediante el ID ("calcular-btn"), para agregar un evento al botón y ejecutar la función del cálculo de ahorro 
    const calcularBtn = document.getElementById("calcular-btn");
    const consumoInput = document.getElementById("consumo");
    const tipoEnergiaSelect = document.getElementById("tipo-energia");
    const resultadosSection = document.getElementById("resultados");
    const ahorroKwhSpan = document.getElementById("ahorro-Kwh");
    const ahorroCo2Span = document.getElementById("ahorro-co2");
    const ahorroUsdSpan = document.getElementById("ahorro-usd");

    calcularBtn.addEventListener("click", function(){
        const consumo = parseFloat(consumoInput.value);
        const tipoEnergia = tipoEnergiaSelect.value;

        // Si es una "o" es ||, pero se es una "y" es && para los condicionales 
        if(isNaN(consumo) || consumo <= 0){
            alert("Por favor, ingrese un consumo válido mayor a cero")
            return;
        }

        // Factores de ahorro dependiendo del tipo de energía seleccionada 
        let factorAhorro;
        switch(tipoEnergia){
            case "solar":
                factorAhorro = 0.2;
                break;
            case "eolica":
                factorAhorro = 0.25;
                break;
            case "hidrogeno":
                factorAhorro = 0.3;
                break;
            default:
                factorAhorro=0;
        }

        // Cálculos de ahorro 
        const ahorroEnergetico = consumo * factorAhorro;
        const reduccionCo2 = ahorroEnergetico *0.5;
        const ahorroEconomico = ahorroEnergetico * 0.15;

        // Mostar los resultado 
        ahorroKwhSpan.textContent = 
        ahorroEnergetico.toFixed(2);
        ahorroCo2Span.textContent = 
        reduccionCo2.toFixed(2);
        ahorroUsdSpan.textContent = 
        ahorroEconomico.toFixed(2);

        resultadosSection.classList.remove("hidden");
    });
});