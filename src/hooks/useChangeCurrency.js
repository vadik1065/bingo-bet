import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { mainLoading } from "../state";
import url from '../axios.js';
import axios from 'axios';
import i18next from "i18next";
import { notify } from "../utils/utils";

const useChangeCurrency = ({ currency_id, token, balance, updateUser }) => {
  const [loading, setLoading] = useAtom(mainLoading);
  const [balanceActive, setBalanceActive] = useState({});

  useEffect(() => {
    if (currency_id) {
      const actBalance = balance.find(item => item.currency_id === currency_id);
      setBalanceActive(actBalance);
    }
  }, [balance, currency_id]);

  function changeCurrency(id) {
    if (id != currency_id) {
      setLoading(true);
      axios({
        method: 'post',
        url: url + '/api/set-fav-currency',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          currency_id: id
        }
      })
        .then(res => {
          if (res.data.status === 1) {
            updateUser(token);
            notify({ 
              message: i18next.t("Success"),
              description: i18next.t('Your currency was updated.'),
              icon: "success",
            });
            setLoading(false);
          }
        })
        .catch(error => {
          setLoading(false);
          notify({ message: error.response.data.error });
        })
    }
  }

  return { changeCurrency, balanceActive, setBalanceActive }
}

export default useChangeCurrency;
