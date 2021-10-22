
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import store from './Redux/store'; 


function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
