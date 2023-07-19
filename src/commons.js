import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
export const ApiKey = "2855122162134751b0137b0f335d3ac2";
const TUNNELING_BASE_URL = "https://5ace-196-41-57-190.in.ngrok.io";
// export const BASE_URL = TUNNELING_BASE_URL+"/api/";

export const BASE_URL = "https://attendence.rechitonafricanltd.co.tz/api/";
// export const BASE_URL = "http://127.0.0.1:8000/api/";  



export const APP_NAME = "Attendance App"
export const getUser = async () => {
    try{
      let user = await AsyncStorage.getItem('@user');
      user = JSON.parse( user );
      return user
    }catch( e ){
      throw e;
    }
    return null;
}

let user = {};
(async () => {
   user = await getUser()
})();

export  const Axios = axios.create({
  headers: {
      Authorization : `Bearer ${user.token}`
  }
})

export const stripOffHtml = str => str && str.length ? str.replace(/<[^>]*>?/gm, '') : ""

export const toLowerCase = str => str && str.length ? str.toLowerCase(/<[^>]*>?/gm, '') : ""

export const brandColor = "#A71D31";