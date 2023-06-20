// Archivo: eventAPI.js
const eventApiUrl = 'https://knassbani2.execute-api.us-east-2.amazonaws.com/events/';

class EventAPI {
  constructor() {
    this.categories = ['music', 'art', 'food', 'business', 'sports'];
    this.cache = {};
  }

  async getEventsByCategory(category) {
    if (category in this.cache) {
      console.log('Datos obtenidos del caché.');
      return this.cache[category];
    }

    const url = `${eventApiUrl}${category}`;
    const response = await fetch(url);
    const data = await response.json();

    this.cache[category] = data;

    return data;
  }

  getAllCategories() {
    return this.categories;
  }
}

class EventAPIProxy {
  constructor() {
    this.eventApi = new EventAPI();
    this.cache = {};
  }

  async getEventsByCategory(category) {
    if (category in this.cache) {
      console.log('Datos obtenidos del caché.');
      return this.cache[category];
    }

    const data = await this.eventApi.getEventsByCategory(category);
    this.cache[category] = data;

    return data;
  }

  getAllCategories() {
    return this.eventApi.getAllCategories();
  }
}

export { EventAPI, EventAPIProxy };
