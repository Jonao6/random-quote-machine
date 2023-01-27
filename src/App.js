import React, {useEffect, useState} from 'react';
import './App.scss';
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';


export default function App() {
  const randomColor = () => {
    const CHHAPOLA = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${CHHAPOLA}`;
  };
  const sameColor = randomColor();
  const [data, setData] = React.useState(null);
  async function updateQuote() {
    const response = await fetch("https://api.quotable.io/random");
    const { ...data } = await response.json();
    setData(data);
  }
  React.useEffect(() => {
    updateQuote();
  }, []);
  if (!data) return null;
  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: sameColor, color: sameColor }}>
        <div id='quote-box' style={{ color: sameColor }}>
          <p id='text'><FontAwesomeIcon className='quote' icon={faQuoteLeft} style={{color: sameColor}} />{data.content}</p>
          <div className='author'>
            <cite id='author'>- {data.author}</cite>
            </div>
          <div className='buttons'>
            <Button style={{backgroundColor: sameColor}} id='new-quote' onClick={updateQuote}>New Quote</Button>
            <a id='tweet-quote' href={`https://twitter.com/intent/tweet?text=${data.content} -${data.author}`}>
              <FontAwesomeIcon className='bigIcon' icon={faTwitterSquare} size='2x' style={{color: sameColor}} />
            </a>
          </div>
        </div>
        <footer id='reference'>
              <p>by <a id='profile' href={'https://codepen.io/jonao6'}>jonao</a></p>
            </footer>
      </header>
    </div>
  );
}