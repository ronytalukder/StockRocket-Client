import { toast } from "react-toastify";
import { BASE_URL } from "../helper/config";
import { clearAllSessions, getAuthToken } from "../helper/SessionHelper";
import { setProductDropDown, setPurchases, setSupplierDropDown, setTotal } from "../slices/purchaseSlice";
import { store } from "../store/store";
import axios from "axios";



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

// Supplier Drop Down Api
export async function SupplierDropDownApi () {
    try{
        let url = BASE_URL + "/supplier-dropdown"
        let result = await axios.get(url, AxiosHeader)

        if (result.status === 200 && result.data['status'] === "success") {
            if (result.data.data.length > 0) {
                store.dispatch(setSupplierDropDown(result.data.data))
            }else {
                store.dispatch(setSupplierDropDown([]))
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


// Purchase List Api
export async function ListPurchaseApi(pageNumber, perPage, searchKeyword) {
    let url = BASE_URL  + `/purchase-list/${pageNumber}/${perPage}/${searchKeyword}`

    try{
        const result = await axios.get(url, AxiosHeader)

        if(result.status===200 && result.data.status==="success"){
            if(result.data.data[0].data.length>0){
                store.dispatch(setPurchases(result.data.data[0].data))
                store.dispatch(setTotal(result.data.data[0].total))
             } 
            else{
                store.dispatch(setPurchases([]))
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



// Create Purchase Api
export async function PurchaseCreateApi (parentBody , childBody){

    try {

        let postBody = {
            parent: parentBody,
            child: childBody
        }

        let url = BASE_URL + "/create-purchase";
        const result = await axios.post(url, postBody, AxiosHeader);

        if (result.status === 200 && result.data.status == "success") {
            return true;
        }

        else {
            toast.error("Something went wrong ");
            return false;
        }

    }

    catch {
        toast.error("Something went wrong");
        clearAllSessions();
        return false;
    }

}


// Delete Purchase Api
export async function DeletePurchaseApi(id) {

    try{
        let url = BASE_URL + `/purchase-delete/${id}`;

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