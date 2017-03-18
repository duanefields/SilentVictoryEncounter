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
          patrol assignment, and as you move through the transit boxes generate
          encounters, rolling for the ships and other contacts.
          It doesn't do combat for you - you are on your own.
        </p>

        <p>
          It's designed to use along side the game, simplifying and speeding up
          game play while also providing a little more detail to the encounters.
          It's formatted to work on mobile devices and tablets.
        </p>

        <p>
          As far as I know, it rolls all the same tables with the same chances as the
          real game. It rolls 1d6, 2d6, and d100 correctly, so everything should work
          correctly. Let me know if I have missed something.
          The "SJ" and "SD" radar boxes should be selected if your radar is functioning
          normally. If it's not, uncheck it so that encounters can be correctly generated.
        </p>

        <p>
          Since the computer is doing all the rolling, it also rolls up all the
          optional rules, including escort quality, escort names, and weather. It also
          generates dates and times as you make your way through the patrol.
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

        <h2>
          Changes
          <ul>
            <li>Fixed: an issue creating patrols in Pearl Harbor 1945</li>
            <li>Fixed: don't show start dates past June 1945</li>
          </ul>
        </h2>

      </div>
    );
  }
}
