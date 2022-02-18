import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');


function Login(props) {

  // console.log("login page")


  return (<>
    <Modal
      isOpen={props.modalIsOpen}
      onAfterOpen={props.afterOpenModal}
      onRequestClose={props.closeModal}
      style={props.customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className='login'>
        <h3 >Choose You Choice</h3>
        <button onClick={props.signInWithGoogle}> login with google</button><br />
        <button onClick={props.signInWithFacebook}>login in with facebook</button><br />
        <button onClick={props.signInWithGithub}>login in with github</button><br />
        <button>wanna test mobile???</button>
        <button>login with email</button>
      </div>
    </Modal>

  </>);
}

export default Login;
