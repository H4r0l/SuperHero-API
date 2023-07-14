import './index.css'
import { Provider } from 'react-redux'
import store from './components/storage'
import Gallery from "./components/Gallery";

function App() {

  return (
      <Provider store={store}>
        <Gallery />
      </Provider>
  );
}

export default App
