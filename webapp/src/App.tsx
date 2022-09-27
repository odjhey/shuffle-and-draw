import { store } from "./store/deck";
import { RootStoreProvider } from "./store/utils";
import MainPage from "./MainPage";

function App() {
  return (
    <RootStoreProvider value={store}>
      <div className="App">
        <MainPage></MainPage>
      </div>
    </RootStoreProvider>
  );
}

export default App;
