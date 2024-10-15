import React, {useState} from "react";
import axios from "axios";

export default function CreateFakultas(){
    // inisialisasi state untuk menyimpan nama fakultas
    const [namaFakultas, setNamaFakultas] = useState("");
    // inisialisasi state untuk menyimpan pesan error
    const [ error, setError] = useState("");
    // inisialisasi state untuk menyimpan pesan sukses
    const [success, setSuccess] = useState("");

    // Fungsi yang akan dijalankan saat form disubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        //validasi input jika namaFakultas kosong, set pesan error
        if (namaFakultas.trim() === "") {
            setError("Nama Fakultas is required"); //set pesan error jika input field kosong
            return; //stop eksekusi
        }

        try{
            const response = await axios.post(
                "https://project-apiif-3-b.vercel.app/api/api/fakultas",
                {
                    nama: namaFakultas, //data yang dikirim berupa objek JSON
                }
            );

            if(response.status === 201){
                //Tampilkan pesan sukses jika fakultas berhasil dibuat
                setSuccess("Fakultas created successfully");
                setNamaFakultas("");
            }else{
                //Jika tidak berhasil, maka pesan error nampil
                setError("Failed to create fakultas");
            }
        } catch (error){
            //Jika terjadi error (misal masalah jaringan dan database), tampilkan pesan error
            setError("An error occurred while creating fakultas");
        }
    };

    return(
        <div className="container mt-5">
            <h2 className="mb-4">Create Fakultas</h2>
            {/* jika ada pesan error, tampilkan alert bootstrap */}
            {error && <div className="alert alert-danger">{error}</div>}
            {/* jika ada pesan success, tampilkan alert bootstrap */}
            {success && <div className="alert alert-success">{success}</div>}
            {/* form untuk mengisi nama fakultas */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="namaFakultas" className="form-label">
                        Nama Fakultas
                    </label>
                    {/* input untuk nama fakultas dengan class bootstrap */}
                    <input type="text" className="form-control" id="namaFakultas" 
                    value={namaFakultas} //nilai input disimpan di state namaFakultas
                    onChange={(e) => setNamaFakultas(e.target.value)} //update state saat input berubah
                    placeholder="Maukkan Nama Fakultas" //placeholder teks untuk input
                    /> 
                </div>
                {/* type button submit */}
                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </div>
    )
}