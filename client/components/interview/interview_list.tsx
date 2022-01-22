import { Box, Typography, Card, CardContent, Grid, Button } from '@material-ui/core'

const Interview_list = (props) => {

    // interview start handler
    const handleStart = () => {

    }

    return (
        <Box sx={{ flexDirection: "column", display: "flex", alignItems: "center" }}>
            <Grid container justifyContent='center' style={{ minHeight: "400px" }}>
                <Typography variant="h5">Interview List</Typography>
                {
                    // Interview List

                    props.interviewList.map((item, index) => (
                        <Grid item md={11} style={{ padding: "5px 0px 5px 20px" }}>
                            <Card>
                                <Box>
                                    <CardContent>

                                        {/* 언어: <span style={{ fontWeight: "bold" }}>
                                            {item.lang === "ko" ? "한국어" : item.lang === "en" ? "English" : item.lang === "jp" && "日本語"}
                                        </span>
                                        <br /> */}
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
            {
                props.interviewList?.length > 0 &&
                <Button
                    variant="outlined"
                    onClick={handleStart}
                    style={{
                        backgroundColor: "black", color: "#A8F552", fontSize: "2rem", fontWeight: "bold", padding: "0px 20px", marginTop: "40px", maxWidth: "200px"
                    }}
                >
                    면접시작
                </Button>

            }

        </Box>
    )

}

export default Interview_list;