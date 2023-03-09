import { Person } from '@/models';
import { removeFavorite } from '@/redux/states/favorites';
import { AppStore } from '@/redux/store';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { IconButton } from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';

const FavoriteTable = () => {
  // dealing with redux
  const dispatch = useDispatch();
  // extract information from reduxstate
  const stateFavorites = useSelector((store: AppStore ) => store.favorites);

  const handleClick = (person: Person) => {

    // dispatch redux reducer method
    dispatch(removeFavorite(person));

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
                <IconButton 
                    aria-label="delete"
                    color="error"  
                    onClick={() => handleClick(params.row)}
                >
                    <HeartBrokenIcon />
                </IconButton>
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
  
  return (
    <DataGrid
      rows={stateFavorites}
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

export default FavoriteTable