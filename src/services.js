import axios from 'axios';

const axInstance = axios.create({
  baseURL: 'https://v2.jokeapi.dev/',
});

export const getCategory = async () => {
  try {
    const {data} = await axInstance.get('/categories');

    const forPromise = [];
    data.categories.forEach(cat => {
      forPromise.push(axInstance.get(`joke/${cat}?type=single&amount=2`));
    });

    const jokesByCategoriesRaw = await Promise.all(forPromise);
    const jokesByCat = jokesByCategoriesRaw.map((jokes, idx) => {
      return {
        categories: data.categories[idx],
        jokes: jokes.data.error ? [] : jokes.data.jokes.map(el => el.joke),
        isEmpty: jokes.data.error,
      };
    });

    return jokesByCat;
  } catch (error) {
    return [];
  }
};

export const getJokes = async category => {
  try {
    const {data} = await axInstance.get(
      `joke/${category}?type=single&amount=2`,
    );
    if (data.error) {
      throw data;
    }
    const jokeData = data.jokes.map(joke => joke.joke);
    return jokeData;
  } catch (error) {
    console.log(error.causedBy[0]);
  }
};
