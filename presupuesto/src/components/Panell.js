import '../App.css';
import PropTypes from 'prop-types';


const Panell = ({ contarCantidad }) => {

    return (
        <div >
            <form className="cajaForm">
                <div className="mb-3 d-flex">
                    <p className="col-md-5">Número de páginas</p>
                    <input
                        placeholder="Número de paginas"
                        className="form-control"
                        type="number"
                        min={0}
                        name="nPaginas"
                        onChange={contarCantidad}
                    >
                    </input>
                </div>
                <div className="d-flex">
                    <p className="col-md-5">Número de idiomas</p>
                    <input
                        placeholder="Número de idiomas"
                        className="form-control"
                        type="number"
                        min={0}
                        name="nIdiomas"
                        onChange={contarCantidad}>
                    </input>
                </div>

            </form>
        </div>
    )
};

Panell.propTypes = {
    contarCantidad: PropTypes.func,
    paginas: PropTypes.number,
    idiomas: PropTypes.number,
}

export default Panell;