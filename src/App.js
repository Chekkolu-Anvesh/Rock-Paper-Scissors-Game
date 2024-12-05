import React, {useState} from 'react'
import styled from 'styled-components'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

const App = () => {
  const [score, setScore] = useState(0)
  const [gameStatus, setGameStatus] = useState('')
  const [userChoice, setUserChoice] = useState(null)
  const [opponentChoice, setOpponentChoice] = useState(null)
  const [isGameResultsVisible, setGameResultsVisible] = useState(false)

  const getOpponentChoice = () => {
    const randomChoice =
      choicesList[Math.floor(Math.random() * choicesList.length)]
    return randomChoice
  }

  const determineResult = (user, opponent) => {
    if (user.id === opponent.id) {
      return 'IT IS DRAW'
    }
    if (
      (user.id === 'ROCK' && opponent.id === 'SCISSORS') ||
      (user.id === 'SCISSORS' && opponent.id === 'PAPER') ||
      (user.id === 'PAPER' && opponent.id === 'ROCK')
    ) {
      return 'YOU WON'
    }
    return 'YOU LOSE'
  }

  const onChoiceClick = choice => {
    const opponent = getOpponentChoice()
    setUserChoice(choice)
    setOpponentChoice(opponent)
    const result = determineResult(choice, opponent)
    setGameStatus(result)
    setGameResultsVisible(true)

    if (result === 'YOU WON') {
      setScore(score + 1)
    } else if (result === 'YOU LOSE') {
      setScore(score - 1)
    }
  }

  const resetGame = () => {
    setGameResultsVisible(false)
  }

  return (
    <AppContainer>
      <ScoreBoard>
        <ChoicesTitle>ROCK PAPER SCISSORS</ChoicesTitle>
        <ScoreContainer>
          <ScoreLabel>Score</ScoreLabel>
          <ScoreValue>{score}</ScoreValue>
        </ScoreContainer>
      </ScoreBoard>

      {isGameResultsVisible ? (
        <ResultsView>
          <ResultImages>
            <ImageContainer>
              <ChoiceImage src={userChoice.imageUrl} alt="your choice" />
              <p>Your Choice</p>
            </ImageContainer>
            <ImageContainer>
              <ChoiceImage
                src={opponentChoice.imageUrl}
                alt="opponent choice"
              />
              <p>Opponent's Choice</p>
            </ImageContainer>
          </ResultImages>
          <ResultParagraph>{gameStatus}</ResultParagraph>
          <PlayAgainButton onClick={resetGame}>PLAY AGAIN</PlayAgainButton>
        </ResultsView>
      ) : (
        <ChoicesView>
          {choicesList.map(choice => (
            <ChoiceButton
              key={choice.id}
              data-testid={`${choice.id.toLowerCase()}Button`}
              onClick={() => onChoiceClick(choice)}
            >
              <ChoiceImage src={choice.imageUrl} alt={choice.id} />
            </ChoiceButton>
          ))}
        </ChoicesView>
      )}

      <Popup
        trigger={<RulesButton>RULES</RulesButton>}
        modal
        closeOnDocumentClick
      >
        {close => (
          <PopupContent>
            <CloseButton onClick={close}>
              <RiCloseLine />
            </CloseButton>
            <RulesImage
              src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
              alt="rules"
            />
          </PopupContent>
        )}
      </Popup>
    </AppContainer>
  )
}

// Styled Components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #223a5f;
  font-family: 'Roboto', sans-serif;
`

const ScoreBoard = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  padding: 20px;
  border: 2px solid #fff;
  border-radius: 10px;
  margin-bottom: 30px;
  color: white;
`

const ChoicesTitle = styled.h1`
  font-family: 'Bree Serif', serif;
`

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ScoreLabel = styled.p`
  margin: 0;
`

const ScoreValue = styled.p`
  font-size: 2rem;
  font-family: 'Roboto', sans-serif;
`

const ChoicesView = styled.div`
  display: flex;
  justify-content: center;
`

const ChoiceButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`

const ChoiceImage = styled.img`
  width: 100px;
`

const ResultsView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ResultImages = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50%;
`

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ResultParagraph = styled.p`
  font-size: 1.5rem;
  color: white;
`

const PlayAgainButton = styled.button`
  background-color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
`

const RulesButton = styled.button`
  background-color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  margin-top: 20px;
`

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px;
`

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  align-self: flex-end;
`

const RulesImage = styled.img`
  width: 100%;
`

export default App
