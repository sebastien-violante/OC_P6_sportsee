export const TRAINING_PROMPT =`
Attendu : plan d'entrainement sur 6 semaines
Contraintes :
- Liste à puces en Markdown
- Structure :
    - 1 titre principal h1
    - 6 sections (1 par semaine contenant jours de course avec date, distance, rythme, temps de course)
    - explications courtes. Pas de questions supplémentaires
    - structure attendue :
    Titre du plan (h1)
    Sections : h2 puis dates (autant que de jours de course): distance, rhytme, temps de course
    1 paragraphe avec conseils précis d'alimentation sauf si ma demande comprend "PAS DE CONSEILS D'ALIMENTATION"
`;