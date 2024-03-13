<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://uxwing.com/wp-content/themes/uxwing/download/toys-childhood/tic-tac-toe-icon.png" alt="Logo" width="160" height="160">
  </a>

  <h3 align="center">Sveltkit SSE TicTacToe </h3>

  <p align="center">
    TicTacToe multiplayer built with Sveltekit using Server-Sent Events!
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#feature-showcase">Feature Showcase</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![Example Game Image](images/Game.png?raw=true "game View")

This was my project to try out Server-Sent Events as well as to improve my skills in SvelteKit.

Here's why I needed SSE for performace reasons:
* changes were reflected very fast
* no polling needed

Of course, this project is not optimized or perfect. But it taught me how to work with SSE and how create dynamic routing.

<br />


### Built With

This site was build with only a few frameworks and library:


* [![SvelteKit][kit.Svelte.dev]][SvelteKit-url]
* [![Tailwind][Tailwindcss.com]][Tailwind-url]
* [![Svelte-SEE][Svelte-SEE.com]][Svelte-SEE-url]


<br />

<!-- GETTING STARTED -->
## Getting Started

This are steps to setup the project locally.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/Schmidii99/Sveltekit-SSE-TicTacToe.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

<br />


<!-- USAGE EXAMPLES -->
## Usage
   
   Start the project on your local maschine
   ```sh
   npm run dev
   ```
   open your browser on `localhost:5173`
   
   Create a lobby
   ![Lobby Image](images/Lobby.png?raw=true "lobby")

Copy the link to **another browser or an incognito window** to join your own game. This is due to the session being store in your local storage.
Repeat this step again if you want to spectate the game.
   
   

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- SHOWCASE -->
## Feature Showcase

<h4>Spectating a game</h4> 
When a game is full/ started, the new client will be a spectator. Everybody can see how many spectators are currently viewing the game, by the count in the top right corner.

![Spectator Image](images/Spectator.png?raw=true "spectator")

<br />

<h4> Game End </h4>
Once the game has ended the winner is calculated client-side and displayed,  as well as button that takes you back to the "create-lobby" page. 

![Win Image](images/Win.png?raw=true "win")

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions and improvements you make are **greatly appreciated**. This makes you and me a better developer.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<br />


<!-- CONTACT -->
## Contact

Florian Schmid - [my website](https://florianschmid.me/) - mail@florianschmid.me

Project Link: [https://github.com/Schmidii99/Sveltekit-SSE-TicTacToe/](https://github.com/Schmidii99/Sveltekit-SSE-TicTacToe/blob/main/images/Game.png)

<br />



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Some links to credit those awesome projects that helped me.

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Readme Template](https://github.com/othneildrew/Best-README-Template)
* [Img Shields](https://shields.io)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
[website-shield]: https://img.shields.io/website?url=https%3A//florianschmid.me/&label=FlorianSchmid.me
[website-url]: https://florianschmid.me/
[kit.Svelte.dev]: https://img.shields.io/badge/SvelteKit-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[SvelteKit-url]: https://kit.svelte.dev/
[Tailwindcss.com]: https://img.shields.io/badge/tailwindcss-0F172A?style=for-the-badge&logo=tailwindcss
[Tailwind-url]: https://tailwindcss.com/
[Svelte-SEE.com]: https://img.shields.io/badge/sveltekit--see-Library-0F172A?style=for-the-badge&logo=github
[Svelte-SEE-url]: https://github.com/tncrazvan/sveltekit-sse
