import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CreateAndUpdataExpenseTypeApi, DetailsExpenseTypeApi } from "../API/ExpenseTypeApi";
import { toast } from "react-toastify";
import { store } from "../store/store";
import { setFormValue } from "../slices/ExpenseTypeSlice";

const ExpenseTypeCreateUpdate = () => {

    let [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const formValue = useSelector((state) => state.expenseType.formValue);
    


    const { id } = useParams();



    useEffect(() => {
      if (id) {
        DetailsExpenseTypeApi(id);
      }
    }, [id]);


    const handleCreateExpenseType = async (e) => {
        e.preventDefault()
        if(formValue.name){
            setLoading(true)
            let result = await CreateAndUpdataExpenseTypeApi(formValue, id)
            if (result === true) {
                setLoading(false)
                navigate('/expense-type-list')
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
        <h1 className="text-4xl text-black font-bold ">{id ? 'Update Expense Type' : 'Create New Expense Type'} </h1>            
    
        <form onSubmit={handleCreateExpenseType} className="">
    
            <label className="form-control w-[47%] mt-[30px]  ">
                <div className="label">
                    <span className="label-text-alt text-lg font-medium text-purple-500">Expense Type Name</span>
                </div>
                <input onChange={(e)=>{ store.dispatch(setFormValue({name:'name', value : e.target.value })) }} value={formValue?.name} type="text" placeholder="Type here" className="input input-primary w-full" />
            </label>
    
            <div className="w-[47%] mt-[30px]  ">
            <button className="btn btn-secondary w-full"> {id ? 'Update Expense Type' : 'Create New Expense Type'} </button>
            </div>
    
        </form>
    </div>
    );
};

export default ExpenseTypeCreateUpdate;