import React from 'react';

type TableProps<T> = {
  columns: { key: keyof T; header: string }[];
  data: T[];
  className?: string;
};

const Table = <T extends {}>({ columns, data, className }: TableProps<T>) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="py-2 px-4 bg-gray-200 border-b"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b">
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className="py-2 px-4 border-b text-center"
                >
                  {String(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
