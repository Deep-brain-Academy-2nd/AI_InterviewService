import { useState } from 'react';
import { Box, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel, TextField, Typography, Button, Grid } from '@material-ui/core'
import { interview } from "../../types/interview"

const Interview_options = (props) => {

    // Options State
    const [selectedOptions, setSelectedOptions] = useState<interview>({
        lang: "",
        text: "",
        image: "",
        time: 0
    })

    // Options change handler
    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        setSelectedOptions(prev => {
            return {
                ...prev,
                [name]: value
            };
        });
    }

    // Options save handler
    const handleSubmit = () => {
        if (props.interviewList.length > 5) {
            alert("최대 다섯개까지 등록 가능합니다.")
        } else {
            props.setInterviewList([...props.interviewList, selectedOptions])
        }
    }

    return (
        <Box sx={{ height: "500px", borderRight: "1px solid #bdbdbd" }}>

            <Grid container>
                <Grid item md={12}>
                    {/* 언어 선택 */}
                    <FormControl style={{ marginBottom: "20px" }}>
                        <FormLabel id="lang-radio-buttons-group-label">언어</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="lang-radio-buttons-group-label"
                            defaultValue="ko"
                            name="lang"
                            value={selectedOptions.lang}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="ko" control={<Radio />} label="한국어" />
                            <FormControlLabel value="en" control={<Radio />} label="English" />
                            <FormControlLabel value="jp" control={<Radio />} label="日本語" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item md={12}>
                    {/* 텍스트 입력 */}
                    <Typography style={{ color: "rgba(0, 0, 0, 0.54)", marginBottom: "5px" }}>면접 질문</Typography>
                    <TextField
                        id="text"
                        name="text"
                        label="멘트"
                        variant="outlined"
                        value={selectedOptions.text}
                        onChange={handleChange}
                        style={{ marginBottom: "20px", paddingRight: "30px", width: "500px" }}
                    />
                </Grid>
                <Grid item md={12}>
                    {/* 이미지 (복장) 선택 */}
                </Grid>
                <Grid item md={12}>
                    {/* 면접 대답 시간 입력 */}
                    <Typography style={{ color: "rgba(0, 0, 0, 0.54)", marginBottom: "5px" }}>예상 답변 시간(분)</Typography>
                    <TextField
                        id="time"
                        name="time"
                        variant="outlined"
                        value={selectedOptions.time}
                        onChange={handleChange}
                        style={{ marginBottom: "20px", paddingRight: "30px", width: "500px" }}
                    />
                </Grid>
                <Grid item md={12}>
                    {/* 저장 */}
                    <Button
                        onClick={handleSubmit}
                        variant="outlined"
                        style={{ backgroundColor: "black", color: "#A8F552", fontSize: "2rem", fontWeight: "bold", padding: "0px 20px", marginTop: "40px" }}
                    >
                        저장
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="outlined"
                        style={{ backgroundColor: "black", color: "#A8F552", fontSize: "2rem", fontWeight: "bold", padding: "0px 20px", marginTop: "40px", marginLeft: "10px" }}
                    >
                        면접 시작
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Interview_options;
