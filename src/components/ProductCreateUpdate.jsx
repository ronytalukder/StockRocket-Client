import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BrandDropDown, CategoryDropDown, CreateOrUpdateProductApi, ProductDetailsApi } from "../API/productApi";
import { store } from "../store/store";
import { resetFormValue, setFormValue } from "../slices/productSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

const ProductCreateUpdate = () => {
    const [loading, setLoading] = useState(false);
    const [initialImages, setInitialImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [fileInputKey, setFileInputKey] = useState(Date.now()); // Add key for resetting file input
  
    const navigate = useNavigate();
    const { id } = useParams();
  
    useEffect(() => {
      (async () => {
        await BrandDropDown();
        await CategoryDropDown();
        if (id) {
          const success = await ProductDetailsApi(id);
          if (success) {
            const currentImages = store.getState().product.formValue.images || [];
            setInitialImages(currentImages);
            setImagePreviews(currentImages.map(img => (typeof img === 'string' ? img : URL.createObjectURL(img))));
          }
        } else {
          store.dispatch(resetFormValue());
          setFileInputKey(Date.now()); // Reset file input key
          setNewImages([]); // Clear new images
          setImagePreviews([]); // Clear image previews
        }
      })();
  
      // Cleanup function to clear image previews when component unmounts
      return () => {
        setImagePreviews([]);
        store.dispatch(setFormValue({ name: 'images', value: [] }));
      };
    }, [id]);
  

    
    const formValue = useSelector((state) => state.product.formValue);
    const brandDropDown = useSelector((state) => state.product.brandDropDown);
    const categoryDropDown = useSelector((state) => state.product.categoryDropDown);
  
    const handleCreateOrUpdateProduct = async (e) => {
      e.preventDefault();
  
      if (formValue.name && formValue.unit && formValue.details && formValue.categoryId && formValue.brandId) {
        setLoading(true);
  
        const formData = new FormData();
        formData.append("name", formValue.name);
        formData.append("unit", formValue.unit);
        formData.append("details", formValue.details);
        formData.append("categoryId", formValue.categoryId);
        formData.append("brandId", formValue.brandId);
  
        // Add new images to formData
        newImages.forEach(image => {
          formData.append("images", image);
        });
  
        let result = await CreateOrUpdateProductApi(formData, id);
        if (result) {
          setLoading(false);
          navigate('/product-list');
        }
      }
      
      else {
        if (!formValue.name) toast.error("Please enter product name");
        if (!formValue.unit) toast.error("Please enter product unit");
        if (!formValue.details) toast.error("Please enter product details");
        if (!formValue.categoryId) toast.error("Please select product category");
        if (!formValue.brandId) toast.error("Please select product brand");
        setLoading(false);
      }
    };
  
    const handleImageChange = (e) => {
      const files = Array.from(e.target.files);
      setNewImages(files);
      const imagePreviewsArray = files.map(file => URL.createObjectURL(file));
      setImagePreviews(imagePreviewsArray);
    };
  
    const handleRemoveImage = (index) => {
      const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
      setImagePreviews(newImagePreviews);
  
      const newFiles = newImages.filter((_, i) => i !== index);
      setNewImages(newFiles);
    };
  
    return (
      <div>
        <h1 className="text-4xl text-black font-bold ">{id ? 'Update Product' : 'Create New Product'} </h1>
  
        <form onSubmit={handleCreateOrUpdateProduct} className="flex justify-between flex-wrap">
          
          {/* Product Name */}
          <div className="form-control w-[47%] mt-[30px]">
            <label className="label">
              <span className="label-text-alt text-lg font-medium text-purple-500">Product Name</span>
            </label>
            <input onChange={(e) => store.dispatch(setFormValue({ name: 'name', value: e.target.value }))} value={formValue?.name} type="text" placeholder="Enter product name" className="input input-primary w-full" />
          </div>
  
          {/* Unit */}
          <div className="form-control w-[47%] mt-[30px]">
            <label className="label">
              <span className="label-text-alt text-lg font-medium text-purple-500">Unit</span>
            </label>
            <input onChange={(e) => store.dispatch(setFormValue({ name: 'unit', value: e.target.value }))} value={formValue?.unit} type="text" placeholder="Enter unit" className="input input-primary w-full" />
          </div>
  
          {/* Details */}
          <div className="form-control w-[47%] mt-[30px]">
            <label className="label">
              <span className="label-text-alt text-lg font-medium text-purple-500">Details</span>
            </label>
            <input onChange={(e) => store.dispatch(setFormValue({ name: 'details', value: e.target.value }))} value={formValue?.details} type="text" placeholder="Enter details" className="input input-primary w-full" />
          </div>
  
          {/* Category Dropdown */}
          <div className="form-control w-[47%] mt-[30px]">
            <label className="label">
              <span className="label-text-alt text-lg font-medium text-purple-500">Select Category</span>
            </label>
            <select onChange={(e) => store.dispatch(setFormValue({ name: 'categoryId', value: e.target.value }))} value={formValue?.categoryId} className="select select-primary w-full">
              <option value=''>Select Category</option>
              {categoryDropDown?.map((category) => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
  
          </div>
  
          {/* Brand Dropdown */}
          <div className="form-control w-[47%] mt-[30px]">
            <label className="label">
              <span className="label-text-alt text-lg font-medium text-purple-500">Select Brand</span>
            </label>
            <select onChange={(e) => store.dispatch(setFormValue({ name: 'brandId', value: e.target.value }))} value={formValue?.brandId} className="select select-primary w-full">
              <option value=''>Select Brand</option>
              {brandDropDown?.map((brand) => (
                <option key={brand._id} value={brand._id}>{brand.name}</option>
              ))}
            </select>
          </div>
  
          {/* Image Upload */}
          <div className="form-control w-[47%] mt-[30px]">
            <label className="label">
              <span className="label-text-alt text-lg font-medium text-purple-500">Upload Images</span>
            </label>
            <input
              key={fileInputKey} // Key to reset the input
              type="file"
              multiple
              onChange={handleImageChange}
              className="input input-primary w-full"
            />
          </div>
  
          {/* Image Previews */}
          <div className="w-[47%] mt-[30px] flex flex-wrap">
            {imagePreviews.map((src, index) => (
              <div key={index} className="w-[48%] m-[1%] relative">
                <img src={src} alt={`Preview ${index}`} className="w-full h-auto" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
  
          {/* Submit Button */}
          <div className="w-[47%] mt-[30px]">
            <button className="btn btn-primary w-full" disabled={loading}>
              {id ? 'Update Product' : 'Create New Product'}
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default ProductCreateUpdate;