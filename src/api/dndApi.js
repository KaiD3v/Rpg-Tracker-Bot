import axios from "axios";

export let abilities = [];

// Chamada para a API principal
axios.get("https://www.dnd5eapi.co/api")
  .then((res) => {
    console.log("Dados da API principal:", res.data);
  })
  .catch((err) => {
    console.log("Erro ao consumir a API principal:", err);
  });

// Chamada para a API de habilidades
axios.get("https://www.dnd5eapi.co/api/ability-scores")
  .then((res) => {
    abilities = res.data.results.map((ability) => ({ 
      index: ability.index, 
      name: ability.name, 
      url: ability.url 
    }));
    console.log("Habilidades:", abilities);
  })
  .catch((err) => {
    console.log("Erro ao consumir a API de habilidades:", err);
  });

// Exportar a constante abilities