import React, { useState } from 'react';
import './account.css';
import logo from '../../images/logo.png'

function Account(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const changer = (e) => {
        let val = e.target.value;
        let nam = e.target.name;
        if (nam === "name") {
            setName(val)
           
        }
        if (nam === "email") {
            setEmail(val)
           
        }
    }

    return (<>
        <h2>this is account setting</h2>
        <input type="text" placeholder='name' name='name' onChange={(e) => changer(e)} />
        <input type="text" placeholder='email' name='email' onChange={(e) => changer(e)} />
        <div className='account'>

            <div className='photo'>
                <img src={logo} alt="profile" onClick={() => alert("clicked")} />
            </div>
            <div className="details">
                <p>name:{props.name} </p>
                <p>age:{props.age}</p>
                <p>weight:</p>
                <button onClick={(e)=>props.add(e)}>edit info</button>

            </div>
        </div>
    </>);
}

Account.defaultProps={
     name:"asad bukhari",
     age:12
}

export default Account;
