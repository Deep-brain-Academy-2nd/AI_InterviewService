import { useState } from 'react';
import {
    Box, Typography, Button, Grid,
    ImageList, ImageListItem, ImageListItemBar
} from '@material-ui/core'
import {TextField, Stepper, Step, StepLabel} from "@mui/material"
import { getModelList } from "../../services/aistudios-service";

const Interview_options = (props) => {

    // Model List
    const [modelList, setModelList] = useState([])

    const stepLabel = [
        '질문',
        '면접관',
        '복장'
    ];

    // Selected Model
    const [selectedModel, setSelectedModel] = useState<any>({})

    // Step Number handler
    const stepNext = () => {

        // Step 0 - 면접 질문, 답변시간 입력, 면접관 리스트 호출
        if (props.stepNum === 0) {
            
            // Validation
            if (props.selectedOptions.text === "" || props.selectedOptions.time === 0) {
                alert ("면접 질문과 시간을 입력해주세요!")
            } else {
                const getML = async () => {
                    const modelList = await getModelList(props.aistudios)
                    setModelList(modelList?.models)
                }
    
                getML();

                props.setStepNum(props.stepNum + 1)
            }
        }

        // Step 1 - 면접관 선택
        else if (props.stepNum === 1) {

            // Validation
            if (!selectedModel?.id) {
                alert ("면접관을 선택해주세요!")
            } else {
                props.setSelectedOptions(prev => {
                    return {
                        ...prev,
                        model: selectedModel?.id,
                        lang: selectedModel?.language[0]
                    };
                });

                props.setStepNum(props.stepNum + 1)
            }
        }
    }
    const stepGoBack = () => {
        
        if (props.stepNum > 0) {
            setSelectedModel({})
            props.setStepNum(props.stepNum - 1)
        }
    }

    // Options change handler
    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        props.setSelectedOptions(prev => {
            return {
                ...prev,
                [name]: value
            };
        });
    }

    // Options save handler
    const handleSubmit = () => {
        // if (props.interviewList.length > 5) {
        //     alert("최대 다섯개까지 등록 가능합니다.")
        // } else {
        //     props.setInterviewList([...props.interviewList, selectedOptions])
        // }

        // Validation
        if (props.selectedOptions.clothes === "") {
            alert("복장을 선택해주세요.")
        } else {
            props.handleClickOpen(true);
        }
    }

    return (
        <Box sx={{ minHeight: "500px", borderRight: "1px solid #bdbdbd" }}>

            <Stepper activeStep={props.stepNum} alternativeLabel style={{ backgroundColor: "white", marginBottom: "35px" }}>
                {stepLabel.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {/* Step 0 */}
            {
                props.stepNum === 0 &&
                <Grid container justifyContent='center'>
                    <Grid item md={8}>
                        {/* 텍스트 입력 */}
                        <Typography style={{ color: "rgba(0, 0, 0, 0.54)", marginBottom: "8px" }}>면접 질문</Typography>
                        <TextField
                            id="text"
                            name="text"
                            label="멘트"
                            variant="outlined"
                            value={props.selectedOptions.text || ""}
                            onChange={handleChange}
                            style={{ marginBottom: "20px", paddingRight: "30px", width: "500px" }}
                        />
                    </Grid>
                    <Grid item md={8}>
                        {/* 면접 대답 시간 입력 */}
                        <Typography style={{ color: "rgba(0, 0, 0, 0.54)", marginBottom: "8px" }}>예상 답변 시간(초)</Typography>
                        <TextField
                            id="time"
                            name="time"
                            variant="outlined"
                            value={props.selectedOptions.time || ""}
                            onChange={handleChange}
                            style={{ marginBottom: "20px", paddingRight: "30px", width: "500px" }}
                        />
                    </Grid>
                </Grid>
            }

            {/* Step 1 */}
            {
                props.stepNum === 1 && modelList &&
                <ImageList style={{ padding: "15px 20px" }}>
                    {modelList.map((model) => (
                        <ImageListItem key={model.id}>
                            <img
                                src={model.imgPath}
                                alt={model.id}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={model.label.ko}
                                subtitle={<span>언어: {model?.language[0] === "ko" ? "한국어" : model?.language[0] === "en" ? "영어" : model?.language[0] === "jp" ? "일본어" : "중국어"}</span>}
                                position="bottom"
                                actionIcon={
                                    <Button
                                        variant="outlined"
                                        style={{ 
                                            marginRight: 5,
                                            backgroundColor: selectedModel.id === model.id && "#20c997"
                                        }}
                                        onClick={() => setSelectedModel(model)}
                                    >
                                        선택
                                    </Button>
                                }
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            }

            {/* Step 2 */}
            {
                props.stepNum === 2 && selectedModel &&
                <ImageList style={{ padding: "15px 20px" }}>
                    {selectedModel?.clothes.map((item) => (
                        <ImageListItem key={item.id}>
                            <img
                                src={item.imgPath}
                                alt={item.id}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={item.label.ko}
                                position="bottom"
                                actionIcon={
                                    <Button
                                        variant="outlined"
                                        style={{ 
                                            marginRight: 5,
                                            backgroundColor: props.selectedOptions.clothes === item.id && "#20c997"
                                        }}
                                        onClick={() => props.setSelectedOptions({...props.selectedOptions, clothes: item.id})}
                                    >
                                        선택
                                    </Button>
                                }
                            />
                        </ImageListItem>
                    ))}
                </ImageList>

            }
            <Grid item md={12}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    {/* 저장 */}
                    <Button
                        onClick={stepGoBack}
                        variant="outlined"
                        style={{ backgroundColor: "white", color: "#20c997", fontSize: "2rem", fontWeight: "bold", padding: "0px 20px", marginTop: "40px", border: "1px solid #20c997" }}
                    >
                        이전
                    </Button>
                    <Button
                        onClick={props.stepNum !== 2 ? stepNext : handleSubmit}
                        variant="outlined"
                        style={{ backgroundColor: "white", color: "#20c997", fontSize: "2rem", fontWeight: "bold", padding: "0px 20px", marginTop: "40px", marginLeft: "10px", border: "1px solid #20c997" }}
                    >
                        {props.stepNum !== 2 ? "다음" : "저장"}
                    </Button>
                </Box>
            </Grid>
        </Box >
    )
}

export default Interview_options;
