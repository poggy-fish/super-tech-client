import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdStar } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../../../features/products/productsApi";
import { categories, subCategories } from "../../../../Utils/LocalData";
import Loading from "../../../Shared/Loading/Loading";
import Error from "../../../Shared/Error/Error";
import { toast } from "react-hot-toast";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const { id } = useParams();
  const {
    data: updateProductData,
    isLoading,
    isError,
    error,
  } = useGetProductQuery(id);
  const {
    _id,
    name: initialName,
    price: initialPrice,
    description: initialDescription,
    category: initialCategory,
  } = updateProductData?.data || {};

  const [updateProduct, { isSuccess }] = useUpdateProductMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();
  const onSubmit = (data) => {
    const { category, ...others } = data;
    const finalCategory = category.split(",")[1];
    const finalData = { ...others, category: finalCategory };
    updateProduct({ id, data: finalData });
  };
  const subCategoryFilter = subCategories?.filter(
    (subCategory) =>
      Number(subCategory.id) === Number(selectedCategory.split(",")[0])
  );
  useEffect(() => {
    if (isSuccess) {
      reset();
      toast.success("Product Updated", { id: "updateProduct" });
      navigate("/dashboard/manage-products");
    }
  }, [isSuccess, navigate, reset]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let content = null;

  if (isLoading) {
    content = <Loading />;
  } else if (!isLoading && isError) {
    content = <Error />;
  } else if (!isLoading && !isLoading && _id) {
    content = (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl mx-auto lg:mt-10 border border-gray-300 px-3 py-10 rounded-md shadow-md"
      >
        <h2 className=" text-2xl font-semibold mb-5 ">Update Product</h2>
        <div className="">
          <section className="sm:flex items-center justify-between gap-5 mb-4">
            <div className="flex flex-col w-full mb-4 sm:mb-0">
              <label
                className="mb-2 text-base font-semibold flex"
                htmlFor="name"
              >
                Product Name <IoMdStar className="text-red-500" size={11} />
              </label>
              <input
                id="name"
                type="text"
                defaultValue={initialName}
                placeholder="Type Product Name"
                className={`border block outline-none py-2 px-3 w-full rounded-md drop-shadow-md focus:drop-shadow-none ${
                  errors.name
                    ? " border-red-500 focus:border-red-500"
                    : "focus:border-slate-700 border-slate-300"
                }`}
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
              />
              {errors.name && (
                <span className="label-text-alt text-red-500 text-sm ">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label
                className="mb-2 text-base font-semibold flex"
                htmlFor="price"
              >
                Price <IoMdStar className="text-red-500" size={11} />
              </label>
              <input
                id="price"
                type="number"
                defaultValue={initialPrice}
                placeholder="Type Product Price"
                className={`border block outline-none py-2 px-3 w-full rounded-md drop-shadow-md focus:drop-shadow-none ${
                  errors.price
                    ? " border-red-500 focus:border-red-500"
                    : "focus:border-slate-700 border-slate-300"
                }`}
                {...register("price", {
                  required: {
                    value: true,
                    message: "Price is required",
                  },
                  min: {
                    value: 0,
                    message: "Price can't be negative",
                  },
                  valueAsNumber: true,
                })}
              />
              {errors.price && (
                <span className="label-text-alt text-red-500 text-sm ">
                  {errors.price.message}
                </span>
              )}
            </div>
          </section>

          <section className="sm:flex items-center justify-between gap-5 mb-4">
            <div className="flex flex-col w-full mb-4 sm:mb-0">
              <label
                className="mb-2 text-base font-semibold flex"
                htmlFor="category"
              >
                Product Category <IoMdStar className="text-red-500" size={11} />
              </label>
              <select
                defaultValue={selectedCategory}
                id="category"
                type="text"
                placeholder="Type Product Name"
                className={`border capitalize cursor-pointer block outline-none py-2 px-3 w-full rounded-md drop-shadow-md focus:drop-shadow-none ${
                  errors.category
                    ? " border-red-500 focus:border-red-500"
                    : "focus:border-slate-700 border-slate-300"
                }`}
                {...register("category", {
                  required: {
                    value: true,
                    message: "Category is required",
                  },
                  onChange: (e) => setSelectedCategory(e.target.value),
                })}
              >
                <option className="" disabled selected value={""}>
                  Select Category
                </option>
                {categories.map((category) => (
                  <option
                    value={[category.id, category.value]}
                    className="capitalize"
                  >
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="label-text-alt text-red-500 text-sm ">
                  {errors.category.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label
                className="mb-2 text-base font-semibold flex"
                htmlFor="subCategory"
              >
                Product Sub Category{" "}
                <IoMdStar className="text-red-500" size={11} />
              </label>
              <select
                id="subCategory"
                placeholder="Type Product Name"
                className={`border capitalize cursor-pointer block outline-none py-2 px-3 w-full rounded-md drop-shadow-md focus:drop-shadow-none ${
                  errors.subCategory
                    ? " border-red-500 focus:border-red-500"
                    : "focus:border-slate-700 border-slate-300"
                }`}
                {...register("subCategory", {
                  required: {
                    value: true,
                    message: "Sub Category is required",
                  },
                })}
              >
                <option className="" disabled selected value={""}>
                  Select Sub Category
                </option>
                {subCategoryFilter?.map((subCategory) => (
                  <option value={subCategory.value} className="capitalize">
                    {subCategory.name}
                  </option>
                ))}
              </select>
              {errors.subCategory && (
                <span className="label-text-alt text-red-500 text-sm ">
                  {errors.subCategory.message}
                </span>
              )}
            </div>
          </section>

          <div className="flex flex-col w-full">
            <label
              className="mb-2 text-base font-semibold flex"
              htmlFor="description"
            >
              Description <IoMdStar className="text-red-500" size={11} />
            </label>
            <textarea
              className={`border outline-none py-2 px-3 rounded-md drop-shadow-md focus:drop-shadow-none ${
                errors.description
                  ? " border-red-500 focus:border-red-500"
                  : "focus:border-slate-700 border-slate-300"
              }`}
              id="description"
              cols="10"
              defaultValue={initialDescription}
              rows="5"
              {...register("description", {
                required: {
                  value: true,
                  message: "Description is required",
                },
              })}
            ></textarea>
            {errors.description && (
              <span className="label-text-alt text-red-500 text-sm ">
                {errors.description.message}
              </span>
            )}
          </div>
          <div className="border-b border-gray-300 mt-5 mb-3 w-full"></div>
        </div>

        <div className="text-center">
          <input
            type="submit"
            value="Submit"
            className="mt-5 bg-slate-600 text-white w-full max-w-xs px-4 py-2.5 rounded-md hover:bg-slate-800 font-semibold cursor-pointer transition-all duration-200 ease-in-out shadow-xl shadow-gray-400"
          />
        </div>
      </form>
    );
  }

  return <section>{content}</section>;
};

export default UpdateProduct;