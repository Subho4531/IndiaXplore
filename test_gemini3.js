const apiKey = 'AIzaSyAwvznSRpcvqvvM1ayOtVyG4BDwfWEEUm0';
const url = 'https://generativelanguage.googleapis.com/v1beta/models?key=' + apiKey;

fetch(url)
    .then(res => res.json())
    .then(data => {
        if (data.models) {
            const generateModels = data.models.filter(m => m.supportedGenerationMethods.includes('generateContent')).map(m => m.name);
            console.log("Supported Models:");
            console.log(generateModels.join('\n'));
        } else {
            console.log("Error:", data);
        }
    })
    .catch(err => console.error(err));
