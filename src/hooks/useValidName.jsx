import { useState, useEffect } from "react";

const useValidName = (input) =>{
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const isValidUsername = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(
          input
        );
        setIsValid(isValidUsername);
      }, [input]);
    
      return isValid;
}


export default useValidName
