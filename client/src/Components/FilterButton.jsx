export const FilterButton = ({category, isActive, onClick}) => {
    return (
        <button  onClick={onClick}
                className={`w-30 outline border-zinc-900 p-1 rounded-3xl text-md hover:cursor-pointer
                ${isActive
                    ? "bg-zinc-700 text-white border-zinc-900"
                    : "bg-white text-zinc-800 border-zinc-300 hover:bg-zinc-100"}`}>            
            {category}
        </button>
    )
}