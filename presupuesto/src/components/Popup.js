import React from 'react';
import Modal from 'react-bootstrap/Modal';


const Popup = props => {
    return (
        <>
            <Modal show={props.showModal} onHide={props.cerrarPopup} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Opciones seleccionadas para la Web:</Modal.Title>
                </Modal.Header>
                <Modal.Body>Has escogido <strong>{props.cantidadPaginas}</strong> páginas y <strong>{props.cantidadIdiomas}</strong> idiomas</Modal.Body>
            </Modal>
        </>
    );
};

export default Popup;



