import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = (props) => {
  const { sortColumn, columns, data, onSort } = props;
  return (
    <table className="table">
      <TableHeader sortColumn={sortColumn} columns={columns} onSort={onSort} />
      <TableBody items={data} columns={columns} />
    </table>
  );
};

export default Table;
