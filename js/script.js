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

        // Mostrar tips personalizados
mostrarTips(tipoEnergia, consumo);
    });

    function mostrarTips(energia, consumo) {
  const tipsContainer = document.getElementById("tips");
  const listaTips = document.getElementById("lista-tips");
  listaTips.innerHTML = "";

  let tips = [];

  if (energia === "solar") {
    if (consumo < 200) {
      tips = [
        "Aprovecha al máximo la luz natural durante el día.",
        "Limpia regularmente tus paneles solares para mantener la eficiencia."
      ];
    } else if (consumo < 500) {
      tips = [
        "Instala electrodomésticos eficientes (etiqueta A+++).",
        "Usa temporizadores para calentar agua solo cuando sea necesario."
      ];
    } else {
      tips = [
        "Considera expandir tu sistema solar con baterías de respaldo.",
        "Reduce el uso de aire acondicionado durante el día con cortinas térmicas."
      ];
    }
  }

  if (energia === "eolica") {
    if (consumo < 200) {
      tips = [
        "Apaga dispositivos que no estés usando.",
        "Evita el uso excesivo de calefactores eléctricos."
      ];
    } else if (consumo < 500) {
      tips = [
        "Verifica la ubicación del aerogenerador para optimizar el viento.",
        "Reduce el uso de electrodomésticos de alto consumo en horas pico."
      ];
    } else {
      tips = [
        "Realiza mantenimiento frecuente al generador eólico.",
        "Cambia a iluminación LED en toda la casa."
      ];
    }
  }

  if (energia === "hidrogeno") {
    if (consumo < 200) {
      tips = [
        "Utiliza calentadores de agua de alta eficiencia.",
        "Desconecta los cargadores cuando no los uses."
      ];
    } else if (consumo < 500) {
      tips = [
        "Aprovecha sistemas híbridos que combinen hidrógeno y electricidad.",
        "Mantén cerradas las puertas para conservar el calor/frío."
      ];
    } else {
      tips = [
        "Automatiza el encendido y apagado de sistemas eléctricos con sensores.",
        "Evalúa los hábitos de consumo en horas pico para reducir la demanda."
      ];
    }
  }

  tips.forEach(tip => {
    const li = document.createElement("li");
    li.textContent = tip;
    listaTips.appendChild(li);
  });

  tipsContainer.classList.remove("hidden");
}

});

// Javascript para la pestaña de energias

// Función para abrir/cerrar acordeones
document.addEventListener('DOMContentLoaded', () => {
  const botones = document.querySelectorAll('.accordion-btn');

  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      const contenido = boton.nextElementSibling;

      // Cierra los demás
      document.querySelectorAll('.accordion-content').forEach(panel => {
        if (panel !== contenido) {
          panel.classList.remove('show');
          panel.previousElementSibling.textContent = 'Más información';
        }
      });

      // Alterna el actual
      if (contenido.classList.contains('show')) {
        contenido.classList.remove('show');
        boton.textContent = 'Más información';
      } else {
        contenido.classList.add('show');
        boton.textContent = 'Cerrar información';
      }
    });
  });
});



// JAVASCRIPT DE LA PESTAÑA DE INICIO

document.addEventListener('DOMContentLoaded', () => {
    const slidesFull = document.querySelectorAll('.slide-full');
    const prevBtnFull = document.querySelector('.prev-btn');
    const nextBtnFull = document.querySelector('.next-btn');
    const slideContainerFull = document.querySelector('.carousel-slide-full');
    let currentIndexFull = 0;

    function updateSlidePositionFull() {
      slideContainerFull.style.transform = `translateX(-${currentIndexFull * 100}vw)`;
    }

    prevBtnFull.addEventListener('click', () => {
      currentIndexFull = (currentIndexFull === 0) ? slidesFull.length - 1 : currentIndexFull - 1;
      updateSlidePositionFull();
    });

    nextBtnFull.addEventListener('click', () => {
      currentIndexFull = (currentIndexFull === slidesFull.length - 1) ? 0 : currentIndexFull + 1;
      updateSlidePositionFull();
    });
  });
// Función para redirigir al Dashboard (puedes ajustar la URL)
  function irDashboard() {
    // Cambia la URL por la de tu dashboard real
    window.location.href = "dashboard.html"; // o "#dashboard" si es una sección
  }


  // JS para la pestaña de dashboard

 document.addEventListener("DOMContentLoaded", () => {
  // Barras por fuente
  fetch('data/barras_fuente.json')
    .then(r => r.json())
    .then(data => {
      const ctx = document.getElementById('chartFuente').getContext('2d');
      new Chart(ctx, { type:'bar',
        data:{
          labels: data.map(d=>d.Fuente),
          datasets:[{ label:'Producción (GWh)', data:data.map(d=>d.Producción),
                      backgroundColor:'rgba(54,162,235,0.6)',
                      borderColor:'rgba(54,162,235,1)', borderWidth:1 }]
        },
        options:{ responsive:true }
      });
    });

  // Torta de participación
  fetch('data/torta_participacion.json')
    .then(r => r.json())
    .then(data => {
      const ctx = document.getElementById('chartParticipacion').getContext('2d');
      new Chart(ctx, { type:'pie',
        data:{
          labels: data.map(d=>d.Fuente),
          datasets:[{ data:data.map(d=>d.Participacion),
                      backgroundColor:['#4B8B3B','#7CB342','#FFC107','#42A5F5'] }]
        },
        options:{ responsive:true }
      });
    });

  // Línea de capacidad instalada
  fetch('data/lineas_capacidad.json')
    .then(r => r.json())
    .then(data => {
      const ctx = document.getElementById('chartCapacidad').getContext('2d');
      const labels = data.map(d=>d.Año);
      new Chart(ctx, { type:'line',
        data:{
          labels,
          datasets:[
            {label:'Eólica', data:data.map(d=>d.Eólica), borderColor:'#4B8B3B', fill:false},
            {label:'Solar', data:data.map(d=>d.Solar), borderColor:'#FFC107', fill:false},
            {label:'Geotérmica', data:data.map(d=>d.Geotérmica), borderColor:'#42A5F5', fill:false}
          ]
        },
        options:{ responsive:true }
      });
    });

  // Área de consumo comparativo
  fetch('data/area_comparativa.json')
    .then(r => r.json())
    .then(data => {
      const ctx = document.getElementById('chartArea').getContext('2d');
      const labels = data.map(d=>d.Año);
      new Chart(ctx, { type:'line',
        data:{
          labels,
          datasets:[
            {label:'Renovable', data:data.map(d=>d.Renovable),
             backgroundColor:'rgba(54,162,235,0.4)', fill:true},
            {label:'Convencional', data:data.map(d=>d.Convencional),
             backgroundColor:'rgba(201,203,207,0.4)', fill:true}
          ]
        },
        options:{ responsive:true }
      });
    });

  // Tabla con datos históricos
  fetch('data/lineas_capacidad.json')
    .then(r=>r.json())
    .then(data=>{
      const tbl = document.getElementById('tablaDatos');
      let html = '<tr><th>Año</th><th>Eólica</th><th>Solar</th><th>Geotérmica</th></tr>';
      data.forEach(d=>{
        html += `<tr><td>${d.Año}</td><td>${d.Eólica}</td><td>${d.Solar}</td><td>${d.Geotérmica}</td></tr>`;
      });
      tbl.innerHTML = html;
    });
});












