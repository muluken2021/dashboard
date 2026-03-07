import React, { useState, useMemo } from "react";
import { 
  PencilIcon,
  TaskIcon,
  TrashBinIcon, 
} from "../../icons";
import { Modal } from "../../components/ui/modal/index";

// Mock Category Data
const initialCategories = [
  { id: 1, name: "Electronics", slug: "electronics", productCount: 156, status: "Active" },
  { id: 2, name: "Footwear", slug: "footwear", productCount: 84, status: "Active" },
  { id: 3, name: "Accessories", slug: "accessories", productCount: 42, status: "Active" },
  { id: 4, name: "Home & Kitchen", slug: "home-kitchen", productCount: 0, status: "Inactive" },
];

export default function Categories() {
  const [categories, setCategories] = useState(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  
  // Search/Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    status: "Active"
  });

  // --- Search & Filter Logic ---
  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "" || cat.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [categories, searchTerm, filterStatus]);

  // --- Handlers ---
  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({ name: "", status: "Active" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category: any) => {
    setEditingCategory(category);
    setFormData({ name: category.name, status: category.status });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.name.toLowerCase().replace(/\s+/g, '-');
    
    if (editingCategory) {
      // Edit Logic
      setCategories(categories.map(c => 
        c.id === editingCategory.id ? { ...c, name: formData.name, slug, status: formData.status } : c
      ));
    } else {
      // Add Logic
      const newCategory = {
        id: Date.now(),
        name: formData.name,
        slug,
        productCount: 0,
        status: formData.status
      };
      setCategories([newCategory, ...categories]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-title-md2 font-bold text-black dark:text-white">
            Product Categories ({filteredCategories.length})
          </h2>
          <p className="text-sm font-medium text-body">Manage your store hierarchy</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-2 rounded bg-brand-500 px-5 py-2.5 font-medium text-white hover:bg-opacity-90"
        >
          {/* <plus  className="h-5 w-5" /> */}
          Add Category
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-white/[0.03] dark:bg-white/[0.03]">
        <input
          type="text"
          placeholder="Search categories..."
          className="w-full max-w-xs rounded border border-stroke bg-gray py-2 px-4 outline-none focus:border-brand-500 dark:border-white/[0.03] dark:bg-meta-4 text-black dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="rounded border border-stroke bg-transparent px-4 py-2 outline-none dark:border-white/[0.03] text-black dark:text-white"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-white/[0.03] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="px-4 py-4 font-medium text-black dark:text-white xl:pl-11">Category Name</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Slug</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Products</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category) => (
                <tr key={category.id} className="border-b border-stroke dark:border-white/[0.03]">
                  <td className="px-4 py-5 xl:pl-11">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600/10 text-brand-500">
                        <TaskIcon className="h-5 w-5" />
                      </div>
                      <div >
                        <p className="font-medium text-black dark:text-white">{category.name}</p>
                        <span className={`text-xs text-black dark:text-gray-400 ${category.status === 'Active' ? 'text-success' : 'text-danger'}`}>
                          {category.status}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <code className="rounded bg-gray-2 px-2 py-1 text-xs dark:bg-meta-4 text-black dark:text-gray-400">
                      /{category.slug}
                    </code>
                  </td>
                  <td className="px-4 py-5 text-black dark:text-gray-400">
                    {category.productCount} items
                  </td>
                  <td className="px-4 py-5">
                    <div className=" text-black dark:text-gray-400 flex justify-end gap-3">
                      <button onClick={() => handleOpenEdit(category)} className="hover:text-brand-500 transition">
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDelete(category.id)} className="hover:text-danger transition">
                        <TrashBinIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD/EDIT MODAL */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="max-w-[500px] p-8">
        <h3 className="mb-5 text-xl font-bold text-black dark:text-white">
          {editingCategory ? "Edit Category" : "Add New Category"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2.5 block font-medium text-black dark:text-white">Category Name</label>
            <input
              type="text" required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full rounded-lg border border-stroke bg-transparent py-3 px-5 outline-none focus:border-brand-500 dark:border-white/[0.03]"
              placeholder="e.g. Electronics"
            />
          </div>
          <div>
            <label className="mb-2.5 block font-medium text-black dark:text-white">Status</label>
            <select 
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full rounded-lg border border-stroke bg-transparent py-3 px-5 outline-none focus:border-brand-500 dark:border-white/[0.03]"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button type="submit" className="w-full rounded-lg bg-brand-500 p-3 font-medium text-white hover:bg-opacity-90">
            {editingCategory ? "Update Category" : "Create Category"}
          </button>
        </form>
      </Modal>
    </>
  );
}