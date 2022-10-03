import { useEffect, useState } from "react";
import i18next from "i18next";
import url from '../axios.js';
import axios from 'axios';
import { notify } from "../utils/utils.js";

const useActivatePromo = ({token, updateUser, setPromoModal}) => {
  const [promo, setPromo] = useState('');
  const [error, setError] = useState('');
  const [loadingActivatePromo, setLoadingActivatePromo] = useState(false);
  const [confirmRequest, setConfirmRequest] = useState(false);

  useEffect(() => {
    if (promo) {
      setError('');
    }
  }, [promo]);

  function activatePromo(e, confirm = false) {
    if (e) {
      e.preventDefault();
    }

    if (loadingActivatePromo) {
      return
    }

    if (promo) {
      setLoadingActivatePromo(true);
      let obj = {
        promo_registration: promo
      }
      if (confirm) {
        obj.confirt_request = confirm
      }
      axios({
        method: 'post',
        url: url + '/api/set-promo-registration-code',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: obj
      })
        .then(res => {
          if (res.data.data.confirt_request) {
            setConfirmRequest(true);
          } else {
            notify({ 
              message: i18next.t("Success"),
              description: res.data.data.message,
              icon: "success",
            });
            updateUser(token);
            setPromo('');
            if (setPromoModal) {
              setPromoModal(false);
            }
          }
          setLoadingActivatePromo(false);
        })
        .catch(error => {
          notify({ message: error.response.data.error });
          setLoadingActivatePromo(false);
        })
    } else {
      setError('The field is not filled in');
    }
  }

  return { promo, setPromo, activatePromo, error, loadingActivatePromo, setConfirmRequest, confirmRequest }
}

export default useActivatePromo;
