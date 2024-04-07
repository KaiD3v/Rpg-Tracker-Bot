// format abilites texts
export function formatAbilities(abilities) {
    let message = "Habilidades:\n";
    abilities.forEach(ability => {
        message += `- ${ability.name} (${ability.index})\n`;
    });
    return message;
}