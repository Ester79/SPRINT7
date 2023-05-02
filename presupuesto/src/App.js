
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
    numeroDePaginas: 0,
    numeroDeIdiomas: 0,
    albaranes: [],
};

function App() {

    const [state, setState] = useState({ ...initState });
    const [mostrarOpcionsWeb, setMostrarOpcionsWeb] = useState(false);
    const [seleccionado, setSeleccionado] = useState([]);
    const tarifaSuplementoWeb = 30;
    const [nombreCliente, setNombreCliente] = useState(undefined);
    const [nombrePresupuesto, setNombrePresupuesto] = useState(undefined);
    const [orderBy, setOrderBy] = useState(undefined);
    const deshabilitarConfirmar = !nombreCliente || nombreCliente === "" || !nombrePresupuesto || nombrePresupuesto === "";


    useEffect(() => {
        localStorage.setItem('Paginas: ', JSON.stringify(state.numeroDePaginas));
        localStorage.setItem('Coste total Paginas: ', JSON.stringify(state.numeroDePaginas * tarifaSuplementoWeb));
        localStorage.setItem('Idiomas: ', JSON.stringify(state.numeroDeIdiomas));
        localStorage.setItem('Coste total Idiomas: ', JSON.stringify(state.numeroDeIdiomas * tarifaSuplementoWeb));
        localStorage.setItem('Seleccion', JSON.stringify(seleccionado));
        localStorage.setItem('Presupuestos/Cliente', JSON.stringify(state.albaranes));
    }, [state.numeroDePaginas, state.numeroDeIdiomas, seleccionado, state])

    const botonSumar = event => {
        if (event.target.id === 'sumarPagina') {
            setState({ ...state, numeroDePaginas: state.numeroDePaginas + 1 })
        } else if (event.target.id === 'sumarIdioma') {
            setState({ ...state, numeroDeIdiomas: state.numeroDeIdiomas + 1 })
        }
    }

    const botonRestar = event => {
        if (event.target.id === 'restarPagina' && state.numeroDePaginas > 0) {
            setState({ ...state, numeroDePaginas: state.numeroDePaginas - 1 })
        } else if (event.target.id === 'restarIdioma' && state.numeroDeIdiomas > 0) {
            setState({ ...state, numeroDeIdiomas: state.numeroDeIdiomas - 1 })
        }
    }

    const seleccionarOpcion = event => {
        console.log('marcado?: ', event);
        const idSeleccionado = parseInt(event.target.id);
        const filtrado = arrayOptions.find(element => element.id === idSeleccionado);
        if (seleccionado.includes(filtrado)) {
            const indiceBorrar = seleccionado.indexOf(filtrado);
            setSeleccionado(seleccionado.filter((e, index) => index !== indiceBorrar));
        } else {
            setSeleccionado([...seleccionado, filtrado]);
        }

        mostrarPanell(idSeleccionado, event);
    };

    const mostrarPanell = (idRow, event) => {
        if (idRow === 1 && event.target.checked === true) {
            setMostrarOpcionsWeb(!mostrarOpcionsWeb);
        } else if (idRow === 1 && event.target.checked === false) {
            setState({ ...state, numeroDeIdiomas: 0, numeroDePaginas: 0 })
            setMostrarOpcionsWeb(!mostrarOpcionsWeb);
        }
    }

    const calcularSuplementoWeb = (cantidad) => {
        let tipo = cantidad.target.name;
        let cantidadSeleccionada = parseInt(cantidad.target.value);
        if (tipo === 'nPaginas') {
            setState({ ...state, numeroDePaginas: cantidadSeleccionada })
            if (isNaN(cantidadSeleccionada)) {
                setState({ ...state, numeroDePaginas: 0 })
            }
        } else if (tipo === 'nIdiomas') {
            setState({ ...state, numeroDeIdiomas: cantidadSeleccionada })
            if (isNaN(cantidadSeleccionada)) {
                setState({ ...state, numeroDeIdiomas: 0 })
            }
        }
    }


    const sumatorio = () => {
        return seleccionado.map(elemento => elemento.precio).reduce((accumulated, currentValue) => accumulated + currentValue, 0);
    }

    const precioTotalPaginas = state.numeroDePaginas * tarifaSuplementoWeb;
    const precioTotalIdiomas = state.numeroDeIdiomas * tarifaSuplementoWeb;
    const total = sumatorio() + precioTotalPaginas + precioTotalIdiomas;


    const guardarPresupuesto = () => {
        const fecha = new Date();
        const nuevoAlbaran = {
            proyecto: nombrePresupuesto,
            cliente: nombreCliente,
            servicios: seleccionado,
            opcionesWeb: { numPaginas: state.numeroDePaginas, numIdiomas: state.numeroDeIdiomas },
            costeDesglosado: { servicios: state.total, opcionesWeb: precioTotalPaginas + precioTotalIdiomas },
            costeTotal: total,
            fechaPedido: fecha.toDateString(),
            fecha: fecha,
        };
        setState({ ...state, albaranes: [...state.albaranes, nuevoAlbaran], numeroDeIdiomas: 0, numeroDePaginas: 0 });
        setNombreCliente("");
        setNombrePresupuesto("");
        setSeleccionado([]);
        setMostrarOpcionsWeb(false);
    };

    const checkboxes = arrayOptions.map(e => {
        const filtrado = arrayOptions.find(element => element.id === e.id);
        return seleccionado.includes(filtrado);
    });


    const ordenar = () => {
        if (orderBy === 'proyectos') {
            return state.albaranes.sort(function (a, b) {

                if (a.proyecto > b.proyecto) {
                    return 1;
                }
                if (a.proyecto < b.proyecto) {
                    return -1
                }
                return 0

            })
        } else if (orderBy === 'fecha') {
            return state.albaranes.sort(function (a, b) {

                if (a.fecha > b.fecha) {
                    return 1;
                }
                if (a.fecha < b.fecha) {
                    return -1
                }
                return 0

            })
        }
        return state.albaranes;
    }

    const arrayOrdenada = ordenar();

    const [buscar, setBuscar] = useState("");

    return (
        <>
            <div className='App'>
                <div className='columnaIzquierda'>
                    <div className='cabeceraPresupuesto'>
                        <div>
                            <input className='mb-3 form-control' type="text" placeholder='Nombre presupuesto' name='nombrePresupuesto' onChange={presupuesto => setNombrePresupuesto(presupuesto.target.value)} value={nombrePresupuesto} />
                        </div>
                        <div>
                            <input className='form-control' type="text" placeholder='Nombre cliente' name='nombreCliente' onChange={cliente => setNombreCliente(cliente.target.value)} value={nombreCliente} />
                        </div>
                    </div>
                    <strong>¿Que quieres hacer?</strong>
                    <div >
                        {
                            arrayOptions.map((option, index) => (
                                <div className='elements mb-3 ' key={index}>
                                    <input type='checkbox' id={option.id} value={option.precio} onChange={seleccionarOpcion} checked={checkboxes[index]} />
                                    <div>{option.description}</div>
                                </div>
                            ))
                        }
                    </div>
                    {mostrarOpcionsWeb && <Panell sumar={botonSumar} restar={botonRestar} contarCantidad={calcularSuplementoWeb} numeroPaginas={state.numeroDePaginas} numeroIdiomas={state.numeroDeIdiomas} />}
                    <p className='mt-3'>Preu: {total}€</p>
                    <button className='btn btn-secondary' onClick={guardarPresupuesto} disabled={deshabilitarConfirmar}>Confirmar Presupuesto</button>
                </div>
                <div className='columnaDerecha'>

                    <div className="grupoOpcionesBotones">
                        <button className="btn btn-primary grupoOrdenar" onClick={() => setOrderBy("proyectos")}>Ordena por Proyecto</button>
                        <button className="btn btn-primary grupoOrdenar" onClick={() => setOrderBy("fecha")} >Ordena por Fecha</button>
                        <button className="btn btn-warning grupoOrdenar" onClick={() => setOrderBy("")} >Reinicializar Orden</button>
                    </div>


                    <h2>Proyectos confirmados:</h2>
                    <div>
                        <input placeholder="Buscar proyecto" className='form-control mt-3 mb-3' onChange={event => setBuscar(event.target.value)} />
                    </div>
                    <div >

                        {
                            arrayOrdenada.filter(proyectoNombre => {
                                if (buscar === "") {
                                    return proyectoNombre;
                                } else if (proyectoNombre.proyecto.toLowerCase().includes(buscar.toLowerCase())) {
                                    return proyectoNombre;
                                }
                            }).map((albaran, index) =>
                                <div key={index} className='listado '>
                                    <div className='row grupoListado'>
                                        <div className='col-md-4 d-flex'>
                                            Proyecto [ <strong><p>{albaran.proyecto}</p></strong>]
                                        </div>
                                        <div className='col-md-4 d-flex'>
                                            Cliente [ <strong><p>{albaran.cliente}</p></strong>]
                                        </div>
                                        <div className='col-md-4 d-flex'>
                                            Fecha [ <strong><p>{albaran.fechaPedido}</p></strong>]
                                        </div>
                                    </div>
                                    <div className='row mt-4'>
                                        <div className='col-md-6'>
                                            <p className='grupoListado'><strong>Servicios</strong></p>
                                            <div>{albaran.servicios[0]?.description}</div>
                                            <div>{albaran.servicios[1]?.description}</div>
                                            <div>{albaran.servicios[2]?.description}</div>
                                        </div>
                                        <div className='col-md-6'>
                                            <p className='grupoListado'><strong>Opciones Web</strong></p>
                                            <div>Número páginas: {albaran.opcionesWeb.numPaginas}</div>
                                            <div>Número idiomas: {albaran.opcionesWeb.numIdiomas}</div>
                                        </div>
                                    </div>
                                    <div className='row mt-4 costesFinales'>
                                        <div className='col-md-4'>
                                            <p>coste servicios: <strong>{albaran.costeTotal - albaran.costeDesglosado.opcionesWeb}€</strong> </p>
                                        </div>
                                        <div className='col-md-4'>
                                            <p>coste opcionales: <strong>{albaran.costeDesglosado.opcionesWeb}€</strong> </p>
                                        </div>
                                        <div className='col-md-4 ctotal'>
                                            <p>coste total: <strong>{albaran.costeTotal}€</strong> </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>

                </div>
            </div>
        </>
    )

};

export default App;
