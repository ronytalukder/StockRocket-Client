import { toast } from "react-toastify"
import { clearAllSessions, getAuthToken } from "../helper/SessionHelper"
import { BASE_URL } from "../helper/config"
import axios from "axios"
import { store } from "../store/store"
import { resetFormValues, setCustomer, setFormValues, setList } from "../slices/customerSlice"

const AxiosHeader = {headers:{"token": getAuthToken()}}

//  Customer Create And Update Api
export async function CreateAndUpdateCustomerApi (postBody, id) {

    try{
        let url = BASE_URL +"/create-customer"

        if(id){
            url = BASE_URL + `/customer-update/${id}`
        }

        let result = await axios.post(url, postBody, AxiosHeader)
        if(result.status===200 && result.data.status==="success"){
            toast.success(` Customer ${id? "Update": "Create"} Successfully`)
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

// Customer List Api 

export async function CustomerListApi(pageNumber, perPage, searchKeyword) {

try{
    let url = BASE_URL + `/customer-list/${pageNumber}/${perPage}/${searchKeyword}`

    let result = await axios.get(url, AxiosHeader)
    if (result.status === 200 && result.data.status === "success") {
        store.dispatch(setCustomer(result.data.data[0].data))
        store.dispatch(setList(result.data.data[0].total))
        
    }
    else{
        store.dispatch(setCustomer([]))
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

// Customer Details 
export async function CustomerDetailsApi(id) {

    try{
        let url = BASE_URL + `/customer-details/${id}`
        let result = await axios.get(url, AxiosHeader)

            if(result.status===200 && result.data.status==="success"){
                let value = result.data.data[0]
                // store.dispatch(setFormValues({name:"customerName", value: value.customerName}))
                // store.dispatch(setFormValues({name:"phone", vlaue: value.phone}))
                // store.dispatch(setFormValues({name:"email", vlaue: value.email}))
                // store.dispatch(setFormValues({name:"address", vlaue: value.address}))

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

export async function DeleteCustomerApi (id) {
    try{
        let url = BASE_URL + `/delete-customer/${id}`
        let result = await axios.get(url, AxiosHeader)

            if(result.status===200 && result.data.status==="success"){
                toast.success("Customer Deleted Successfully")
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