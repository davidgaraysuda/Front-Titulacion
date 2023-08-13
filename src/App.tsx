import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import React, { useContext } from 'react';
import SliderMenu from './components/SiderMenu';
import { AppContext } from './context/AppContext';
import Login from './login/Login';

function App() {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error("Contexto no proporcionado");
  }

  const { loggedIn } = appContext;

  return (
    <BrowserRouter>
      <Layout>
        {loggedIn ? (
          <SliderMenu />
        ) : (
          <Login />
        )}
      </Layout>
    </BrowserRouter>
  );
}

export default App;
