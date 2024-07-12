import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryCreateAndUpdataApi, DetailsCategoryApi } from "../API/CategoryApi";
import { toast } from "react-toastify";
import { store } from "../store/store";
import { setFormValue } from "../slices/categorySlice";

const CategoryCreateUpdate = () => {
    let [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const formValue = useSelector((state) => state.category.formValue);
    


    const { id } = useParams();



    useEffect(() => {
      if (id) {
        DetailsCategoryApi(id);
      }
    }, [id]);


    const handleCreateCategory = async (e) => {
        e.preventDefault()
        if(formValue.name){
            setLoading(true)
            let result = await CategoryCreateAndUpdataApi(formValue, id)
            if (result === true) {
                setLoading(false)
                navigate('/category-list')
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
        <h1 className="text-4xl text-black font-bold ">{id ? 'Update Category' : 'Create New Category'} </h1>            
    
        <form onSubmit={handleCreateCategory} className="">
    
            <label className="form-control w-[47%] mt-[30px]  ">
                <div className="label">
                    <span className="label-text-alt text-lg font-medium text-purple-500">Category Name</span>
                </div>
                <input onChange={(e)=>{ store.dispatch(setFormValue({name:'name', value : e.target.value })) }} value={formValue?.name} type="text" placeholder="Type here" className="input input-primary w-full" />
            </label>
    
            <div className="w-[47%] mt-[30px]  ">
            <button className="btn btn-secondary w-full"> {id ? 'Update Category' : 'Create New Category'} </button>
            </div>
    
        </form>
    </div>
    );
};

export default CategoryCreateUpdate;