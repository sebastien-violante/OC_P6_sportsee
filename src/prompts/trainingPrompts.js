export const TRAINING_PROMPT =`
Objectif : fournir un plan d'entrainement sur 6 semaines en respectant les critères fournis, notamment les jours de course
Contraintes :
- Liste à puces en Markdown
- Structure :
    - 1 titre principal h1 (exemple: plan d'entraînement sur 6 semaines)
    - 6 sections (1 par semaine contenant les jours de course avec pour chacun le date, la distance à parcourir, le rythme à adopter, le temps de course
    - 1 section conseils alimentaires uniquement si je te le demande
    - explications courtes et ne me pose pas de questions supplémentaires à la fin de ta réponse
    - structure attendue :
    Titre du plan (h1)
        -6 sections sous la forme :
            -Semaine X (h2)
                autant de h3 que de jours de course :
                    Date (h3)
                        ul puis 3 li contenant distance, rythme et temps de course
        -seulement si ma demande contient "conseils hebdomadaires alimentation" : des conseils en alimentation sous la forme d'un titre Conseils alimentaires suivi d'un paragraphe
`;