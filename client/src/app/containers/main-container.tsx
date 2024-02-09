import React, { useEffect, useState } from 'react';
import { ProductsAPI } from 'app/api';
import { IProduct } from 'app/models/products';
import ProductItem from 'app/components/product-item';
import { Grid } from '@mui/material';
import MainLayout from 'app/layouts/main-layout';

export default function MainContainer() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    ProductsAPI.getProducts()
      .then((res) => {
        setProducts(res.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <MainLayout>
      <div className='products__container'>
        {products.map(item => <ProductItem key={item.id} item={item} />)}
      </div>

    </MainLayout>
  );
}
