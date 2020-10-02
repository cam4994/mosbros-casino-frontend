import React, { Component } from "react";
import Dealer from "../Components/Dealer";
import User from "../Components/User";
import Funds from "../Components/Funds";
import BlackJackModal from "../Components/BlackJackModal";
import Stats from "../Components/Stats"
import '../Styling/blackjackmodal.css'

export default class Game extends Component {

  state = {
    showUser:false,
    bet: 0,
    split: false,
    showDealerScore: false,
    bust: "",
    dealerCards: [],
    userCards: [],
    dealerTotal: 0,
    userTotal: 0,
    funds: 0,
    blackjack: "",
    result: ""
  }
  componentDidMount() {
    /* start game on backend*/
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        move: "start",
        user: this.props.userId
      })
    }
    fetch(`http://localhost:3001/games/${this.props.gameId}`, configObj)
      .then(resp => resp.json())
      .then(user => this.setState({
        funds: user.funds
      }))
  }

  startGame = () => {
    /* Do initial fetch to get two user cards and two dealer cards */
    if (this.state.bet > 0) {
      this.setState({
        showUser:true
      })
      setTimeout(() => {
        this.getInitialCard("users")
        setTimeout(() => {
          this.getInitialCard("dealers")
          setTimeout(() => {
            this.hit("user")
            setTimeout(() => {
              this.hit("dealer")
              setTimeout(() => {
                // this.checkForSplit()
                this.checkForBlackJack()
              }, 500)
            }, 500)
          }, 500)
        }, 500)

      }, 1000)
    }

  }

  addToBet = (amount) => {
    if (amount <= this.state.funds) {
      this.setState({
        bet: this.state.bet + amount,
        funds: this.state.funds - amount
      })
    }
  }


  clearBet = () => {
    this.setState({
      funds: this.state.funds + this.state.bet
    })
    setTimeout(() => {
      this.setState({
        bet: 0
      })
    }, 300)
  }


  dealerTurn = () => {
    /* begin dealer's turn */
    this.setState({
      showDealerScore: true
    })

    setTimeout(() => {
      if (this.state.dealerTotal < 17) {
        this.hit("dealer")
        setTimeout(() => {
          this.dealerTurn()
        }, 500)
      } else {
        if (this.state.dealerTotal > 21) {
          this.bust("dealer")
        } else {
          this.dealerStay()
        }
      }
    }, 500)


  }

  dealerStay = () => {
    if (this.state.userTotal > this.state.dealerTotal) {
      console.log('you win')
      this.setState({
        result: "win", funds: this.state.funds + (this.state.bet * 2)
      })
    } else if (this.state.userTotal < this.state.dealerTotal) {
      this.setState({ result: "loss" })
    } else {
      this.setState({ result: "push", funds: this.state.funds + this.state.bet })
    }

    setTimeout(() => {

      let configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          funds: this.state.funds
        })
      }
      fetch(`http://localhost:3001/users/${this.props.userId}`, configObj)
    }, 200)


  }

  bust = (player) => {
    if (player === "dealer") {
      console.log("dealer busted")
      this.setState({ bust: player, funds: this.state.funds + (this.state.bet * 2) })
    } else {
      this.setState({ bust: player })
    }

    setTimeout(() => {
      let configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          funds: this.state.funds
        })
      }
      fetch(`http://localhost:3001/users/${this.props.userId}`, configObj)
    }, 200)
  }

  userTurn = (move) => {
    if (move === "hit") {
      this.hit("user")
      setTimeout(() => {
        if (this.state.userTotal > 21) {
          this.bust("user")
        }
      }, 500)
    } else if (move === "double") {
      this.setState({
        funds: this.state.funds - this.state.bet,
        bet: this.state.bet * 2
      })
      this.hit("user")
      setTimeout(() => {
        if (this.state.userTotal > 21) {
          this.bust("user")
        } else {
          this.dealerTurn()
        }
      }, 500)
    }
  }

  hit = (player) => {
    this.hitUpdate(player)
  }

  /* executes hit logic on backend and updates dealer/user cards with new card*/
  hitUpdate = (player) => {
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        move: player + " hit"
      })
    }
    /* update cards and total for dealer or user after they hit*/
    fetch(`http://localhost:3001/games/${this.props.gameId}`, configObj)
      .then(resp => resp.json())
      .then(data => {
        if (player === "dealer") {
          let new_cards = [...this.state.dealerCards]
          new_cards.push(data.cards)
          if (data.bust === "dealer") {
            this.setState({
              bust: "dealer",
              dealerCards: new_cards,
              dealerTotal: data.player.score
            })
          } else {
            this.setState({
              dealerCards: new_cards,
              dealerTotal: data.player.score
            })
          }
        } else {
          let new_cards = [...this.state.userCards]
          new_cards.push(data.cards)
          if (data.bust === "user") {
            this.setState({
              bust: "user",
              userCards: new_cards,
              userTotal: data.player.score
            })
          } else {
            this.setState({
              userCards: new_cards,
              userTotal: data.player.score
            })
          }
        }
      })
  }

  getInitialCard = (player) => {
    let id = 0
    if (player === "users") {
      id = this.props.userId
    } else {
      id = this.props.gameId
    }
    fetch(`http://localhost:3001/${player}/${id}`)
      .then(resp => resp.json())
      .then(data => {
        if (player === "users") {
          this.setState({
            userCards: data.cards,
            userTotal: data.player.score
          })
        } else {
          let dealer_card = data.cards[0]
          dealer_card.hide = true
          dealer_card = [dealer_card]
          this.setState({
            dealerCards: dealer_card,
            dealerTotal: data.player.score
          })
        }
      })
  }

  // checkForSplit=()=>{
  //   console.log(this.state.userCards[0].value)
  //   console.log(this.state.userCards[1].value)
  //   if (this.state.userCards[0].value===this.state.userCards[1].value){
  //     this.setState({
  //       split:true
  //     })
  //   }
  // }

  checkForBlackJack = () => {
    if (this.state.userTotal === 21 && this.state.dealerTotal === 21) {
      this.setState({ result: "push", showDealerScore: true, funds: this.state.funds + this.state.bet })
    } else if (this.state.userTotal === 21) {
      this.setState({ blackjack: "user", showDealerScore: true, funds: this.state.funds + (this.state.bet * 2) })

    } else if (this.state.dealerTotal === 21) {
      this.setState({ blackjack: "dealer", showDealerScore: true })
    }
    setTimeout(() => {

      let configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          funds: this.state.funds
        })
      }
      fetch(`http://localhost:3001/users/${this.props.userId}`, configObj)
    }, 200)

  }

  render() {
    return (
      <div className="game">
        <div className="game-container">
          <div className="dealer-container">
            <Dealer showDealerScore={this.state.showDealerScore} hit={this.hit} cards={this.state.dealerCards} total={this.state.dealerTotal} />
            {/* MODAL FOR IF A BLACKJACK HAPPENS ON THE INITIAL DEAL */}
            {this.state.blackjack === "user" ? (
              <BlackJackModal>
                <div style={{ color: 'black' }}>
                  BLACKJACK FOR USER
                </div>
              </BlackJackModal>
            ) : this.state.blackjack === "dealer" ? (
              <BlackJackModal>
                <div style={{ color: 'black' }}>
                  BLACKJACK FOR DEALER
                </div>
              </BlackJackModal>
            ) : null}
            {/* MODAL FOR USER WIN, LOSS or PUSH */}
            {this.state.result === "win" ? (
              <BlackJackModal>
                <div style={{ color: 'black' }}>
                  Congratulations, you won!
                </div>
              </BlackJackModal>
            ) : this.state.result === "loss" ? (
              <BlackJackModal>
                <div style={{ color: 'black' }}>
                  Sorry, the dealer won!
                </div>
              </BlackJackModal>
            ) : this.state.result === "push" ? (
              <BlackJackModal>
                <div style={{ color: 'black' }}>
                  It's a Draw!
                </div>
              </BlackJackModal>
            ) : null}
            {/* MODAL FOR DEALER OR USER BUST */}
            {this.state.bust === "user" ? (
              <BlackJackModal>
                <div style={{ color: 'black' }}>
                  OH NO! You went over 21! BUST!
                </div>
              </BlackJackModal>
            ) : this.state.bust === "dealer" ? (
              <BlackJackModal>
                <div style={{ color: 'black' }}>
                  Dealer busts! You Win!
                </div>
              </BlackJackModal>
            ) : null}
          </div>
          {this.state.showUser === true ?
            <div className="user-container">
              <User split={this.state.split} userTurn={this.userTurn} cards={this.state.userCards} dealerTurn={this.dealerTurn} total={this.state.userTotal} />
            </div> : null}

          <div className="funds-container">
            <Funds bet={this.state.bet} funds={this.state.funds} addToBet={this.addToBet} clearBet={this.clearBet} startGame={this.startGame} />
          </div>
          <div className="stats-container">
              {this.state.userCards.length >= 2 && this.state.dealerCards.length >= 2 && this.state.blackjack === '' && this.state.bust === '' ? (
                <Stats userTotal={this.state.userTotal} dealerCard={this.state.dealerCards[1]}/>
              ) : null}
          </div>
        </div>
      </div>
    );
  }
}

