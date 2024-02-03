// Function to update text content of an HTML element based on its query selector
var updateText = function (query, text) {
  document.querySelector(query).textContent = text;
};

// Function to update the health text for a character and display it in a specific HTML element
var updateHpText = function (query, object) {
  // Concatenate current and max HP to create a health text string
  let text = object.currentHP + " / " + object.maxHP + " HP";
  // Call updateText to update the corresponding HTML element with the health text
  updateText(query, text);
};

// Function to hide an HTML element based on its query selector
var updateDisappear = function (query) {
  // Set the display property of the HTML element to "none" to hide it
  document.querySelector(query).style.display = "none";
};

// Function to update the screen with current health information and handle game over scenarios
var updateScreen = function () {
  // Update health text for each character on the screen
  updateHpText(".dragon-health-txt", dragonObject);
  updateHpText("#healer-health-txt", heroesArray[0]);
  updateHpText("#archer-health-txt", heroesArray[1]);
  updateHpText("#warrior-health-txt", heroesArray[2]);

  // Hide corresponding elements if the character is no longer alive
  if (dragonObject.alive == false) {
    updateDisappear(".dragon-container");
  }
  if (heroesArray[0].alive == false) {
    updateDisappear(".healer");
  }
  if (heroesArray[1].alive == false) {
    updateDisappear(".archer");
  }
  if (heroesArray[2].alive == false) {
    updateDisappear(".warrior");
  }

  // Check for game over scenarios and display appropriate alerts
  const aliveHeroes = heroesArray.filter((hero) => hero.alive);
  if (aliveHeroes.length == 0) {
    alert("Spillet er tapt! " + dragonObject.name + " har vunnet!");
  }

  if (dragonObject.alive == false) {
    alert("Gratulere, du har vunnet spillet!");
  }
};

// Function representing the dragon's attack on a random living hero
var dragonAttack = function () {
  // Filter out alive heroes
  const aliveHeroes = heroesArray.filter((hero) => hero.alive);
  // Check if there are living heroes and if the dragon is still alive
  if (aliveHeroes.length > 0 && dragonObject.alive) {
    // Randomly select a living hero to be the target of the dragon's attack
    const indexHero = Math.floor(Math.random() * aliveHeroes.length);
    // Call the attack function with the dragon as the executor and the selected hero as the target
    attack(dragonObject, aliveHeroes[indexHero], dragonObject.damage);
    // Update the screen after the attack
    updateScreen();
  }
};

// Function to execute an attack from one character to another and update the screen
var attack = function (executor, target, damage) {
  // Check if the target is still alive
  if (target.alive) {
    // Subtract the damage from the target's current HP
    target.currentHP -= damage;
    // Check if the target's HP is now zero or below, and update the alive status accordingly
    if (target.currentHP <= 0) {
      target.alive = false;
    }
    // Display an alert with information about the attack
    let message = executor.name + " har gjort " + damage + " skade på " + target.name + "!"
    if (executor == dragonObject)(
      message = dragonObject.name + " har angrepet " + target.name
    )
    alert(message);
  }

  // Update the screen after the attack
  updateScreen();
};

// Function to update the displayed names of characters on the screen
var updateNames = function () {
  // Update the names of each character on the screen using their respective query selectors
  updateText("#healer-name-txt", heroesArray[0].name);
  updateText("#archer-name-txt", heroesArray[1].name);
  updateText("#warrior-name-txt", heroesArray[2].name);
  updateText("#dragon-name-txt", dragonObject.name);
};

// Event listener for the document ready state to initialize the game
document.addEventListener("DOMContentLoaded", function () {
  // Select all elements with the "hero" class
  const heroes = document.querySelectorAll(".hero");

  // Update the displayed names of characters on the screen
  updateNames();

  // Add click event listeners to each hero element
  heroes.forEach(function (heroContainer, index) {
    // Event listener for hero clicks to initiate attacks when the dragon is alive
    heroContainer.addEventListener("click", function () {
      // Get the selected hero based on the index
      const selectedHero = heroesArray[index];
      // Check if the dragon is still alive before initiating the attack
      if (dragonObject.alive) {
        // Call the attack function with the selected hero as the executor and the dragon as the target
        attack(selectedHero, dragonObject, selectedHero.damage);
        // Execute the dragon's attack after the hero's attack
        dragonAttack();
      }
    });
  });
});
