// const eventApiUrl = 'https://knassbani2.execute-api.us-east-2.amazonaws.com/events/';

// class EventAPI {
//   constructor() {
//     this.categories = ['music', 'art', 'food', 'business', 'sports'];
//     this.cache = {};
//   }

//   async getEventsByCategory(category) {
//     if (category in this.cache) {
//       console.log(`Using cache for category: ${category}`);
//       return this.cache[category];
//     }

//     const url = `${eventApiUrl}${category}`;
//     const response = await fetch(url);
//     const data = await response.json();

//     this.cache[category] = data;

//     return data;
//   }

//   getAllCategories() {
//     return this.categories;
//   }
// }

// const cache = {};

// const proxyCache = new Proxy(cache, {
//   get: async (obj, prop) => {
//     if (obj[prop]) {
//       console.log(`Using proxy cache for category: ${prop}`);
//       return Reflect.get(obj, prop);
//     } else {
//       const data = await eventAPI.getEventsByCategory(prop);
//       obj[prop] = data;
//       return Reflect.get(obj, prop);
//     }
//   }
// });

// const eventAPI = new EventAPI();

// const EventAPIProxy = {
//   async getEventsByCategory(category) {
//     return proxyCache[category];
//   },

//   getAllCategories() {
//     return eventAPI.getAllCategories();
//   },

//   async getEventsByCategoryProxy(category) {
//     return proxyCache[category];
//   }
// };

// export { EventAPIProxy };


//new version of proxy 
const cache = {};

const proxyCache = new Proxy(cache, {
  get: async (obj, prop) => {
    if (obj[prop]) {
      console.log(`Using proxy cache for category: ${prop}`);
      return Reflect.get(obj, prop);
    } else {
      const eventApiUrl = 'https://knassbani2.execute-api.us-east-2.amazonaws.com/events/';
      const url = `${eventApiUrl}${prop}`;
      const response = await fetch(url);
      const data = await response.json();

      obj[prop] = data;
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

