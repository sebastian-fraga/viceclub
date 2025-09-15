document.addEventListener('DOMContentLoaded', function() {

document.querySelectorAll("[data-radios]").forEach(container => {

  const radios = JSON.parse(container.dataset.radios);
  let currentIndex = 0;
  const radioName = container.querySelector("#nameRadio");
  const prevBtn = container.querySelector("#previousRadio");
  const nextBtn = container.querySelector("#nextRadio");
  const footer = document.querySelector("footer");
  const radioInfo = document.getElementById("radioInfo");
  const radioTitle = document.getElementById("radioTitle");
  const radioDescription = document.getElementById("radioDescription");
  const radioData = {
    "HEAD RADIO": {
    image: "../assets/images/radios/III/headradio.webp",
    dj: "Michael Hunt",
    genre: "Rock Alternativo / Pop",
    list: ["Dil-Don't - Stripe Summer", "Whatever - Good Thing", "Craig Gray - Fade Away", "Conor and Jay - Change", "Frankie Fame - See Through You", "Scatwerk - Electronic Go Go", "Dezma - Life Is But A Mere Supply"]
  },
  "DOUBLE CLEF FM": {
    image: "../assets/images/radios/III/doublecleff.webp",
    dj: "Morgan Merryweather",
    genre: "Ópera",
    list: ["Wolfgang Amadeus Mozart - Non Piu Andrai Farfallone Amoroso", "Gaetano Donizetti - Chi Mi Frena In Tal Momento", "Giuseppe Verdi - Libiamo Ne'lieti Calici", "Wolfgang Amadeus Mozart - Finch'han Del Vino", "Giacomo Puccini - O Mio Babbino Caro*", "Giuseppe Verdi - La Donna E Mobile"]
  },
  "K-JAH RADIO": {
    image: "../assets/images/radios/III/k-jah.webp",
    dj: 'Horace "The Pacifist" Walsh',
    genre: "Reggae",
    list: ["Scientist - Dance of the Vampires", "Scientist - Your Teeth in My Neck", "Scientist - The Corpse Rises", "Scientist - The Mummy's Shroud", "Scientist - Plague of Zombies"]
  },
  "RISE FM": {
    image: "../assets/images/radios/III/rise.webp",
    dj: 'DJ Andre',
    genre: "Techno/Rave",
    list: ["Slyder - Neo (The One)", "Slyder - Score (Original Mix)", "Chris Walsh & Dave Beran - Shake (Revolt Clogrock Remix)", "Shiver - Deep Time", "Slyder - Innerbattle"]
  },
  "LIPS 106": {
    image: "../assets/images/radios/III/lips.webp",
    dj: 'Andee',
    genre: "Pop/Jazz/Rap",
    list: ["Fatamarse - Bump To The Music", "April's in Paris - Feels Like I Just Can't Take No More", "Lucy - Forever", "Boyz 2 Girls - Pray It Goes Ok?", "Da Shootaz - Grand Theft Auto", "Funky BJs - Rubber Tip"]
  },
  "GAME FM": {
    image: "../assets/images/radios/III/game_fm.webp",
    dj: 'Stretch Armstrong y Lord Sear',
    genre: "Hip-Hop",
    list: ["Reef - Scary Movies (Instrumental)", "Royce Da 5'9\" - We're Live (Danger)", "Nature - Nature Freestyle", "JoJo Pellegrino - JoJo Pellegrino Freestyle", "Royce Da 5'9\" ft. Pretty Ugly - Spit Game", "Royce Da 5'9\" - I'm The King", "Rush - Instrumental Bed 1", "Black Rob - By A Stranger", "Sean Price ft. Agallah - Rising To The Top", "Rush - Instrumental Bed 2"]
  },
  "MSX FM": {
    image: "../assets/images/radios/III/msx.webp",
    dj: 'MC Codebreaker',
    genre: "D&B/Techstep/Neurofunk/Darkstep",
    list: ["TJ Rizing - Agent 007", "Calyx - Quagmire", "Rascal & Klone - Get Wild", "Ryme Tyme - Judgment Day", "Hex - Force", "Omni Trio - First Contact", "Aquasky - Spectre", "Rascal & Klone - Winner Takes All", "Ryme Tyme - T Minus", "nCode - Spasm", "D.Kay - Monolith", "Dom & Ryme Tyme - Iceberg"]
  },
  "FLASHBACK 95.6": {
    image: "../assets/images/radios/III/flashback.webp",
    dj: 'Toni',
    genre: "Soundtrack de Scarface (New Wave/Electronica",
    list: ["Paul Engemann - Scarface (Push It To The Limit", "Debbie Harry - Rush Rush", "Amy Holland - She's On Fire", "Elizabeth Daily - Shake It Up", "Elizabeth Daily - I'm Hot Tonight"]
  },
  "WILDSTYLE": {
    image: "../assets/images/radios/VC/wildstyle.webp",
    dj: 'Mr. Magic',
    genre: "Rap/Funk",
    list: ["Trouble Funk - Pump Me Up", "Davy DMX - One for the Treble", "Cybotron - Clear", "Hashim - Al Naafiysh (The Soul)", "Herbie Hancock - Rockit*", 'Afrika Bambaataa & Soul Sonic Force - Looking for the Perfect Beat (12" Vocal Version)*', "2 Live Crew - Get It Girl", "Run-D.M.C. - Rock Box", "Mantronix - Bassline", "Tyrone Brunson - The Smurf*", "Whodini - Magic's Wand", "Zapp & Roger - More Bounce to the Ounce", "Grandmaster Flash and The Furious Five - The Message", "Kurtis Blow - The Breaks", "Man Parrish - Hip Hop, Be Bop (Don't Stop)"]
  },
  "FLASH FM": {
    image: "../assets/images/radios/VC/flash.webp",
    dj: 'Teri y Toni',
    genre: "Pop/New Wave",
    list: ["Hall & Oates - Out of Touch", "Wang Chung - Dance Hall Days", "Michael Jackson - Billie Jean*", "Laura Branigan - Self Control", "Go West - Call Me", "INXS - Kiss the Dirt (Falling Down the Mountain", "Bryan Adams - Run to You", "Electric Light Orchestra - Four Little Diamonds", "Yes - Owner of a Lonely Heart", "The Buggles - Video Killed the Radio Star", "Aneka - Japanese Boy", "Talk Talk - Life's What You Make It", "The Outfield - Your Love", "Joe Jackson - Steppin' Out", "The Fixx - One Thing Leads To Another", "Lionel Richie - Running With The Night**"]
  },
  };

  function updateRadio(direction) {
    radioName.style.transform = `translateX(${direction === "next" ? "-100%" : "100%"})`;
    radioName.style.opacity = "0";

    setTimeout(() => {
      const currentRadio = radios[currentIndex];
      radioName.textContent = currentRadio;

      radioName.style.transform = `translateX(${direction === "next" ? "100%" : "-100%"})`;
      void radioName.offsetWidth;
      radioName.style.transform = "translateX(0)";
      radioName.style.opacity = "1";

      if (currentRadio === "RADIO APAGADA") {
        radioInfo.classList.remove("active");
        footer.style.display = "none";
      } else {
      radioInfo.classList.add("active");
      footer.style.display = "flex";

        const data = radioData[currentRadio];

  radioTitle.textContent = currentRadio;
  document.getElementById("radioImage").src = data?.image || "";
  document.getElementById("radioDJ").textContent = data?.dj || "";
  document.getElementById("radioGenre").textContent = data?.genre || "";

  const radioList = document.getElementById("radioList");
  radioList.innerHTML = "";
  (data?.list || []).forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    radioList.appendChild(li);
  });
}

    }, 400);
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + radios.length) % radios.length;
    updateRadio("prev");
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % radios.length;
    updateRadio("next");
  });
});
});