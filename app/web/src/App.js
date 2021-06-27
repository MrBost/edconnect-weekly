import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './shared/Layout'
import Home from './Home'
import Login from './Login' 
import Project from './Project'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Signup from './Signup';
import CreateProject from './CreateProject';
import EditProject from './EditProject';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>
        <Route exact={true} path="/projects/submit" component={CreateProject}/> 
        <Route exact={true} path="/projects/:id" component={Project}/> 
        <Route path="/editproject" component={EditProject}/>
        <Route path="*" render={()=><Layout><div className="text-center p-5"><h1>Oops!!! Page not found</h1></div></Layout> }/>
      </Switch>
    </Router>
  );
}

export default App;
