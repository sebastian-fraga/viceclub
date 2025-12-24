document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-radios]").forEach((container) => {
    const radios = JSON.parse(container.dataset.radios);
    let currentIndex = 0;
    const radioName = container.querySelector("#nameRadio");
    const prevBtn = container.querySelector("#previousRadio");
    const nextBtn = container.querySelector("#nextRadio");
    const footer = document.querySelector("footer");
    const radioInfo = document.getElementById("radioInfo");
    const radioTitle = document.getElementById("radioTitle");

    const audio = new Audio();
    let audioInterval;
    let currentRadio = null;
    let currentSongIndex = -1;

    const radioData = {
      //GTA III
      HEAD_RADIO_III: {
        displayName: "Head Radio",
        image: "../assets/images/radios/III/headradio.webp",
        audio: "https://viceclub.s3.us-east-1.amazonaws.com/III/Head+Radio.mp3",
        dj: "Michael Hunt",
        genre: "Rock Alternativo / Pop",
        list: [
          "Dil-Don't - Stripe Summer",
          "Whatever - Good Thing",
          "Craig Gray - Fade Away",
          "Conor and Jay - Change",
          "Frankie Fame - See Through You",
          "Scatwerk - Electronic Go Go",
          "Dezma - Life Is But A Mere Supply",
        ],
        songs: [],
      },
      DOUBLE_CLEF_III: {
        displayName: "Double Clef FM",
        image: "../assets/images/radios/III/doublecleff.webp",
        audio:
          "https://viceclub.s3.us-east-1.amazonaws.com/III/Double+Clef.mp3",
        dj: "Morgan Merryweather",
        genre: "Ópera",
        list: [
          "Wolfgang Amadeus Mozart - Non Piu Andrai Farfallone Amoroso",
          "Gaetano Donizetti - Chi Mi Frena In Tal Momento",
          "Giuseppe Verdi - Libiamo Ne'lieti Calici",
          "Wolfgang Amadeus Mozart - Finch'han Del Vino",
          "Giacomo Puccini - O Mio Babbino Caro*",
          "Giuseppe Verdi - La Donna E Mobile",
        ],
        songs: [],
      },
      "K-JAH_III": {
        displayName: "K-Jah Radio",
        image: "../assets/images/radios/III/k-jah.webp",
        audio:
          "https://viceclub.s3.us-east-1.amazonaws.com/III/K-JAH+Radio.mp3",
        dj: 'Horace "The Pacifist" Walsh',
        genre: "Reggae",
        list: [
          "Scientist - Dance of the Vampires",
          "Scientist - Your Teeth in My Neck",
          "Scientist - The Corpse Rises",
          "Scientist - The Mummy's Shroud",
          "Scientist - Plague of Zombies",
        ],
        songs: [],
      },
      RISEFM: {
        displayName: "Rise FM",
        image: "../assets/images/radios/III/rise.webp",
        audio: "https://viceclub.s3.us-east-1.amazonaws.com/III/Rise+FM.mp3",
        dj: "DJ Andre",
        genre: "Techno/Rave",
        list: [
          "Slyder - Neo (The One)",
          "Slyder - Score (Original Mix)",
          "Chris Walsh & Dave Beran - Shake (Revolt Clogrock Remix)",
          "Shiver - Deep Time",
          "Slyder - Innerbattle",
        ],
        songs: [],
      },
      LIPS106: {
        displayName: "Lips 106",
        image: "../assets/images/radios/III/lips.webp",
        audio: "https://viceclub.s3.us-east-1.amazonaws.com/III/Lips+106.mp3",
        dj: "Andee",
        genre: "Pop/Jazz/Rap",
        list: [
          "Fatamarse - Bump To The Music",
          "April's in Paris - Feels Like I Just Can't Take No More",
          "Lucy - Forever",
          "Boyz 2 Girls - Pray It Goes Ok?",
          "Da Shootaz - Grand Theft Auto",
          "Funky BJs - Rubber Tip",
        ],
        songs: [],
      },
      GAMEFM: {
        displayName: "Game Radio FM",
        image: "../assets/images/radios/III/game_fm.webp",
        audio:
          "https://viceclub.s3.us-east-1.amazonaws.com/III/Game+Radio+FM.mp3",
        dj: "Stretch Armstrong y Lord Sear",
        genre: "Hip-Hop",
        list: [
          "Reef - Scary Movies (Instrumental)",
          "Royce Da 5'9\" - We're Live (Danger)",
          "Nature - Nature Freestyle",
          "JoJo Pellegrino - JoJo Pellegrino Freestyle",
          "Royce Da 5'9\" ft. Pretty Ugly - Spit Game",
          "Royce Da 5'9\" - I'm The King",
          "Rush - Instrumental Bed 1",
          "Black Rob - By A Stranger",
          "Sean Price ft. Agallah - Rising To The Top",
          "Rush - Instrumental Bed 2",
        ],
        songs: [],
      },
      MSXFM: {
        displayName: "MSX FM",
        image: "../assets/images/radios/III/msx.webp",
        audio: "https://viceclub.s3.us-east-1.amazonaws.com/III/MSX+FM.mp3",
        dj: "MC Codebreaker",
        genre: "D&B/Techstep/Neurofunk/Darkstep",
        list: [
          "TJ Rizing - Agent 007",
          "Calyx - Quagmire",
          "Rascal & Klone - Get Wild",
          "Ryme Tyme - Judgment Day",
          "Hex - Force",
          "Omni Trio - First Contact",
          "Aquasky - Spectre",
          "Rascal & Klone - Winner Takes All",
          "Ryme Tyme - T Minus",
          "nCode - Spasm",
          "D.Kay - Monolith",
          "Dom & Ryme Tyme - Iceberg",
        ],
        songs: [],
      },
      "FLASHBACK_95.6": {
        displayName: "Flashback 95.6",
        image: "../assets/images/radios/III/flashback.webp",
        audio:
          "https://viceclub.s3.us-east-1.amazonaws.com/III/Flashback+FM.mp3",
        dj: "Toni",
        genre: "Soundtrack de Scarface (New Wave/Electronica",
        list: [
          "Debbie Harry - Rush Rush",
          "Elizabeth Daily - Shake It Up",
          "Paul Engemann - Scarface (Push It To The Limit)",
          "Amy Holland - She's On Fire",
          "Elizabeth Daily - I'm Hot Tonight",
        ],
        songs: [
          {
            title: "Rush Rush",
            artist: "Debbie Harry",
            start: "4",
            end: "195",
          },
          {
            title: "Shake It Up",
            artist: "Elizabeth Daily",
            start: "250",
            end: "441",
          },
          {
            title: "Scarface (Push It To The Limit)",
            artist: "Paul Engemann",
            start: "526",
            end: "672",
          },
          {
            title: "She's On Fire",
            artist: "Amy Holland",
            start: "678",
            end: "885",
          },
          {
            title: "I'm Hot Tonight",
            artist: "Elizabeth Daily",
            start: "939",
            end: "1107",
          },
        ],
      },

      //GTA VC
      WILDSTYLE: {
        image: "../assets/images/radios/VC/wildstyle.webp",
        displayName: "WILDSTYLE",
        audio:
          "https://viceclub.s3.us-east-1.amazonaws.com/VC/Wildstyle+Pirate+Radio.mp3",
        dj: "Mr. Magic",
        genre: "Rap/Funk",
        list: [
          "Trouble Funk - Pump Me Up",
          "Davy DMX - One for the Treble",
          "Cybotron - Clear",
          "Hashim - Al Naafiysh (The Soul)",
          "Herbie Hancock - Rockit*",
          'Afrika Bambaataa & Soul Sonic Force - Looking for the Perfect Beat (12" Vocal Version)*',
          "2 Live Crew - Get It Girl",
          "Run-D.M.C. - Rock Box",
          "Mantronix - Bassline",
          "Tyrone Brunson - The Smurf*",
          "Whodini - Magic's Wand",
          "Zapp & Roger - More Bounce to the Ounce",
          "Grandmaster Flash and The Furious Five - The Message",
          "Kurtis Blow - The Breaks",
          "Man Parrish - Hip Hop, Be Bop (Don't Stop)",
        ],
        songs: [],
      },
      FLASH_VC: {
        image: "../assets/images/radios/VC/flash.webp",
        displayName: "FLASH FM",
        audio: "https://viceclub.s3.us-east-1.amazonaws.com/VC/Flash+FM.mp3",
        dj: "Teri y Toni",
        genre: "Pop/New Wave",
        list: [
          "Hall & Oates - Out of Touch",
          "Wang Chung - Dance Hall Days",
          "Michael Jackson - Billie Jean*",
          "Laura Branigan - Self Control",
          "Go West - Call Me",
          "INXS - Kiss the Dirt (Falling Down the Mountain",
          "Bryan Adams - Run to You",
          "Electric Light Orchestra - Four Little Diamonds",
          "Yes - Owner of a Lonely Heart",
          "The Buggles - Video Killed the Radio Star",
          "Aneka - Japanese Boy",
          "Talk Talk - Life's What You Make It",
          "The Outfield - Your Love",
          "Joe Jackson - Steppin' Out",
          "Lionel Richie - Running With The Night**",
        ],
        songs: [],
      },
      FEVER_VC: {
        image: "../assets/images/radios/VC/fever.webp",
        displayName: "FEVER 105",
        audio: "https://viceclub.s3.us-east-1.amazonaws.com/VC/Fever+105.mp3",
        dj: "Oliver Biscuit",
        genre: "Disco/Funk",
        list: [
          "The Whispers - And The Beat Goes On",
          "Fat Larry's Band - Act Like You Know",
          "Oliver Cheatham - Get Down Saturday Night",
          "The Pointer Sisters - Automatic",
          "René & Angela - I'll Be Good",
          "Mary Jane Girls - All Night Long",
          "Rick James - Ghetto Life",
          "Michael Jackson - Wanna Be Startin' Somethin'*",
          'Evelyn "Champagne" King - Shame',
          "Teena Marie - Behind The Groove",
          "Mtume - Juicy Fruit",
          "Kool & The Gang - Summer Madness",
          "Indeep - Last Night a DJ Saved My Life",
        ],
        songs: [],
      },
      "V-ROCK_VC": {
        image: "../assets/images/radios/VC/v-rock.webp",
        displayName: "V-ROCK",
        audio: "https://viceclub.s3.us-east-1.amazonaws.com/VC/V-Rock.mp3",
        dj: "Lazlow Jones",
        genre: "Rock",
        list: [
          "Twisted Sister - I Wanna Rock",
          "Mötley Crüe - Too Young To Fall In Love",
          "Quiet Riot - Cum On Feel The Noize",
          "The Cult - She Sells Sanctuary",
          "Ozzy Osbourne - Bark At The Moon*",
          "Love Fist - Dangerous Bastard**",
          "Iron Maiden - 2 Minutes To Midnight",
          "Loverboy - Working for the Weekend",
          "Alcatrazz - God Blessed Video",
          "Tesla - Cumin' Atcha Live",
          "Autograph - Turn Up The Radio",
          "Anthrax - Madhouse",
          "Slayer - Raining Blood",
          "Judas Priest - You've Got Another Thing Comin'",
          "Love Fist - Fist Fury**",
          "David Lee Roth - Yankee Rose",
        ],
        songs: [],
      },
      ESPANTOSO_VC: {
        image: "../assets/images/radios/VC/espantoso.webp",
        displayName: "RADIO ESPANTOSO",
        audio: "s3://viceclub/VC/Radio Espantoso.mp3",
        dj: "Pepe",
        genre: "Salsa/Jazz/Latino",
        list: [
          "Cachao - A gozar con mi combo",
          "Alpha Banditos - The Bull Is Wrong*",
          "Tres Apenas Como Eso - Yo te miré*",
          "Eumir Deodato - Latín Flute",
          "Mongo Santamaría - Mama Papa Tu",
          "Mongo Santamaría - Me and You Baby (Picao y Tostao)",
          "Machito y su Orquesta Afrocubana - Mambo, mucho mambo",
          "Unaesta - La vida es una lenteja*",
          "Lonnie Liston Smith - Expansions",
          "Irakere - Añunga Ñunga",
          "Eumir Deodato - Super Strut",
          "Xavier Cugat u Su Gran Orquesta - Jamay",
          "Benny Moré - Maracaibo Oriental",
          "Tito Puente - Mambo gozón",
        ],
        songs: [],
      },
      EMOTION_VC: {
        image: "../assets/images/radios/VC/emotion.webp",
        displayName: "EMOTION 98.3",
        audio:
          "https://viceclub.s3.us-east-1.amazonaws.com/VC/Emotion+98.3.mp3",
        dj: "Fernando Martínez",
        genre: "Soft Rock/Baladas",
        list: [
          "Foreigner - Waiting For A Girl Like You",
          "Kate Bush - Wow*",
          "Squeeze - Tempted",
          "REO Speedwagon - Keep On Loving You",
          "Cutting Crew - (I Just) Died in Your Arms",
          "Roxy Music - More Than This",
          "Toto - Africa",
          "Mr. Mister - Broken Wings",
          "John Waite - Missing You",
          "Jan Hammer - Crockett's Theme",
          "Night Ranger - Sister Christian",
          "Luther Vandross - Never Too Much",
        ],
        songs: [],
      },
      WAVE_VC: {
        image: "../assets/images/radios/VC/wave.webp",
        displayName: "WAVE 103",
        audio: "https://viceclub.s3.us-east-1.amazonaws.com/VC/Wave+103.mp3",
        dj: "Adam First",
        genre: "New Wave",
        list: [
          "Frankie Goes To Hollywood - Two Tribes",
          "Sigue Sigue Sputnik - Love Missile F1-11",
          "Gary Numan - Cars",
          "The Human League - (Keep Feeling) Fascination",
          "Blondie - Atomic",
          "Nena - 99 Luftballons",
          "Kim Wilde - Kids In America",
          "Tears For Fears - Pale Shelter",
          "Corey Hart - Sunglasses At Night",
          "ABC - Poison Arrow",
          "A Flock Of Seagulls - I Ran (So Far Away)",
          "The Psychedelic Furs - Love My Way",
          "Animotion - Obsession",
          "Spandau Ballet - Gold",
          "Thomas Dolby - Hyperactive!",
          "Romeo Void - Never Say Never",
        ],
        songs: [],
      },
      //GTA SA
      PLAYBACK: {
        image: "../assets/images/radios/SA/playback.webp",
        displayName: "PLAYBACK FM",
        audio: "https://viceclub.s3.us-east-1.amazonaws.com/SA/Playback+FM.mp3",
        dj: "Forth Right MC",
        genre: "Hip-Hop de la Costa Este",
        list: [
          "Trouble Funk - Pump Me Up",
          "Davy DMX - One for the Treble",
          "Cybotron - Clear",
          "Hashim - Al Naafiysh (The Soul)",
          "Herbie Hancock - Rockit*",
          'Afrika Bambaataa & Soul Sonic Force - Looking for the Perfect Beat (12" Vocal Version)*',
          "2 Live Crew - Get It Girl",
          "Run-D.M.C. - Rock Box",
          "Mantronix - Bassline",
          "Tyrone Brunson - The Smurf*",
          "Whodini - Magic's Wand",
          "Zapp & Roger - More Bounce to the Ounce",
          "Grandmaster Flash and The Furious Five - The Message",
          "Kurtis Blow - The Breaks",
          "Man Parrish - Hip Hop, Be Bop (Don't Stop)",
        ],
        songs: [],
      },
      "K-ROSE": {
        image: "../assets/images/radios/SA/k-rose.webp",
        displayName: "K-ROSE",
        audio: "https://viceclub.s3.us-east-1.amazonaws.com/SA/K-Rose.mp3",
        dj: "Mary-Beth Maybell",
        genre: "Música country",
        list: [
          "Jerry Reed - Amos Moses",
          "Conway Twitty & Loretta Lynn - Louisiana Woman, Mississippi Man",
          "Hank Williams With His Drifting Cowboys - Hey Good Lookin'",
          "Juice Newton - Queen of Hearts",
          "The Statler Brothers - New York City",
          "Asleep At The Wheel - The Letter That Johnny Walker Read",
          "The Desert Rose Band - One Step Forward",
          "Willie Nelson - Crazy",
          "Patsy Cline - Three Cigarettes In An Ashtray",
          "The Statler Brothers - Bed Of Roses",
          "Mickey Gilley - Make The World Go Away",
          "Ed Bruce - Mamas Don't Let Your Babies Grow Up To Be Cowboys",
          "Merle Haggard And The Strangers - Always Wanting You",
          "Whitey Shafer - All My Ex's Live In Texas",
          "Eddie Rabbitt - I Love A Rainy Night",
        ],
        songs: [],
      },
      "K-DST": {
        image: "../assets/images/radios/SA/k-dst.webp",
        displayName: "K-DST",
        audio: "https://viceclub.s3.us-east-1.amazonaws.com/SA/K-DST.mp3",
        dj: 'Tommy "The Nightmare" Smith',
        genre: "Rock",
        list: [
          "Foghat - Slow Ride",
          "Creedance Clearwater Revival - Green River",
          "Heart - Barracuda",
          "Kiss - Strutter",
          "Toto - Hold The Line",
          "Rod Stewart - Young Turks",
          "Tom Petty - Running Down a Dream*",
          "Joe Cocker - Woman to Woman*",
          "Humble Pie - Get Down To It",
          "Grand Funk Railroad - Some Kind Of Wonderful",
          "Lynyrd Skynyrd - Free Bird",
          "America - A Horse With No Name",
          "The Who - Eminence Front",
          "Boston - Smokin'",
          "David Bowie - Somebody Up There Likes Me",
          "Eddie Money - Two Tickets to Paradise",
          "Billy Idol - White Wedding",
        ],
        songs: [],
      },
      BOUNCE_FM: {
        image: "../assets/images/radios/SA/bounce.webp",
        displayName: "BOUNCE-FM",
        audio: "https://viceclub.s3.us-east-1.amazonaws.com/SA/Bounce+FM.mp3",
        dj: "The Funktipus",
        genre: "Disco/Funk",
        list: [
          "Zapp - I Can Make You Dance",
          "Kool & The Gang - Hollywood Swinging",
          "The Ohio Players - Love Rollercoaster",
          "Rick James - Cold Blooded",
          "Maze - Twilight",
          "The Fatback Band - Yum Yum (Gimme Some)*",
          "The Isley Brothers - Between The Sheets",
          "Ronnie Hudson & The Street People - West Coast Poplock",
          "Lakeside - Fantastic Voyage",
          "George Clinton - Loopzilla",
          "Dazz Band - Let it Whip",
          "Cameo - Candy",
          "MFSB (ft. The Three Degrees) - Love Is The Message (Part 2)",
          "The Ohio Players - Funky Worm",
          "Johnny Harris - Odyssey",
          "Roy Ayers - Running Away*",
          "The Gap Band - You Dropped A Bomb On Me*",
        ],
        songs: [],
      },
      "SF-UR": {
        image: "../assets/images/radios/SA/sfur.webp",
        displayName: "SF-UR",
        audio: "https://viceclub.s3.us-east-1.amazonaws.com/SA/SF-UR.mp3",
        dj: "Hans Oberlander",
        genre: "House/Electro/Dance",
        list: [
          "Jomamda - Make My Body Rock (Feel It) (The Basic Mix)",
          "808 State - Pacific-202",
          "The Todd Jerry Project - Weekend (Club Version)",
          "The Night Writers (ft. Ricky Dillard) - Let The Music (Use You)",
          "Marshall Jefferson - Move Your Body",
          "Maurice - This Is Acid (A New Dance Craze) (K & T Mix)",
          "Mr. Fingers - Can You Feel It (Chuck D. Mix)",
          "A Guy Called Gerald - Voodoo Ray",
          "Cultural Vibe - Vibe - Ma Foom Bey",
          "Ce Ce Rogers - Someday (Club Mix)",
          "Robert Owens - I'll Be Your Friend (Original Def Mix)",
          "Frankie Knuckles (ft. Jamie Principle) - Your Love",
          "Joe Smooth (ft. Anthony Thomas - Promised Land (Original Mix)",
          "The 28th Street Crew - I Need A Rhythm",
          "Raze - Break 4 Love",
          "Fallout - The Morning After (Sunrise Mix)",
        ],
        songs: [],
      },
    };

    function updateRadio() {
      const currentRadio = radios[currentIndex];
      radioName.classList.add("loading");
      radioName.textContent =
        radioData[currentRadio]?.displayName || currentRadio;

      if (currentRadio === "RADIO APAGADA") {
        audio.pause();
        radioInfo.classList.remove("active");
        footer.style.display = "none";
      } else {
        setTimeout(() => {
          radioName.classList.remove("loading");
        }, 300);

        const data = radioData[currentRadio];
        playRadio(currentRadio);
        radioInfo.classList.add("active");
        footer.style.display = "flex";

        radioTitle.textContent = data?.displayName || currentRadio;
        document.getElementById("radioImage").src = data?.image || "";
        document.getElementById("albumArt").src = data?.image || "";
        document.getElementById("radioDJ").textContent = data?.dj || "";
        document.getElementById("radioGenre").textContent = data?.genre || "";
      }
    }

    function playRadio(name) {
      if (audioInterval) clearInterval(audioInterval);

      currentRadio = name;
      const data = radioData[name];

      if (!data || !data.audio) {
        audio.pause();
        document.getElementById("songTitle").textContent =
          "Sin canción en reproducción";
        document.getElementById("artistName").textContent = "";
        document.getElementById("currentTime").textContent = "0:00";
        document.getElementById("totalTime").textContent = "0:00";
        document.getElementById("currentBar").style.width = "0%";
        renderSongList([], -1);
        return;
      }

      audio.src = data.audio;
      audio.play();

      playPauseBtn.style.display = "inline";
      playBtn.style.display = "none";

      const songs = data.songs;
      if (songs && songs.length > 0) {
        currentSongIndex = 0;
        document.getElementById("songTitle").textContent =
          songs[currentSongIndex].title;
        document.getElementById("artistName").textContent =
          songs[currentSongIndex].artist;
        renderSongList(songs, currentSongIndex);
      } else {
        document.getElementById("songTitle").textContent =
          data.list[0] || "No hay canciones disponibles";
        document.getElementById("artistName").textContent = "";
        document.getElementById("currentTime").textContent = "0:00";
        document.getElementById("totalTime").textContent = "0:00";
        document.getElementById("currentBar").style.width = "0%";
        renderSongList([], -1);
      }
    }

    function renderSongList(songs, activeIndex) {
      const radioList = document.getElementById("radioList");
      radioList.innerHTML = "";

      if (!songs || songs.length === 0) {
        const data = radioData[currentRadio];
        (data?.list || []).forEach((item) => {
          const li = document.createElement("li");
          li.textContent = item;
          li.style.opacity = "1";
          radioList.appendChild(li);
        });
        return;
      }

      songs.forEach((song, i) => {
        const li = document.createElement("li");

        if (song.artist && song.artist.trim() !== "") {
          li.textContent = `${song.artist} — ${song.title}`;
        } else {
          li.textContent = song.title;
        }

        if (i === activeIndex) {
          li.classList.add("active");
        } else {
          li.classList.remove("active");
        }

        li.style.cursor = "pointer";

        li.addEventListener("click", () => {
          audio.currentTime = Number(song.start);
          updateActiveSong(i);
        });

        radioList.appendChild(li);
      });
    }

    function updateActiveSong(index) {
      currentSongIndex = index;
      const songs = radioData[currentRadio].songs;

      if (!songs || !songs[index]) return;

      document.getElementById("songTitle").textContent = songs[index].title;
      document.getElementById("artistName").textContent = songs[index].artist;

      renderSongList(songs, index);
    }

    const prevSongBtn = document.querySelector(
      ".footer-controls span:nth-child(1)"
    );
    const playPauseBtn = document.querySelector(
      ".footer-controls span:nth-child(2)"
    );
    const playBtn = document.querySelector(
      ".footer-controls span:nth-child(3)"
    );
    const nextSongBtn = document.querySelector(
      ".footer-controls span:nth-child(4)"
    );
    const currentTimeDisplay = document.getElementById("currentTime");
    const totalTimeDisplay = document.getElementById("totalTime");
    const progressBar = document.getElementById("currentBar");
    const fullProgressBar = document.getElementById("bar");

    playPauseBtn.addEventListener("click", () => {
      audio.pause();
      playPauseBtn.style.display = "none";
      playBtn.style.display = "inline";
    });

    playBtn.addEventListener("click", () => {
      audio.play();
      playBtn.style.display = "none";
      playPauseBtn.style.display = "inline";
    });

    audio.addEventListener("timeupdate", () => {
      const totalTime = audio.duration;
      const currentTime = audio.currentTime;

      if (!isNaN(totalTime)) {
        const progress = (currentTime / totalTime) * 100;
        progressBar.style.width = `${progress}%`;

        const formatTime = (time) => {
          const minutes = Math.floor(time / 60);
          const seconds = Math.floor(time % 60);
          return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        };
        currentTimeDisplay.textContent = formatTime(currentTime);
        totalTimeDisplay.textContent = formatTime(totalTime);
      }
    });

    fullProgressBar.addEventListener("click", (e) => {
      const width = fullProgressBar.clientWidth;
      const clickX = e.offsetX;
      const timeToSeek = (clickX / width) * audio.duration;
      audio.currentTime = timeToSeek;

      const songs = radioData[currentRadio].songs;
      if (songs && songs.length > 0) {
        let foundSongIndex = -1;
        for (let i = 0; i < songs.length; i++) {
          if (
            timeToSeek >= Number(songs[i].start) &&
            timeToSeek < Number(songs[i].end)
          ) {
            foundSongIndex = i;
            break;
          }
        }
        if (foundSongIndex !== -1) {
          updateActiveSong(foundSongIndex);
        }
      }
    });

    const handleSongChange = (direction) => {
      if (!currentRadio) return;
      const songs = radioData[currentRadio].songs;
      if (!songs || songs.length === 0) return;

      if (direction === "next") {
        const nextIndex = (currentSongIndex + 1) % songs.length;
        audio.currentTime = Number(songs[nextIndex].start);
        updateActiveSong(nextIndex);
      } else if (direction === "prev") {
        const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        audio.currentTime = Number(songs[prevIndex].start);
        updateActiveSong(prevIndex);
      }
    };

    prevSongBtn.addEventListener("click", () => handleSongChange("prev"));
    nextSongBtn.addEventListener("click", () => handleSongChange("next"));

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + radios.length) % radios.length;
      updateRadio();
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % radios.length;
      updateRadio();
    });

    updateRadio();
  });
});
