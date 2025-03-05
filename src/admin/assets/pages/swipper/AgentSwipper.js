import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function DescribeList() {
  const [selectedName, setSelectedName] = useState("");
  const [list, setList] = useState([
    { id: 1, name: "Principle/Director" },
    { id: 2, name: "Employee" },
    { id: 3, name: "Contractor" },
  ]);

  const options = ["Principle/Director", "Employee", "Contractor",];

  const handleAdd = () => {
    if (selectedName.trim() !== "" && !list.some((item) => item.name === selectedName)) {
      setList([...list, { id: list.length + 1, name: selectedName }]);
      setSelectedName("");
    }
  };

  const handleDelete = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  return (
<div className="min-h-screen w-full flex justify-center items-center bg-gray-200">
    <div className="p-8 w-[80%] max-w-4xl h-[80vh] bg-white shadow-lg rounded-2xl flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Describe List</h2>
      
      {/* Dropdown List */}
      <div className="flex gap-2 mb-4">
        <select
          className="border rounded-lg p-2 flex-1"
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)}
        >
          <option value="">Select a Name</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Add
        </button>
      </div>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-purple-500 text-white">
            <th className="p-3 text-left">S.No</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={item.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-blue-50"}>
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{item.name}</td>
              <td className="p-3 flex gap-2">
                <Pencil className="text-yellow-500 cursor-pointer" size={20} />
                <Trash2 className="text-red-500 cursor-pointer" size={20} onClick={() => handleDelete(item.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
</div>
  );
}
