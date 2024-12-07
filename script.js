// Função para carregar e exibir dados da planilha do Google Sheets com linhas expansíveis
function loadGoogleSheetData() {
    const gridItems = document.querySelectorAll('.grid-item .overlay'); // Seleciona todos os overlays
    const gridItemCount = gridItems.length;

    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1oCVxap3DrKcLxS5LA-iyYP0GLAK2kMdm9TUUqdJrOV8',
        range: 'acoes'
    }).then(function(response) {
        const data = response.result.values;

        // Verifica se há dados suficientes para preencher todos os overlays
        for (let i = 0; i < gridItemCount; i++) {
            const actionName = data[i] ? data[i][0] : 'Nome da Ação'; // Nome da ação
            const actionDescription = data[i] ? data[i][1] : 'Descrição da ação não disponível'; // Descrição

            // Substitui cada "." por um "." seguido de uma quebra de linha
            const formattedDescription = actionDescription.replace(/\./g, '.<br><wbr>');

            const overlay = gridItems[i];
            overlay.innerHTML = `<span>${actionName} ${formattedDescription}</span>`;
        }
    }).catch(function(error) {
        console.error("Erro ao carregar os dados:", error);
        const gridItems = document.querySelectorAll('.grid-item .overlay');
        gridItems.forEach(overlay => {
            overlay.innerHTML = `<span>Erro ao carregar dados. Tente novamente mais tarde.</span>`;
        });
    });
}

// Função para inicializar a API do Google Sheets
function initGoogleSheetsApi() {
    gapi.client.init({
        apiKey: 'AIzaSyCx8aiF0nXPMI3GLDljYxAxVYhPWkw63sM',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        loadGoogleSheetData();
    }).catch(function(error) {
        console.error("Erro ao inicializar a API do Google Sheets:", error);
    });
}

let indice = 0;

function mudarImagem(direcao) {
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  
  // Atualiza o índice com base na direção do clique
  indice += direcao;
  
  // Verifica se o índice ultrapassou o limite
  if (indice < 0) {
    indice = totalSlides - 1;
  } else if (indice >= totalSlides) {
    indice = 0;
  }
  
  // Atualiza a posição das imagens
  const imagensContainer = document.querySelector('.imagens');
  imagensContainer.style.transform = `translateX(-${indice * 100}%)`;
}

// Carrega a API do Google Sheets e inicia a aplicação
gapi.load('client', initGoogleSheetsApi);
