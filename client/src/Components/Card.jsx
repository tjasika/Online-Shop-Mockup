import { Link } from "react-router-dom"

export const Card = ({id, name, image, price}) => {
    return (
        <Link to={`/products/${id}`} className="block">
            <div className="font-instrumental">
                <div className="h-96 w-64 overflow-hidden">
                    <img className="object-cover w-full h-full" src={image} /> 
                </div>
                <div className="flex flex-col gap-1">
                    <span className="uppercase">{name}</span>
                    <span className="font-medium">$ {price}</span>
                </div>
            </div>
        </Link>
    )
}