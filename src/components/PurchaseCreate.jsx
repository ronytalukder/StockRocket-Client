import { MdDeleteForever } from "react-icons/md";
import { store } from "../store/store";
import { removeSelectedProductItems, setFormValue, setSelectedProductItems, resetForm } from "../slices/purchaseSlice";
import { toast } from "react-toastify";
import { ProductDropDownApi, PurchaseCreateApi, SupplierDropDownApi } from "../API/PurchaseApi";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PurchaseCreate = () => {
    
    // Fetch product and supplier data on component mount
    useEffect(() => {
        ProductDropDownApi();
        SupplierDropDownApi();
    }, []);

    const navigate = useNavigate();

    // Get product and supplier data from Redux store
    const productDropDown = useSelector(state => state.purchase.productDropDown);
    const supplierDropDown = useSelector(state => state.purchase.supplierDropDown);

    // Get form values and selected product items from Redux store
    const parentBody = useSelector(state => state.purchase.formValue);
    let childBody = useSelector(state => state.purchase.selectedProductItems);

    // Local state for product details
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");

    // Calculate and update grand total whenever childBody or parentBody costs change
    useEffect(() => {
        let total = 0;
        for (let item of childBody) {
            total += item.total;
        }
        store.dispatch(setFormValue({ name: "grandTotal", value: total + parentBody.vatTax + parentBody.shippingCost + parentBody.otherCost - parentBody.discount }));
    }, [childBody, parentBody.discount, parentBody.vatTax, parentBody.shippingCost, parentBody.otherCost]);

    // Handle adding a product to the cart
    const handleAddToCartProduct = () => {
        if (productId && quantity && price) {
            let selectedProduct = productDropDown.find(product => product._id === productId);
            if (selectedProduct) {
                let item = {
                    productId: productId,
                    productName: selectedProduct.name,
                    quantity: quantity,
                    unitCost: price,
                    total: quantity * price
                };
                store.dispatch(setSelectedProductItems(item)); 
                // Clear inputs after adding to cart
                setProductId("");
                setQuantity("");
                setPrice("");
            } else {
                toast.error("Invalid product selected");
            }
        } else {
            toast.error("Please fill all fields");
        }
    };

    // Handle removing a product from the cart
    const removeCartProduct = (index) => {
        store.dispatch(removeSelectedProductItems(index));
    };

    // Handle creating a purchase
    const handleCretePurchase = async () => {
        // Validate child body
        if (childBody.length === 0) {
            toast.error("Please add product");
        }

        // Validate parent body fields
        if (!parentBody.supplierId) {
            toast.error("Please select Supplier");
        }
        if (!parentBody.discount) {
            toast.error("Please enter Discount");
        }
        if (!parentBody.vatTax) {
            toast.error("Please enter Vat/Tax");
        }
        if (!parentBody.shippingCost) {
            toast.error("Please enter Shipping Cost");
        }
        if (!parentBody.otherCost) {
            toast.error("Please enter Other Cost");
        }
        if (!parentBody.grandTotal) {
            toast.error("Please enter Grand Total");
        }
        if (!parentBody.details) {
            toast.error("Please enter Note");
        }

        // Create purchase API call
        let result = await PurchaseCreateApi(parentBody, childBody);
        if (result) {
            toast.success("Create Successfully");
            navigate('/purchase-list');
            // Reset form and selected products after successful purchase
            store.dispatch(resetForm());
        } else {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="mt-2">
            <div className="flex flex-col-reverse md:flex-row px-5 flex-wrap justify-between">
                {/* Left Section Start */}
                <div className="w-full md:w-[25%]">
                    <h1 className="text-3xl font-bold text-purple-500 mb-2 mt-2">Create Purchase</h1>

                    {/* Supplier Selection */}
                    <label className="form-control w-full mb-2">
                        <div className="label"> <span className="text-base font-medium text-purple-500 mb-[-4px]">Supplier</span></div>
                        <select onChange={(e) => store.dispatch(setFormValue({ name: "supplierId", value: e.target.value }))} className="select select-primary h-[40px] !min-h-[40px] w-full ">
                            <option value="">Select Supplier</option>
                            {supplierDropDown && supplierDropDown.map((item, index) => (
                                <option key={index} value={item._id}>{item.supplierName}</option>
                            ))}
                        </select>
                    </label>

                    {/* Discount Input */}
                    <label className="form-control w-full mb-2">
                        <div className="label"> <span className="text-base font-medium text-purple-500 mb-[-4px]">Discount</span> </div>
                        <input type="number" placeholder="Type here" className="input !py-2 input-primary h-[40px] input-bordered w-full"
                            onChange={(e) => {
                                const value = e.target.value.trim() === '' ? 0 : parseFloat(e.target.value);
                                store.dispatch(setFormValue({ name: "discount", value }));
                            }}
                        />
                    </label>

                    {/* VAT/Tax Input */}
                    <label className="form-control w-full mb-2">
                        <div className="label"> <span className="text-base font-medium text-purple-500 mb-[-4px]">Vat/Tax</span> </div>
                        <input type="number" placeholder="Type here" className="input input-primary h-[40px] input-bordered w-full"
                            onChange={(e) => {
                                const value = e.target.value.trim() === '' ? 0 : parseFloat(e.target.value);
                                store.dispatch(setFormValue({ name: "vatTax", value }));
                            }}
                        />
                    </label>

                    {/* Shipping Cost Input */}
                    <label className="form-control w-full mb-2">
                        <div className="label"> <span className="text-base font-medium text-purple-500 mb-[-4px]">Shipping Cost</span> </div>
                        <input type="number" placeholder="Type here" className="input input-primary h-[40px] input-bordered w-full"
                            onChange={(e) => {
                                const value = e.target.value.trim() === '' ? 0 : parseFloat(e.target.value);
                                store.dispatch(setFormValue({ name: "shippingCost", value }));
                            }}
                        />
                    </label>

                    {/* Other Cost Input */}
                    <label className="form-control w-full mb-2">
                        <div className="label"> <span className="text-base font-medium text-purple-500 mb-[-4px]">Other Cost</span> </div>
                        <input type="number" placeholder="Type here" className="input input-primary h-[40px] input-bordered w-full"
                            onChange={(e) => {
                                const value = e.target.value.trim() === '' ? 0 : parseFloat(e.target.value);
                                store.dispatch(setFormValue({ name: "otherCost", value }));
                            }}
                        />
                    </label>

                    {/* Grand Total Input (Read-Only) */}
                    <label className="form-control w-full mb-2">
                        <div className="label"> <span className="text-base font-medium text-purple-500 mb-[-4px]">Grand Total</span> </div>
                        <input value={parentBody.grandTotal} readOnly type="number" placeholder="Type here" className="input input-primary bg-purple-500 bg-opacity-[.2] font-bold outline-none focus:outline-none h-[40px] input-bordered w-full" />
                    </label>

                    {/* Note Input */}
                    <label className="form-control w-full mb-2">
                        <div className="label"> <span className="text-base font-medium text-purple-500 mb-[-4px]">Short Note</span> </div>
                        <input onChange={(e) => store.dispatch(setFormValue({ name: "details", value: e.target.value }))} type="text" placeholder="Type here" className="input input-primary h-[40px] input-bordered w-full" />
                    </label>

                    {/* Create Purchase Button */}
                    <button onClick={handleCretePurchase} className="btn btn-primary w-full mt-5">Create</button>
                </div>
                {/* Left Section End */}

                {/* Create Product Section Start */}
                <div className="w-full md:w-[70%]">
                    {/* Header for Adding Products */}
                    
                    <div className="flex justify-between flex-wrap items-end">
                        {/* Product Selection */}
                        <label className="form-control w-full md:w-[50%]">
                            <div className="label"> <span className="text-base font-medium text-purple-500">Select Product</span></div>
                            <select onChange={(e) => setProductId(e.target.value)} value={productId} className="select select-primary h-[40px] !min-h-[40px] w-full">
                                <option value="">Select Product</option>
                                {productDropDown && productDropDown.map((item, index) => (
                                    <option key={index} value={item._id}>{item.name}</option>
                                ))}
                            </select>
                        </label>

                        {/* Quantity Input */}
                        <label className="form-control w-full md:w-[15%]">
                            <div className="label"> <span className="text-base font-medium text-purple-500">Quantity</span> </div>
                            <input onChange={(e) => setQuantity(e.target.value)} value={quantity} type="number" placeholder="Type here" className="input input-primary h-[40px] input-bordered w-full" />
                        </label>

                        {/* Price Input */}
                        <label className="form-control w-full md:w-[15%]">
                            <div className="label"> <span className="text-base font-medium text-purple-500">Price</span> </div>
                            <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" placeholder="Type here" className="w-full input input-primary h-[40px] input-bordered" />
                        </label>

                        {/* Add to Cart Button */}
                        <button onClick={handleAddToCartProduct} className="w-full md:w-[15%] btn btn-primary min-h-[5px] h-[40px] mt-3">Add To Cart</button>
                    </div>


                    {/* Product Table */}
                    <div className="overflow-x-auto mt-5">
                        <table className="table-auto min-w-full divide-y divide-gray-200 border border-gray-300">
                            <thead className="bg-purple-500 bg-opacity-[.2]">
                                <tr>
                                    <th className="px-5 py-3 text-left text-purple-500 font-bold tracking-wider">Product Name</th>
                                    <th className="px-5 py-3 text-left text-purple-500 font-bold tracking-wider">Quantity</th>
                                    <th className="px-5 py-3 text-left text-purple-500 font-bold tracking-wider">Price</th>
                                    <th className="px-5 py-3 text-left text-purple-500 font-bold tracking-wider">Total</th>
                                    <th className="px-5 py-3 text-left text-purple-500 font-bold tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-warning bg-opacity-[.2] divide-y divide-gray-300">
                                {childBody && childBody.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-5 py-2 whitespace-nowrap font-medium border border-gray-300">{item.productName}</td>
                                        <td className="px-5 py-2 whitespace-nowrap font-medium border border-gray-300">{item.quantity}</td>
                                        <td className="px-5 py-2 whitespace-nowrap font-medium border border-gray-300">{item.unitCost}</td>
                                        <td className="px-5 py-2 whitespace-nowrap font-medium border border-gray-300">{item.total}</td>
                                        <td className="px-5 py-2 whitespace-nowrap font-medium border border-gray-300">
                                            <MdDeleteForever onClick={() => removeCartProduct(index)} className='text-[30px] text-error cursor-pointer'></MdDeleteForever>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Create Product Section End */}
            </div>
        </div>
    );
};

export default PurchaseCreate;
