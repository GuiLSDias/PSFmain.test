function formatDescription(description) {
    if (typeof description !== 'string') {
        return 'Descrição inválida';
    }
    return description.replace(/\./g, '.<br><wbr>');
}

function loadGoogleSheetData() {
    const gridItems = document.querySelectorAll('.grid-item');
    const gridItemCount = gridItems.length;

    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1oCVxap3DrKcLxS5LA-iyYP0GLAK2kMdm9TUUqdJrOV8',
        range: 'acoes'
    }).then(function(response) {
        const data = response.result.values;

        for (let i = 0; i < gridItemCount; i++) {
            const gridItem = gridItems[i];
            const contentDiv = gridItem.querySelector('.content');

            if (!data || !data[i] || !data[i][0] || !data[i][1]) {
                contentDiv.innerHTML = "<p>Ação não encontrada.</p>";
                continue;
            }

            const actionName = data[i][0];
            const actionDescription = data[i][1];
            const formattedDescription = formatDescription(actionDescription);

            contentDiv.innerHTML = `<h3>${actionName}</h3><p>${formattedDescription}</p>`;
        }
    }).catch(function(error) {
        console.error("Erro ao carregar os dados:", error);
        gridItems.forEach(gridItem => {
            const contentDiv = gridItem.querySelector('.content');
            contentDiv.innerHTML = "<p>Erro ao carregar dados. Tente novamente mais tarde.</p>";
        });
    });
}

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

gapi.load('client', initGoogleSheetsApi);