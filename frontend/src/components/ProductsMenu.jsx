import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/userHandle';

const ProductsMenu = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    // ... rest of your component
}; 