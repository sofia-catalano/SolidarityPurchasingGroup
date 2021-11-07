import {Client} from './Client'
import { Product } from './Product';
const BASEURL = '/api';

async function getAllClients(){

    const response = await fetch(BASEURL + '/clients');
  
    const clients = await response.json();
  
    if (response.ok) {
        return clients.map((c) => new Client(c.ID, c.NAME, c.SURNAME, c.AGE, c.SEX, c.WALLET_ID));
    } else {
        return undefined;
    }
}

async function createClient(c) {
    try {
      const response = await fetch(BASEURL + '/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({role: c.role, name: c.name, surname: c.surname, birthdate: c.birthdate, 
            email: c.email, password: c.password })
      })
      const newID = await response.json();
  
      if (!response.ok) {
        throw response;
      }
  
      return newID;
    }
    catch {
      return false;
    }
}

async function getAllProducts(){

    const response = await fetch(BASEURL + '/products');
  
    const products = await response.json();
  
    if (response.ok) {
        return products.map((p) => new Product(p.ID, p.NAME, p.DESCRIPTION, p.CATEGORY, p.QUANTITY, p.EXPIRE, p.FARMER_ID));
    } else {
        return undefined;
    }
}

async function createProduct(p) {
    try {
      const response = await fetch(BASEURL + '/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            { NAME: p.NAME,DESCRIPTION: p.DESCRIPTION, CATEGORY: p.CATEGORY, QUANTITY: p.QUANTITY, CONFIRMED: p.CONFIRMED,
              FARMER_ID: p.FARMER_ID, IMG_PATH: p.IMG_PATH, PRICE: p.PRICE }
        )
      })
      const newID = await response.json();
  
      if (!response.ok) {
        throw response;
      }
  
      return newID;
    }
    catch {
      return false;
    }
  
    }

async function updateConfirmedProduct(confirmed, id) {

    const response = await fetch(BASEURL + '/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          confirmed: confirmed,
          id:id
        })
      });
  
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  
}

function logIn(email, password) {
  return new Promise((resolve, reject) => {
    fetch(BASEURL + '/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          resolve([user.name,user.id]);
        }).catch((err) => reject(err));
      } else {
        reject();
      }
    }).catch((err) => reject(err));
  });
};

async function logOut() {
  await fetch(BASEURL + '/sessions/current', { method: 'DELETE' });
}

function getUserInfo() {
  return new Promise((resolve, reject) => {
    fetch(BASEURL + '/api/sessions/current')
      .then((response) => {
        if (response.ok) {
          response.json().then((userInfo) => {
            resolve(userInfo);
          }).catch((err) => reject(err));
        } else {
          reject();
        }
      }).catch((err) => reject(err));
  });
};

const API = {
  getAllClients,
  getAllProducts,
  updateConfirmedProduct,
  createClient,
  createProduct,
  logIn,
  logOut,
  getUserInfo
}

export default API;