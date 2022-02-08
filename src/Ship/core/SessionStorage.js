export default class SessionStorage {

    static setItem(key,value){
        const json = JSON.stringify(value)
        return sessionStorage.setItem(key, json);
    }

    static getItem(key){
        return JSON.parse(localStorage.getItem(key));
    }

    static removeItem(key){
      return sessionStorage.removeItem(key);
    }

    static clear(){
      return sessionStorage.clear();
    }

    static key(index){
      return sessionStorage.key(index);
    }

    get length(){
      return sessionStorage.length;
    }
  }
