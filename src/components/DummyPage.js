
import React from "react";
import '../css/dummyPage.css';
import headerLogo from "../images/DummyPage/header-logo-bngb.png";
import middleImageBingoBet from "../images/DummyPage/middle-image-BingoBet.png";

import footerImg1 from '../images/DummyPage/footer/footer-image1-NCPG.png'
// import footerImg2 from '../images/DummyPage/footer/footer-image2-AlberGeal.png'
// import footerImg3 from '../images/DummyPage/footer/footer-image3.png'
import footerImg4 from '../images/DummyPage/footer/footer-image4-gamHelp.png'
import footerImg5 from '../images/DummyPage/footer/footer-image5-ICRG.png'
// import footerImg6 from '../images/DummyPage/footer/footer-image6-GokHup.png'
import footerImg7 from '../images/DummyPage/footer/footer-image7-18.png'

const DummyPage = () => {
    return(
        <div className={'dummy-page'}>
            <div className={'dummy-main'}>
                <div className={'dummy-top'}>
                    <div className={'img'}>
                        <a href='/home'>
                        <img className={'imgLogo'} src={headerLogo}/>
                        </a>
                    </div>
                </div>
                <div className={'dummy-middle'}>
                    <div className={'img'}><img src={middleImageBingoBet}/></div>
                    <p>  <a href='/home'>Bingo.bet</a>  is currently not available from your  region or country. </p>
                </div>
                <div className={'dummy-bottom'}>
                    {/* <p>SAFER GAMBLING</p> */}
                    <p></p>
                </div>
            </div>
            <footer className={'dummy-footer'}>
                <div className={'footer-logo'}>
                    <span className={'img'}><a  href='https://www.ncpgambling.org/'><img src={footerImg1}/></a></span>
                    <span className={'img'}><a href='https://www.gamblinghelponline.org.au'><img src={footerImg4}/></a></span>
                    <span className={'img'}><a href='https://www.icrg.org'><img src={footerImg5}/></a></span>
                    <span className={'img'}><img src={footerImg7}/></span>
                </div>
            </footer>
        </div>
    )
}

export default DummyPage;