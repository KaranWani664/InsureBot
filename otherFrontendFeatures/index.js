import { renderApp } from './App.js';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = '';
    root.appendChild(renderApp());
  }
}); 