import axios from "axios";
import { BASE_URL } from "../helper/config";
import { clearAllSessions, getAuthToken } from "../helper/SessionHelper";
import { toast } from "react-toastify";
import { store } from "../store/store";
import { resetFormValue, setExpenseTypeList, setFormValue, setTotal } from "../slices/ExpenseTypeSlice";

const AxiosHeader = {headers:{"token":getAuthToken()}}

// Create Expense Type And Update Start
export async function CreateAndUpdataExpenseTypeApi (postBody, id) {

    try{
        let url = BASE_URL + "/create-expense-type";

        if(id){
            url = BASE_URL + `/expense-update-type/${id}`;
        }

        let result = await axios.post(url, postBody, AxiosHeader)
        if(result.status===200&&result.data.status==="success"){
            toast.success(`${id ? "Update" : "Create"} Successfully`)
            store.dispatch(resetFormValue())
            return true
        }
        else if (result.status===200&&result.data.status==='fail'){
            if (result.data.data.keyPattern.phone === 1) {
                toast.error("Phone Already Exist");
                return false;
              }
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

// Expense Type List Api Start
export async function ListExpenseTypeApi(pageNumber, perPage, searchKeyword) {
    let url = BASE_URL  + `/expense-list-type/${pageNumber}/${perPage}/${searchKeyword}`
    try{
        const result = await axios.get(url, AxiosHeader)
        if(result.status===200 && result.data.status==="success"){
            if(result.data.data[0].data.length>0){
                store.dispatch(setExpenseTypeList(result.data.data[0].data))
                store.dispatch(setTotal(result.data.data[0].total))
             } 
            else{
                store.dispatch(setExpenseTypeList([]))
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
export async function DetailsExpenseTypeApi (id) {
    try{
        let url = BASE_URL + `/expense-details-type/${id}`;

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

// Delete Expense Type Api Start
export async function ExpenseTypeDeleteApi(id) {

    try{
        let url = BASE_URL + `/expense-type-delete/${id}`;

        let result = await axios.get(url, AxiosHeader)
        
        if(result.status===200&&result.data.status==="success"){
            toast.success("Delete Successfully")
            return true
        }

        if(result.status===200&&result.data.status==="associate"){
            toast.error(result.data.data)
            return false
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
