import axios from "axios";
import url from "./axios";

// export async function getBountyInfo(token) {
//   let response = await axios({
//     method: "post",
//     url: url + "/api/get-bounty-info",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response;
// }

export async function getListGiveaways(token) {
  // console.log(token);

  // if (!token) return;

  let response = token
    ? await axios({
        method: "post",
        url: url + "/api/list-giveaways",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    : await axios({
        method: "post",
        url: url + "/api/list-giveaways",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
  return response;
}

export async function postSteamLink(token, data) {
  if (!token) return;

  let response = await axios({
    method: "post",
    url: url + "/api/join-giveaway",
    data: { giveaway_id: data.id, steam_link: data.link },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}
