import React, { useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { showModal, showModal$ } from '../../../store'

export const CustomModal = ({ onHide, onSubmit, title, message, confirmButtonText }) => {
    const dispatch = useDispatch();
    const show = useSelector(showModal$);

    useEffect(() => {
        dispatch(showModal());
    }, [])

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title className="custom-modal-heading">{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="custom-modal-content">
                {message}
                <div className="custom-modal-button-group">
                    <Button variant="success" onClick={onSubmit}>
                        {confirmButtonText}
                    </Button>
                    <Button variant="outline-success" onClick={onHide}>
                        Close
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}
