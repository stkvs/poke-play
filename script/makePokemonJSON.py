import os
import json

directory = '{yourDirectory}/sprites'

def make_pokemon_json():
    pokemon_list = []
    id_counter = 0

    # Process regular sprites
    regular_folder = f"{directory}/regular"
    regular_files = os.listdir(regular_folder)
    for file in regular_files:
        sprite_path = os.path.join('sprites/regular/', file)
        pokemon = {
            'id': id_counter,
            'sprite': './' + sprite_path,
            'shiny': 0
        }
        pokemon_list.append(pokemon)
        id_counter += 1

    # Process shiny sprites
    shiny_folder = f"{directory}/shiny"
    shiny_files = os.listdir(shiny_folder)
    for file in shiny_files:
        sprite_path = os.path.join('sprites/shiny/', file)
        pokemon = {
            'id': id_counter,
            'sprite': './' + sprite_path,
            'shiny': 1
        }
        pokemon_list.append(pokemon)
        id_counter += 1

    return pokemon_list

pokemon_json = make_pokemon_json()
file_path = os.path.join(os.getcwd(), 'Pokemon.json')

with open(file_path, 'w') as file:
    json.dump(pokemon_json, file)

print("Pokemon.json file created successfully!")
