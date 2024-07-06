import axios from "axios"
import { BASE_URL } from "../helper/config"
import { store } from "../store/store"
import { resetFormValue, setDropDown, setExpenses, setFormValue, setTotal } from "../slices/ExpenseSlice"
import { toast } from "react-toastify"
import { clearAllSessions, getAuthToken } from "../helper/SessionHelper"

const AxiosHeader = {headers:{"token":getAuthToken()}}

// Expense Type Dropdown Start
export async function DropdownExpenseApi () {
    try{
        let url = BASE_URL + "/expense-dropdown-type"
        let result = await axios.get(url, AxiosHeader)

        if (result.status === 200 && result.data['status'] === "success") {
            if (result.data.data.length > 0) {
                store.dispatch(setDropDown(result.data.data))
            }else {
                store.dispatch(setDropDown([]))
                toast.error("No Expense Type Found")
            }
        } 
        else {
            toast.error("Something Went Wrong " )
        }
    }

    catch{
        toast.error("Something went wrong")
        clearAllSessions();
        return false 
    }
}

// Expense Create And Update Api Start
export async function ExpenseCreateAndUpdataApi (postBody, id) {
    try{
      let url = BASE_URL + "/create-expense";

      if(id){
          url = BASE_URL + `/expense-update/${id}`;
      }

      let result = await axios.post(url, postBody, AxiosHeader)

      if(result.status===200&&result.data.status==="success"){
          toast.success(`${id ? "Update" : "Create"} Successfully`)
          store.dispatch(resetFormValue())
          return true
      }
      else{
          toast.error("Something went wrong, Try again")
          return false
      }
    }

    catch(error){
      toast.error("Something went wrong")
      clearAllSessions();
      return false
  }
}

// Expense List Api Start
export async function ListExpenseApi (pageNumber, perPage, searchKeyword) {

    let url = BASE_URL + `/expense-list/${pageNumber}/${perPage}/${searchKeyword}`

    try{
        const result = await axios.get(url, AxiosHeader)

        if(result.status===200 && result.data.status==="success"){
            if(result.data.data[0].data.length>0){
                store.dispatch(setExpenses(result.data.data[0].data))
                store.dispatch(setTotal(result.data.data[0].total))
             } 
            else{
                store.dispatch(setExpenses([]))
                store.dispatch(setTotal(0))
                toast.error("No data found")
            }
        }
        else{
            toast.error("Something went wrong")
            return false
        }
    }
    catch{
        toast.error("Something went wrong")
        clearAllSessions();
        return false 
    }

}

// Expense Details Api Start
export async function DetailsExpenseApi (id) {
    
    try{
        let url = BASE_URL + `/expense-details/${id}`;

        let result = await axios.get(url, AxiosHeader)
        if(result.status===200&&result.data.status==="success"){

            let value = result.data.data[0]
            Object.entries(value).forEach(([key, value]) => {
                store.dispatch(setFormValue({ name: key, value }));
            });
            return true
        }
        else{
            toast.error("Something went wrong")
            return false
        }
        }

    catch(error){
        toast.error("Something went wrong")
        clearAllSessions();
        return false
    }
}

// Expense Delete Api
export async function DeleteExpenseApi (id) {
    try{
        let url = BASE_URL + `/expense-delete/${id}`;

        let result = await axios.get(url, AxiosHeader)
        
        if(result.status===200&&result.data.status==="success"){
            toast.success("Delete Successfully")
            return true
        }
        else{
            toast.error("Something went wrong")
            return false
        }

        }

    catch(error){
        toast.error("Something went wrong")
        clearAllSessions();
        return false
    }
}