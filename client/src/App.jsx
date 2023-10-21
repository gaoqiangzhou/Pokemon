import './App.css';
import SearchInput from './components/SearchInput';
import { SelectProvider } from "./context/selectContext";
import { PokeInfoProvider } from './context/PokeInfoContext';
import PokemonCardList from './components/PokemonCardList';
import { usePokemonInfo } from './context/PokeInfoContext';

function App() {
  const { pokemons } = usePokemonInfo();
  return (
    <SelectProvider>
      <PokeInfoProvider>
        <div className="h-screen w-screen bg-gradient-to-r from-sky-600 to-indigo-600">
          <div className="w-full h-full grid grid-cols-3 grid-rows-5">
            <div className="col-span-3 row-span-1 justify-self-center"><img src = "https://drive.google.com/uc?export=view&id=16JW-S_WDxEs8DXxp9ZM2ik_DnrakUffP" className= "w-[200px]"/></div>
            <div className="row-span-4">
              <SearchInput/>
              <PokemonCardList/>
              </div>
            <div className="row-span-4">Factors</div>
            <div className="row-span-4">Result</div>
          </div>
        </div>
      </PokeInfoProvider>
    </SelectProvider>
  )
}

export default App
