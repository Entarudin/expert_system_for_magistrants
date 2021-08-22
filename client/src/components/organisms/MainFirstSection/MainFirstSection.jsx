import './MainFirstSection.css';
import {
  BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    withRouter,
    NavLink
} from "react-router-dom";
const MainFirstSection = () => {
    return (
    <div className="firstSection">
      <h1 className="MainH1">Экспертная система по подбору направления 
      для поступающих в магистратуру ИКТИБ</h1>
      <NavLink to="/auth/login"><button className="MainButton">Подобрать направление</button></NavLink>
      
    </div>
    );
  };
  
  export default MainFirstSection;