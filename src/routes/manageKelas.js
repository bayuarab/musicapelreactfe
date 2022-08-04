import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Toolbar, Grid, Container, Paper, Button, TextField, ButtonGroup, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import HeaderbarAdmin from '../component/HeaderBarAdmin';
// import ManageBrandDialogAddItem from '../components/ManageBrandDialogAddItem';
// import ManageBrandDialogEditItem from '../components/ManageBrandDialogEditItem';
// import { APIRequest } from '../components/APICalls';
import { getKategoriKelas, getMusic } from "../JSON Data/Data";

let kategoris = getKategoriKelas();
let musics = getMusic();

const theme = createTheme({
    palette: {
        primary: {
            main: "#F2C94C",
        },
        secondary: {
            main: '#4F4F4F',
        },
        white: {
            main: '#ffffff',
        },
    },
});

function ManageKelas() {

    /* useStates untuk membuka dialog untuk POST merk baru */
    const [openAdd, setOpenAdd] = useState(false)
    /* useStates untuk membuka dialog untuk POST merk baru */

    /* useStates untuk membuka dialog untuk POST edit merk */
    const [editItemData, setEditItemData] = useState();
    const [openEdit, setOpenEdit] = useState(false);
    /* useStates untuk membuka dialog untuk POST edit merk */

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                {/* Header bar */}
                <HeaderbarAdmin />

                {/* Body Content */}
                <Box component="main"
                    sx={{ backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900], flexGrow: 1, height: '100vh', overflow: 'auto', }}
                >
                    <Toolbar />

                    {/* DIALOG ADD*/}
                    {/* <ManageBrandDialogAddItem open={openAdd} onClose={() => { setOpenAdd(false); setRefreshPage((status) => !status); }} /> */}

                    {/* DIALOG EDIT */}
                    {/* <ManageBrandDialogEditItem open={openEdit} editItemData={editItemData} onClose={() => { setOpenEdit(false); setRefreshPage((status) => !status); }} /> */}

                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    {/* TITLE */}
                                    <Typography variant="h5" color="secondary"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        Manage Kelas
                                    </Typography>

                                    {/* BOX PENCARIAN DATA */}
                                    <div style={{ display: 'flex', padding: "20px 0" }}>
                                        <TextField 
                                        // value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} 
                                        id="input-with-icon-textfield" label="Pencarian Berdasarkan Nama Kelas"
                                            InputProps={{
                                                endAdornment: <SearchIcon color="primary" />,
                                            }}
                                            variant="outlined"
                                            style={{ display: 'flex', flexGrow: 1, marginRight: '10px' }}
                                        />
                                        <Button variant='contained' color='primary'
                                            onClick={() => { setOpenAdd(true) }} style={{ width: 'auto', color: "white" }
                                            }>Tambah Baru</Button>
                                    </div>

                                    {musics.map((invoice) => (
                                        <Card key={invoice.id} style={{ margin: '2% 0' }}>
                                            <Grid container spacing={3}  >
                                                <Grid item xs={12} md={2} >
                                                    <CardMedia component="img" style={{ objectFit: 'contain' }} height="100" image={`${invoice.image}`} alt="Image" />
                                                </Grid>
                                                <Grid item xs={12} md={10} >
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div" >
                                                            {invoice.name}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {invoice.deskripsi}
                                                        </Typography>

                                                        <Grid container spacing={1}>
                                                            <Grid item xs={12} md={4}>
                                                                <Button fullWidth variant="outlined" color="primary" component={Link} to={`/category/${invoice.id}`} >
                                                                    Daftar Kelas
                                                                </Button>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <Button fullWidth variant="outlined" color="primary" onClick={(e) => { e.preventDefault(); setOpenEdit(true); setEditItemData(invoice); }} >
                                                                    Edit Kelas
                                                                </Button>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <Button fullWidth variant="outlined" color="primary" 
                                                                // onClick={async (e) => { await e.preventDefault(); await setIdToDelete(invoice.id); await deleteBrand(); }} 
                                                                >
                                                                    Hapus Kelas
                                                                </Button>
                                                            </Grid>
                                                        </Grid>

                                                    </CardContent>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    ))}
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default ManageKelas;
