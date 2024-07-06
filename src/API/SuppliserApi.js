import axios from "axios";
import { BASE_URL } from "../helper/config";
import { clearAllSessions, getAuthToken } from "../helper/SessionHelper";
import { toast } from "react-toastify";
import { store } from "../store/store";
import { resetFormValues, setFormValues, setList, setSuppliers } from "../slices/SupplierSlice";

const AxiosHeader = {headers:{"token": getAuthToken()}}

//  Supplier Create And Update Api
export async function SupplierCreateAndUpdateApi (postBody, id) {

    try{
        let url = BASE_URL +"/create-supplier"

        if(id){
            url = BASE_URL + `/supplier-update/${id}`
        }

        let result = await axios.post(url, postBody, AxiosHeader)
        if(result.status===200 && result.data.status==="success"){
            toast.success(` Supplier ${id? "Update": "Create"} Successfully`)
            store.dispatch(resetFormValues())
            return true
        }
        else if(result.status===200 && result.data.status==="fail"){
            if(result.data.data.keyPattern.phone===1){
                toast.error("Phone Number Already Exist")
            }
        }
        else{
            toast.error("Something went wrong")
            return false
        }
    }

    catch(error){
        toast.error("Something went wrong")
        clearAllSessions()
        return false
    }
}

// Supplier List Api 

export async function SupplierListApi(pageNumber, perPage, searchKeyword) {

    try{
        let url = BASE_URL + `/supplier-list/${pageNumber}/${perPage}/${searchKeyword}`
    
        let result = await axios.get(url, AxiosHeader)
        if (result.status === 200 && result.data.status === "success") {
            store.dispatch(setSuppliers(result.data.data[0].data))
            store.dispatch(setList(result.data.data[0].total))
            
        }
        else{
            store.dispatch(setSuppliers([]))
            store.dispatch(setList(0))
            toast.error("No Data Found")
        }
    }
    
    catch(error){
        toast.error("Something went wrong")
        clearAllSessions()
        return false
    }
    
}

// Supplier Details 
export async function SupplierDetailsApi(id) {

    try{
        let url = BASE_URL + `/supplier-details/${id}`
        let result = await axios.get(url, AxiosHeader)

            if(result.status===200 && result.data.status==="success"){
                let value = result.data.data[0]
                Object.entries(value).forEach(([key, value]) => {
                    store.dispatch(setFormValues({name: key, value: value}))
                } )

                return true

            }
            else{
                toast.error("Something went wrong")
                return false
            }

    }
    catch(error){
        toast.error("Something went wrong")
        clearAllSessions()
        return false
    }

}

// Cutomer Delete Api
export async function DeleteSupplierApi (id) {
    try{
        let url = BASE_URL + `/delete-supplier/${id}`
        let result = await axios.get(url, AxiosHeader)

            if(result.status===200 && result.data.status==="success"){
                toast.success("Supplier Deleted Successfully")
                return true

            }
            if (result.status===200 && result.data.status==="associate"){
                toast.error(result.data.data)
            }
            else{
                toast.error("Something went wrong")
                return false
            }

    }
    catch(error){
        toast.error("Something went wrong")
        clearAllSessions()
        return false
    }

}