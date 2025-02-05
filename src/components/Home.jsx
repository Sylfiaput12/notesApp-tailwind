import { useEffect, useState } from "react";
import { BsGridFill } from "react-icons/bs";
import { FaList, FaPen } from "react-icons/fa";
import { IoMdArchive } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { MdDelete, MdOutlineDelete } from "react-icons/md";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function Home() {
  const [grid, setGrid] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(""); // State untuk nilai pencarian
  const [filteredData, setFilteredData] = useState([]); // State untuk data yang sudah difilter
  const [filteredArchivedData, setFilteredArchivedData] = useState([])
  const [archivedData, setArchivedData] = useState([])
  
  
  
  useEffect(() => {
    const notesData = JSON.parse(localStorage.getItem("notesData"));
    const archivedNotes = JSON.parse(localStorage.getItem("archivedData")) || []; 

    if (Array.isArray(notesData)) {
      setData(notesData);
      setFilteredData(notesData); // Set data awal untuk tampilan pertama
    }

    if (Array.isArray(archivedNotes)){
        setArchivedData(archivedNotes)
        setFilteredArchivedData(archivedNotes)
    }
  }, []);

  useEffect(() => {
    // Filter data berdasarkan input pencarian
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.body.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
 

    const filteredArchived = archivedData.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.body.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredArchivedData(filteredArchived);
    }, [search, data, archivedData]);


    const handleDelete =(id) => {
    const getData = data.filter((item) => item.id !== id)

    localStorage.setItem('notesData', JSON.stringify(getData))
    setData(getData)
}

const handleArchive = (id, isArchived) => {
    if (isArchived) {
      // Pindahkan dari arsip ke catatan biasa
      const itemToRestore = archivedData.find((item) => item.id === id);
      const updatedArchivedData = archivedData.filter((item) => item.id !== id);

      setData([...data, itemToRestore]);
      setArchivedData(updatedArchivedData);

      localStorage.setItem("notesData", JSON.stringify([...data, itemToRestore]));
      localStorage.setItem("archivedData", JSON.stringify(updatedArchivedData));
    } else {
      // Pindahkan dari catatan biasa ke arsip
      const itemToArchive = data.find((item) => item.id === id);
      const updatedData = data.filter((item) => item.id !== id);

      setArchivedData([...archivedData, itemToArchive]);
      setData(updatedData);

      localStorage.setItem("notesData", JSON.stringify(updatedData));
      localStorage.setItem("archivedData", JSON.stringify([...archivedData, itemToArchive]));
    }
  };

  return (
    <>
      <div className="input input-bordered flex items-center gap-2 my-5 w-fit mx-5">
        <IoSearch />
        <input
          type="text"
          className="grow"
          placeholder="Search"
          value={search} // Controlled input
          onChange={(e) => setSearch(e.target.value)} // Update nilai pencarian
        />
      </div>

      <div className="flex justify-between gap-2 px-5 py-4">
        <Link to="/create" className="btn btn-md">
          <FaPen /> Create New
        </Link>
        <div className="flex gap-2">
          <button
            className={`btn btn-md btn-square ${!grid ? "bg-accent" : ""}`}
            onClick={() => setGrid(false)}
          >
            <BsGridFill />
          </button>
          <button
            className={`btn btn-md btn-square ${grid ? "bg-accent" : ""}`}
            onClick={() => setGrid(true)}
          >
            <FaList />
          </button>
        </div>
      </div>

      <div className="card-body pb-20 max-6h-[80vh]">
        <h1 className="font-bold text-2xl">My Notes</h1>
        <div className={grid ? "grid grid-cols-1 gap-2" : "grid grid-cols-1 gap-2 md:grid-cols-4"}>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <div key={index} className="card w-full shadow-xl ease-in-out duration-300 hover:-translate-y-2 hover:shadow-2xl md:h-70">
                <div className="card-body p-5 h-full">
                  <h2 className="card-title">{item.title}</h2>
                  <p className="mb-8">{item.body}</p>
                  <p className="absolute bottom-4 text-neutral">{item.createdAt}</p>
              </div>
                  <button
                    className="btn absolute btn-sm btn-neutral w-fit bottom-3 right-16" title="Archived" onClick={() => handleArchive(item.id, false)}><IoMdArchive /></button>
                  <button className="btn  absolute btn-sm btn-error w-fit bottom-3 right-3"  title="Delete" onClick={()=> handleDelete(item.id)}><MdOutlineDelete /></button>
                </div>
            ))
          ) : (
            <p>No notes found</p>
          )}
        </div> 
      </div>

      <div className="card-body pb-20 max-6h-[80vh]">
        <h1 className="font-bold text-2xl "> Archived Notes</h1>
        <div className={grid ? "grid grid-cols-1 gap-2" : "grid grid-cols-1 gap-2  md:grid-cols-4"}>
          {filteredArchivedData.length > 0 ? (
            filteredArchivedData.map((item, index) => (
              <div key={index} className="card w-full md:h-50 shadow-xl ease-in-out duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="card-body p-5 h-full relative">
                  <h2 className="card-title">{item.title}</h2>
                  <p className="mb-8">{item.body}</p>
                  <p className="absolute bottom-4 text-neutral ">{item.createdAt}</p>
              </div>
                  <button
                    className="btn absolute btn-sm btn-secondary  w-fit bottom-3 right-16" title="Unarchived" onClick={() => handleArchive(item.id, true)}><RiInboxUnarchiveFill /></button>
                  <button className="btn absolute btn-sm btn-error w-fit bottom-3 right-3 " title="Delete" onClick={()=> handleDelete(item.id)}><MdOutlineDelete /></button>
                </div>
            ))
          ) : (
            <p>No archived notes found</p>
          )}
        </div> 
      </div>
      

    </>
  );
}

export default Home;
