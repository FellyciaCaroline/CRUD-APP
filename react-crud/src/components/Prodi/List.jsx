import React, {useEffect, useState} from "react"
import axios from "axios"
import { NavLink } from "react-router-dom"
import Swal from "sweetalert2";

export default function List(){
    const[prodi, setProdi] = useState([])

    useEffect(() => {
        axios
        .get('https://project-apiif-3-b.vercel.app/api/api/prodi')
        .then((response) => {
            console.log(response.data.result)
            setProdi(response.data.result)
        })
        .catch((error) => {
            console.log('Error : ',error);
        })
    }, [])

    const handleDelete = (id, nama) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You won't be able to revert this! Fakultas: ${nama}`,
            icon: "warning",
            showCancelButton: true, confirmButtonColor: "#3085d6", cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if(result.isConfirmed){
                axios
                    .delete(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`)
                    .then((response) =>{
                        setProdi(prodi.filter((f) => f.id !== id));
                        Swal.fire("Deleted!", "Your data has been deleted.", "success");
                    })
                    .catch((error) => {
                        console.error("Error deleting data:", error);
                        Swal.fire(
                            "Error",
                            "There was an issue deleting the data.",
                            "error"
                        );
                    });
            }
        });
    };

    return(
        <>
            <h2>List Prodi</h2>

            {/* tombol tambah prodi */}
            <NavLink to="/prodi/create" className="btn btn-primary my-4">
                Create
            </NavLink>

            <table className="table">
                <thead>
                    <tr>
                        <th scope='col'>Nama Prodi</th>
                        <th scope='col'>Nama Fakultas</th>
                        <th scope='col'>#</th>
                    </tr>
                </thead>
                <tbody>
                    {prodi.map((f)=> (
                        <tr key={f.id}>
                            <td>{f.nama}</td>
                            <td>{f.fakultas.nama}</td>
                            <td>
                                <div className="btn-group" role="group" aria-label="Action buttons">
                                    <NavLink to={`/prodi/edit/${f.id}`} className="btn btn-warning">
                                    Edit
                                    </NavLink>
                                    <button onClick={() => handleDelete(f.id, f.nama)} className="btn btn-danger">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                ))}
                </tbody>
            </table>
            
        </>
    )
}