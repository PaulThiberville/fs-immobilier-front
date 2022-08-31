import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import Loader from "../../../components/loader";
import { productsActions } from "../../../features/products";
import { useState } from "react";
import Button from "../../../components/Button";
import Status from "../../../components/status";
import { useNavigate } from "react-router-dom";

const StyledProductTable = styled.section`
  background-color: white;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 300px;
  img {
    height: 72px;
    width: 72px;
    margin: 8px;
    object-fit: cover;
  }

  table {
    border-collapse: collapse;
    margin: 8px;
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

const Tabs = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: row;
  .filler {
    flex-grow: 1;
    border-bottom: 4px solid lightgray;
  }
`;

const Tab = styled.div`
  padding: 16px;
  border-bottom: ${props =>
    props.currentTab.name === props.tab.name
      ? "4px solid green"
      : "4px solid lightgray"};
`;

const tabs = [
  { name: "Tout", search: {} },
  { name: "Pending", search: { status: "pending" } },
  { name: "Hidden", search: { status: "hidden" } },
  { name: "Visible", search: { status: "visible" } },
];

export function ProductTable() {
  const products = useSelector(state => state.products.value);
  const error = useSelector(state => state.products.error);
  const loading = useSelector(state => state.products.loading);
  const [table, setTable] = useState({ rows: [], columns: null });
  const [tab, setTab] = useState(tabs[0]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
            <img src={product.images[0]?.thumb_url || "/no_image.png"}></img>
          </td>
          <td align={"center"}>
            <Status status={product.status} />
          </td>
          <td align={"center"}>
            {new Date(product.createdAt).toLocaleDateString("fr-FR")}
          </td>
          <td align={"center"}>
            <Button
              onClick={() => navigate("/dashboard/product/" + product._id)}
            >
              Edit
            </Button>
          </td>
        </tr>
      );
    });

    console.log("table : ", { rows, columns });
    setTable({ rows, columns });
  };

  useEffect(() => {
    dispatch(productsActions.getAllProducts(tab.search));
  }, [tab]);

  useEffect(() => {
    buildTable();
    console.log(products);
  }, [products]);

  return (
    <StyledProductTable>
      <Tabs>
        {tabs.map((t, index) => {
          return (
            <Tab key={index} onClick={() => setTab(t)} currentTab={tab} tab={t}>
              {t.name}
            </Tab>
          );
        })}
        <div className="filler" />
      </Tabs>
      {loading === true && <Loader />}
      {error === true && <p>Error: {error}</p>}
      {products && !loading && (
        <table>
          <thead>
            <tr>{table.columns}</tr>
          </thead>
          <tbody>{table.rows}</tbody>
        </table>
      )}
    </StyledProductTable>
  );
}
