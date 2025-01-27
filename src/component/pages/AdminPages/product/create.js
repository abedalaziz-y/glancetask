import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import '../SubCategory/Category.css';
import { GETCATEGORIES, GETCATEGORYSUBCATEGORY } from "../../../../functions/category";
import { CREATEPRODUCT } from "../../../../functions/product";
import { useNavigate } from "react-router-dom";
import Productform from "./Createform"; 
import { Progress } from 'antd';
import { SyncOutlined, DeleteOutlined } from '@ant-design/icons';
import FileUpload from "../../../fileupload/fileUpload";

const initialState = {
    title: '',
    description: '',
    price: '',
    category: '',
    categories: [],
    subcategory: [],
    shipping: '',
    quantity: '',
    images: [],
    colors: [],
    brand: '',
};

const CreateProduct = () => {
    let navigate = useNavigate();
    const [values, setValues] = useState(initialState);
    const { user } = useSelector((state) => ({ ...state }));
    const [loading, setLoading] = useState(false);
    const [subOptions, setsubOptions] = useState([]);
    const [showSubDropDown, setsshowSubDropDown] = useState(false);
    const [choose, setChoose] = useState(false);
    const [count, setCount] = useState(0);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        getallcategories();
    }, []);

    const getallcategories = () => GETCATEGORIES().then((c) => {
        setValues({ ...values, categories: c.data });
    });

    const handlcategorychange = (e) => {
        e.preventDefault();
        setsshowSubDropDown(true);
        setValues({ ...values, subcategory: [], category: e.target.value });
        GETCATEGORYSUBCATEGORY(e.target.value)
            .then(res => {
                setsubOptions(res.data);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        CREATEPRODUCT(values, user.token)
            .then((res) => {
                setLoading(false);
                setValues(initialState);
                toast.success(`${res.data.title} has been created successfully`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                window.alert(`${res.data.title} has been created successfully`);
                window.location.reload();
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.response.data.err);
            });
    };

    return (
        <div className="container-fluid">
            <div className="row justify-content-center mb-5 mt-5">
                <div className="col-auto">
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </div>

                <div className="col-auto col-md-6 mb-2">
                    {loading ? (
                        <h2 className="text-center text-danger">Loading...</h2>
                    ) : (
                        <h2 className="text-center text-info">
                            <strong>Create Product</strong>
                        </h2>
                    )}
                    <div className="border rounded-3 bg-light p-4 mt-4 shadow-lg">
                        <h5 className="text-center text-dark">
                            {loading ? (
                                <Progress type="dashboard" percent={count} width={80} />
                            ) : (
                                <h5>Upload Images</h5>
                            )}
                        </h5>
                        <FileUpload 
                            Loading={loading} 
                            setCount={setCount} 
                            setValues={setValues} 
                            values={values} 
                            loading={loading} 
                            setLoading={setLoading}
                        />
                        <Productform 
                            setValues={setValues} 
                            subOptions={subOptions} 
                            showSubDropDown={showSubDropDown} 
                            handlcategorychange={handlcategorychange} 
                            handleSubmit={handleSubmit} 
                            handleChange={handleChange} 
                            values={values} 
                            setsshowSubDropDown={setsshowSubDropDown} 
                            loading={loading} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
