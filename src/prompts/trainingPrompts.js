export const TRAINING_PROMPT =`
Objectif : fournir un plan d'entrainement sur 6 semaines correspondant aux critères fournis
Contraintes :
- Liste à puces en Markdown
- Structure :
    - 1 titre principal (exemple: plan d'entraînement sur 6 semaines)
    - 6 sections (1 par semaine) avec :
        - date
        - distance à parcourir
        - rythme à adopter
    - 1 section conseils alimentaires uniquement si je te le demande
    - explications courtes
`;