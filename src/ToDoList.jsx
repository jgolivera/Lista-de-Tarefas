import React, { useState, useEffect } from "react";
import './ToDoList.css';
import Icone from './assets/icone.webp';


function ToDoList() {
    const listaStorage = localStorage.getItem('lista');

    const [lista, setLista] = useState (listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoItem] = useState("");

    useEffect(()=> {
        localStorage.setItem('lista', JSON.stringify(lista));
    },[lista]) 
    

    function adicionaItem(form){
        form.preventDefault();
        if(!novoItem){
            return;
        }
        setLista([...lista, { text: novoItem, isCompleted: false }]);
        setNovoItem("");
        document.getElementById('input-entrada').focus();

    }

    function clicou (index){
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deleta (index){
        const listaAux = [...lista];
        listaAux.splice(index,1);
        setLista(listaAux);
    }

    function limpar(){
        setLista([])
    }
    return (
    <div>
        <h1>LISTA DE TAREFAS</h1>
        
        <form onSubmit={adicionaItem}>
            <input 
                id="input-entrada"
                type="text" 
                value={novoItem}
                onChange={(e) => { setNovoItem(e.target.value) }}
                placeholder="Adicionar uma tarefa"
            />
            <button type="submit" className="add">ADICIONAR</button>
        </form>
             <div style={{textAlign:'center'}} className="listaTarefas">
                <div className="icone">
                
                    { lista.length < 1 ? <img className="icone" src={Icone} /> 
                    :
                    lista.map((item, index) => (
                        <div 
                            key={index}
                            className={item.isCompleted ? "item completo" : "item"}>
                        <span onClick={() => {clicou(index)}}>{item.text}</span>
                        <button onClick={() => {deleta(index)}} className="deletar">DELETAR</button>
                    </div>
                    ))
                    }
                    
                </div>
                {
                        lista.length > 0 &&
                        <button onClick={() => limpar() } className="limpar">LIMPAR TAREFAS</button>

                    }
                
                
                
                   
            </div>
            
            
    </div>
    )
}

export default ToDoList