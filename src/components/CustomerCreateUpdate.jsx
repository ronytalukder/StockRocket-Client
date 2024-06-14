import { useSelector } from "react-redux";
import { store } from "../store/store";
import { setFormValues } from "../slices/customerSlice";
import { toast } from "react-toastify";


const CustomerCreateUpdate = () => {


const formValue = useSelector((state) => (state.customer.formValues));

const handleCreateUpdate=() =>{



if( formValue.customerName && formValue.phone && formValue.email && formValue.address){
    toast.success("Customer created successfully");
}

else{

    if (formValue.customerName === "") {
        toast.error("Customer name is required");
    }

    if (formValue.phone === "") {   
        toast.error("Customer phone is required");
    }

    if (formValue.email === "") {
        toast.error("Customer email is required");
    }

    if (formValue.address === "") {
        toast.error("Customer address is required");
    }

}
}

    return (
        <div>
            <h1 className="text-3xl text-black font-bold mb-[50px]">Create New Customer</h1>

        <div className="flex justify-between flex-wrap">

        <label className="form-control w-[48%]">
            <div className="label">
                <span className="label-text text-xl font-bold text-purple-500">Cutomer name</span>
            </div>
            <input onChange={(e) => {store.dispatch(setFormValues({name:'customerName', value:e.target.value}))}} value={formValue?.customerName} type="text" placeholder="Type here" className="input input-bordered input-primary " />
        </label>
        <label className="form-control w-[48%]">
            <div className="label">
                <span className="label-text text-xl font-bold text-purple-500">Cutomer Phone</span>
            </div>
            <input onChange={(e) => {store.dispatch(setFormValues({name:'phone', value:e.target.value}))}} value={formValue?.phone} type="number" placeholder="Type here" className="input input-bordered input-primary " />
        </label>
        <label className="form-control w-[48%] mt-[35px]">
            <div className="label">
                <span className="label-text text-xl font-bold text-purple-500">Cutomer Email</span>
            </div>
            <input onChange={(e) => {store.dispatch(setFormValues({name:'email', value:e.target.value}))}}  value={formValue?.email} type="email" placeholder="Type here" className="input input-bordered input-primary " />
        </label>
        <label className="form-control w-[48%] mt-[35px]">
            <div className="label">
                <span className="label-text text-xl font-bold text-purple-500">Cutomer Address</span>
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

export default CustomerCreateUpdate;