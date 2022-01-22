import { useState, useEffect } from 'react';
import { Box, Paper, Grid } from '@material-ui/core'
import Interview_options from '../components/interview/interview_options';
import Interview_list from '../components/interview/interview_list';
import { generateClientToken, generateToken } from "../services/aistudios-service";
import { useDispatch } from 'react-redux';
import { setAIStudiosToken } from '../store/actions/aistudios';
import { setTokenInfo } from '../store/actions/tokenInfo';

const interview = () => {

    const dispatch = useDispatch();
    const [interviewList, setInterviewList] = useState([])

    useEffect(() => {
        
        // 토큰 생성, State에 저장
        const generateCT = async () => {
            const clientToken = await generateClientToken()
            console.log(clientToken)
            const token = await generateToken(clientToken.token)
            dispatch(setAIStudiosToken(clientToken));
            dispatch(setTokenInfo(token));
        }

        generateCT();

    }, [])

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh'}}>
          <Paper style={{ backgroundColor: "#BCFF66", padding: "50px", width: "1200px", minHeight: "600px" }}>
            <Grid container>
                <Grid item md={7}>
                    <Interview_options
                        interviewList={interviewList}
                        setInterviewList={setInterviewList}
                    />
                </Grid>
                <Grid item md={5}>
                    <Interview_list 
                        interviewList={interviewList}
                    />
                </Grid>
            </Grid>
          </Paper>
        </Box>
      )
        
}

export default interview;