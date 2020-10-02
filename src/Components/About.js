import React from 'react';

const About = () => (
  <div className="home-container">
    <div className="about-page">
      <h2>Welcome to Mos Bros Casino</h2>
      <p>Our goal is to help you beat the "house" when playing Blackjack. The concept of Blackjack is very simple. It is player vs. dealer and the player is trying to get a higher card sum than the dealer without going over 21, also known as busting.</p>
      <p>What a lot of people don't realize is that Blackjack is a game of odds and using statistics/odds to your advantage gives you the best chance of victory. If optimal Blackjack strategy is used, the house's edge on a player can be lowered to where a player has up to a <span style={{color:'red'}}>49.5%</span> chance to win any given hand.</p>
      <p>Unfortunately, many naive gamblers make decisions based on what their gut is telling them. Casinos love gamblers that don't play based off statistics because it greatly increases their odds.</p>
      <p>Using our version of Blackjack, we'll show you the odds of the dealer busting given a certain hand. We'll also show you your odd's of busting at any given time and also show the recommended move based on the optimal strategy.</p>
      <p>Some key numbers to remember. The dealer busts <span style={{color:'red'}}>28%</span> of the time but often wins when busting, while players using basic Blackjack strategy bust just <span style={{color:'red'}}>16%</span> of the time. </p>
      <p>With practice, you'll become a master of Blackjack statistics and always know the right move to take down the house!</p>
    </div>
  </div>
)

export default About;