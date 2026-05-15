export const TRAINING_PROMPT =`
Objectif : fournir un plan d'entrainement sur 6 semaines correspondant aux critères fournis
Contraintes :
- Liste à puces en Markdown
- Structure :
    - 1 titre principal (exemple: plan d'entraînement sur 6 semaines)
    - 6 sections (1 par semaine) avec pour chacune les jours de course avec pour chacun le date, la distance à parcourir, le rythme à adopter, le temps de course
    - 1 section conseils alimentaires uniquement si je te le demande
    - explications courtes et ne me pose pas de questions supplémentaires à la fin de ta réponse
`;