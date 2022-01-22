import { Box, Typography, Card, CardContent, CardMedia, Grid } from '@material-ui/core'

const Interview_list = (props) => {

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Grid container justifyContent='center'>
                <Typography>Interview List</Typography>
                {
                    // Interview List

                    props.interviewList.map((item, index) => (
                        <Grid item md={11} style={{ padding: "5px 0px 5px 20px" }}>
                            <Card>
                                <Box>
                                    <CardContent>

                                        언어: <span style={{ fontWeight: "bold" }}>
                                            {item.lang === "ko" ? "한국어" : item.lang === "en" ? "English" : item.lang === "jp" && "日本語"}
                                        </span>
                                        <br />
                                        질문: <span style={{ fontWeight: "bold" }}>{item.text}</span>
                                        <br />
                                        답변 시간: <span style={{ fontWeight: "bold" }}>{item.time}분</span>

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