import { Card } from "./Card"
export const CardsContainer = ({products}) => {
    return (
        <div className="grid grid-cols-5 gap-10 w-full">
            {products.map((product) => (
                <Card 
                    key={product.id} 
                    image={product.image} 
                    name={product.name} 
                    price={product.price}
                />
            ))}
        </div>
    )
}