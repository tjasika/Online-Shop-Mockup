import { useState, useMemo } from 'react'
import products from './Data/temp.json'
import './index.css'
import { AppHeader } from './Components/AppHeader.jsx'
import { FilterButton } from './Components/FilterButton.jsx'
import { CardsContainer } from './Components/CardsContainer.jsx'

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const visible = useMemo(()=> {
    if(selectedCategory == "All") {
      return products;
    }
    return products.filter(product => product.category == selectedCategory);
  }, [selectedCategory])

  const categories = ["All", "Bootcut", "Wide-Leg", "Mom", "Skinny", "Baggy", "Straight", "Shorts"];

  return (
    <>
      <div className='p-6'>
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
