# Tamagotchi

[Game url:](TO BE ADDED)

Tamagotchi is you favorite virtual pet. Being a good pet owner, you need to feed it, play with it, and make sure it gets enough sleep. Otherwise, it will die. In this game, your pet is a baby ghost. You found it on one of your usual midnight walks in the cemetery. The night was magical. Walking across the cemetery, you heard a sound. You stopped to listen more carefully and you hear "Let me out! Let me out!". You looked around and you find a coffin. It's where the sound is coming from. As you got close to it, it started shaking. You opened it and out came a little ghost. It's your pet now and you need to take care of it. What would you name it?

# Why?
This project was created as part of General Assembly's Software Engineering Immersive coding bootcamp. It's a deliverable after 2 weeks or learning HTML, CSS, Javascript, jQuery concepts. 

# Technologies used
1. HTML
2. CSS
3. Javascript
4. jQuery

# Approach
1. After reading the [project requirements](https://git.generalassemb.ly/neha-s25/project-zero/blob/master/README.md), I first came up with the idea of a pet ghost and some ideas to include in the gane like having the ghost come out of a coffin using animation, for Play functionality, it would play peek-a-boo, for Feed functionality, it would like to eat cake, for Sleep functionality, it would sleep in a coffin. I also had some ideas for extras to include if I have time. When you play the game you will see that it did not turn out exactly how I pictured it, especially the animations, because it took longer to tackle every problem due to not already having enough practice, especially animations. 
2. I drew out the **wireframe** on pen and paper accordingly. 
3. Then I wrote down some **user stories**.
4. Then I started to **research** to find some game objects online that I could use such that I could also make the entire look consistent. So I would need a set of cartoon ghost images with different expressions like happy, sad, etc., a set of cartoon coffin images, one open, one closed. Those to start and any other images that would go with this theme. I found it difficult to find such images that would work for my needs that I also lliked and it was taking too long so I decided to use placeholder images and move forward.
5. I started with some **HTML** for first 2 pages. Then layout using CSS. Then corresponding functionality for those 2 pages, which was not a lot.
5. Next I tackled the main game page **layout**.
6. Then I started working on game functionality using **Javascript**. Throughout this process, I would refer to my user stories and use them as my guideline. I also used my user stories to break down each problem into smaller chunks and tackled them one by one, checking off each one as I go, for emotional boost. 
7. Next I worked on **styling**. I researched and decided on the images for ghost and coffin, added them, decided on theme colors after trying out different options and proceeded to style all pages, with lots of playing around different setting involved.
8. Last I started working on running a different **animation** for each game button click.

# Wireframes
Wireframes can be found at [wireframes/wireframe.pdf](https://git.generalassemb.ly/neha-s25/tamagotchi/blob/master/wireframes/wireframe.pdf)

# User Stories

1. When the user clicks on coffin button:
    * coffin opens
    * ghost comes out
    * a form is presented to user to name their pet ghost

2. When user clicks on the form submit button, navigate to main game page.

3. The main game page loads with:
    *  Default scores set to 5.
    * Name displayed
    * Age is a random number between 1000 and 2000 years and is displayed.
    * An initial message is displayed to inform the user about the game, that they need to take care of their pet by not letting any of the scores get to 10, or it  will die.
    * Start 4 timers: one for age which will increase by 5 at a certain interval. Three other timers will start, for each of Boredom, Hunger, Sleepiness. They all will increase by 1 point after every interval, and will reset timer whenever corresponding button is clicked.

4. When user clicks on Play button:
    * choose a positive or negative outcome at random. If outcome is positive, Boredom score will decrease by 1 point, otherwise it will increase by 1 point.
    * Display score change.
    * Display relevant commentary based on the outcome. Each outcome has a commentary attached to it.
    * Reset corresponding timer.
    * Display corresponding animation

# Final comments
It was so much fun to develop this project, it felt addictive at times. It was also challenging and pushed me to my limits. I had to hold on to my faith in myself and power through. Many thanks to the instructors, Kenny and Michael, who were a huge help and helped me get unstuck at times. My fellow classmates are also amazing, always encouraging, supporting, and helping each other. Web development is so much fun and I am happy that I have finally started this journey.
