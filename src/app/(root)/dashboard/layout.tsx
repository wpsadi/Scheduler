import MainNav from "./navbar"

export default function Layout({children}:{
    children: React.ReactNode
}) {
    return (<>
       <MainNav/>
       {children}
    </>)
 
}