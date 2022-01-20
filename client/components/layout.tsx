import { ReactNode } from 'react'
import { AppBar, Box, Typography, Button, Grid, ButtonGroup } from '@material-ui/core'
import Router from "next/router"
import Link from "next/link"
import { getProfile } from "../services/user-service";
import { useDispatch, useSelector } from "react-redux";
import { setUsername } from "../store/actions/user";
import { RootState } from "../store/reducers";

type Props = {
    children: ReactNode
}

const Layout = ({ children }: Props) => {

    const dispatch = useDispatch();
    const username = useSelector((state: RootState) => state.user.username);

    const moveSignin = () => Router.push("/login") // Click Sign in button
    const moveSignUp = () => Router.push("/register") // Click Sign up button

    // Click Log out button
    const logout = () => {
        if (!sessionStorage.getItem("accessToken")) {
            return;
        }

        sessionStorage.removeItem("accessToken");
        dispatch(setUsername(""));
        Router.push('/');
    }

    // Get Username
    async function loadProfile() {
        const result = await getProfile(); // Call API

        if (result['name']) {
            dispatch(setUsername(result['name']));
        }
    }

    loadProfile(); // Load profile (username) 

    return (
        <Box>
            <AppBar style={{padding: "0 20%", height: "100px", display: "flex", justifyContent: "center"}}>
                <Grid container justifyContent='space-between' alignItems='center'>
                    <Grid item md={2}>
                        <Link href="/"><Typography style={{ cursor: "pointer", fontSize: "20px" }}>AI-INTERVIEW</Typography></Link>
                    </Grid>
                    <Grid item md={2}>
                        {
                            // 로그인전 버튼 - 회원가입, 로그인
                            // 로그인후 버튼 - 마이페이지, 로그아웃
                            username !== "" ?
                                <Grid container justifyContent='flex-end' alignItems='center' spacing={2}>
                                    <Grid item md={2}>
                                        <Typography>{username}</Typography>
                                    </Grid>
                                    <Grid item md={10}>
                                        <ButtonGroup>
                                            <Button onClick={logout}>Sign Out</Button>
                                            <Button >My Page</Button>
                                        </ButtonGroup>
                                    </Grid>
                                </Grid>
                                :
                                <Grid container justifyContent='flex-end' alignItems='center' spacing={2}>
                                    <Grid item md={2}>
                                        {/* Empty space */}
                                    </Grid>
                                    <Grid item md={10}>
                                        <ButtonGroup>
                                            <Button onClick={moveSignin}>Sign In</Button>
                                            <Button onClick={moveSignUp}>Sign Up</Button>
                                        </ButtonGroup>
                                    </Grid>
                                </Grid>
                        }

                    </Grid>
                </Grid>
            </AppBar>

            <Box component="main">
                {children}
            </Box>

        </Box>
    )

}

export default Layout