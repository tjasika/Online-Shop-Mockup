export const NavButton = ({icon, onClick}) => {
    return (
        <button className="hover:cursor-pointer" onClick={onClick}>
            <img src={icon} className="w-5 h-5"></img>
        </button>
    )
}