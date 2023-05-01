
import React, { useEffect, useState } from 'react';
import './App.css';
import Panell from './components/Panell';
import 'bootstrap/dist/css/bootstrap.min.css';

const arrayOptions = [
    { id: 1, description: 'Una pagina web (500€)', name: 'web', precio: 500 },
    { id: 2, description: 'Una consultoria SEO (300€)', name: 'seo', precio: 300 },
    { id: 3, description: 'Una campanya de Google Adds (200€)', name: 'google', precio: 200 },
]

const initState = {
    precio: 0,
    seleccionado: [],
    total: 0,
    numeroDePaginas: 0,
    numeroDeIdiomas: 0,
    precioFinalPaginas: 0,
    precioFinalIdiomas: 0,
}

function App() {

    const [state, setState] = useState({ ...initState });
    const [mostrarOpcionsWeb, setMostrarOpcionsWeb] = useState(false);
    const tarifaSuplementoWeb = 30;

    useEffect(() => {
        localStorage.setItem('Paginas: ', JSON.stringify(state.numeroDePaginas));
        localStorage.setItem('Coste total Paginas: ', JSON.stringify(state.numeroDePaginas * tarifaSuplementoWeb));
        localStorage.setItem('Idiomas: ', JSON.stringify(state.numeroDeIdiomas));
        localStorage.setItem('Coste total Idiomas: ', JSON.stringify(state.numeroDeIdiomas * tarifaSuplementoWeb));
        localStorage.setItem('Seleccion', JSON.stringify(state))
        localStorage.setItem('Coste total final: ', JSON.stringify(state.total + state.precioFinalIdiomas + state.precioFinalPaginas))


    }, [state.numeroDePaginas, state.numeroDeIdiomas, state.seleccionado, state])

    const botonSumar = event => {
        if (event.target.id === 'sumarPagina') {
            setState({ ...state, numeroDePaginas: state.numeroDePaginas + 1, precioFinalPaginas: state.precioFinalPaginas + tarifaSuplementoWeb })
        } else if (event.target.id === 'sumarIdioma') {
            setState({ ...state, numeroDeIdiomas: state.numeroDeIdiomas + 1, precioFinalIdiomas: state.precioFinalIdiomas + tarifaSuplementoWeb })
        }
    }

    const botonRestar = event => {
        if (event.target.id === 'restarPagina' && state.numeroDePaginas > 0) {
            setState({ ...state, numeroDePaginas: state.numeroDePaginas - 1, precioFinalPaginas: state.precioFinalPaginas - tarifaSuplementoWeb })
        } else if (event.target.id === 'restarIdioma' && state.numeroDeIdiomas > 0) {
            setState({ ...state, numeroDeIdiomas: state.numeroDeIdiomas - 1, precioFinalIdiomas: state.precioFinalIdiomas - tarifaSuplementoWeb })
        }
    }

    const seleccionarOpcion = event => {
        const idSeleccionado = parseInt(event.target.id);
        const filtrado = arrayOptions.find(element => element.id === idSeleccionado);
        if (state.seleccionado.includes(filtrado)) {
            const indiceBorrar = state.seleccionado.indexOf(filtrado);
            state.seleccionado.splice(indiceBorrar, 1);
        } else {
            state.seleccionado.push(filtrado);
        }
        setState({ ...state, total: sumatorio() })
        mostrarPanell(idSeleccionado, event);
    };

    const mostrarPanell = (idRow, event) => {
        if (idRow === 1 && event.target.checked === true) {
            setMostrarOpcionsWeb(!mostrarOpcionsWeb);
        } else if (idRow === 1 && event.target.checked === false) {
            setState({ ...state, numeroDeIdiomas: 0, numeroDePaginas: 0, precioFinalIdiomas: 0, precioFinalPaginas: 0, total: sumatorio() })
            setMostrarOpcionsWeb(!mostrarOpcionsWeb);
        }
    }

    const calcularSuplementoWeb = (cantidad) => {
        let tipo = cantidad.target.name;
        let cantidadSeleccionada = parseInt(cantidad.target.value);
        if (tipo === 'nPaginas') {
            setState({ ...state, precioFinalPaginas: tarifaSuplementoWeb * cantidadSeleccionada, numeroDePaginas: cantidadSeleccionada })
            if (isNaN(cantidadSeleccionada)) {
                setState({ ...state, precioFinalPaginas: 0 })
            }
        } else if (tipo === 'nIdiomas') {
            setState({ ...state, precioFinalIdiomas: tarifaSuplementoWeb * cantidadSeleccionada, numeroDeIdiomas: cantidadSeleccionada })
            if (isNaN(cantidadSeleccionada)) {
                setState({ ...state, precioFinalIdiomas: 0 })
            }
        }
    }


    const sumatorio = () => {
        return state.seleccionado.map(elemento => elemento.precio).reduce((accumulated, currentValue) => accumulated + currentValue, 0);
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
                {mostrarOpcionsWeb && <Panell sumar={botonSumar} restar={botonRestar} contarCantidad={calcularSuplementoWeb} numeroPaginas={state.numeroDePaginas} numeroIdiomas={state.numeroDeIdiomas} />}
                <p>Preu:  {state.total + state.precioFinalPaginas + state.precioFinalIdiomas}  </p>
            </div>
        </>
    )

};

export default App;
