import React, { useState } from 'react';
import { 
    Box, Button, Dialog, TextField, Grid, DialogTitle, DialogContent
} from '@mui/material';
import { APIRequest } from './APICalls';
import axios from 'axios';

function DialogAddKelas(props =  {
    open: false,
    id: 0,
    onClose: () => { },
    onAdd: () => { }
}) {

        /* useStates untuk keperluan POST merk baru */
        const [cateogryName, setcateogryName] = useState("");
        const [cateogryDescription, setcateogryDescription] = useState("");
        const [imagePreview, setImagePreview] = useState("");
        const [base64, setBase64] = useState("");
        /* useStates untuk keperluan POST merk baru */

        /* Methods to convert image input into base64 */
        const onFileSubmit = (e) => {e.preventDefault();console.log(base64);}
        const onChange = (e) => {console.log("file", e.target.files[0]);let file = e.target.files[0];
            if (file) {const reader = new FileReader();reader.onload = _handleReaderLoaded;reader.readAsBinaryString(file) }}

        const _handleReaderLoaded = (readerEvt) => {let binaryString = readerEvt.target.result;setBase64(btoa(binaryString))}
        const photoUpload = (e) => {e.preventDefault();const reader = new FileReader();const file = e.target.files[0];console.log("reader", reader);console.log("file", file)
            if (reader !== undefined && file !== undefined) {reader.onloadend = () => {setImagePreview(reader.result)
              };reader.readAsDataURL(file);}}
        /* Methods to convert image input into base64 */

        /* Method to POST new Brand Item */
        const postKelas = () => {
        //const postDataa = {cateogry_name: cateogryName,description: cateogryDescription,image: base64,saveType: "add"};
        axios.post('https://localhost:7132/api/CourseCategory/post-kategori').then((res) => {
            if (res.status === 200) {
                props.onClose()
            }
        }).catch((err) => {console.log(err.response.data)})
        }
        /* Method to POST new Brand Item */

    return (
        <div >
            <Dialog open={props.open} onClose={props.onClose} >
                <div style={{ padding: '20px', width: "100%" }}>
                    {/* TITLE */}
                    <DialogTitle>Tambahkan Kelas Baru</DialogTitle>
                    <DialogContent >
                        {/* FORM INPUT */}
                        <form onSubmit={(e) => onFileSubmit(e)} onChange={(e) => onChange(e)} >
                                {imagePreview === "" ? "":<img style={{ width:'100%', height: '100%' }} src={imagePreview} alt="upload" />}
                                <input type="file" name="avatar" id="file" accept=".jpef, .png, .jpg" onChange={photoUpload} src={imagePreview} />
                        </form>

                        <form onSubmit={(e) => { e.preventDefault();postKelas()}} >
                            <Grid columnGap="10px" justifyContent="center" style={{ paddingBottom: "10px"}}>
                                <Grid >

                                    <Box noValidate>
                                    <TextField id="name"
                                        value={cateogryName}
                                        label="Nama Kategori"
                                        onChange={(e) => setcateogryName(e.target.value)}
                                        style={{ display: 'flex', flexGrow: 1, marginTop: '20px', marginBottom: '20px' }}
                                    />
                                    <TextField id="description"
                                        value={cateogryDescription}
                                        label="Deskripsi Kategori"
                                        onChange={(e) => setcateogryDescription(e.target.value)}
                                        style={{ display: 'flex', flexGrow: 1, marginTop: '20px', marginBottom: '20px' }}
                                    />

                                    <Button type='submit' fullWidth variant="contained"
                                        style={{ display: 'flex', flexGrow: 1, marginTop: '20px', marginBottom: '20px' }}
                                    >Tambahkan Kategori Baru</Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContent> 
                </div>
            </Dialog>
        </div>
    )
}

export default DialogAddKelas
