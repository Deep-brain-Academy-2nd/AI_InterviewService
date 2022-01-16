import { useSession, signIn, signOut } from "next-auth/react" // NextAuth Library

const Home = () => {
  const { data: session } = useSession();

  // Logged in
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  // Not Logged in
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}

export default Home;