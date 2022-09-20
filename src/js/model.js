import { API_URL_BREED, API_URL_BREEDS, LOADER } from './config.js';
import alert from './views/alertView.js';
import {
  generateMarkup,
  getImgUrl,
  fetchImgUrl,
  createGridMarkup,
} from './views/view.js';

export const state = {
  dogs: [],
  breedSuggestions: [],
  breedList: [],
  likedDogs: [],
  popular: [
    'Labrador Retriever',
    'Yorkshire Terrier',
    'Bernese Mountain Dog',
    'West Highland White Terrier',
    'American Staffordshire Terrier',
    'Siberian Husky',
    'Miniature Schnauzer',
    'French Bulldog',
    'Golden Retriever',
    'German Shepherd Dog',
    // {
    //   bred_for: 'Herding, Guard dog',
    //   breed_group: 'Herding',
    //   height: '56 - 66',
    //   id: 115,
    //   imgId: 'SJyBfg5NX',
    //   imgUrl: 'https://cdn2.thedogapi.com/images/SJyBfg5NX_1280.jpg',
    //   life_span: '10 - 13 years',
    //   name: 'German Shepherd Dog',
    //   origin: undefined,
    //   temperament:
    //     'Alert, Loyal, Obedient, Curious, Confident, Intelligent, Watchful, Courageous',
    //   weight: '23 - 41',
    // },
    // {
    //   bred_for: 'Water retrieving',
    //   breed_group: 'Sporting',
    //   height: '55 - 62',
    //   id: 149,
    //   imgId: 'B1uW7l5VX',
    //   imgUrl: 'https://cdn2.thedogapi.com/images/B1uW7l5VX_1280.jpg',
    //   life_span: '10 - 13 years',
    //   name: 'Labrador Retriever',
    //   origin: undefined,
    //   temperament:
    //     'Kind, Outgoing, Agile, Gentle, Intelligent, Trusting, Even Tempered',
    //   weight: '25 - 36',
    // },
  ],
  temporary: [],
  // fact: '',
};

const retrievedLikedDogs = localStorage.getItem('likedDogs');

// console.log(JSON.parse(retrievedLikedDogs));
state.likedDogs = JSON.parse(retrievedLikedDogs)
  ? JSON.parse(retrievedLikedDogs)
  : [];

export function createDogsObjects(dogs) {
  state.dogs = dogs.map((dog) => ({
    name: dog.name,
    bred_for: dog.bred_for,
    breed_group: dog.breed_group,
    life_span: dog.life_span,
    imgId: !dog.reference_image_id ? '' : dog.reference_image_id,
    temperament: dog.temperament,
    height: dog.height.metric,
    weight: dog.weight.metric,
    id: dog.id,
    origin: dog.origin,
    // imgUrl: dog.image.url,
  }));
}

export async function fetchAllBreeds() {
  try {
    if (!process.env.DOGS_API_KEY) {
      throw new Error('You forgot to set DOGS_API_KEY ');
    }
    const data = await fetch(`${API_URL_BREEDS}`, {
      headers: {
        'X-Api-Key': process.env.DOGS_API_KEY,
      },
    });
    const result = await data.json();

    state.breedSuggestions = result.map((item) => item.name);
  } catch (err) {
    const markup = err;
    alert(markup);
    console.log(err);
  }
}

export async function fetchDogsData(value) {
  try {
    if (!process.env.DOGS_API_KEY) {
      throw new Error('You forgot to set DOGS_API_KEY ');
    }
    if (value === '' || value === undefined)
      console.log(`search for dog's breed`);

    LOADER.querySelector('.loader').classList.remove('hidden');

    const data = await fetch(`${API_URL_BREED}${value}`, {
      headers: {
        'X-Api-Key': process.env.DOGS_API_KEY,
      },
    });
    const result = await data.json();

    LOADER.querySelector('.loader').classList.add('hidden');
    createDogsObjects(result);
  } catch (err) {
    const markup = err;
    alert(markup);
    console.log(err);
  }
}

export async function fetchTopDogsData(value) {
  try {
    if (!process.env.DOGS_API_KEY) {
      throw new Error('You forgot to set DOGS_API_KEY ');
    }
    if (value === '' || value === undefined)
      console.log(`search for dog's breed`);

    LOADER.querySelector('.loader').classList.remove('hidden');

    const data = await fetch(`${API_URL_BREED}${value}`, {
      headers: {
        'X-Api-Key': process.env.DOGS_API_KEY,
      },
    });
    const result = await data.json();

    LOADER.querySelector('.loader').classList.add('hidden');

    return result;
  } catch (err) {
    const markup = err;
    alert(markup);
    console.log(err);
  }
}

export async function fetchDogsFacts() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.FACTS_API_KEY,
      'X-RapidAPI-Host': 'dog-facts2.p.rapidapi.com',
    },
  };
  try {
    const data = await fetch(
      'https://dog-facts2.p.rapidapi.com/facts',
      options
    );

    const result = await data.json();
    [state.fact] = result.facts;
  } catch (err) {
    const markup = err;
    alert(markup);
    console.log(err);
  }
}
