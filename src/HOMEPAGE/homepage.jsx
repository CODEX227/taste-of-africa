import { useState, useEffect } from "react";
import Abt from "./Abt";
import Foot from "./foot";
import Hero from "./hero";
import Menu from "./Menu";
import Res from "./Reservations";
const Homepage = ({ info, information }) => {
  const [pageOnPending, setpageOnPending] = useState(true);

  useEffect(() => {
     if(Object.keys(info).lenght > 0 && Object.keys(information).lenght > 0){
        setpageOnPending(false)
        console.log('yeyyyyy')
     }
  }, [info, information]);

  return (
    <>
       <div>
          <Hero info={info} information={information} />
          <Abt />
          <Menu />
          <Res info={info} information={information} />
          <Foot information={information}/>
    </div>
    </>
  );
};

export default Homepage;