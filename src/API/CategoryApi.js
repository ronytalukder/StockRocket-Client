import axios from "axios";
import { toast } from "react-toastify";
import { clearAllSessions, getAuthToken } from "../helper/SessionHelper";
import { BASE_URL } from "../helper/config";
import { store } from "../store/store";
import { resetFormValue } from "../slices/ExpenseTypeSlice";
import { setCategories, setFormValue, setTotal } from "../slices/categorySlice";

const AxiosHeader = {headers:{"token":getAuthToken()}}

// Category Create And Updata Api
export async function CategoryCreateAndUpdataApi (postBody, id) {
    try{
      let url = BASE_URL + "/create-category";

      if(id){
          url = BASE_URL + `/category-update/${id}`;
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

// Category List Api
export async function ListCategoryApi(pageNumber, perPage, searchKeyword){
    let url = BASE_URL + `/category-list/${pageNumber}/${perPage}/${searchKeyword}`
    try{
        const result = await axios.get(url, AxiosHeader)

        if(result.status===200 && result.data.status==="success"){
            if(result.data.data[0].data.length>0){
                store.dispatch(setCategories(result.data.data[0].data))
                store.dispatch(setTotal(result.data.data[0].total))
             } 
            else{
                store.dispatch(setCategories([]))
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

// Details Category Api 
export async function DetailsCategoryApi (id) {

    try{
        let url = BASE_URL + `/category-details/${id}`;
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

// Category Delete Api
export async function DeleteCategoryApi (id) {
    try{
        let url = BASE_URL + `/category-delete/${id}`;

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