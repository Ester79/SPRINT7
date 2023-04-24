import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';

const arrayOptions = [
  { id: 1, description: 'Una pagina web (500€)', name: 'web', precio: 500 },
  { id: 2, description: 'Una consultoria SEO (300€)', name: 'seo', precio: 300 },
  { id: 3, description: 'Una campanya de Google Adds (200€)', name: 'google', precio: 200 },
]

const initState = {
  precio: 0,
  seleccionado: [],
  total: 0,
}

function App() {

  const [state, setState] = useState({ ...initState })

  const seleccionarOpcion = (event) => {
    const idSeleccionado = parseInt(event.target.id);
    const filtrado = arrayOptions.find(element => element.id === idSeleccionado);
    if (state.seleccionado.includes(filtrado)) {
      const indiceBorrar = state.seleccionado.indexOf(filtrado);
      state.seleccionado.splice(indiceBorrar, 1)
    } else {
      state.seleccionado.push(filtrado)
    }
    setState({ ...state, total: sumatorio() })
  };

  const sumatorio = () => {
    return state.seleccionado.map(elemento => elemento.precio).reduce((accumulated, currentValue) => accumulated + currentValue, 0)

  }


  return (
    <>
      <div className='App'>
        ¿Que quieres hacer?
        {
          arrayOptions.map((option, index) => (
            <div className='elements' key={index}>
              <input type='checkbox' id={option.id} value={option.precio} onClick={seleccionarOpcion} />
              <div>{option.description}</div>
            </div>
          ))
        }
        <p>Preu:  {state.total}</p>
      </div>

    </>
  )

};

export default App;
