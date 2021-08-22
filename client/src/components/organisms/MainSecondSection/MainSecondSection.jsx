import './MainSecondSection.css';
const MainSecondSection = () => {
    return (
    <div className="secondSection">
<h1 className="mainPageSecondTitle"> 
Почему стоит выбрать наш сервис
</h1>
<div className="ddd">
<div className="s4">
  <img src="icons/title_1.png" className="t_1" />
  <h5 className="reasons">Всегда свежая и актуальная информация</h5>
</div>
<div className="s4">
<img src="icons/title_2.png" className="t_1" />  
<h5 className="reasons">Рекомендации для существующих специальностей</h5>
</div>   
</div>
<div className="ddd">
<div className="s4">
<img src="icons/title_3.png" className="t_1" />  
<h5 className="reasons">Расширяющаяся база вопросов</h5>
</div>
<div className="s4">
<img src="icons/title_4.png" className="t_1" /> 
<div className="rsn">
<h5 className="reasons">Удобный интерфейс</h5></div>
</div>
</div>
</div>
    );
  };
  
  export default MainSecondSection;