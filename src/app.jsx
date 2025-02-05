import {Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import { Create } from './components/CreatePage';

function App(){
return(
 <>
<div className="relative">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen pc-4 lg:px-20 py-4 sm:py--10">
        <h1 className="font-bold text-3xl">Notes App</h1>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/create" element={<Create/>}></Route>
            <Route path="/" ></Route>
        </Routes>

    </div>

</div>


 </>
    )
}

export default App;