import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { BrandCreateAndUpdataApi, DetailsBrandApi } from '../API/BrandApi';
import { toast } from 'react-toastify';
import { store } from '../store/store';
import { setFormValue } from '../slices/brandSlice';


const BrandCreateUpdate = () => {
    let [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const formValue = useSelector((state) => state.brand.formValue);
    


    const { id } = useParams();



    useEffect(() => {
      if (id) {
        DetailsBrandApi(id);
      }
    }, [id]);


    const handleCreateBrand = async (e) => {
        e.preventDefault()
        if(formValue.name){
            setLoading(true)
            let result = await BrandCreateAndUpdataApi(formValue, id)
            if (result === true) {
                setLoading(false)
                navigate('/brand-list')
            }
            else {
                setLoading(false)
            }
        }
    
        else{
            if(!formValue.name){
                toast.error("Name is required")
            }
    
        }
    }
    


    return (
        <div>
        <h1 className="text-4xl text-black font-bold ">{id ? 'Update Brand' : 'Create New Brand'} </h1>            
    
        <form onSubmit={handleCreateBrand} className="">
    
            <label className="form-control w-[47%] mt-[30px]  ">
                <div className="label">
                    <span className="label-text-alt text-lg font-medium text-purple-500">Brand Name</span>
                </div>
                <input onChange={(e)=>{ store.dispatch(setFormValue({name:'name', value : e.target.value })) }} value={formValue?.name} type="text" placeholder="Type here" className="input input-primary w-full" />
            </label>
    
            <div className="w-[47%] mt-[30px]  ">
            <button className="btn btn-secondary w-full"> {id ? 'Update Brand' : 'Create New Brand'} </button>
            </div>
    
        </form>
    </div>
    );
};

export default BrandCreateUpdate;