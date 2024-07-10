import axios from "axios";
import { BASE_URL } from "../helper/config";
import { clearAllSessions, getAuthToken } from "../helper/SessionHelper";
import { store } from "../store/store";
import { resetFormValue, setBrandDropDown, setCategoryDropDown, setFormValue, setProducts, setTotal } from "../slices/productSlice";
import { toast } from "react-toastify";


const AxiosHeader = { headers: { 'token': getAuthToken() } };



// Brand Drop Down Api
export async function BrandDropDown () {
    try{
        let url = BASE_URL + "/brand-dropdown"
        let result = await axios.get(url, AxiosHeader)

        if (result.status === 200 && result.data['status'] === "success") {
            if (result.data.data.length > 0) {
                store.dispatch(setBrandDropDown(result.data.data))
            }else {
                store.dispatch(setBrandDropDown([]))
                toast.error("No Brand Found")
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


// Category Drop Down Api
export async function CategoryDropDown () {
    try{
        let url = BASE_URL + "/category-dropdown"
        let result = await axios.get(url, AxiosHeader)

        if (result.status === 200 && result.data['status'] === "success") {
            if (result.data.data.length > 0) {
                store.dispatch(setCategoryDropDown(result.data.data))
            }else {
                store.dispatch(setCategoryDropDown([]))
                toast.error("No Category Found")
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

// Create or Update Product API
export async function CreateOrUpdateProductApi(formData, id) {
  try {
    let url = BASE_URL + '/create-product';
    if (id) {
      url = BASE_URL + `/product-update/${id}`;
    }

    const result = await axios.post(url, formData, AxiosHeader);

    if (result.status === 200 && result.data.status === 'success') {
      toast.success(`${id ? 'Update' : 'Create'} Successfully`);
      store.dispatch(resetFormValue());
      return true;
    } else {
      toast.error('Something went wrong, Try again');
      return false;
    }
  } catch (error) {
    toast.error('Something went wrong');
    clearAllSessions();
    return false;
  }
}


// List Products API
export async function ListProductsApi(pageNumber, perPage, searchKeyword) {
  let url = BASE_URL  + `/product-list/${pageNumber}/${perPage}/${searchKeyword}`

  try{
      const result = await axios.get(url, AxiosHeader)

      if(result.status===200 && result.data.status==="success"){
          if(result.data.data[0].data.length>0){
              store.dispatch(setProducts(result.data.data[0].data))
              store.dispatch(setTotal(result.data.data[0].total))
           } 
          else{
              store.dispatch(setProducts([]))
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

// Product Details API
export async function ProductDetailsApi(id) {
  const url = BASE_URL + `/product-details/${id}`;
  try {
    const result = await axios.get(url, AxiosHeader);

    if (result.status === 200 && result.data.status === 'success') {
      const value = result.data.data[0];
      Object.entries(value).forEach(([key, val]) => {
        store.dispatch(setFormValue({ name: key, value: val }));
      });
      return true;
    }
    
    else {
      toast.error('Something went wrong');
      return false;
    }
  } catch (error) {
    toast.error('Something went wrong');
    clearAllSessions();
    return false;
  }
}



// Delete Product API
export async function DeleteProductApi(id) {
  const url = BASE_URL + `/product-delete/${id}`;
  try {
    const result = await axios.get(url, AxiosHeader);

    if (result.status === 200 && result.data.status === 'success') {
      toast.success('Delete Successfully');
      return true;
    }

    if (result.status === 200 && result.data.status === 'associate') {
      toast.error(result.data.data);
      return false;
    } else {
      toast.error('Something went wrong');
      return false;
    }
  } catch (error) {
    toast.error('Something went wrong');
    clearAllSessions();
    return false;
  }
}
