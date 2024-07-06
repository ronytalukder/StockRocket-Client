import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailsExpenseApi, DropdownExpenseApi, ExpenseCreateAndUpdataApi } from "../API/ExpenseApi";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setFormValue } from "../slices/ExpenseSlice";


const ExpenseCreateUpdate = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const formValue = useSelector((state) => state.expense.formValue);
  const expenseTypeDropDown = useSelector((state) => state.expense.expenseTypeDropDown);

  useEffect(() => {

    (async () => {
        await DropdownExpenseApi()
        })();
    
        if(id){
            DetailsExpenseApi(id)
        }
    } , [])

  const handleCreateNewExpense = async (e) => {
    e.preventDefault();

    if (formValue.expenseTypeId && formValue.amount && formValue.description) {
      setLoading(true);
      const result = await ExpenseCreateAndUpdataApi(formValue, id);
      if (result) {
        setLoading(false);
        navigate("/expense-list");
      }
    } else {
      if (!formValue.expenseTypeId) {
        toast.error("Please Select Expense Type");
      }
      if (!formValue.amount) {
        toast.error("Please Enter Expense Amount");
      }
      if (!formValue.description) {
        toast.error("Please Enter Expense Date");
      }
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-black font-bold ">{id ? "Update Expense" : "Create New Expense"} </h1>

      <form onSubmit={handleCreateNewExpense} className="flex justify-between flex-wrap">
        <div className="form-control w-[47%] mt-[30px]">
          <div className="label">
            <span className="label-text-alt text-lg font-medium text-purple-500">Select Expense Type</span>
          </div>
          <select onChange={(e) => dispatch(setFormValue({ name: "expenseTypeId", value: e.target.value }))} value={formValue?.expenseTypeId}   className="select select-primary w-full" >
            <option value={""}>Select Type</option>
            {expenseTypeDropDown?.map((type) => (
              <option key={type._id} value={type._id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <label className="form-control w-[47%] mt-[30px]">
          <div className="label">
            <span className="label-text-alt text-lg font-medium text-purple-500">Amount</span>
          </div>
          <input
            onChange={(e) => dispatch(setFormValue({ name: "amount", value: e.target.value }))}
            value={formValue?.amount}
            type="number"
            placeholder="Type here"
            className="input input-primary w-full"
          />
        </label>

        <label className="form-control w-[47%] mt-[30px]">
          <div className="label">
            <span className="label-text-alt text-lg font-medium text-purple-500">Description</span>
          </div>
          <input
            onChange={(e) => dispatch(setFormValue({ name: "description", value: e.target.value }))}
            value={formValue?.description}
            type="text"
            placeholder="Type here"
            className="input input-primary w-full"
          />
        </label>

        <div className="w-[47%] mt-[30px]">
          <button className="btn btn-primary w-full" disabled={loading}>
            {id ? "Update Expense" : "Create New Expense"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseCreateUpdate;
