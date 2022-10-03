import React,{useEffect,useState} from 'react';
import { useAtom } from "jotai";
import { useHistory } from 'react-router';
import { Redirect, useLocation } from 'react-router-dom';
import { promo } from "../state.js";
import useCheckRegister from '../hooks/useCheckRegister.js';

const Promo = () => {
  const location = useLocation();
  const history = useHistory();
  const [move, setMove] = useState(false);
  const [code, setCode] = useAtom(promo);
  const { checkRegister } = useCheckRegister('registerPromo');

  useEffect(() => {
    // console.log(location);
    if (location.search) {
      history.push('/register');
      setCode(location.search.slice(2));
      // checkRegister(location.search.slice(2));
      // setMove(true);
    }
  }, [location.search]);  

  return (
    <>
      {move && <Redirect to="/register" />}
      {/* {move && <Redirect to="/home" />} */}
    </>
  )
}

export default Promo;
