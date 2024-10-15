import React, {useEffect, useState} from "react";
import axios from "axios";

export default function CreateProdi(){
    // inisialisasi state untuk menyimpan nama prodi
    const [namaProdi, setNamaProdi] = useState("");
    // inisialisasi state untuk menyimpan ID fakultas yang dipilih
    const [fakultasId, setFakultasId] = useState("");
    // inisialisasi state untuk menyimpan daftar fakultas
    const [fakultasList, setFakultasList] = useState([]);
    // inisialisasi state untuk menyimpan pesan error
    const [ error, setError] = useState("");
    // inisialisasi state untuk menyimpan pesan sukses
    const [success, setSuccess] = useState("");

    //mengambil daftar fakultas dari API saat komponen select dimuat

    useEffect(() => {
        const fetchFakultas = async() => {
            try{
                const response = await axios.get(
                    "https://project-apiif-3-b.vercel.app/api/api/fakultas"
                );
                setFakultasList(response.data.result);
            } catch (Error){
                setError("Failed to fetch fakultas data");
            }
        };
        fetchFakultas();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

         if (namaProdi.trim() === "" || fakultasId.trim() === "") {
            setError("Nama Prodi dan Fakultas is required"); //set pesan error jika input field kosong
            return; //stop eksekusi
        }

        try{
            const response = await axios.post(
                "https://project-apiif-3-b.vercel.app/api/api/prodi",
                {
                    nama: namaProdi, //data yang dikirim berupa objek JSON
                    fakultas_id: fakultasId,
                }
            );
            if(response.status === 201){
                //Tampilkan pesan sukses jika fakultas berhasil dibuat
                setSuccess("Fakultas created successfully");
                setNamaProdi("");
                setFakultasId("");
            }else{
                //Jika tidak berhasil, maka pesan error nampil
                setError("Failed to create fakultas");
            }
        }catch (error){
            //Jika terjadi error (misal masalah jaringan dan database), tampilkan pesan error
            setError("An error occurred while creating prodi");
        }
    };

    return(
        <div className="container mt-5">
            <h2 className="mb-4">Create Prodi</h2>
            {/* jika ada pesan error, tampilkan alert bootstrap */}
            {error && <div className="alert alert-danger">{error}</div>}
            {/* jika ada pesan success, tampilkan alert bootstrap */}
            {success && <div className="alert alert-success">{success}</div>}
            {/* form untuk mengisi nama fakultas */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="namaProdi" className="form-label">
                        Nama Prodi
                    </label>
                    {/* input untuk nama fakultas dengan class bootstrap */}
                    <input type="text" className="form-control" id="namaProdi" 
                    value={namaProdi} //nilai input disimpan di state namaProdi
                    onChange={(e) => setNamaProdi(e.target.value)} //update state saat input berubah
                    placeholder="Maukkan Nama Prodi" //placeholder teks untuk input
                    /> 
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        Fakultas
                    </label>
                    {/* input untuk nama fakultas dengan class bootstrap */}
                    <select
                    className="form-select"
                    id="fakultasId"
                    value={fakultasId}
                    onChange={(e) => setFakultasId(e.target.value)} //update state saat input berubah
                    >
                        <option value="">Select Fakultas</option>
                        {fakultasList.map((fakultas) => (
                            <option key={fakultas.id} value={fakultas.id}>
                                {/* set key dan value untuk masing-masing value */}
                                {fakultas.nama}
                            </option>
                        ))}
                    </select>
                </div>
                {/* type button submit */}
                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </div>
    )
}