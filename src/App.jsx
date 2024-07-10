import './App.css'
import CustomRoutes from './Components/Routes/CustomRoutes'
import Search from './Components/Search/Search'
import { Link } from 'react-router-dom'
function App() {

  return (
    <div className='pokedex-wrapper'>
      <div className="search-box-wrapper">
          <h1 id="pokedex-heading">
            <Link to='/'>
              Pokedex
            </Link>
          </h1>
          <Search/>

      </div>
      <CustomRoutes/>
    </div>
  )
}

export default App
