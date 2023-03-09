import { Person } from '@/models';
import { addFavorite } from '@/redux/states/favorites';
import { AppStore } from '@/redux/store';
import { Checkbox } from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PeopleTable = () => {

  // Component states
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
  // dealing with redux
  const dispatch = useDispatch();
  // extract information from reduxstate
  const statePeople = useSelector((store: AppStore ) => store.people);
  const stateFavPeople = useSelector((store: AppStore ) => store.favorites);

  const foundPersonInFavs = (person: Person) =>
    !!stateFavPeople.find((p) => p.id === person.id);
  const filteredFavPerson = (person: Person) =>
  stateFavPeople.filter((p) => p.id !== person.id);

  const handleChange = (person: Person) => {
    /**
     * When user change a checkbox's state it will check if user is in selected people...
     * If user is in favorite people we must filter the user (expel him).
     * If user is NOT in favorite people we must update our array with the new added value(using spread operator).
     */
    const filteredPeople = foundPersonInFavs(person)
      ? filteredFavPerson(person)
      : [...selectedPeople, person];

    // dispatch redux reducer method to store favorites in local storage
    dispatch(addFavorite(filteredPeople));

    // update local state
    setSelectedPeople(filteredPeople);
  };

  // Columns
  const columns = [
    // checkboxes
    {
      field: "actions",
      type: "actions",
      sortable: false,
      headerName: "",
      width: 50,
      renderCell: (params: GridRenderCellParams) => (
        <>
          {
            <Checkbox
              size="small"
              checked={foundPersonInFavs(params.row)}
              onChange={() => handleChange(params.row)}
            />
          }
        </>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "company",
      headerName: "Company",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "levelOfHappiness",
      headerName: "Level Of Happiness",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
  ];

  useEffect(() => {
    /**
     * Every Time favorite people is edited this component's state 
     * will be updated
     */
    setSelectedPeople(stateFavPeople);
  }, [stateFavPeople])
  
  
  return (
    <DataGrid
      rows={statePeople}
      columns={columns}
      disableColumnSelector
      disableRowSelectionOnClick
      autoHeight
      initialState={{
        pagination: {
          paginationModel: { pageSize: 5, page: 0 },
        },
      }}
      pageSizeOptions={[5, 10, 20]}
      getRowId={(row: any) => row.id}
    />
  )
}

export default PeopleTable