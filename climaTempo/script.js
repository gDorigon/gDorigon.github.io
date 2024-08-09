// Definindo a chave de API para acessar o serviço OpenWeatherMap
const apiKey = 'd9b86d73fea820529335083254eb6fa4'; // Substitua pela sua chave de API

// Definindo a cidade para a qual queremos obter as informações do clima
const city = 'Londrina';

// Definindo o código do país para refinar a busca
const countryCode = 'BR';

// Função assíncrona para obter os dados do clima da API
async function getWeather() {
    // Construindo a URL da API com os parâmetros necessários
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const url = `${baseUrl}?q=${city},${countryCode}&appid=${apiKey}&units=metric&lang=pt`;

    try {
        // Fazendo uma requisição à API usando fetch
        const response = await fetch(url);

        // Verificando se a resposta não foi bem-sucedida
        if (!response.ok) {
            // Lançando um erro com a mensagem da resposta
            throw new Error(`Erro: ${response.statusText}`);
        }

        // Convertendo a resposta em JSON
        const data = await response.json();

        // Atualizando as informações do clima na página
        updateWeatherInfo(data);
    } catch (error) {
        // Exibindo um erro no console em caso de falha na requisição
        console.error('Erro ao obter dados do clima:', error);

        // Atualizando a interface do usuário para mostrar que houve um erro
        document.getElementById('description').textContent = 'Erro ao carregar dados do clima.';
    }
}

// Função para atualizar as informações do clima na página
function updateWeatherInfo(data) {
    // Verificando se os dados do clima foram retornados corretamente
    if (data && data.weather && data.main) {
        // Obtendo a descrição do clima
        const weatherDescription = data.weather[0].description;

        // Obtendo a temperatura atual
        const temperature = data.main.temp;

        // Obtendo a umidade atual
        const humidity = data.main.humidity;

        // Obtendo a velocidade do vento
        const windSpeed = data.wind.speed;

        // Atualizando o texto dos elementos na página com as informações do clima
        document.getElementById('description').textContent = `Clima: ${weatherDescription}`;
        document.getElementById('temperature').textContent = `Temperatura: ${temperature}°C`;
        document.getElementById('humidity').textContent = `Umidade: ${humidity}%`;
        document.getElementById('wind-speed').textContent = `Velocidade do vento: ${windSpeed} m/s`;
    } else {
        // Atualizando a interface do usuário para mostrar que os dados do clima não estão disponíveis
        document.getElementById('description').textContent = 'Dados do clima não disponíveis.';
    }
}

// Função que adiciona o evento de clique ao botão "Atualizar"
function addRefreshButtonListener() {
    // Obtendo o botão de atualização pelo ID
    const refreshButton = document.getElementById('refresh');

    // Adicionando um ouvinte de evento para o clique no botão
    refreshButton.addEventListener('click', getWeather);
}

// Atualiza o clima ao carregar a página e adiciona o evento de clique ao botão
window.onload = () => {
    // Chamando a função para obter o clima ao carregar a página
    getWeather();

    // Adicionando o ouvinte de evento de clique ao botão de atualização
    addRefreshButtonListener();
};
