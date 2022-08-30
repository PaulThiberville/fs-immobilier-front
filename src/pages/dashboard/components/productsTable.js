import DashboardProduct from "../../../components/dashboardProduct";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import Loader from "../../../components/loader";
import { productsActions } from "../../../features/products";
import { useState } from "react";
import Button from "../../../components/Button";
import Status from "../../../components/status";

const StyledProductTable = styled.section`
  background-color: white;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  img {
    height: 100px;
    width: 100px;
    object-fit: cover;
  }

  table {
    border-collapse: collapse;
    thead {
      th {
        padding: 16px 0;
      }
    }
    tbody {
      tr {
        background-color: whitesmoke;
        border-top: 2px solid lightgray;
        td {
          color: grey;
        }
      }

      tr:nth-child(2n) {
        background-color: white;
      }
    }
  }
`;

export function ProductTable() {
  const products = useSelector(state => state.products.value);
  const error = useSelector(state => state.products.error);
  const loading = useSelector(state => state.products.loading);
  const [table, setTable] = useState({ rows: [], columns: null });
  const dispatch = useDispatch();

  const buildTable = () => {
    const columns = ["Image", "Status", "Création", "Action"].map(
      (column, index) => {
        return <th key={index}>{column}</th>;
      }
    );

    const rows = products.map(product => {
      return (
        <tr>
          <td align={"center"}>
            <img
              src={product.images[0]?.thumbnail_url || "/no_image.png"}
            ></img>
          </td>
          <td align={"center"}>
            <Status status={product.status} />
          </td>
          <td align={"center"}>
            {new Date(product.createdAt).toLocaleDateString("fr-FR")}
          </td>
          <td align={"center"}>
            <Button>Edit</Button>
          </td>
        </tr>
      );
    });

    console.log("table : ", { rows, columns });
    setTable({ rows, columns });
  };

  useEffect(() => {
    dispatch(productsActions.getAllProducts());
  }, []);

  useEffect(() => {
    buildTable();
  }, [products]);

  return (
    <StyledProductTable>
      {loading === true && <Loader />}
      {error === true && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>{table.columns}</tr>
        </thead>
        <tbody>{table.rows}</tbody>
      </table>
    </StyledProductTable>
  );
}
//{products &&
//    loading === false &&
//    products.map(product => {
//      return <DashboardProduct key={product._id} product={product} />;
//    })}
