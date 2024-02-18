<template>
  <q-page class="q-pa-md text-small">
    <div class="top_img"><img src="~assets/images/Rules/Site_01.png" /></div>
    <div class="text">
      <div class="text_box">
        The TRU platform promises that it will not charge you any form of fees
        for life, and the interest-bearing income of currency holdings will be
        settled and distributed daily. And will provide you with all aspects of
        technical support and free training, so even if you have no experience,
        as long as you are willing to develop and grow with the TRU platform,
        the TRU platform can allow you to get rich returns without leaving your
        home.
      </div>
      <div class="text_box">
        <div class="title">
          <p><img src="~assets/images/Rules/Site_02.png" /></p>
          <p><span>1/3、TRU lottery</span></p>
          <p><img src="~assets/images/Rules/Site_02.png" /></p>
        </div>
        <div class="box">
          The TRU lottery is a welfare lottery jointly issued by Tron Coin and
          Tether.
          <br />
          The TRU lottery quotes the real-time fluctuation data of the digital
          currency BTC as the lottery natural number issuance and sales.
        </div>
        <div class="name">How to play TRU lottery:</div>
        <div class="box">
          1. TRU lottery is divided into 1 minute and 5 minute lottery games.
          <br />
          2. TRU lottery draws a comprehensive draw by adding the last three
          digits of BTC real-time data.
          <br />
          3. The draw rules of the TRU lottery are 0-13 for small and 14-27 for
          large.
          <br />
          4. There are 8 types of betting methods for TRU lottery: big, small,
          odd, double, big single, big double, small single and small double.
          <br />
          5. The reward method of TRU lottery is: the reward is 1.95 times after
          buying large, small, single, and double winnings (for example: buying
          a small 10USDT, the reward after winning is 19.5USDT) The rewards for
          buying large orders, big doubles, small orders, and small doubles are
          3.8 times (for example: buying a large order 10USDT, after winning the
          prize, the reward is 38USDT). 6. No betting is allowed during the draw
          deadline.
          <br />
          7. It is not allowed to sell lottery tickets or redeem bonuses to
          minors.
          <br />
          8. After each draw, the current draw number, draw number and bet
          amount, etc. can be viewed in the "Betting".
        </div>
      </div>
      <div class="text_box">
        <div class="title">
          <p><img src="~assets/images/Rules/Site_02.png" /></p>
          <p><span>2/3、TRU balance earns interest</span></p>
          <p><img src="~assets/images/Rules/Site_02.png" /></p>
        </div>
        <div class="box">
          TRU balance interest is a blockchain-based Defi product developed by
          TRON and Tether. When you inject USDT into the balance interest wallet
          to increase liquidity, the USDT and current income injected by you
          will be returned the next day. The rate of return fluctuates based on
          your contribution to the TRU. The project has been written into a
          smart contract and cannot be accessed manually without any risk.
        </div>
        <div class="name">TRU balance interest-earning income:</div>
        <div class="box">
          The daily income of the amount below 108USDT is 0.92%, and the deposit
          time is 20H.
          <br />
          The daily income from 108USDT to 540USDT is 0.95%, and the deposit
          time is 18H.
          <br />
          The daily income of 540USDT and above is 1%, and the deposit time is
          16H.
        </div>
      </div>
      <div class="text_box">
        <div class="title">
          <p><img src="~assets/images/Rules/Site_02.png" /></p>
          <p><span>3/3、Agency income</span></p>
          <p><img src="~assets/images/Rules/Site_02.png" /></p>
        </div>
        <div class="box">
          (1) The account registered through your invitation link is a
          subordinate member of your team.
          <br />
          (2) After your subordinate members join the TRU platform and recharge,
          you can get the commission for the interest-bearing income of your
          subordinate's balance and the commission for the TRU lottery betting.
        </div>
        <div class="name">Balance interest-bearing commission:</div>
        <div class="box">
          10% of the income commission for level 1 subordinates.
          <br />
          5% of the income commission for level 2 subordinates.
          <br />
          3% of the income commission for level 3 subordinates.
          <br />
          After applying for an agent, you can get unlimited level rebates, and
          you can get 1% of the income commission of all subordinate levels.
          <br />
          For example, if all of your invited level 1 subordinates recharge
          1000USDT and add coins to the balance to earn interest, his income
          after 16H is 1000*1%=10USDT. The income commission for your level 1
          subordinates is 10*10%=1USDT.
        </div>
        <div class="name">Lottery betting commission:</div>
        <div class="box">
          1% betting commission for level 1 subordinates.
          <br />
          0.5% betting commission for level 2 subordinates.
          <br />
          0.3% betting commission for level 3 subordinates.
          <br />
          After applying for an agent, you can get unlimited commission rebates,
          and you can get 0.1% of the betting commissions of all subordinate
          levels.
          <br />
          For example, if all of your invited level 1 subordinates participate
          in the daily betting plan, and their total betting amount is 10000USDT
          on that day, you can get 1% of the betting commission of your level 1
          subordinates, 10000*1%=100USDT. (Each time bet more than 1USDT can get
          commission)
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useConfigStore } from 'src/store/configStore';
const configStore = useConfigStore();

const betTypes = [
  'SMALL',
  'BIG',
  'SINGLE',
  'DOUBLE',
  'SMALL_SINGLE',
  'SMALL_DOUBLE',
  'BIG_SINGLE',
  'BIG_DOUBLE',
];
</script>
<style lang="scss" scoped>
.q-page {
  background: #278ffc;
  margin: 0px;
  padding: 0px;
  height: 2060px;
  font-family: Arial, Helvetica, sans-serif;
}

.top_img {
  display: table;
  width: 100%;
  position: absolute;
  z-index: 3;
  left: 0px;
  top: 0px;
  width: 100%;
}
.text_img {
  display: table;
  width: 100%;
}
.top_img img,
.text_img img {
  width: 100%;
  float: left;
}
.top_img_bottom {
  display: table;
  width: 100%;
  position: absolute;
  z-index: 3;
  left: 0px;
  bottom: 0px;
  width: 100%;
}
.top_img_bottom img {
  width: 100%;
}
.text {
  padding: 68% 15px 15px;
  display: table;
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  z-index: 5;
  left: 0px;
  top: 0%;
  width: 100%;
}
.text_box {
  background: #ffffff;
  margin: 15px 0px 0px;
  border-radius: 10px;
  padding: 12px 15px;
  border: 5px solid #d2a668;
  font-size: 12px;
  line-height: 18px;
}
.text_box .title {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
}
.text_box .title p {
  display: inline-block;
  margin: 0px;
  padding: 0px;
  width: auto;
  font-weight: bold;
  color: #6814cc;
  font-size: 15px;
  line-height: 20px;
  height: 20px;
  position: relative;
}
.text_box .title p:nth-child(2) {
  margin: 0px 5px;
  padding: 0px 3px;
}
.text_box .title p:nth-child(2):before {
  content: '';
  position: absolute;
  right: 0px;
  top: 2px;
  width: 100%;
  height: 8px;
  background: #ffedc2;
  z-index: 2;
}
.text_box .title p:nth-child(2) span {
  position: relative;
  z-index: 3;
}
.text_box .title p:nth-child(3) {
  transform: rotate(180deg);
}
.text_box .title p img {
  height: 6px;
  float: left;
  margin: 7px 0px;
}
.text_box .name {
  font-weight: bold;
  color: #8643d6;
  padding: 15px 0px 5px;
}
</style>
