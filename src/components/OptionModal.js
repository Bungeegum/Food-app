import React from 'react';
import Modal from 'react-modal';

const OptionModal=(props)=>(
    <Modal
    isOpen={!!props.selectedOption}//converts valid string  to true
    onRequestClose={props.handleClearModal}
    contentLabel="Selected Option"
    closeTimeoutMS={200}
    className="modal"
    >
        <h3 className="modal__title">You will eat...</h3>
        {props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
        <button className="button" onClick={props.handleClearModal}>OKAY</button>
    </Modal>
);

export default OptionModal