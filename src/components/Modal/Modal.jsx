import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  position: relative;
  max-width: calc(100% - 48px);
  max-height: calc(100% - 48px);
  margin: 0;
  padding: 0;
  background-color: #fff;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = ({ large, onClose }) => {
  useEffect(() => {
    const handleClose = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleClose);

    return () => {
      window.removeEventListener('keydown', handleClose);
    };
  }, [onClose]);

  return (
    <Overlay
      onClick={(e) => {
        if (e.currentTarget === e.target) onClose(e);
      }}
    >
      <ModalContainer>
        <img src={large} alt="2" />
      </ModalContainer>
    </Overlay>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  large: PropTypes.string,
};

export default Modal;
