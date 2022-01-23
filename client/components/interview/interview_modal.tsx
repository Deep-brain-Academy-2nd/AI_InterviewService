import { useState, useEffect, useCallback } from "react"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress } from "@material-ui/core"
import { makeVideo, findProject } from "../../services/aistudios-service";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';

const Interview_modal = (props) => {

    const aistudios = useSelector((state: RootState) => state.aiStudios);

    useEffect(() => {

        // 영상 생성
        if (props.open && props.selectedOptions?.model !== "") {
            const make = async () => {
                const data = await makeVideo({ ...aistudios, ...props.selectedOptions })

                const progress = (async () => {
                    const status = await findProject({ ...aistudios, key: data.data.key })

                    if (!status.data.video) {
                        const timeOut = setTimeout(() => {
                            progress();
                        }, 1000)
                    } else {
                        props.setLoading(false);
                        // 생성된 영상링크 면접 리스트에 저장
                        props.setInterviewList([...props.interviewList, {video: status.data.video, text: props.selectedOptions.text, time: props.selectedOptions.time}])
                    }
                })

                // 영상 생성 상태 조회
                progress();
            }

            make();
        }
    }, [props.open])

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>인터뷰 생성</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.loading ? "영상을 생성중입니다." : "영상 생성이 완료되었습니다."}
                </DialogContentText>

            </DialogContent>
            <DialogActions style={{ display: "flex", justifyContent: "center" }}>
                {
                    props.loading ?
                        <CircularProgress />
                        :
                        <>
                            <Button variant="outlined" onClick={props.handleClose}>확인</Button>
                        </>
                }
            </DialogActions>
        </Dialog>
    )
}

export default Interview_modal