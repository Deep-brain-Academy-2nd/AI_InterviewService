import { Box, Paper, Typography, Button, Grid } from '@mui/material'
import Router from "next/router"
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";

const Home = () => {

  const username = useSelector((state: RootState) => state.user.username);

  const moveInterview = () => {
    if (username === "") {
      alert ("로그인 후 진행 가능합니다.")
      Router.push('/login')
    } else {
      Router.push('/interview')
    }
  }

  return (
    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh'}}>
      <Paper style={{ backgroundColor: "white", padding: "50px 15%", minWidth: "700px" }}>
        <Typography
          variant='h2'
          style={{ color: "white", fontWeight: "bold", textShadow: "-2px 0 #20c997, 0 2px #20c997, 2px 0 #20c997, 0 -2px #20c997", marginBottom: "28px", textAlign: "center" }}
        >
          AI 모의 면접 연습 안내
        </Typography>
        <Typography variant='h4' style={{ color: "#495057", fontWeight: "bold", marginBottom: "13px" }}>1. 시작하기 버튼을 누릅니다.</Typography>
        <Typography variant='h4' style={{ color: "#495057", fontWeight: "bold", marginBottom: "13px" }}>2. AI 면접관이 했으면 하는 질문과 답변 시간을 입력합니다.</Typography>
        <Typography variant='h4' style={{ color: "#495057", fontWeight: "bold", marginBottom: "13px" }}>3. AI 면접관을 선택합니다.</Typography>
        <Typography variant='h4' style={{ color: "#495057", fontWeight: "bold", marginBottom: "13px" }}>4. AI 면접관이 입었으면 하는 복장을 선택합니다.</Typography>
        <Typography variant='h4' style={{ color: "#495057", fontWeight: "bold", marginBottom: "13px" }}>5. 2 ~ 4의 과정을 원하는 만큼 반복합니다.</Typography>
        <Typography variant='h4' style={{ color: "#495057", fontWeight: "bold", marginBottom: "13px" }}>6. 모의 면접을 시작합니다. 긴장을 풀고 임해주세요!</Typography>

        <Grid container justifyContent='center'>
          <Button
            variant="outlined"
            onClick={moveInterview}
            style={{ backgroundColor: "white", color: "#20c997", fontSize: "3rem", fontWeight: "bold", padding: "0px 35px", marginTop: "50px", border: "1px solid #20c997" }}
          >
            시작하기
          </Button>
        </Grid>
      </Paper>
    </Box>
  )
}

export default Home;