import axios from "axios";
import getToken from "./getToken";

let instance;

export default function getTDXAxios() {
  return instance
    ? new Promise((res) => res(instance))
    : getToken().then((resp) => {
        const inst = axios.create({
          headers: { authorization: `Bearer ${resp}` },
        });
        instance = inst;
        return inst;
      });
}
