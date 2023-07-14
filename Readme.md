
# SuperHero API
Technical test using Redux, SuperHeroAPI and React for a Super Hero Gallery App

## Instructions

To get this repository and its resources locally use:

```bash
  git clone https://github.com/H4r0l/SuperHero-API
```

## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
    or
  npm i
```
    
## Design

| Figma Mockups:
- https://www.figma.com/file/Pt61jAfpJtKBat8WnUaPz6/Untitled?type=design&node-id=0%3A1&mode=design&t=ndaY6a19p10IAJSL-1

- ![image](https://github.com/H4r0l/SuperHero-API/assets/65699208/ed041d1a-2425-4a6f-ac87-5833719d4fab)



## Support

I used Redux toolkit as an easier way of handling Redux state:
https://redux-toolkit.js.org/rtk-query/overview

I also used Tailwind for the Styling:
https://tailwindcss.com/docs

Axios was used for the Request handling:
https://axios-http.com/docs/intro


## API Reference

#### Get all items

```http
  GET https://superheroapi.com/api/access-token/character-id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `access_token` | `string` | **Required**. Your access_token |

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Get item

```http
  GET /api/access-token/search/name
```



## Deployment

| You can install all dependencies using:
```bash
npm i
```
| To locally deploy Backend:

 ```bash
npm run dev
```
| To create a deploy build:

```bash
npm run build
```



## Documentation

### Redux
| For the implementation of redux toolkit I took into account the 3 main factors:

- Create the slice:
```code
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  heroes: [],
  loading: false,
  error: null,
};
const heroesReducer = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    fetchApiRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchApiSuccess: (state, action) => {
      state.heroes = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchApiError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
```

- Setting the store:

```code
import { configureStore } from "@reduxjs/toolkit";
import heroesReducer from "./Reducer";

const store = configureStore({
  reducer: {
    heroes: heroesReducer,
  },
});

export default store;

```

- and finally dispatch the data when fetching the API:

```code
    for (let i = 0; i < ids.length; i += requestSize) {
      const requests = requestIds.map((id) =>
        axios.get(`https://superheroapi.com/api/612689784298868/${id}`)
      );
      const responses = await Promise.all(requests);
      const requestData = responses.map((response) => response.data);
      allData.push(...requestData); // Add the current request of heroes to allData
    }
    // Save data in localStorage
    localStorage.setItem(localStorageKey, JSON.stringify(allData));
    dispatch(fetchApiSuccess(allData)); // Dispatch fetchApiSuccess after the loop
  } catch (error) {
    dispatch(fetchApiError(error.message));
  }
};

```


## Author
- [@H4r0l](https://github.com/H4r0l)