import React from 'react';
import Modal from 'react-modal';

const CustomModal = ({ isOpen, onRequestClose, content, onYesClick }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: 'black',
          width: '430px',
          height: '200px',
        },
      }}
    >
      <div className='bg-black'>
        <h2 className='text-3xl gupter-bold'>Please confirm</h2>
        <div className='mb-2'>{content}</div>
        <button className='text-center p-2 w-28 border-r-2 bg-red-500' onClick={onYesClick}>Yes</button>
        <button className='text-center p-2 w-28 bg-green-500' onClick={onRequestClose}>Close</button>
      </div>
    </Modal>
  );
};

export default CustomModal;
