import { useEffect, useState } from "react";
import { useParams } from "react-router";
import man from '../images/temp-bonuses-pics/man.png';
import man2 from '../images/temp-bonuses-pics/man2.png';
import man3 from '../images/temp-bonuses-pics/man3.png';

const useTempBonuses = (language) => {
  const { name } = useParams();
  const [bonus, setBonus] = useState('');

  const bonuses = [
    // {
    //   type: 'rakeback',
    //   name: 'Rakeback Bonus Balance',
    //   content: language === 'RU' 
    //     ? 
    //     `
    //       <h4><span style="font-family: georgia, palatino, serif; font-size: 24pt;">ДОБРО ПОЖАЛОВАТЬ В НАШЕ КАЗИНО! </span></h4>
    //       <p>Вы не поверите, но мы предлагаем вам рейкбек-бонус в размере <strong>100 BingoCoin</strong> при первом депозите. Интересно, не так ли? Чего же вы ждете, присоединяйтесь к нам на Bingo.bet!</p>
    //       <ul>
    //         <li>Одно предложение на игрока. Минимум 1 BingoCoin ставки для активации каждого рейкбек возврата.</li>
    //         <li>После регистрации и внесения минимального депозита в размере 10 BingoCoin, игрок получает 100 BingoCoin на рейкбек баланс.</li>
    //         <li>Дополнительные средства можно получить с помощью различных турниров, розыгрышей и бинго баунти!</li>
    //         <li>Фишки у вашего баланса- это сумма рейкбека который у вас есть т.е. средства доступные к ставкам с вашим основным балансом.</li>
    //         <li>Теперь каждый игрок получает 100 BingoCoin на свой бонусный баланс при первом депозите. Бонус, который вы видите- это ваш рейкбек баланс. Мы хотим поощрять и награждать наших активных игроков, давая вам 50% нашей house edge прибыли с каждой сделанной вами ставки, около 1% от ставки в зависимости от игры!</li>
    //         <li>Проиграете ли вы или выиграете, вы получите часть ставки в виде денег, которые будут отправлены прямо с рейкбек баланса на ваш основной баланс! Только лучшие награды на Bingo.bet!!</li>
    //       </ul>
    //     `
    //     :
    //     `
    //       <h4><span style="font-family: georgia, palatino, serif; font-size: 24pt;">Welcome to our casino!</span></h4>
    //       <p>You won't believe it but we are offering you a <strong>100 BingoCoin rakeback bonus</strong> upon first deposit. Exciting, right? What are you waiting for, join us at Bingo.bet!</p>
    //       <ul>
    //         <li>One offer per player. Minimum 1 BingoCoin wager to activate each rakeback return</li>
    //         <li>Upon registering, and making a minimum deposit of 10 BingoCoin, a player will recieve 100 BingoCoin into their rakeback balance</li>
    //         <li>Additional funds can be acquired via various means of tournaments, giveaways and bingo bounty!</li>
    //         <li>The chips seen on your bar is the rakeback balance amount, that is accessed with wagers from your main balance.</li>
    //         <li>Each player now receives 100 BingoCoin into their bonus balance upon their first deposit. The bonus you see is your rakeback balance! We want to reward and encourage our active players by giving you 50% of our house edge profits on every wager you make, about 1% of the bet depending on game!</li>
    //         <li>Win or lose you will receive a portion of your bet as money that is sent directly from the rakeback balance to your main balance!! Only the best rewards at Bingo.Bet!!</li>
    //       </ul>
    //     `,
    //   title: language === 'RU' ? 'Получите Бесконечный Рейкбек прямо сейчас!' : 'CLAIM COUNTLESS RAKEBACK NOW !!!',
    //   bigImg: man
    // },
    {
      type: 1,
      name: 'Bingo Bounty',
      content: language === 'RU' 
        ?
        `
          <ul>
            <li>Завершите Бинго Баунти, поставив определенные суммы на указанных играх и провайдерах, чтобы получить различные награды.</li>
            <li>Баунти для выполнения доступны ежедневно, еженедельно и ежемесячно.</li>
            <li>Повышение вашего премиального звания дает вам доступ к большему количеству баунти и наград.</li>
          </ul>
        `
        :
        `
          <ul>
            <li>Complete the Bingo Bounty by wagering specific minimum bets to get money rewards!</li>
            <li>Bounties tim er activates once your first minimum waager is made!</li>
            <li>Highly chaotic bonus! big bets, big wins, big rewards</li>
            <li>Weekly Bounty - counts any bets between the bet cost of $50 - $99!</li>
            <li>Monthly Bounty - counts any bets between the bet cost of $100 and above!</li>
          </ul>
        `,
      title: 'BINGO BOUNTY',
      subTitle: 'high stakes - high rewards',
      bigImg: man2,
      commingSoon: true
    },
    {
      type: 2,
      name: 'Monthly CashBack',
      content: language === 'RU' 
        ?
        `
          <ul>
            <li>Получите lossback в конце месяца, чтобы покрыть больше ваших убытков!</li>
            <li>нажмите «Получить», чтобы отправить кэшбэк на свой баланс!</li>
            <li>Делайте больше ставок, чтобы повысить своё премиальное звание и получить более высокие кэшбэк-вознаграждения!</li>
          </ul>
        `
        :
        `
          <ul>
            <li>Receive end of month lossback to cover more of your loses!</li>
            <li>Click <strong>'Claim Cashback'</strong> to send your bonus to your balance!</li>
            <li>Wager more to improve your premium rank and gain higher cashback rewards!</li>
          </ul>
        `,
      title: language === 'RU' ? 'Получайте Кэшбэк' : 'CLAIM CASHBACK',
      bigImg: man3,
    }
  ]

  useEffect(() => {
    if (name && language) {
      const current = bonuses.find(b => b.name.replace(/\s+/g, '') === name);
      if (current) {
        setBonus(current);
      }
    }
  }, [name, language]);

  return { bonus }
}

export default useTempBonuses;
