import axios from "axios";

// Chamada para a API principal
axios.get("https://www.dnd5eapi.co/api")
  .then((res) => {
    console.log("Dados da API principal:", res.data);
  })
  .catch((err) => {
    console.log("Erro ao consumir a API principal:", err);
  });

// API de habilidades
// abilites
export let abilities = [];
export let char = {}

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

  // carisma
  axios.get("https://www.dnd5eapi.co/api/ability-scores/cha")
  .then((res) => {
    char = {
      name: res.data.full_name, desc: res.data.desc
    } 
    console.log("carisma:", char);
  })
  .catch((err) => {
    console.log("Erro ao consumir a API principal:", err);
  });

// Exportar a constante abilities