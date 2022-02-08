export default class LocalStorage {

    static setItem(key, value){
      const json = JSON.stringify(value)
      return localStorage.setItem(key, json);
    }

    static getItem(key){
      return JSON.parse(localStorage.getItem(key));
    }

    static removeItem(key){
      return localStorage.removeItem(key);
    }

    static clear(){
      return localStorage.clear();
    }

    static key(index){
      return localStorage.key(index);
    }

    get length(){
      return localStorage.length;
    }
  }
