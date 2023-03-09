import { Person } from "@/models";
import { LocalStorageTypes } from "@/models/localstorage";
import { getLocalStorage, setLocalStorage } from "@/utilities/localstorage.utility";
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState: Person[] = [];

const getInitialState = () => getLocalStorage(LocalStorageTypes.PEOPLE)
? JSON.parse(getLocalStorage(LocalStorageTypes.PEOPLE) as string) 
: initialState

// redux slice
export const peopleSlice = createSlice({
    name: LocalStorageTypes.PEOPLE,
    initialState: getInitialState,
    reducers: {
        addPeople: (state, action) => {
            // add person to local storage
            setLocalStorage(LocalStorageTypes.PEOPLE, state);

            // return payload
            return action.payload;
        }
    }
});

// export reducers actions
export const { addPeople } = peopleSlice.actions; 