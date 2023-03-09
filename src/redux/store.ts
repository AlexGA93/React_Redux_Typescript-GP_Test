import { Person } from "@/models";
import { configureStore } from "@reduxjs/toolkit";
import { favoritesSlice } from "./states/favorites";
import { peopleSlice } from "./states/people";

export interface AppStore {
    people: Person[];
    favorites: Person[];
}

// create Redux Store
export default configureStore<AppStore>({
    reducer: {
        people: peopleSlice.reducer,
        favorites: favoritesSlice.reducer
    }
});