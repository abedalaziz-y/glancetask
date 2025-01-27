

import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {GETSUBCATEGORYPRODUCTS}from '../../functions/SubCategory'



const SubCategoryProduct = () => {
    const [subcategory, setSubcategory] = useState({})
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const { slug } = useParams()
        console.log(slug)
    const getprodcts = () => {
        setLoading(true)
        GETSUBCATEGORYPRODUCTS(slug).then((res) => {
            console.log(res)
            setSubcategory(res.data.subcategory)
            setProducts(res.data.products)
            setLoading(false)
        })
    }
    useEffect(() => {
        getprodcts()
    }, [])
    return (<>
        <div className="  container-fluid bestsellerspage ">
      
            


        </div>
    </>
    )
}
export default SubCategoryProduct