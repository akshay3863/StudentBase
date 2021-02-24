import "./Style/App.scss";
import Navbar from "./Componants/layout/Navbar";
import Student from "./Componants/Student/Student";
import Stu from "./Componants/Student/Stu";
import StudentFrom from "./Componants/Student/StudentForm";
import Login from "./Componants/page/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Store, { rrfProps } from "./Store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import PrivateRoute from "./Componants/Route/PrivateRoute";
function App() {
  return (
    <Provider store={Store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <PrivateRoute component={Navbar} />

          <Switch>
            <PrivateRoute exact path="/" component={Student} />
            <PrivateRoute exact path="/Student/:id" component={Stu} />
            <PrivateRoute
              exact
              path="/StudentForm/:id?"
              component={StudentFrom}
            />
            <Route exact path="/LogIn" component={Login} />
          </Switch>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
