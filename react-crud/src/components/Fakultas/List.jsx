import React, {useEffect, useState} from "react"
import axios from "axios"
import { NavLink } from "react-router-dom"

export default function List(){
    const[fakultas, setFakultas] = useState([])

    useEffect(() => {
        axios
        .get('https://project-apiif-3-b.vercel.app/api/api/fakultas')
        .then((response) => {
            console.log(response.data.result)
            setFakultas(response.data.result)
        })
        .catch((error) => {
            console.log('Error : ',error);
        })
    }, [])

    return(
        <>
            <h2>List Fakultas</h2>

            {/* tombol tambah fakultas */}
            <NavLink to="/fakultas/create" className="btn btn-primary my-4">
                Create
            </NavLink>

            {/* daftar fakultas */}
            <table className="table">

            </table>

            <ul className="list-group">
                {fakultas.map((data)=> (
                    <li key={data.id} className="list-group-item">{data.nama}
                    </li>
                ))}
            </ul>
        </>
    )
}