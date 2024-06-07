// Select Region
const regionSelector = document.createElement('div');
regionSelector.classList.add('region-selector');
document.body.appendChild(regionSelector);

fetch('./script/Towns.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(entry => {
            const town = entry.name;
            const button = document.createElement('button');
            button.id = town;
            button.textContent = town;
            console.log(`Town: ${town}`);
            regionSelector.appendChild(button);
            button.dataset.min_hp = entry.min_hp;
            button.dataset.max_hp = entry.max_hp;
            button.dataset.min_level = entry.min_level;
            button.dataset.max_level = entry.max_level;
        });
        
        regionSelector.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const dataContainer = document.querySelector('.data');
                const minHp = parseInt(event.target.dataset.min_hp);
                const maxHp = parseInt(event.target.dataset.max_hp);
                const minLevel = parseInt(event.target.dataset.min_level);
                const maxLevel = parseInt(event.target.dataset.max_level);
        
                console.log(`Min HP: ${minHp}, Max HP: ${maxHp}, Min Level: ${minLevel}, Max Level: ${maxLevel}`);
        
                const hp = Math.floor(Math.random() * (maxHp - minHp + 1)) + minHp;
                const level = Math.floor(Math.random() * (maxLevel - minLevel + 1)) + minLevel;
        
                dataContainer.innerHTML = '';
                dataContainer.innerHTML += 
                `
                    <h2>${event.target.id}</h2>
                    <p>HP: ${hp}</p>
                    <p>Level: ${level}</p>
                `;
            }
        });

        // Generate Pokemon
        const body = document.querySelector('body');
        const container = document.querySelector('.container');
        const button = document.createElement('button');
        button.classList.add('generate-button');
        button.textContent = 'Generate Pokemon';

        body.appendChild(button);

        pokemonJSON = fetch('./script/Pokemon.json')
            .then(response => response.json())
            .then(data => {
                button.addEventListener('click', () => {
                    if (container.innerHTML !== '') {
                        container.innerHTML = ''; // Clear the container
                    }

                    const randomIndex = Math.floor(Math.random() * data.length);
                    let randomPokemon = data[randomIndex]; // Change const to let

                    if (randomPokemon.shiny === 1) {
                        const isShiny = Math.random() < 1/8;
                        if (!isShiny) {
                            const shinyPokemonIndex = data.findIndex(pokemon => pokemon.id === randomPokemon.id && pokemon.shiny === 1);
                            if (shinyPokemonIndex !== -1) {
                                data[shinyPokemonIndex].shiny = 0;
                            }
                            const nonShinyPokemon = data.filter(pokemon => pokemon.shiny === 0);
                            const randomNonShinyIndex = Math.floor(Math.random() * nonShinyPokemon.length);
                            randomPokemon = nonShinyPokemon[randomNonShinyIndex];
                        }
                    }
                    console.log(`Random Pokemon: ${randomPokemon.id}, isShiny: ${randomPokemon.shiny}`);
                    const spritePath = randomPokemon.sprite;

                    container.innerHTML = 
                    `
                        <img src="${spritePath}" alt="Pokemon Image" />
                        <div class="information">
                            <p>Pokemon ID: ${randomPokemon.id}</p>
                            <p>Is Shiny? ${randomPokemon.shiny === 1 ? true : false}</p>
                            <div class="data"></div>
                        </div>
                    `; // Append the pokemon image to the container
                });

            })
            .catch(error => {
                console.error('Error fetching JSON:', error);
            });

    })
    .catch(error => {
        console.error('Error:', error);
    });


