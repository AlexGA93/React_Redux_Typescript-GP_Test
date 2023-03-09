import { People } from "@/data/people";
import { Person } from "@/models";
import { addPeople } from "@/redux/states/people";
import store, { AppStore } from "@/redux/store";
import { Checkbox } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../../redux/states/favorites";
import { PeopleTable } from "./components";

const Home = () => {
  // dealing with redux
  const dispatch = useDispatch();

  /**
   * 
   * Hook allows you to perform side effects in your components.
   * 
   * ex 1:
   * useEffect(() => {
   *    // Runs on every render
   * })
   * 
   * ex 2:
   * useEffect(() => {
   *   //Runs only on the first render
   * }, []);
   * 
   * ex 3:
   * useEffect(() => {
   *   // Runs on the first render
   *   // And any time any dependency value changes
   * }, [prop, state]);
   */


  useEffect(() => {
    // Runs on every render
    dispatch(addPeople(People));
  }, [])
  

  return (
    <PeopleTable />
  );
};

export default Home;

