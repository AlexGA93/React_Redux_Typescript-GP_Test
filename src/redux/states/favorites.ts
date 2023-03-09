import { Person } from "@/models";
import { LocalStorageTypes } from "@/models/localstorage";
import { getLocalStorage, setLocalStorage } from "@/utilities/localstorage.utility";
import { createSlice, current } from "@reduxjs/toolkit";

// initial state
const initialState: Person[] = [];

// redux slice
export const favoritesSlice = createSlice({
    name: LocalStorageTypes.FAVORITES,
    initialState: getLocalStorage(LocalStorageTypes.FAVORITES)
        ? JSON.parse(getLocalStorage(LocalStorageTypes.FAVORITES) as string) 
        : initialState,
    reducers: {
        addFavorite: (state, action) => {
            // add person to local storage
            setLocalStorage(LocalStorageTypes.FAVORITES, action.payload);
            
            // return payload
            return action.payload;
        },
        removeFavorite: (state, action) => {
            
            const filteredState = current(state).filter((p: Person) => p.id !== action.payload.id);

            setLocalStorage(LocalStorageTypes.FAVORITES, filteredState);

            return filteredState;
        }
    }
});

// export reducers actions
export const { addFavorite, removeFavorite } = favoritesSlice.actions; 