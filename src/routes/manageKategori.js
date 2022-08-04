import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Toolbar, Grid, Container, Paper, Icon } from '@mui/material';
import { Button, TextField, Typography, Card, CardActionArea, CardContent, CardActions, } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

// import SearchIcon from '@mui/icons-material/Search';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SearchIcon from '@mui/icons-material/Search';
import HideImageIcon from '@mui/icons-material/HideImage';

// import { getNewArrivals } from '../jsonData/Data';
import HeaderbarAdmin from '../component/HeaderBarAdmin';
// import ManageProductDialogAddItem from '../components/ManageProductDialogAddItem'
// import ManageProductDialogEditItem from '../components/ManageProductDialogEditItem'
// // import ManageProductDialogDeleteItem from '../components/ManageProductDialogDeleteItem';
// import { APIRequest } from '../components/APICalls';
import numberFormat from '../components/NumbeFormat';
import StyledEngine from '@mui/styled-engine';
import { getKategoriKelas, getMusic } from "../JSON Data/Data";

let kategoris = getKategoriKelas();
let musics = getMusic();

const theme = createTheme({
    palette: {
        primary: {
            main: "#F2C94C",
        },
        secondary: {
            main: '#F2C94C',
        },
        white: {
            main: '#ffffff',
        },
    },
});

function ManageKategori() {
    const [refreshPage, setRefreshPage] = useState();
    const [search, setSearch] = useState('');

    /* useStates dan metode-metode untuk keperluan POST Add Product */
    const [openAdd, setOpenAdd] = useState(false)
    /* useStates untuk keperluan POST Add Product */

    /* useStates dan metode-metode untuk keperluan POST Edit Product */
    const [editItemProduct, setEditItemProduct] = useState();
    const [openEdit, setOpenEdit] = useState(false);
    /* useStates untuk keperluan POST Edit Product */


    const renderList = (item, index) => {
        return (
            <Grid item xs={12} sm={3} key={index} >
                <Grid>
                    <Card>
                        <CardActionArea disable>
                            <Box style={{ height: 200, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {item.image
                                    ? <img src={`${item.image}`} alt="No Image"
                                        style={{ height: '100%', width: '100%', objectFit: 'contain' }}
                                    />
                                    : <HideImageIcon sx={{ height: '120px', width: '120px', }} />
                                }
                            </Box>

                            <CardContent sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                height: '120px',
                                textAlign: "center"
                            }}>
                                {/* Title */}
                                <Typography variant="h6" sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    overflowWrap: 'break-word',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: 'vertical'
                                }}>{item.name}</Typography>

                                {/* Brand Name */}
                                <Typography variant="body2" color="text.secondary" sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    overflowWrap: 'break-word',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: 'vertical'
                                }}>{item.brand_name}</Typography>

                                {/* Price */}
                                <Typography variant="subtitle1">IDR {numberFormat(item.price)}</Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions style={{ backgroundColor: "", justifyContent: "center" }}>
                            {/* Edit button */}
                            <Button variant="contained" size="medium" style={{ backgroundColor: "F2C94C", color: "black" }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenEdit(true);
                                    setEditItemProduct(item);
                                }}
                            >
                                Edit
                            </Button>

                            {/* Delete button */}
                            <Button variant="outlined" size="medium" style={{ backgroundColor: "F2C94C", color: "black" }}
                                // onClick={async (e) => {
                                //     await e.preventDefault();
                                //     await setIdToDelete(item.id);
                                //     await deleteProduct();
                                // }}
                            >
                                Hapus
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                {/* Header bar */}
                <HeaderbarAdmin />

                {/* Body Content */}
                <Box component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />

                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    {/* TITLE */}
                                    <Typography variant="h5" color="secondary"
                                        style={{ fontWeight: "bold", paddingTop: "10px" }}
                                    >
                                        Manage Kategori
                                    </Typography>

                                    {/* BOX PENCARIAN DATA */}
                                    <div style={{ display: 'flex', padding: "20px 0" }}>
                                        <TextField
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            id="input-with-icon-textfield"
                                            label="Pencarian Berdasarkan Nama Kategori"
                                            InputProps={{
                                                endAdornment: <SearchIcon color='primary' />,
                                            }}
                                            variant="outlined"
                                            style={{ display: 'flex', flexGrow: 1, marginRight: '10px' }}
                                        />
                                        <Tooltip TransitionComponent={Zoom} title="Add Product Items" placement="top">
                                            <Button variant='contained' color='primary' display="none"
                                                onClick={() => { setOpenAdd(true) }}
                                                style={{ width: 'auto', backgroundColor: '#F2C94C', borderRadius: '', color: "white" }
                                                }>Tambah Baru
                                            </Button>
                                            
                                        </Tooltip>
                                    </div>

                                    {/* ITEM LIST */}
                                    <Grid container spacing={2} >
                                        {kategoris.map((item, index) => renderList(item, index))}
                                    </Grid>

                                    {/* DIALOG ADD*/}
                                    {/* <ManageProductDialogAddItem
                                        open={openAdd}
                                        onClose={() => {
                                            setOpenAdd(false);
                                            setRefreshPage((status) => !status);
                                        }}
                                    /> */}

                                    {/* DIALOG EDIT */}
                                    {/* <ManageProductDialogEditItem
                                        open={openEdit}
                                        editItemProduct={editItemProduct}
                                        onClose={() => {
                                            setOpenEdit(false);
                                            setRefreshPage((status) => !status);
                                        }
                                        }
                                    /> */}
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default ManageKategori;

// function Copyright(props) {
    // return (
    //     <Typography variant="body2" color="text.secondary" align="center" {...props}>
    //     {'Copyright © '}
    //     <Link color="inherit" href="/">
    //         1ELECTRONIC
    //     </Link>{' '}
    //     {new Date().getFullYear()}
    //     {'.'}
    //     </Typography>
    // );
    // }
