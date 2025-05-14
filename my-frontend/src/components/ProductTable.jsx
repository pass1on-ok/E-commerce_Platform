const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <table className="w-full table-auto border mt-4">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">Название</th>
          <th className="p-2 border">Описание</th>
          <th className="p-2 border">Цена</th>
          <th className="p-2 border">Действия</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td className="p-2 border">{product.name}</td>
            <td className="p-2 border">{product.description}</td>
            <td className="p-2 border">{product.price} ₸</td>
            <td className="p-2 border">
              <button
                onClick={() => onEdit(product)}
                className="text-blue-500 hover:underline mr-4"
              >
                Редактировать
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="text-red-500 hover:underline"
              >
                Удалить
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
