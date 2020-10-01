import React, { Component } from "react";
import Dealer from "../Components/Dealer";
import User from "../Components/User";
import Winner from "../Components/Winner";
import BlackJackModal from "../Components/BlackJackModal";
import '../Styling/blackjackmodal.css'

export default class Game extends Component {

  state = {
    showDealerScore: false,
    bust: "",
    dealerCards: [],
    userCards: [],
    dealerTotal: 0,
    userTotal: 0,
    funds: 0,
    blackjack: ""
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


    /* Do initial fetch to get two user cards and two dealer cards */
    setTimeout(() => {
      this.getInitialCard("users")
      setTimeout(() => {
        this.getInitialCard("dealers")
        setTimeout(() => {
          this.hit("user")
          setTimeout(() => {
            this.hit("dealer")
            setTimeout(() => {
              this.checkForBlackJack()
            }, 500)
          }, 500)
        }, 500)
      }, 500)

    }, 1000)
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
        }, 1000)
      } else {
        if (this.state.dealerTotal > 21) {
          this.bust("dealer")
        } else {
          this.dealerStay()
        }
      }
    }, 1000)


  }

  dealerStay = () => {
    console.log('dealer will stay')
  }

  bust = (player) => {
    console.log(`${player} busted`)
  }

  /* callback function for dealer and user components */

  userTurn = (move) => {
    if (move === "hit") {
      this.hit("user")
      setTimeout(() => {
        if (this.state.userTotal > 21) {
          this.bust("user")
        }
      }, 500)
    } else if (move === "double") {
      this.hit("user")
      setTimeout(() => {
        if (this.state.userTotal > 21) {
          this.bust("user")
        } else {
          this.dealerTurn()
        }
      }, 1000)
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
          console.log(dealer_card)
          this.setState({
            dealerCards: dealer_card,
            dealerTotal: data.player.score
          })
        }
      })
  }

  checkForBlackJack = () => {
    console.log("Dealer Total", this.state.dealerTotal)
    console.log("User Total", this.state.userTotal)
    if (this.state.userTotal === 21) {
      this.setState({ blackjack: "user", showDealerScore: true })

    } else if (this.state.dealerTotal === 21) {
      this.setState({ blackjack: "dealer", showDealerScore: true })
    }
  }

  render() {
    return (
      <div className="game">
        <div className="game-container">
          <div className="dealer-container">
            <Dealer showDealerScore={this.state.showDealerScore} hit={this.hit} cards={this.state.dealerCards} total={this.state.dealerTotal} />
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
          </div>
          <div className="user-container">
            <User userTurn={this.userTurn} cards={this.state.userCards} dealerTurn={this.dealerTurn} total={this.state.userTotal} />
          </div>
          {/* <div className="modal">
            <BlackJackModal>
              <div style={{ color: 'black' }}>
                The Best Has Happened To ME
            </div>
            </BlackJackModal>
          </div> */}
        </div>
      </div>
    );
  }
}

