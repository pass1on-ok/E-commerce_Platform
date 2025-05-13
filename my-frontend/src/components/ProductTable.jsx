const ProductTable = ({ products }) => {
  return (
    <table className="w-full table-auto border mt-4">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">Название</th>
          <th className="p-2 border">Описание</th>
          <th className="p-2 border">Цена</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td className="p-2 border">{product.name}</td>
            <td className="p-2 border">{product.description}</td>
            <td className="p-2 border">{product.price} ₸</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
