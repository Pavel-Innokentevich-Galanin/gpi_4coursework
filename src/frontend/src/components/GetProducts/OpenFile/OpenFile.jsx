import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFolderOpen,
} from '@fortawesome/free-solid-svg-icons';

import styles from "./OpenFile.module.css";

export default function OpenFile() {
    function open_file(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = async function () {
            const GPI_STR = reader.result;
            const GPI_OBJ = JSON.parse(GPI_STR);

            if (GPI_OBJ.length == null) {
                alert("File not have JSON array!");
                return;
            }

            console.log(GPI_OBJ);

            try {
                const GPI_URL = `${process.env.REACT_APP__API_URL}:${process.env.REACT_APP__API_PORT}/gpi_add_products`;
                let gpi_data = {
                    login: localStorage.getItem("login"),
                    password: localStorage.getItem("password"),
                    KEYS: [],
                    VALUES: [],
                }

                const GPI_KEYS = Object.keys(GPI_OBJ[0]);
                gpi_data["KEYS"] = GPI_KEYS;
                console.log("KEYS");
                console.log(gpi_data.KEYS);

                GPI_OBJ.forEach(arrObj => {
                    gpi_data.VALUES.push([]);
                    const id = gpi_data.VALUES.length - 1;

                    GPI_KEYS.forEach(key => {
                        gpi_data.VALUES[id].push(GPI_OBJ[id][key]);
                    })
                });
                console.log("VALUES");
                console.log(gpi_data.VALUES);

                const RES = await axios.post(GPI_URL, gpi_data);
            
                if (RES.data.err) {
                    alert(`Error! \nCode: ${RES.data.err.code} \nMessage: ${RES.data.err.message}`);
                    return;
                }

                console.log(RES);

                if (RES.data === "success") {
                    alert("Added products");
                }
            }
            catch (err) {
                console.error(err);
                alert("Err connect API")
            }
        };
    }

    return (
        <span>
            <input
                className={`${styles.open_file__input} form-control`}
                type="file"
                id="gpi_products_open_file"
                onChange={event => open_file(event)}
            />
            <label
                className="btn btn-success"
                htmlFor="gpi_products_open_file"
            >
                <FontAwesomeIcon icon={faFolderOpen} /> Open File
            </label>
        </span>
    );
}