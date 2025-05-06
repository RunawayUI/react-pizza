import React from 'react'

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  const changeCategory = (index) => {
    setActiveIndex(index);
  }

  return (
    <div className="categories">
      <ul>
        {categories.map((li, index) => (
          <li key={index} onClick={() => changeCategory(index)} className={activeIndex === index ? 'active' : ''}>{li}</li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;