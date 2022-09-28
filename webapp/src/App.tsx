import { store } from "./store/store";
import { RootStoreProvider } from "./store/utils";
import MainPage from "./MainPage";

function App() {
  return (
    <RootStoreProvider value={store}>
      <MainPage></MainPage>
    </RootStoreProvider>
  );
}

export default App;
