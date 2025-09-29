import { Link } from "react-router-dom"

export const Card = ({id, name, image, image2, price}) => {
    return (
        <Link to={`/products/${id}`} className="block">
            <div className="font-instrumental">
                <div className="h-96 w-60 overflow-hidden group relative">
                    <img className="object-cover w-full h-full  inset-0 absolute transition-opacity duration-300 opacity-100 group-hover:opacity-0" src={image} />
                    <img className="object-cover w-full h-full  inset-0 absolute transition-opacity duration-300 opacity-0 group-hover:opacity-100" src={image2} /> 
                </div>
                <div className="flex flex-col gap-1">
                    <span className="uppercase truncate h-5">{name}</span>
                    <span className="font-medium">$ {price}</span>
                </div>
            </div>
        </Link>
    )
}