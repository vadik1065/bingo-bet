import React from 'react';
import { useHistory } from 'react-router-dom';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Link, useLocation } from 'react-router-dom';
import i18next from "i18next";
import logoBingo from '../images/logo-link-header.svg';
import { ReactComponent as Instagram } from '../images/socials/instagram.svg';
import { ReactComponent as Facebook } from '../images/socials/facebook.svg';
import { ReactComponent as Twitter } from '../images/socials/twitter.svg';
import { ReactComponent as Telegram } from '../images/socials/telegram.svg';
import { ReactComponent as Twitch } from '../images/socials/twitch.svg';
import { ReactComponent as Youtube } from '../images/socials/youtube.svg';
import { ReactComponent as Tiktok } from '../images/socials/tiktok.svg';
import { ReactComponent as Logo } from '../images/ridotto.svg';
import '../css/footer.css';

const Footer = (props) => {
  const history = useHistory();

  function moveTo(prop) {
    function go() {
      history.push(`/providers/${prop.name}`)
    }
    setTimeout(go, 100);
  }

  // useEffect(() => {
  //   window.apg_e2d99ef0_80aa_4b65_965a_b09eccf29ba2.init();
  // }, [location.pathname]);

  return (
    <div className="footer-container">
      <ScrollContainer className='footer-container-top'>
        {props.data.provsFooter.map((el, i) => {
          return (
            <img
              onClick={() => moveTo(el)}
              src={el.logo}
              className="provider-logo-footer"
              key={el.id}
              alt={el.name}
            />
          )
        })}
      </ScrollContainer>

      <div className="footer-container-body">
        <div className="footer-container-body-top">
          <img src={logoBingo} className="logo" alt="logo" />
          <div className="footer-container-socials">
            <a href="https://www.twitch.tv/bingo_bet" target="_blank" rel="noopener noreferrer">
              <Twitch />
            </a>
            <a href="https://youtube.com/channel/UCQHLc5mnVhhBEWQhMKijgbQ" target="_blank" rel="noopener noreferrer">
              <Youtube />
            </a>
            <a href="https://www.instagram.com/bingo.eu/" target="_blank" rel="noopener noreferrer">
              <Instagram />
            </a>
            <a href="https://www.facebook.com/bingo.eu/" target="_blank" rel="noopener noreferrer">
              <Facebook />
            </a>
            <a href="https://twitter.com/bingo_ai" target="_blank" rel="noopener noreferrer">
              <Twitter />
            </a>
            <a href="https://t.me/bb_casino" target="_blank" rel="noopener noreferrer">
              <Telegram />
            </a>
            <a href="https://www.tiktok.com/@bingo_vip" target="_blank" rel="noopener noreferrer">
              <Tiktok />
            </a>
          </div>
        </div>
        <div className="footer-container-links">
          <div>
            <Link to="/documents/kyc-policy">{i18next.t('KYC Policy')}</Link>
            <Link to="/documents/policy">{i18next.t('Privacy policy')}</Link>
            <Link to="/documents/cookie-policy">{i18next.t('Cookie policy')}</Link>
            <Link to="/documents/data-protection">{i18next.t('Data protection policy')}</Link>
          </div>
          <div>
            <Link to="/documents/about">{i18next.t('About Us')}</Link>
            <Link to="/documents/terms">{i18next.t('Terms and conditions')}</Link>
            <Link to="/documents/disclaimer">{i18next.t('Disclaimer')}</Link>
            { /*
              <Link to="/documents/contributions">{i18next.t('Contributions')}</Link>
              */
            }
          </div>

          <div>
            <Link to="/documents/help" className="help">{i18next.t('Help')}</Link>
            <Link to="/documents/responsible-policy">{i18next.t('Responsible gambling policy')}</Link>
            <Link to="/documents/anti-money-laundering">{i18next.t('Anti-money laundering policy')}</Link>
          </div>
          <div>
            <Link to="/documents/tournaments">{i18next.t('Tournaments terms and conditions')}</Link>
            <Link to="/documents/bonuses-conditions">{i18next.t('Terms and conditions for all bonuses')}</Link>
            <Link to="/documents/welcome-bonus">{i18next.t('Welcome Bonus Terms and Conditions')}</Link>
          </div>
        </div>

        <div className="footer-container-body-bottom">
          <div className="footer-text-content">
            {i18next.t('Bingo.bet is a brand managed by Bingo.bet B.V.(Curacao) & Bingo.bet Ltd (Isle of Man).')}<br />
            {i18next.t('Bingo.bet B.V. is incorporated on Curacao at registered address Chuchubiweg 17, Willemstad, Curacao. Bingo.bet B.V. is registered in accordance with Curacao law with registration number 154986. Bingo.bet Ltd is incorporated on Isle of Man at registered address 49 Victoria Street, Douglas, IM1 2LD, Isle of Man. Bingo.bet Ltd is registered in accordance with Isle of Man law with registration number 018297V. Gambling can be addictive. Play responsibly. For further information on the risks associated with gambling, read our Responible gambling policy. Underage gambling is an offence.')}

          </div>

          <div className="footer-logos-bottom flex">
            <div className="logo-bottom-right">
              <a href="https://services.gov.im/ded/services/companiesregistry/viewcompany.iom?Id=flHXd0NGwpENt2nLNJNHjw%3d%3d" target="_blank" rel="noopener noreferrer">
                <div className="to-gov"></div>
              </a>
              <div className='footer-valid'>
                <div id="apg-e2d99ef0-80aa-4b65-965a-b09eccf29ba2" data-apg-seal-id="e2d99ef0-80aa-4b65-965a-b09eccf29ba2" data-apg-image-size="128" data-apg-image-type="basic-small"></div>
              </div>
              <a href="http://www.curacao-chamber.cw/services/registry/search-company" target="_blank" rel="noopener noreferrer">
                <div className="to-kkk"></div>
              </a>

              <div className="eighteen"></div>
              <a href="https://im.casino/" target="_blank" rel="noopener noreferrer">
                <div className="im-casino"></div>
              </a>
              <a href="https://ridotto.biz/" target="_blank" rel="noopener noreferrer">
                <Logo className="ridotto"></Logo>
              </a>
            </div>

          </div>
          <div className="footer-copyright">{i18next.t('© Bingo.bet B.V. 2020, All Rights Reserved')}</div>
        </div>



      </div>
    </div>
  )
}

export default Footer;
