import { NavButton } from "./NavButton"

export const AppHeader = () => {
    const buttonIcons = ["/icons/person.svg", "/icons/bookmark.svg", "/icons/bag.svg"]
    return (
        <header className="flex flex-row justify-between">
            <div>
                <p className="font-instrument text-4xl font-medium">BILLIE JEANS</p>
            </div>
            <div className="flex flex-row gap-5">
                {buttonIcons.map((icon, index)=> (
                    <NavButton key={index} icon={buttonIcons[index]} />
                ))}
            </div>
        </header>
    )
}