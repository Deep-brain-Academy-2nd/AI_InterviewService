import { useState } from 'react';
import { Box, Paper, Grid } from '@material-ui/core'
import Interview_options from '../components/interview/interview_options';
import Interview_list from '../components/interview/interview_list';

const interview = () => {

    const [interviewList, setInterviewList] = useState([])

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh'}}>
          <Paper style={{ backgroundColor: "#BCFF66", padding: "50px", minWidth: "1000px" }}>
            <Grid container>
                <Grid item md={9}>
                    <Interview_options
                        interviewList={interviewList}
                        setInterviewList={setInterviewList}
                    />
                </Grid>
                <Grid item md={3}>
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