
import * as React from 'react';
import { Grid } from "@mui/material"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const Description = ({ onDesciption, handleDescription, productInfo = [] }) => {
    console.log("check pass product", productInfo);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '1px solid #686868',
        boxShadow: 24,
        p: 4,
    };
    return (
        <section>
            <div>
                <Modal
                    keepMounted
                    open={onDesciption}
                    onClose={handleDescription}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                    fullWidth={true}
                    maxWidth="md"
                >
                    <Box sx={style}>
                        <div>
                            <Grid container xs={12}>
                                <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
                                    <div style={{ height: "100px" }}>
                                        <img src={productInfo.image} alt="" style={{maxHeight: "100%" }} />
                                    </div>

                                </Grid>
                                <Grid xs={10}>
                                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2" fontSize={"14px"} fontWeight={700}>
                                        {productInfo.name}
                                    </Typography>
                                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2" fontSize={"17px"} fontWeight={500}>
                                        With full contain and bring you an feel when wears it with the model.
                                    </Typography>
                                </Grid>
                            </Grid>

                        </div>
                        <h2 style={{margin:"0" , padding:"0", marginTop:"2px", marginBottom:"2px", fontSize:"24px", fontWeight:"800"}}>Benefits</h2>
                        <Typography id="keep-mounted-modal-description">
                            <ul>
                                <li>
                                Nike Dri-FIT technology moves sweat away from your skin for quicker evaporation, helping you stay dry and comfortable.
                            </li>
                                <li>
                                    French terry fabric has a soft feel for lightweight comfort—like your classic sweatshirt.
                                </li>
                                <li>
                                    Ribbed cuffs and hem help keep the hoodie in place while you move.
                                </li></ul>
                        </Typography>
                        <h2 style={{margin:"0" , padding:"0", marginTop:"2px", marginBottom:"2px", fontSize:"24px", fontWeight:"800"}}>Products</h2>
                        <Typography id="keep-mounted-modal-description">
                            <ul>
                                <li>
                                Nike Dri-FIT technology moves sweat away from your skin for quicker evaporation, helping you stay dry and comfortable.
                            </li>
                                <li>
                                    French terry fabric has a soft feel for lightweight comfort—like your classic sweatshirt.
                                </li>
                                <li>
                                    Ribbed cuffs and hem help keep the hoodie in place while you move.
                                </li></ul>
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </section>
    )
}
export default Description;

