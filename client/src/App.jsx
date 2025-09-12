import { useState, useMemo, useEffect } from 'react'
import axios from 'axios'
import './index.css'
import { AppHeader } from './Components/AppHeader.jsx'
import { FilterButton } from './Components/FilterButton.jsx'
import { CardsContainer } from './Components/CardsContainer.jsx'

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);

  const categories = ["All", "Bootcut", "Wide-Leg", "Mom", "Skinny", "Baggy", "Straight", "Shorts"];

  useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
            } catch (err) {
                console.error('Error:', err)
            }
        }
        fetchProducts();
    }, [])

    const visible = useMemo(()=> {
      if(selectedCategory == "All") {
        return products;
      }
      return products.filter(product => product.category_name == selectedCategory);
    }, [selectedCategory, products])

  return (
    <>
      <div className='pt-6 pb-6 pl-20 pr-20'>
        <div className='pb-8'>
          <AppHeader />
        </div>

        <div className='flex flex-row gap-5 pb-6'>
          {categories.map((category, index) => (
            <FilterButton 
              key={index} 
              category={categories[index]} 
              isActive={selectedCategory == categories[index]} 
              onClick={() => setSelectedCategory(categories[index])} 
            />
          ))}
        </div>

        <CardsContainer products={visible} />
      </div>
    </>
  )
}

export default App
