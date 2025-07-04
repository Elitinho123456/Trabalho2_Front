import {useEffect, useState} from "react"
import './container.css'
interface LicoesState{
id: number,
titulo: string,       //descreve a estrutura de um objeto
disciplina: string,
nivel: string
}

function Container() {
const[id, setId] = useState("")
const [titulo, setTitulo] = useState("")
const [diciplina, setDisciplina] = useState("")
const [nivel, setNivel] = useState("")
const [erroMensagem, setErroMensagem] = useState("")
const [licoes, setLicoes] = useState<LicoesState[]>([])

//atualizando os dados iniciais

useEffect(() => { //usando fect como um array para meu fetch seja executado apenas uma vez
const fetchData = async () => {
try{
const resposta = await fetch ("http://localhost:8000/Licoes")
if(resposta.status == 200){
const result = await resposta.json()
setLicoes(result)    
}
if (resposta.status == 400){
    const result = await resposta.json()
    setErroMensagem(result.mensagem)
}
} catch (erro: any){
   setErroMensagem("erro ao realizar o fetch no backend") 
 }
}
fetchData()
}, [])} //[] =>Lista de dependências
  //Quando a lista de dependências estiver vazia.
  //Significará que será executado quando carregar a página.

  async function trataForm(event: react.formEvent<HTMLAnchorElement>){
    event.preventDefault();
    const Licoesnovo: LicoesState = {
      id:parseFloat()  
    }

  }
