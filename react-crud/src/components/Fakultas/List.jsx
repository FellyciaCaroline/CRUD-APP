import React, {useEffect, useState} from "react"
import axios from "axios"

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
            <ul className="list-group">
                {fakultas.map((data)=> (
                    <li key={data.id} className="list-group-item">{data.nama}
                    </li>
                ))}
            </ul>
        </>
    )
}