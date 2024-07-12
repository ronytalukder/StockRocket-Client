import axios from "axios"
import { toast } from "react-toastify"
import { clearAllSessions, getAuthToken } from "../helper/SessionHelper";
import { BASE_URL } from "../helper/config";
import { store } from "../store/store";
import { resetFormValue, setBrands, setFormValue, setTotal } from "../slices/brandSlice";

const AxiosHeader = {headers:{"token":getAuthToken()}}


// Brand Create And Updata Api
export async function  BrandCreateAndUpdataApi (postBody, id) {
    try{
      let url = BASE_URL + "/create-brand";

      if(id){
          url = BASE_URL + `/brand-update/${id}`;
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

// Brand List Api
export async function ListBrandApi(pageNumber, perPage, searchKeyword){

    let url = BASE_URL + `/brand-list/${pageNumber}/${perPage}/${searchKeyword}`

    try{
        const result = await axios.get(url, AxiosHeader)

        if(result.status===200 && result.data.status==="success"){
            if(result.data.data[0].data.length>0){
                store.dispatch(setBrands(result.data.data[0].data))
                store.dispatch(setTotal(result.data.data[0].total))
             } 
            else{
                store.dispatch(setBrands([]))
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

// Details Brand Api 
export async function DetailsBrandApi (id) {

    try{

        let url = BASE_URL + `/brand-details/${id}`;

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

// Brand Delete Api
export async function DeleteBrandApi (id) {
    try{
        let url = BASE_URL + `/brand-delete/${id}`;

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