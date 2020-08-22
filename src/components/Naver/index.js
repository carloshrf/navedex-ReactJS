import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import editIconImg from '../../assets/images/edit-Icon.svg'
import deleteIconImg from '../../assets/images/delete-Icon.svg'

import Modal from '../Modal';

import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';

import './styles.css';

function Naver({naver, deleteNaverFromState}) {
  const [viewToggleModal, setViewToggleModal] = useState(false);
  const [deleteToggleModal, setDeleteToggleModal] = useState(false);
  
  const { token } = useAuth();

  const modalHandler = (e) => {
    e.preventDefault();
    setViewToggleModal(!viewToggleModal);
    console.log('aaaaa')
  }

  const deleteNaver = async () => {
    await api.delete(`navers/${naver.id}`, {
      headers: { authorization: `Bearer ${token}`}
    }).then( response => {
      console.log('Usuário deletado.')
    });

    deleteNaverFromState(naver.id);
  }

  const handleDeleteToggleModal = () => {
    setDeleteToggleModal(!deleteToggleModal);
  }

  return (
    <div id="naver-container">
      <img src={naver.url} alt={naver.name} className="naver-photo" onClick={modalHandler}/>

      <p className="naver-name">{naver.name}</p>
      <p className="naver-job">{naver.job_role}</p>

      <Link 
        to='#'
        onClick={deleteNaver} 
        className="delete-btn" 
      >
        <img src={deleteIconImg} alt="Delete"/>
      </Link>
      
      <Link 
        to={{pathname: '/edit-naver', state: {naver: 'aaa'}}} 
        className="edit-btn"
      >
        <img src={editIconImg} alt="edit" />
      </Link>

      <Modal style={{display: 'flex'}} show={viewToggleModal} modalClosed={modalHandler}>
          <div className="photo-container">
            <img src={naver.url} alt={naver.name} onClick={modalHandler} className="photo"/>
          </div>
          <div className="naver-content">
            <p className="modal-name">{naver.name}</p>
            <p className="modal-job-role">{naver.job_role}</p>
            <p className="modal-label">Idade</p>
            <p className="modal-detail">{naver.birthdate}</p>
            <p className="modal-label">Tempo de empresa</p>
            <p className="modal-detail">{naver.admission_date}</p>
            <p className="modal-label">Projetos que participou</p>
            <p className="modal-detail">{naver.project}</p>
          </div>
      </Modal>

      <Modal show={deleteToggleModal} modalClosed={handleDeleteToggleModal} >
          Modal de Remoção
        </Modal>

    </div>
  );
}

export default Naver;