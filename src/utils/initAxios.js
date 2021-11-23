import axios from "axios";
import jsSHA from "jssha";

export default function initAxios() {
  axios.interceptors.request.use(function (config) {
    var AppID = "ab90c39442fe4cf5b7e7707057a5dd23";
    var AppKey = "MqcHWHmbsyYHjqeJx8ALvBJHF_I";

    var GMTString = new Date().toGMTString();
    var ShaObj = new jsSHA("SHA-1", "TEXT");
    ShaObj.setHMACKey(AppKey, "TEXT");
    ShaObj.update("x-date: " + GMTString);
    var HMAC = ShaObj.getHMAC("B64");
    var Authorization =
      'hmac username="' +
      AppID +
      '", algorithm="hmac-sha1", headers="x-date", signature="' +
      HMAC +
      '"';
    config.headers.Authorization = Authorization;
    config.headers["X-Date"] = GMTString;

    return config;
  });
}
