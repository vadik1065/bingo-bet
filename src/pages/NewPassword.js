import React,{useEffect,useState} from 'react';
import { useAtom } from "jotai";
import { Redirect, useLocation } from 'react-router-dom';
import { confirmation, restoreModal } from "../state.js";

const NewPassword = () => {
  const location = useLocation();
  const [move, setMove] = useState(false);
  const [confirm, setConfirm] = useAtom(confirmation);
  const [openModal, setOpenModal] = useAtom(restoreModal);

  useEffect(()=> {
    const params = new URLSearchParams(location.search);
    const code = params.get('confirmation');
    const restore = params.get('restore');
    if (location.search && code && restore) {
      setConfirm({ code: code, user: restore });
      setMove(true);
    }
  }, [location.search]);

  useEffect(() => {
    if (confirm.code && confirm.user) {
      setOpenModal(true);
    }
  }, [confirm]);

  return (
    <>
      {move && <Redirect to="/home" />}
    </>
  )
}

export default NewPassword;
