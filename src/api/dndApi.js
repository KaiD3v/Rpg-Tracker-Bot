import axios from "axios";

axios.
get('https://www.dnd5eapi.co/api')
.then(res => {
    console.log(res.data)
})
.catch(err => {
    console.log('Erro ao consumir a API:', err)
})