import React, { useEffect, useState } from 'react';
import './Home.css'

import { Link } from 'react-router-dom';

import { GETSUBCATEGORIES } from '../../functions/SubCategory';

import HeroSlide from '../hero-slide/HeroSlide';
import Catalog from './Catalog';

const Home = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [subCategories, setSubCategories] = useState([])
    const [scn]=useState([])

    useEffect(() => {


        const delayd = setTimeout(() => {
            GETSUBCATEGORIES().then((c) => {
                setSubCategories(c.data)
               c.data.map((m)=>(
                   scn.push(m.name)
               ))
             
              
                

            })
        }, 300)
        return () => clearTimeout(delayd)


    }, [scn]) 
  

  
   
  
    const { width } = windowDimensions
    useEffect(() => {
      
            setWindowDimensions(getWindowDimensions());
        

    }, [])
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }
    return (<div className='homepage container-fluid mb-0 pb-0'>
             <HeroSlide/>
        <div className='   w-100  text-center h1 '>
          
     
       
  
         </div> 
         <Catalog/>
    </div>
    

        )



}
export default Home