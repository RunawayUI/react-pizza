import React from 'react'

import axios from 'axios';
import ReactPaginate from 'react-paginate';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import  {setCategoryId } from '../redux/slices/filterSlice';

const Home = (  ) => {
    const dispatch = useDispatch();
    const { categoryId, sort} = useSelector(state => state.filter);




    const { searchValue } = React.useContext(SearchContext);
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);

    const onChangeCategory = id => {
        console.log(id);
        dispatch(setCategoryId(id))
    }

    React.useEffect(() => {
        setIsLoading(true);

        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sort.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `&category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        // fetch(`https://6819e68a1ac115563506e9ae.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${(order)}${search}`)
        //     .then(res => res.json())
        //     .then(arr => {
        //         if (Array.isArray(arr)) {
        //             setItems(arr);
        //         } else {
        //             setItems([])
        //             console.error('Ожидался массив, но пришло:', arr);
        //         }
        //         setIsLoading(false);
        //     })
        axios.get(`https://6819e68a1ac115563506e9ae.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${(order)}${search}`)
            .then(arr => {
                if (Array.isArray(arr.data)) {
                    setItems(arr.data);
                } else {
                    setItems([])
                    console.error('Ожидался массив, но пришло:', arr.data);
                }
                setIsLoading(false);
            })
            .catch(error => {
                setItems([])
                console.error('Пусто');
            })
        window.scrollTo(0, 0);
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />);
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination onChangePage={number => setCurrentPage(number)} />
        </div>
    )
}

export default Home