document.addEventListener("DOMContentLoaded", function () {
    // Hent alle heltene fra HTML ved hjelp av deres klasse (img-container-klassen)
    const heroes = document.querySelectorAll(".img-container");
  
    // Legg til klikk-lytter på hver helt
    heroes.forEach(function (heroContainer, index) {
      heroContainer.addEventListener("click", function () {
        // Hent den valgte helten fra heroesArray basert på indeksen
        const selectedHero = heroesArray[index];
  
        // Reduser dragens currentHP basert på heltens damage
        dragonObject.currentHP -= selectedHero.damage;
  
        // Oppdater tekst for dragens currentHP i HTML
        document.querySelector("#dragon-health-txt").textContent =
          dragonObject.currentHP + " / " + dragonObject.maxHP + " HP";
  
        // Vis en alert med informasjon om angrepet
        alert(
          selectedHero.name +
            " har gjort " +
            selectedHero.damage +
            " skade på " +
            dragonObject.name +
            "!"
        );
  
        // Sjekk om dragen er død
        if (dragonObject.currentHP <= 0) {
          dragonObject.alive = false;
          alert(dragonObject.name + " er beseiret!");
        }
      });
    });
  });