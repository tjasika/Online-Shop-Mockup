export const NavButton = ({icon}) => {
    return (
        <button className="hover:cursor-pointer">
            <img src={icon} className="w-5 h-5"></img>
        </button>
    )
}