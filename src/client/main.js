import 'babel-polyfill';
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Popup from 'react-popup';
import 'react-popup/style.css'


ReactDOM.render(<App/>, document.getElementById('app'))

ReactDOM.render(<Popup />, document.getElementById('popupContainer'));

Popup.registerPlugin('popover', function (content, target) {
    this.create({
        content: content,
        className: 'popover',
        noOverlay: true,
        position: function (box) {
            let bodyRect      = document.body.getBoundingClientRect();
            let btnRect       = target.getBoundingClientRect();
            let btnOffsetTop  = btnRect.top - bodyRect.top;
            let btnOffsetLeft = btnRect.left - bodyRect.left;
            let scroll        = document.documentElement.scrollTop || document.body.scrollTop;

            box.style.top  = (btnOffsetTop - box.offsetHeight - 10) - scroll + 'px';
            let left = (btnOffsetLeft + (target.offsetWidth / 2) - (box.offsetWidth / 2))
            box.style.left = (left < 0? 0: left) + 'px';
            box.style.margin = 0;
            box.style.opacity = 1;
        }
    });
});
