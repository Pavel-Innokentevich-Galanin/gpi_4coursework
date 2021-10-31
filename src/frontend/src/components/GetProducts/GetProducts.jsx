import { useEffect, useState } from 'react';
import axios from 'axios';

import AddProduct from './AddProduct/AddProduct';
import DownloadJSON from './DownloadJSON/DownloadJSON';
import DownloadCSV from './DownloadCSV/DownloadCSV';
import DeleteButton from './DeleteButton/DeleteButton';
import OpenFile from './OpenFile/OpenFile';

export default function GetProducts() {
    const [gpi_products, gpi_set_products] = useState([]);

    useEffect(() => { // Constructor
        gpi_set_products_arr()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function gpi_set_products_arr() {
        const arr = await gpi_get_products();
        gpi_set_products(arr);
    }

    async function gpi_get_products() {
        try {
            const GPI_URL = `${process.env.REACT_APP__API_URL}:${process.env.REACT_APP__API_PORT}/gpi_get_products`;
            const res = await axios.get(GPI_URL);
            console.log(res);
            if (res.data.err !== undefined) {
                alert(`Error \nCode: ${res.data.err.code} \nMessage: ${res.data.err.message}`);
            }
            if (res.data.length !== undefined) {
                return res.data;
            }
            return [];
        }
        catch (err) {
            console.error(err);
            alert("API error");
            return [];
        }
    }

    return (
        <div>
            <OpenFile />
            <> </>
            <DownloadJSON gpi_get_products={gpi_get_products}/>
            <> </>
            <DownloadCSV gpi_get_products={gpi_get_products}/>

            <AddProduct />

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Img</th>
                        <th>Img src</th>
                        <th>Model</th>
                        <th>Name</th>
                        <th>OnBox</th>
                        <th>KG</th>
                        <th>M3</th>
                        <th>CostBYN</th>
                        <th>Company</th>
                        <th>Category</th>
                        {/* <th>Edit</th> */}
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {gpi_products.map((value, index) => (
                        <tr key={index}>
                            <th>{value["ID"]}</th>
                            <td>
                                <img src={value["Img"]} alt="" width="64" />
                            </td>
                            <td>{value.Img}</td>
                            <td>{value.Model}</td>
                            <td>{value.Name}</td>
                            <td>{value.OnBox}</td>
                            <td>{value.KG}</td>
                            <td>{value.M3}</td>
                            <td>{value.CostBYN}</td>
                            <td>{value.Company}</td>
                            <td>{value.Category}</td>
                            {/*
                            <td>
                                <Link
                                    className="btn btn-outline-success form-control"
                                    to="/"
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </Link>
                            </td>
                            */}
                            <td>
                                <DeleteButton id={value["ID"]}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}