import Featured from "../../src/Component/Featured";
import FeaturedProperties from "../../src/Component/FeaturedProperties";
import Footer from "../../src/Component/Footer";
import Header from "../../src/Component/Header";
import MailList from "../../src/Component/MailList";
import Navbar from "../../src/Component/Navbar";
import PropertyList from "../../src/Component/PropertyList";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList/>
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;