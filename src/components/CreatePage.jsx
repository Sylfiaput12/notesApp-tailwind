import { useState } from "react"
import { Link } from "react-router-dom"

export const Create =()=>{

    const [formData, setFormData] = useState({
        id: '',
        title:'',
        body:'',
        createdAt:'',

    })

    const handleChange = (e) =>{
        const {name,value} = e.target
        setFormData((values)=> ({
            ...values, [name]: value
        }))
    }

    const handleClick =() =>{
        const getId = JSON.parse(localStorage.getItem('notesData') || '[]')
        const newId = getId.length + 1
        const date = new Date().toISOString().slice(0,10)

        const newData = { ...formData, id: newId, createdAt: date}
        const saveData = [ ...getId, newData] 

        localStorage.setItem('notesData', JSON.stringify(saveData))

        alert('Data Berhasil Disimpan')

    }

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        if(newTitle.length <=50){
            setFormData((values)=>({
                ...values,title: newTitle
            }))
        }
    }
    return(
        <>
        <div className="py-8">
        <Link to="/" className="btn btn-sm w-fit">Kembali</Link>

        </div>
        <div className="card bg-white shadow-xl">
        <div className="card-body">
        <h1 className="text text-bold text-2xl mb-10">Create Notes</h1>

        <div className="mb-2">
        <input type="text" placeholder="Title Notes" className="input input-bordered w-full "  name="title" value={formData.title} onChange={handleTitleChange} />
        <small className="text-gray-500">
              {50 - formData.title.length} characters remaining
            </small>
        </div>
        <textarea className="textarea textarea-bordered h-40" placeholder="Bio" name="body" value={formData.body} onChange={handleChange} ></textarea>
        <button className="btn btn-sm w-fit" onClick={handleClick}>Simpan</button>
        </div>
        </div>
        </>
    )
}