import { useDispatch, useSelector } from "react-redux";
import { CreateProduct } from "./CreateProduct";
import { Table, Modal } from "flowbite-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { setProducts } from "../redux/products/productSlice";

export const DashboardProducts = () => {
  const { products } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL"];

  function handleEdit(product) {
    setSelectedProduct(product);
    setOpenModal(true);
    console.log(selectedProduct);
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleDelete(id) {
    setLoading(true);
    try {
      const res = await fetch(`/api/product/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      }
      toast.success("Product Deleted");
      dispatch(setProducts(products.filter((product) => product._id !== id)));
      setLoading(false);
      setOpenModal(false);
    } catch (error) {
      console.log(error);
      toast.error(error);
      setLoading(false);
    }
  }

  async function handleUpdate(id) {
    setLoading(true);
    try {
      const res = await fetch(`/api/product/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      }
      toast.success("Product Updated");
      setLoading(false);
      setOpenModal(false);
    } catch (error) {
      console.log(error);
      toast.error(error);
      setLoading(false);
    }
  }

  return (
    <div>
      <CreateProduct />
      {selectedProduct && (
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Edit Products</Modal.Header>
          <Modal.Body>
            <div className="space-y-6 flex justify-center gap-4 ">
              <div className="flex flex-col gap-4 text-black w-full">
                <div className="flex items-center gap-4 text-black ">
                  <input
                    className="px-2 py-3 w-full"
                    type="text"
                    placeholder="Brand..."
                    id="brand"
                    onChange={handleChange}
                    defaultValue={selectedProduct.brand}
                  />
                  <input
                    className="px-2 py-3 w-full"
                    type="text"
                    placeholder="Name..."
                    id="name"
                    onChange={handleChange}
                    defaultValue={selectedProduct.name}
                  />
                </div>
                <textarea
                  className="px-2 py-3"
                  placeholder="Description..."
                  id="description"
                  onChange={handleChange}
                  defaultValue={selectedProduct.description}
                />
                <div className="flex items-center gap-4 text-black">
                  <input
                    className="px-2 py-3 w-full"
                    type="number"
                    placeholder="Price..."
                    id="price"
                    onChange={handleChange}
                    defaultValue={selectedProduct.price}
                  />
                  <input
                    className="px-2 py-3 w-full"
                    type="number"
                    placeholder="Count..."
                    id="count"
                    onChange={handleChange}
                    defaultValue={selectedProduct.count}
                  />
                </div>
                <div className="flex items-center gap-4 justify-between text-black">
                  <select
                    name="size"
                    id="size"
                    className="text-black px-1 py-2 w-full"
                    onChange={handleChange}
                  >
                    <option value={""} selected hidden>
                      Size
                    </option>
                    {sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <select
                    name="category"
                    id="category"
                    className="text-black px-1 py-2 w-full"
                    onChange={handleChange}
                  >
                    <option value={""} selected hidden>
                      Category
                    </option>
                    {categories.map((category, index) => (
                      <option key={index} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex justify-between w-full">
              <button
                disabled={loading}
                onClick={() => handleUpdate(selectedProduct._id)}
                className="px-4 py-3 border border-white  hover:bg-white/10  transition duration-300"
              >
                {loading ? "Updating..." : "Update Product"}
              </button>
              <button
                className=" px-4 py-3 border border-red-500 text-red-500  hover:bg-white/10  transition duration-300"
                onClick={() => handleDelete(selectedProduct._id)}
              >
                Delete Product
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      <h1 className="text-center my-16 uppercase font-bold text-2xl">
        Products
      </h1>
      <div className="flex justify-center">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Product Brand</Table.HeadCell>
            <Table.HeadCell>Product Name</Table.HeadCell>
            <Table.HeadCell>Product Price</Table.HeadCell>
            <Table.HeadCell>Product Count</Table.HeadCell>
            <Table.HeadCell>Product Size</Table.HeadCell>
            <Table.HeadCell>Product Category</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {products.map((product, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{product.brand}</Table.Cell>
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell>{product.price}</Table.Cell>
                <Table.Cell>{product.count}</Table.Cell>
                <Table.Cell>{product.size}</Table.Cell>
                <Table.Cell>{product.category}</Table.Cell>
                <Table.Cell>
                  <button
                    to="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
