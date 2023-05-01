import '../App.css';
import PropTypes from 'prop-types';
import Popup from './Popup';
import { useState } from 'react';

const Panell = ({ contarCantidad, sumar, restar, numeroPaginas, numeroIdiomas, abrirModal }) => {

    const [mostrarModal, setMostrarModal] = useState(false);

    return (
        <div >
            <form className='cajaForm'>
                <div className="grupo mb-3">
                    <div className="col-md-5">Numero de páginas</div>
                    <span className="btn btn-warning" id="sumarPagina" onClick={sumar}>+</span>
                    <input type="number" name="nPaginas" min={0} id='inputPaginas'
                        className='col-md-3 border-0' onChange={contarCantidad} value={numeroPaginas} />
                    <span className="btn btn-warning" id="restarPagina" onClick={restar}>-</span>
                    <span><div className='info' onClick={() => setMostrarModal(visible => !visible)}>i</div></span>
                </div>
                <div className="grupo mb-3">
                    <div className="col-md-5">Numero de idiomas</div>
                    <span className="btn btn-warning" id="sumarIdioma" onClick={sumar}>+</span>
                    <input type="number" name="nIdiomas" min={0} id='inputIdiomas'
                        className='col-md-3 border-0' onChange={contarCantidad} value={numeroIdiomas} />
                    <span className="btn btn-warning" id="restarIdioma" onClick={restar}>-</span>
                    <span><div className='info' onClick={() => setMostrarModal(visible => !visible)}>i</div></span>
                </div>
            </form>
            {mostrarModal && <Popup cantidadPaginas={numeroPaginas} cantidadIdiomas={numeroIdiomas} showModal={mostrarModal} cerrarPopup={() => setMostrarModal(false)} />}
        </div>
    )
};

Panell.propTypes = {
    contarCantidad: PropTypes.func,
    sumar: PropTypes.func,
    restar: PropTypes.func,
    numeroPaginas: PropTypes.number,
    numeroIdiomas: PropTypes.number,
    abrirModal: PropTypes.func,

}

export default Panell;