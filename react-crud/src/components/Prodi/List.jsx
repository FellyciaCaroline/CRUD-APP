import React, {useEffect, useState} from "react"
import axios from "axios"
import { NavLink } from "react-router-dom"

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
                    </tr>
                </thead>
                <tbody>
                    {prodi.map((data)=> (
                        <tr key={data.id}>
                            <td>{data.nama}</td>
                            <td>{data.fakultas.nama}</td>
                        </tr>
                ))}
                </tbody>
            </table>
            
        </>
    )
}