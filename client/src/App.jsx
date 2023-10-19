import './App.css';
import SearchInput from './components/SearchInput';
import { SelectProvider } from "./context/selectContext";

function App() {

  return (
    <SelectProvider>
    <div className="h-screen grid place-items-center bg-gradient-to-r from-sky-600 to-indigo-600">
      <SearchInput/>
    </div>
    </SelectProvider>
  )
}

export default App
