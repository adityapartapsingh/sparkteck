import React from 'react';
import { Plus, Search, Filter, ArrowUpDown } from 'lucide-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.accessor('name', {
    header: 'Product Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('category', {
    header: 'Category',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('stock', {
    header: 'Stock',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('price', {
    header: 'Price',
    cell: info => `$${info.getValue().toFixed(2)}`,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        info.getValue() === 'In Stock' 
          ? 'bg-green-100 text-green-800'
          : info.getValue() === 'Low Stock'
          ? 'bg-yellow-100 text-yellow-800'
          : 'bg-red-100 text-red-800'
      }`}>
        {info.getValue()}
      </span>
    ),
  }),
];

const data: Product[] = [
  {
    id: '1',
    name: 'Wireless Earbuds',
    category: 'Electronics',
    stock: 45,
    price: 99.99,
    status: 'In Stock',
  },
  {
    id: '2',
    name: 'Smart Watch',
    category: 'Electronics',
    stock: 5,
    price: 199.99,
    status: 'Low Stock',
  },
  {
    id: '3',
    name: 'Laptop Stand',
    category: 'Accessories',
    stock: 0,
    price: 29.99,
    status: 'Out of Stock',
  },
];

function Inventory() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Inventory Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border rounded-lg w-full sm:w-64"
              />
            </div>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Filter className="w-5 h-5" />
                <span>Filter</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <ArrowUpDown className="w-5 h-5" />
                <span>Sort</span>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="border-b bg-gray-50">
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="border-b hover:bg-gray-50">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Inventory;