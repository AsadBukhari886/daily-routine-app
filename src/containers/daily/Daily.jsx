import React, { useState } from 'react';

function Daily(props) {
    const [value, setValue] = useState('');

    const changer=(e)=>{
        let val=e.target.value;
        console.log("",val)
        setValue(val)
        // console.log("value",value)
    }

  return (<>
  <input type="text" placeholder='enter name here' onChange={(e)=>changer(e)}/>

  
  </>)
}

export default Daily;
