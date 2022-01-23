import ReactPlayer from 'react-player/lazy';
import React, { useEffect, useState } from "react";
import { Box, Typography } from '@material-ui/core';
import Router from 'next/router';

const Interview_play = props => {

    const [playIndex, setPlayIndex] = useState<number>(0);
    const [answerView, setAnswerView] = useState<boolean>(false);

    const handleNextVideo = (videoList: any[], playIndex: number) => {

        // 면접 대답 state
        setAnswerView(true);

        // 면접 답변 시간 setTimeout
        setTimeout(() => {

            // 면접 종료
            if (playIndex === videoList.length - 1) {
                setPlayIndex(0);
                alert("면접이 종료되었습니다.")
                Router.push("/")
            } 
            // 다음 영상 넘어감
            else {
                setPlayIndex(playIndex + 1);
                setAnswerView(false);
            }
        }, videoList[playIndex]?.time * 6000)
    }

    if (props.interviewList === null) return <p>Loading...</p>;

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {
                answerView ?
                    <Typography variant="h4" style={{marginTop: "40px"}}>질문에 답변해주세요.</Typography>
                    :
                    <ReactPlayer
                        url={props.interviewList[playIndex].video}
                        playing
                        controls
                        muted={false}
                        progressInterval={1000}
                        pip={true}
                        onEnded={() => { handleNextVideo(props.interviewList, playIndex) }}
                        width={'800px'}
                        height={'500px'}
                    />
            }
        </Box>
    )

}

export default Interview_play;