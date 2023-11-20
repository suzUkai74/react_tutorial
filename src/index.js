import React from 'react';
import ReactDOM from 'react-dom/client';
import Clock from './components/clock'
import Calculator from './components/calculator';
import Counter from './components/counter';
import SignUpDialog from './components/sign_up_dialog'
import Game from './components/game';
import './index.css';

const game = ReactDOM.createRoot(document.getElementById("game"));
const clock = ReactDOM.createRoot(document.getElementById("clock"));
const calculator = ReactDOM.createRoot(document.getElementById("calculator"));
const counter = ReactDOM.createRoot(document.getElementById("counter"));
const signUpDialog = ReactDOM.createRoot(document.getElementById("signUpDialog"));
game.render(<Game />);
clock.render(<Clock />);
calculator.render(<Calculator />);
counter.render(<Counter />);
signUpDialog.render(<SignUpDialog />);
