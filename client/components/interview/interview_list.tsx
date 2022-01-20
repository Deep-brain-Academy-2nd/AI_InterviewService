import { Box, Typography, Card, CardContent, CardMedia, Grid } from '@material-ui/core'
import { ReactNode } from 'react';

const Interview_list = (props) => {

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Grid container justifyContent='center'>
            <Typography>Interview List</Typography>
                {
                    // Interview List

                    props.interviewList.map((item, index) => (
                        <Grid item md={12} style={{padding: "5px 20px"}}>
                            <Card>
                                <Box sx={{ display: 'flex', width: "100%" }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography>
                                            {item.lang === "ko" ? "한국어" : item.lang === "en" ? "English" : item.lang === "jp" && "日本語"}
                                        </Typography>
                                        <Typography>
                                            {item.text}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                            {item.time}분
                                        </Typography>
                                    </CardContent>
                                </Box>
                                {/* <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image="vercel.svg"
                            alt="Live from space album cover"
                        /> */}
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    )

}

export default Interview_list;