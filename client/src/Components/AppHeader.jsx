import { NavButton } from "./NavButton"
import { useNavigate } from "react-router-dom"

export const AppHeader = ({isLoggedIn}) => {
    const navigate = useNavigate();
    const buttonIcons = ["/icons/person.svg", "/icons/bookmark.svg", "/icons/bag.svg"]
    const paths = [
        isLoggedIn? "/account":"/login", 
        "/saved", 
        "/cart"
    ]
    return (
        <header className="flex flex-row justify-between">
            <div>
                <p className="font-instrument text-4xl font-medium">BILLIE JEANS</p>
            </div>
            <div className="flex flex-row gap-5">
                {buttonIcons.map((icon, index)=> (
                    <NavButton key={index} icon={buttonIcons[index]} onClick={()=>navigate(paths[index])} />
                ))}
            </div>
        </header>
    )
}