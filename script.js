

// Função para carregar e exibir dados da planilha do Google Sheets com linhas expansíveis
function loadGoogleSheetData() {
    const tableBody = document.querySelector('#actions-table tbody');
    tableBody.innerHTML = '<tr><td>Carregando dados...</td></tr>';

    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1oCVxap3DrKcLxS5LA-iyYP0GLAK2kMdm9TUUqdJrOV8',
        range: 'acoes'
    }).then(function(response) {
        const data = response.result.values;
        tableBody.innerHTML = ''; // Limpa a mensagem de carregamento

        data.forEach(function(row, index) {
            const actionName = row[0] || 'Nome da Ação';  // Nome da ação
            const actionDescription = row[1]|| 'Descrição da ação não disponível';  // Descrição
           

            // Cria a linha principal da tabela com o nome da ação
            const tableRow = document.createElement('tr');
            tableRow.classList.add('clickable-row');
            tableRow.addEventListener("click", function () {
                toggleExpand(index);
            });

            const cell = document.createElement('td');
            cell.textContent = actionName;
            tableRow.appendChild(cell);

            // Linha expansível para exibir a descrição ao clicar
            const expandableRow = document.createElement('tr');
            expandableRow.classList.add('expandable-row');
            expandableRow.id = `expandable-row-${index}`;

            const expandableCell = document.createElement('td');
            expandableCell.colSpan = 1;
            expandableCell.textContent = actionDescription;
            expandableRow.appendChild(expandableCell);

            tableBody.appendChild(tableRow);
            tableBody.appendChild(expandableRow);
        });
    }).catch(function(error) {
        console.error("Erro ao carregar os dados:", error);
        tableBody.innerHTML = '<tr><td>Erro ao carregar dados. Tente novamente mais tarde.</td></tr>';
    });
}

// Função para alternar a visibilidade da linha expansível
function toggleExpand(index) {
    const expandableRow = document.getElementById(`expandable-row-${index}`);
    expandableRow.classList.toggle("show");
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
