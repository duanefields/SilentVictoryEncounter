import React, { Component } from 'react';

export default class AboutView extends Component {
  render() {
    return (
      <div>
        <h1>
          About This App
        </h1>

        <p>
          This is an unofficial companion app for <a href="https://www.gmtgames.com/p-474-silent-victory.aspx" target="_top">
            Silent Victory
          </a>,
          a solo wargame that simulates US submarine patrols in the Pacifics during
          World War II. It's currently out of print, but hopefully another printing
          will be coming soon. The original game is required to play, this is just
          a player aid for the part of the game where you patrol and encounter ships.
        </p>

        <h2>
          What Does it Do?
        </h2>

        <p>
          Basically, given your starting base and year, it will generate the
          patrol assignemnt, and as you move through the transit boxes generate
          enconters, rolling for the ships and other contacts.
          It doesn't do combat for you are on your own.
        </p>

        <p>
          Since the computer is doing all the rolling, it also rolls up all the
          optional rules, including escort quality, escort names, and weather.
        </p>

        <h2>
          Feedback
        </h2>

        <p>
          If you have some feedback, a question, or an issue pleas <a href="mailto:duane@duanefields.com">email me</a>.
        </p>

        <p>
          If you are a developer and want to help out, let me know and I'll
          point you to the source code.
        </p>

      </div>
    );
  }
}
