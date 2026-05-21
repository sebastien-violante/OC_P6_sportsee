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

https://admin.mistral.ai/organization/api-keys

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

Afin d'utiliser l'application, il est indispensable de créer un fichier **.env**, et de vérifier son inscription dans le .gitignore. Ce fichier doit comprendre les paramètres suivants :

**VITE_API_KEY**: le clé API permettant l'accès à Mistral  
**VITE_MODEL**: le model d'accès à Mistral (pour ce projet, le modèle small est siffisant)  
**VITE_TEMPERATURE**: la température de la réponse (pour ce projet, privilégier 0.7 ou inférieur)  
**VITE_MAX_TOKENS**: la longueur de la réponse fournie par l'IA. Une valeur de 3000 permet d'obtenir un plan complet sans qu'il soit tronqué  
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
Authorization: Bearer <token>
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
    "model":"mistral-small-latest",
    "temperature":0.3,
    "max_tokens":1500,
    "messages":[
        {"role":"system","content":"tu es un coach sportif confirmé et spécialisé en course à pieds"},
        {"role":"user","content":"Je souhaite faire une course type marathon (42.195 kilomètres), le 2026-08-02. Le terrain est plutôt mixte."},{"role":"user","content":"Je suis disponible pour courir chaque semaine les : Mercredi, Jeudi, Samedi."},
        {"role":"user","content":"Mes statistiques depuis le 01-01-25 :en moyenne 7 kilomètres/jour jusqu'à aujourd'hui. Poids : 62 kg. Age : 28 ans."},
        {"role":"user","content":"\nAttendu : plan d'entrainement sur 6 semaines\nContraintes :\n- Liste à puces en Markdown\n- Structure :\n    - 1 titre principal h1\n    - 6 sections (1 par semaine contenant jours de course avec date, distance, rythme, temps de course)\n    - explications courtes. Pas de questions supplémentaires\n    - structure attendue :\n    Titre du plan (h1)\n    Sections : h2 puis dates (autant que de jours de course): distance, rhytme, temps de course\n    1 paragraphe avec conseils précis d'alimentation sauf si ma demande comprend \"PAS DE CONSEILS D'ALIMENTATION\"\n"}
    ]
}
```

#### 5.2.3 Exemple de réponse attendue

```bash
{
    "id": "81f50d04b98b4a70a75e3dfa933b6514",
    "created": 1779172235,
    "model": "mistral-small-latest",
    "usage": {
        "prompt_tokens": 270,
        "total_tokens": 1747,
        "completion_tokens": 1477,
        "prompt_tokens_details": {
            "cached_tokens": 0
        }
    },
    "object": "chat.completion",
    "choices": [
        {
            "index": 0,
            "finish_reason": "stop",
            "message": {
                "role": "assistant",
                "tool_calls": null,
                "content": "# Plan d'entraînement pour marathon mixte (6 semaines)\n\n## Semaine 1\n### **Mercredi 2025-07-16**\n- **Distance** : 10 km\n- **Rythme** : 5:30/km (allure marathon cible : 5:10/km)\n- **Temps de course** : 55 min\n\n### **Jeudi 2025-07-17**\n- **Distance** : 8 km\n- **Rythme** : 5:45/km (récupération active)\n- **Temps de course** : 45 min\n\n### **Samedi 2025-07-19**\n- **Distance** : 12 km\n- **Rythme** : 5:20/km (allure marathon cible)\n- **Temps de course** : 1h02 min\n\n**Conseils d'alimentation** :\nHydratez-vous avec 500 ml d’eau 2h avant la séance et 250 ml 30 min avant. Consommez une banane 30 min avant le départ pour un apport en glucides rapides. Après la course, privilégiez une collation protéinée (yaourt grec + fruits secs) dans les 30 min.\n\n---\n\n## Semaine 2\n### **Mercredi 2025-07-23**\n- **Distance** : 12 km\n- **Rythme** : 5:25/km\n- **Temps de course** : 1h03 min\n\n### **Jeudi 2025-07-24**\n- **Distance** : 8 km\n- **Rythme** : 5:50/km\n- **Temps de course** : 46 min\n\n### **Samedi 2025-07-26**\n- **Distance** : 15 km\n- **Rythme** : 5:15/km\n- **Temps de course** : 1h17 min\n\n**Conseils d'alimentation** :\nAugmentez votre apport en glucides complexes (pâtes complètes, riz basmati) la veille de la longue sortie. Pendant l’effort, testez un gel énergétique (30 g de glucides) à mi-parcours. Post-course : smoothie banane-lait d’amande + 10 g de protéines en poudre.\n\n---\n\n## Semaine 3\n### **Mercredi 2025-07-30**\n- **Distance** : 14 km\n- **Rythme** : 5:20/km\n- **Temps de course** : 1h13 min\n\n### **Jeudi 2025-07-31**\n- **Distance** : 8 km\n- **Rythme** : 5:45/km\n- **Temps de course** : 45 min\n\n### **Samedi 2025-08-02**\n- **Distance** : 18 km\n- **Rythme** : 5:10/km\n- **Temps de course** : 1h32 min\n\n**Conseils d'alimentation** :\nJour de la longue sortie : petit-déjeuner 3h avant (porridge + miel + amandes). Pendant la course, alternez eau et boisson isotonique (500 ml/h). Après l’effort : repas complet (poulet, quinoa, légumes) dans les 2h.\n\n---\n\n## Semaine 4\n### **Mercredi 2025-08-06**\n- **Distance** : 10 km\n- **Rythme** : 5:30/km\n- **Temps de course** : 55 min\n\n### **Jeudi 2025-08-07**\n- **Distance** : 6 km\n- **Rythme** : 6:00/km\n- **Temps de course** : 36 min\n\n### **Samedi 2025-08-09**\n- **Distance** : 20 km\n- **Rythme** : 5:05/km\n- **Temps de course** : 1h41 min\n\n**Conseils d'alimentation** :\nPhase de récupération : augmentez les apports en oméga-3 (saumon, noix) et en antioxydants (myrtilles, épinards). Hydratation : 1,5 L d’eau dans la journée + électrolytes si transpiration importante.\n\n---\n## Semaine 5\n### **Mercredi 2025-08-13**\n- **Distance** : 12 km\n- **Rythme** : 5:25/km\n- **Temps de course** : 1h03 min\n\n### **Jeudi 2025-08-14**\n- **Distance** : 8 km\n- **Rythme** : 5:50/km\n- **Temps de course** : 46 min\n\n### **Samedi 2025-08-16**\n- **Distance** : 12 km\n- **Rythme** : 5:15/km\n- **Temps de course** : 1h02 min\n\n**Conseils d'alimentation** :\nTestez votre stratégie de ravitaillement pour le marathon (gels, boissons) lors de cette sortie. Évitez les aliments nouveaux. Post-course : repas riche en protéines (steak de bœuf) + glucides (patate douce).\n\n---\n## Semaine 6 (Affûtage)\n### **Mercredi 2025-08-20**\n- **Distance** : 8 km\n- **Rythme** : 5:40/km\n- **Temps de course** : 43 min\n\n### **Jeudi 2025-08-21**\n- **Distance** : 5 km\n- **Rythme** : 6:00/km\n- **Temps de course** : 30 min\n\n### **Samedi 2025-08-23**\n- **Distance** : 6 km\n- **Rythme** : 5:50/km\n- **Temps de course** : 35 min\n\n**Conseils d'alimentation** :\nDiminuez progressivement les glucides (50% de votre apport habituel) 3 jours avant la course. Hydratez-vous bien mais sans excès. La veille au soir : dîner léger (soupe, poisson blanc, riz blanc)."
            }
        }
    ]
}
```

### 5.3 Erreurs de requête possibles

La requête vers l'API peut renvoyer les codes d'erreur suivants :
-**401** : Unauthorized : l'authentification a échoué. Il se peut que le token ne soit pas valable ou qu'il soit absent de la requête  
-**403** : Forbidden : l'accès n'est pas autorisé en raison d'una absence de droit. Cela peut se produire sur les modeles medium et large qui sont payants  
-**404** : Not Found : le endpoint n'est pas correct. Il peut s'agir d'une modification du la variable VITE_URL ou alors de la modification par Mistral de son endpoint  
-**429** : Too Many Request : trop de reqûetes sont reçues par l'api qui ne peut pas les traiter  
-**500** : Internal Server Error: le service n'est tout simplement pas disponible  
-**503** : Service Unavaliable: le service api ne répond pas  
-**504** : Timeout: réponse trop longue  

Par ailleurs, une erreur apparaît lesque le statut **finish-reason** est à **"length"** au lieu de "stop". Cela signifie que le **VITE_MAX_TOKENS** est insuffisant pour recevoir la totalité de la réponse del'api. Il faut donc l'augmenter.

### 5.4 Limitations

- Le nombre de prompts envoyés à l'IA est limité à un nombre défini dans la variable **VITE_PROMPTS_LIMITATION** dont la valeur est fixée dans le **.env**. Ainsi, le côut par utilisateur et par jour est contrôlé.  

- Le nombre de tokens envoyés est limité par la structure du message et le fait que l'utilisateur n'ajout aucune donnée. En l'état, la payload se situe aux environs de 270 tokens, soit environ 200 mots. La majeures partie de la charge provient de la variable **trainingPrompts** qui sert à cadrer la réponse attendue.  

- Le nombre de tokens reçus est limité par la constante **VITE_MAX_TOKENS** à 2000 token, ce qui représente un paragraphe d'environ 1500 mots. A titre de comparaison :  
| Usage             | Total tokens |  
| ----------------- | ------------ |  
| Petit chatbot     | 100–500      |  
| Réponse détaillée | 1000–3000    |  
| Gros article      | 4000–8000    |  
| Contexte énorme   | 10000+       |  

NB : si la réponse est régulièrement tronquée (finish_reason à "length"), il est conseillée d'augmenter **VITE_MAX_TOKENS** pour autoriser une réponse plus longue.

