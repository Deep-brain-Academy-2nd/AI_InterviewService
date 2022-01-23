import { useState, useEffect } from 'react';
import { Box, Paper, Grid, Button } from '@material-ui/core'
import Interview_options from '../components/interview/interview_options';
import Interview_list from '../components/interview/interview_list';
import Interview_modal from '../components/interview/interview_modal';
import Interview_play from '../components/interview/interview_play';
import { generateClientToken, generateToken } from "../services/aistudios-service";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import { setAIStudiosToken } from '../store/actions/aistudios';
import { setTokenInfo } from '../store/actions/tokenInfo';
import { interviewType } from "../types/interview"

const interview = () => {

    const dispatch = useDispatch();
    const [interviewList, setInterviewList] = useState([])
    const aistudios = useSelector((state: RootState) => state.aiStudios);

    // Options State
    const [selectedOptions, setSelectedOptions] = useState<interviewType>({
        lang: "",
        text: "",
        model: "",
        clothes: "",
        time: null
    })

    // Current Stop
    const [stepNum, setStepNum] = useState<number>(0)

    // Show Dialog State
    const [open, setOpen] = useState(false);

    // Open Dialog
    const handleClickOpen = () => {
        setOpen(true);
    };
    // Close Dialog
    const handleClose = () => {
        // 선택된 옵션 초기화
        setSelectedOptions({
            lang: "",
            text: "",
            model: "",
            clothes: "",
            time: null
        })
        setOpen(false);
        setLoading(true);
        setStepNum(0);
    };

    const [startInterview, setStartInterview] = useState<boolean>(false);

    // Loading Circular Progress
    const [loading, setLoading] = useState<boolean>(true);

    // interview start handler
    const handleStart = () => {
        setStartInterview(true)
    }

    useEffect(() => {

        // 토큰 생성, State에 저장
        const generateCT = async () => {
            const clientToken = await generateClientToken()
            const token = await generateToken(clientToken.token)
            dispatch(setAIStudiosToken(clientToken));
            dispatch(setTokenInfo(token));
        }

        generateCT();

    }, [])

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
                <Paper style={{ backgroundColor: "white", padding: "50px 0px", width: "1200px", minHeight: "600px" }}>
                    {
                        startInterview ?
                            <Interview_play
                                interviewList={interviewList}
                            />
                            :
                            <Grid container>
                                <Grid item md={7}>
                                    <Interview_options
                                        interviewList={interviewList}
                                        setInterviewList={setInterviewList}
                                        aistudios={aistudios}
                                        handleClickOpen={handleClickOpen}
                                        selectedOptions={selectedOptions}
                                        setSelectedOptions={setSelectedOptions}
                                        stepNum={stepNum}
                                        setStepNum={setStepNum}
                                    />
                                </Grid>
                                <Grid item md={5}>
                                    <Interview_list
                                        interviewList={interviewList}
                                        handleStart={handleStart}
                                    />
                                </Grid>
                            </Grid>
                    }

                </Paper>
            </Box>

            <Interview_modal
                open={open}
                handleClose={handleClose}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                interviewList={interviewList}
                setInterviewList={setInterviewList}
                loading={loading}
                setLoading={setLoading}
            />
        </>
    )

}

export default interview;