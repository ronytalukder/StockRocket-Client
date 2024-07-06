import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SupplierCreateAndUpdateApi, SupplierDetailsApi } from "../API/SuppliserApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { store } from "../store/store";
import { setFormValues } from "../slices/SupplierSlice";


const SupplierCreateUpdate = () => {

    let [loading,   setLoading] =useState(false);

    const {id} = useParams();
    
    useEffect(() => {   
    
        if(id){
            SupplierDetailsApi(id)
        }
    
    }, []);
    
    const navigate = useNavigate();
    
    
    const formValue = useSelector((state) => (state.supplier.formValues));


    const handleCreateUpdate=() =>{

        if( formValue.supplierName && formValue.phone && formValue.email && formValue.address){
            setLoading(true)
           let result = SupplierCreateAndUpdateApi(formValue, id)
           if (result){
            navigate('/supplier-list')
            setLoading(false)
           }
           else{
            setLoading(false)
           }
        
        }
        
        else{
        
            if (formValue.supplierName === "") {
                toast.error("Supplier name is required");
            }
        
            if (formValue.phone === "") {   
                toast.error("Supplier phone is required");
            }
        
            if (formValue.email === "") {
                toast.error("Supplier email is required");
            }
        
            if (formValue.address === "") {
                toast.error("Supplier address is required");
            }
        
        }
        }


        return (
            <div>
                <h1 className="text-3xl text-black font-bold mb-[50px]"> {id?"Update Supplier":"Create Supplier"} </h1>
    
            <div className="flex justify-between flex-wrap">
    
            <label className="form-control w-[48%]">
                <div className="label">
                    <span className="label-text text-xl font-bold text-purple-500">Supplier name</span>
                </div>
                <input onChange={(e) => {store.dispatch(setFormValues({name:'supplierName', value:e.target.value}))}} value={formValue?.supplierName} type="text" placeholder="Type here" className="input input-bordered input-primary " />
            </label>
            <label className="form-control w-[48%]">
                <div className="label">
                    <span className="label-text text-xl font-bold text-purple-500">Supplier Phone</span>
                </div>
                <input onChange={(e) => {store.dispatch(setFormValues({name:'phone', value:e.target.value}))}} value={formValue?.phone} type="number" placeholder="Type here" className="input input-bordered input-primary " />
            </label>
            <label className="form-control w-[48%] mt-[35px]">
                <div className="label">
                    <span className="label-text text-xl font-bold text-purple-500">Supplier Email</span>
                </div>
                <input onChange={(e) => {store.dispatch(setFormValues({name:'email', value:e.target.value}))}}  value={formValue?.email} type="email" placeholder="Type here" className="input input-bordered input-primary " />
            </label>
            <label className="form-control w-[48%] mt-[35px]">
                <div className="label">
                    <span className="label-text text-xl font-bold text-purple-500">Supplier Address</span>
                </div>
                <input onChange={(e) => {store.dispatch(setFormValues({name:'address', value:e.target.value}))}}  value={formValue?.address} type="text" placeholder="Type here" className="input input-bordered input-primary " />
            </label>
    
            <div className="w-[48%] mt-[35px]">
            <button onClick={handleCreateUpdate} className="btn btn-secondary w-full">Create</button>
            </div>
            
            
            </div>
    
    
            </div>
        );
};

export default SupplierCreateUpdate;