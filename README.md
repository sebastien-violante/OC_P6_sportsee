# Dashboard Sport - Projet OpenClassrooms

## Introduction

Ce projet a été développé par **Sébastien VIOLANTE** dans le cadre de la formation *Concepteur d'application React* proposée par **OpenClassrooms**.  

Il s'agit du projet n°6 de la formation, qui consiste à réaliser un **dashboard de sport** connecté à une IA afin d'obtenir des propositions d'entraînement.

---

## 1. Installation des dépendances

```bash
npm install
```
## 2. Lancement du projet

### 2.1. Lancement du backend

Se rendre dans le dossier P6JS puis

```bash
yarn dev
```
### 2.2. Lancement du front

Se rendre dans le dossier sportsee puis

```bash
npm run dev
```
## 3. Utilisation du mode mock

Le projet est conçu pour permettre de basculer du mode api au mode mock. Le passage d'un mode à l'autre se fait en cliquant sur le bouton situé au milieu du footer.  
- Api signifie que le mode actuel est api. Les données de l'utilisateur sont récupérées depuis le backend.  
- Mock signifie que le mode actuel est mock.   Les données sont récupérées depuis un json situé dans /api/mock/activities.js ou api/mock/user.js, via des services (respectivement api/fetchFromMock/fetchMockActivities.js et api/fetchFromMock/fetchMockUser.js) qui simulent un backend (envoi d'une réponse json avec un délai de latence à 500ms)

Pour utiliser un autre mock, il suffit de remplacer les données dans les dossiers précités, et de charger l'image du user correspindant dans /public et la nommant par le prénom de user

## 4. Paramétrage du coach virtuel

Le projet permet d'interroger Mistral afin de faire générer à l'IA un plan d'entraînement en fonction :
- des statistiques globales de l'utilisateur
- des données saisies dans le formulaire de la page /coach-virtuel
- de données d'environnement
- d'une consigne globale

Le résultat (plan d'entraînement) s'affiche en dessous du formulaire lorsque les éléments sont renvoyés par l'IA.

### 4.1 Authentification

L'utilisation du coach virtuel nécessite de posséder un token Mistral. Il peut être généré à l'adresse suivante :

https://admin.mistral.ai/organization/workspaces/6c93f99c-468a-43d5-821c-e239391a6abc/api-keys

Dans le projet, le token est stocké en tant que variable d'environnement **VITE_API_KEY** et rappelée dans le composant Coach.jsx

### 4.2 Statistiques de l'utilisateur

Pour permettre un prompt plus réaliste quant au niveau de l'utilisateur, les dernières statistiques sont intégrées. Ainsi, le prompt intègre automatiquement :
- le nombre de kilomètre moyen quotidiens parcourus depuis la date d'inscription jusqu'à la date du jour
- le poids de l'utilisateur
- l'âge de l'utilisateur

Ces données ne sont pas paramétrables

### 4.3 Données du formulaire

Le prompt est complété par les données que l'utilisateur saisit dans le formulaire. Il doit obligatoirement saisir :
- un type de course et une distance qui peut être saisie par défaut s'il s'agit d'une course classique (marathon, semi-marathon, 10km) ou saisi manuellement s'il s'agit d'une course libre
- une date de début de course qui permet à l'IA de déterminer de manière rétro active les dates d'entraînement, en se basant sur le fait que le plan d'entraînement proposé comprendd obligatoirement 6 semaines
- un ou plusieurs jours de disponibilité

### 4.4 Données d'environnement

Afin d'utiliser l'application, il est indispensable de créer un fichier .env, et de vérifier son inscription dans le .gitignore. Ce fichier doit comprendre les paramètres suivants :

**VITE_API_KEY**: le clé API permettant l'accès à Mistral  
**VITE_MODEL**: le model d'accès à Mistral (pour ce projet, le modèle small est siffisant)  
**VITE_TEMPERATURE**: la température de la réponse (pour ce projet, privilégier 0.7 ou inférieur)  
**VITE_MAX_TOKENS**: la longuer de la réponse fournie par l'IA. Une valeur de 3000 permet d'obtenir un plan complet sans qu'il soit tronqué  
**VITE_SYSTEM**: le system fourni dans le prompt (par exemple: *"tu es un coach sportif confirmé et spécialisé dans la course à pieds"*)

### 4.5 Consigne globale

La consigne globale arrive en fin de prompt et permet de définir le format attendu de la réponse. Il est primordial pour permettre un traitement correct des données lors de l'affichage.  
La consigne est définie dans le fichier /src/prompts/trainingPrompts.js sous forme d'une constante.

## 5. Fonctionnement de l'API

### 5.1 Endpoint

L'API n'utilise qu'un seul endpoint :
```bash
    POST https://api.mistral.ai/v1/chat/completions
```
Ce endpoint est à ajouter dans le fichier .env comme valeur de la constante **VITE_URL**

### 5.2 Composition de la requête

#### 5.2.1 Headers

Le header de la requête contient :
```bash
Content-Type: application/json
Ahtorization: Bearer <token>
```
**Explication**  
Content-Type permet d'indiquer que le body de la requête est en json. Le token est celui qui est appelé depuis VITE_API_KEY

#### 5.2.2 Body

Le body est composé de la manière suivante :
```bash
{
   "model" : <model>,
   "temperature": <temperature>
   "messages": [
        {"role": "system", "content": <system>},
        {"role": "user", "content": <formData>},
        {"role": "user", "content": <activityData>},
        {"role": "user", "content": <consigne>}
   ] 
    }
```

**Explication**  
-**system** est défini automatiquement à partir de la variable VITE_SYSTEM  
-**formData** représente les données issues du formulaire utilisateur  
-**activityData** est calculé automatiquement à partir des données d'activité et des biodata de l'utilisateur (distance moyenne, âge, poids...)  
-**consigne** provient de la consigne définie en tant que constante TRAINING_PROMPT  

#### 5.2.3 Exemple de requête 

```bash
{
   "model" : "mistral-small-latest",
   "temperature": 0.7
   "messages": [
        {"role": "system", "content": "tu es un coach sportif confirmé et spécialisé en course à pieds"},
        {"role": "user", "content": "Je souhaite faire une course type semi-marathon (21 kilomètres), le 2026-07-19. Le terrain est plutôt route."},
        {"role": "user", "content": "Je suis disponible pour courir chaque semaine les : Lundi, Mercredi."},
        {"role": "user", "content": ""J'ai également besoin de conseils de nutrition"},
        {"role": "user", "content": "Voici mes statistiques depuis le 01.01.2025 : j'ai couru en moyenne 5.3 kilomètres par jour jusqu'à aujourd'hui. Je pèse 71 kilos et j'ai 44 ans."},
        {"role": "user", "content": "Objectif : fournir un plan d'entrainement sur 6 semaines correspondant aux critères fournis.Contraintes :- Liste à puces en Markdown, - Structure : - 1 titre principal (exemple: plan d'entraînement sur 6 semaines), - 6 sections (1 par semaine) avec :
        - date, - distance à parcourir, - rythme à adopter, - 1 section conseils alimentaires uniquement si je te le demande, - explications courtes"}
   ] 
}
```

#### 5.2.3 Exemple de réponse attendue

```bash
Plan d’entraînement sur 6 semaines pour un semi-marathon (21 km)
Préparation pour le 19 juillet 2026 – Terrain route – 2 séances/semaine (Lundi & Mercredi)

⚠️ Notes importantes :

Ce plan est conçu pour un coureur débutant/intermédiaire en semi-marathon.
Adaptez les allures en fonction de votre ressenti (objectif : endurance, pas de performance immédiate).
Échauffez-vous toujours 10-15 min avant chaque séance (footing lent + étirements dynamiques).
Hydratez-vous bien avant/après les runs, et buvez par petites gorgées pendant l’effort si >1h.
Repos actif : marche, vélo ou natation les jours sans course pour favoriser la récupération.
Semaine 1 (22-28 juin 2026)
Lundi : 8 km à allure endurance fondamentale (6:30-7:00/km) Objectif : Habituer le corps à l’effort régulier. Respectez un rythme où vous pouvez parler facilement.
Mercredi : 6 km à allure endurance (6:30-7:00/km) + 3 accélérations progressives (30 sec à allure 5:30/km en fin de sortie) Objectif : Travail de foulée et légère stimulation cardiaque.
Astuce : Notez votre fréquence cardiaque (FC) pendant les runs pour ajuster les allures.

Semaine 2 (29 juin - 5 juillet 2026)
Lundi : 10 km à allure endurance (6:30-7:00/km) Objectif : Augmenter progressivement la distance sans forcer.
Mercredi : 5 km à allure endurance + 4 x 3 min à allure semi-marathon (5:40-6:00/km) avec récupération 2 min marche/trotin Objectif : Préparer le corps aux variations de rythme.
Focus : Étirez-vous bien après chaque sortie (mollets, quadriceps, ischio-jambiers).

Semaine 3 (6-12 juillet 2026)
Lundi : 12 km à allure endurance (6:30-7:00/km) Objectif : Tester votre capacité à tenir sur une distance proche de la moitié du semi.
Mercredi : 6 km à allure endurance + 2 x 5 min à allure 5:50/km avec récupération 3 min marche Objectif : Renforcer l’endurance spécifique.
Conseil : Portez les chaussures que vous utiliserez le jour J pour les habituer.

Semaine 4 (13-19 juillet 2026)
Lundi : 8 km à allure endurance (6:30-7:00/km) Objectif : Récupération active avant la semaine "clé".
Mercredi : 15 km à allure endurance (6:30-7:00/km) Objectif : Longue sortie pour simuler la durée de l’effort le jour J.
Rappel : Hydratez-vous pendant et après les runs longs (eau + électrolytes si nécessaire).

Semaine 5 (20-26 juillet 2026) – Semaine de réduction
Lundi : 6 km à allure endurance très légère (7:00-7:30/km) Objectif : Garder le rythme sans fatigue.
Mercredi : 10 km à allure endurance (6:30-7:00/km) Objectif : Conserver la sensation de course sans forcer.
À faire : Étudiez le parcours (dénivelé, ravitaillements) et planifiez votre stratégie de course.

Semaine 6 (27 juillet - 2 août 2026) – Affûtage
Lundi : 5 km à allure très légère (7:30-8:00/km) Objectif : Relâchement musculaire.
Mercredi : 3 km à allure endurance + 3 accélérations courtes (20 sec) Objectif : Garder les jambes "vivantes" sans épuiser.
Derniers conseils :

Dormez 7-8h/nuit la semaine avant la course.
Mangez des glucides complexes (pâtes, riz) 2 jours avant.
Jour J : Petit-déjeuner 3h avant (ex: banane + porridge + compote).
```

### 5.3 Erreurs de requête possibles

La requête vers l'API peut renvoyer les codes d'erreur suivants :
-**401**: unauthorized : l'authentification a échoué. Il se peut que le token ne soit pas valable ou qu'il soit absent de la requête
-**403**: forbidden : l'accès n'est pas autorisé en raison d'una absence de droit. Cela peut se produire sur les system
