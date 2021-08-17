import Footer from '../../organisms/Footer/Footer';
import Header from '../../organisms/Header/Header';
import FirstInfoLine from '../../molecules/FirstInfoLine/FirstInfoLine';
import SecondInfoLine from '../../molecules/SecondInfoLine/SecondInfoLine';
import ThirdInfoLine from '../../molecules/ThirdInfoLine/ThirdInfoLine';
import FourthInfoLine from '../../molecules/FourthInfoLine/ForthInfoLine';
const InformationPage = () => {
    return (
              <div>
                <Header/>
                <FirstInfoLine/>
                <SecondInfoLine/>
                <ThirdInfoLine/>
                <FourthInfoLine/>
                <Footer/>                  
              </div>
    );
  }
  
  export default InformationPage;