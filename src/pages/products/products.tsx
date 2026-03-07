import React, { useState, useMemo } from "react";
import productsData from "../../data/products.json";
import { PencilIcon, PlusIcon, TrashBinIcon } from "../../icons";
import { Modal } from "../../components/ui/modal/index";

export default function Products() {
  const [products, setProducts] = useState(productsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // Form State
  const initialForm = {
    name: "",
    price: "",
    category: "Electronics",
    stock: "",
    image: "",
  };
  const [formData, setFormData] = useState(initialForm);

  // --- Search & Filter Logic ---
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "" || p.category.toLowerCase() === filterCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, filterCategory]);

  // --- Modal Handlers ---
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      image: product.image
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  // --- File Upload Simulation ---
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  // --- CRUD Operations ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productPayload = {
        name: formData.name,
        price: parseFloat(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock),
        image: formData.image,
        status: parseInt(formData.stock) > 0 ? "In Stock" : "Out of Stock",
        rating: 4.5
      };

    if (editingProduct) {
      // EDIT
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...productPayload } : p));
    } else {
      // ADD
      const newProduct = { id: `PROD-${Date.now()}`, ...productPayload };
      setProducts([newProduct, ...products]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-bold text-black dark:text-gray-200">
          Products ({filteredProducts.length})
        </h2>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 rounded bg-brand-500 px-4.5 py-2 font-medium text-gray-200 hover:bg-opacity-90">
          <PlusIcon className="h-5 w-5" /> Add Product
        </button>
      </div>

      {/* FILTER & SEARCH */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-sm border border-gray-200 bg-white p-4 shadow-default dark:border-white/[0.03]  dark:bg-transparent">
        <div className="relative">
          <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
            <svg
              className="fill-gray-500 dark:fill-gray-400"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                fill=""
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search product name..."
            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800  dark:bg-white/[0.03] dark:text-gray-200/90 dark:placeholder:text-gray-200/30 dark:focus:border-brand-800 xl:w-[430px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

          <select 
            // className="rounded border border-gray-200 bg-transparent px-4 py-2 outline-none dark:border-gray-800 text-black dark:text-gray-500"
            className=" rounded-lg border border-gray-200 bg-transparent py-2.5 px-6 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800  dark:bg-white/[0.03] dark:text-gray-200/90 dark:placeholder:text-gray-200/30 dark:focus:border-brand-800 xl:w-[430px]"
            
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Footwear">Footwear</option>
            <option value="Accessories">Accessories</option>
          </select>
      </div>

      {/* TABLE */}
      <div className="rounded-sm border border-gray-200 bg-white shadow-default dark:border-gray-800 dark:bg-white/[0.03] dark:border-white/[0.03] ">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-white/[0.03]">
              <th className="px-4 py-4 font-medium text-black dark:text-gray-500 xl:pl-11">Product</th>
              <th className="px-4 py-4 font-medium text-black dark:text-gray-500">Category</th>
              <th className="px-4 py-4 font-medium text-black dark:text-gray-500">Price</th>
              <th className="px-4 py-4 font-medium text-black dark:text-gray-500 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b border-gray-200 dark:border-white/[0.03] ">
                <td className="px-4 py-5 xl:pl-11">
                  <div className="flex items-center gap-3">
                    <img src={product.image} className="h-12 w-12 rounded-md object-cover" alt="" />
                    <p className="font-medium text-black dark:text-gray-200">{product.name}</p>
                  </div>
                </td>
                <td className="px-4 py-5 text-black dark:text-gray-400">{product.category}</td>
                <td className="px-4 py-5 text-black dark:text-gray-200">${product.price}</td>
                <td className="px-4 py-5">
                  <div className="flex items-center justify-center space-x-3.5 dark:text-gray-300">
                    <button onClick={() => handleOpenEdit(product)} className="hover:text-brand-500"><PencilIcon className="h-5 w-5" /></button>
                    <button onClick={() => handleDelete(product.id)} className="hover:text-danger"><TrashBinIcon className="h-5 w-5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL (ADD / EDIT) */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} className="max-w-[500px] p-8">
        <h3 className="mb-5 text-xl font-bold text-black dark:text-gray-200">
          {editingProduct ? "Edit Product" : "Add New Product"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-200">
          <div className="flex flex-col items-center gap-4 mb-4">
             <img src={formData.image} className="h-24 w-24 rounded-lg object-cover border" alt="Preview" />
             <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Product Name</label>
            <input 
              type="text" placeholder="product name" required value={formData.name}
              className="w-full rounded border border-gray-200 p-3 outline-none focus:border-brand-500 dark:border-gray-800 dark:bg-white/[0.03]"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
           <div>
            <label className="block mb-2 text-sm font-medium">Description</label>
            <input 
              type="text" placeholder="Description" required value=""
              className="w-full rounded border border-gray-200 p-3 outline-none focus:border-brand-500 dark:border-gray-800 dark:bg-white/[0.03]"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="number" placeholder="Price" value={formData.price}
                            className="w-full rounded border border-gray-200 p-3 outline-none focus:border-brand-500 dark:border-gray-800 dark:bg-white/[0.03]"

              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
            <input 
              type="number" placeholder="Stock" value={formData.stock}
                            className="w-full rounded border border-gray-200 p-3 outline-none focus:border-brand-500 dark:border-gray-800 dark:bg-white/[0.03]"

              onChange={(e) => setFormData({...formData, stock: e.target.value})}
            />
          </div>
          <button type="submit" className="w-full rounded bg-brand-500 p-3 font-medium text-gray-200 hover:bg-opacity-90">
            {editingProduct ? "Update Product" : "Create Product"}
          </button>
        </form>
      </Modal>
    </>
  );
}