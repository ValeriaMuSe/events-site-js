const cache = {};

const proxyCache = new Proxy(cache, {
  get: async (obj, prop) => {
    if (obj[prop] && localStorage.getItem(prop)) {
      console.log(`Using proxy cache for category: ${prop}`);
      return Reflect.get(obj, prop);
    } else {
      const eventApiUrl = 'https://knassbani2.execute-api.us-east-2.amazonaws.com/events/';
      const url = `${eventApiUrl}${prop}`;
      const response = await fetch(url);
      const data = await response.json();


      obj[prop] = data;
      localStorage.setItem(prop, JSON.stringify(data));
      return Reflect.get(obj, prop);
    }
  }
});

const EventAPIProxy = {
  async getEventsByCategory(category) {
    return proxyCache[category];
  },

  getAllCategories() {
    const categories = ['music', 'art', 'food', 'business', 'sports'];
    return categories;
  }
};

export { EventAPIProxy };

