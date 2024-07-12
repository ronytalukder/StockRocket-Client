import axios from "axios";
import { clearAllSessions, getAuthToken } from "../helper/SessionHelper";
import { BASE_URL } from "../helper/config";
import { store } from "../store/store";
import { setCustomerDropDown, setProductDropDown, setReturns, setTotal } from "../slices/returnSlice";
import { toast } from "react-toastify";

const AxiosHeader = { headers: { token: getAuthToken() } };


// Product Drop Down Api
export async function ProductDropDownApi () {
    try{
        let url = BASE_URL + "/product-dropdown"
        let result = await axios.get(url, AxiosHeader)

        if (result.status === 200 && result.data['status'] === "success") {
            if (result.data.data.length > 0) {
                store.dispatch(setProductDropDown(result.data.data))
            }else {
                store.dispatch(setProductDropDown([]))
                toast.error("No Product Found")
            }
        } 
        else {
            toast.error("Something Went Wrong")
        }
    }

    catch{
        toast.error("Something went wrong")
        clearAllSessions();
        return false 
    }
}

// Customer Drop Down Api
export async function CustomerDropDownApi () {
    try{
        let url = BASE_URL + "/customer-dropdown"
        let result = await axios.get(url, AxiosHeader)

        if (result.status === 200 && result.data['status'] === "success") {
            if (result.data.data.length > 0) {
                store.dispatch(setCustomerDropDown(result.data.data))
            }else {
                store.dispatch(setCustomerDropDown([]))
                toast.error("No Product Found")
            }
        } 
        else {
            toast.error("Something Went Wrong")
        }
    }

    catch{
        toast.error("Something went wrong")
        clearAllSessions();
        return false 
    }
}

// Return List Api
export async function ListReturnApi(pageNumber, perPage, searchKeyword) {
    let url = BASE_URL  + `/return-list/${pageNumber}/${perPage}/${searchKeyword}`

    try{
        const result = await axios.get(url, AxiosHeader)

        if(result.status===200 && result.data.status==="success"){
            if(result.data.data[0].data.length>0){
                store.dispatch(setReturns(result.data.data[0].data))
                store.dispatch(setTotal(result.data.data[0].total))
             } 
            else{
                store.dispatch(setReturns([]))
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

// Create Return Api
export async function ReturnCreateApi (parentBody , childBody){

    try {

        let postBody = {
            parent: parentBody,
            child: childBody
        }

        let url = BASE_URL + "/create-return";
        const result = await axios.post(url, postBody, AxiosHeader);

        if (result.status === 200 && result.data.status === "success") {
            return true;
        }

        else {
            toast.error("Something went wrong");
            return false;
        }

    }

    catch {
        toast.error("Something went wrong");
        clearAllSessions();
        return false;
    }

}

// Delete Return Api
export async function DeleteReturnApi(id) {

    try{
        let url = BASE_URL + `/return-delete/${id}`;

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