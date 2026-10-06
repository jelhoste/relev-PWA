# Éditeur de relevé (PWA)

Piano roll éditable pour les relevés produits par le notebook Colab, avec lecture synchronisée des notes
(synthé intégré ou instruments WebAudioFont) et des pistes audio de l'archive (volume, muet, solo par piste,
vitesse sans changement de hauteur grâce à Signalsmith Stretch).

## Mettre en ligne sur GitHub Pages

1. Crée un dépôt GitHub (par exemple `releve`), public.
2. Envoie-y **tous les fichiers de ce dossier** (glisser-déposer dans « Add file → Upload files »).
3. Dépôt → **Settings → Pages** → *Build and deployment* : **Deploy from a branch**, branche `main`, dossier `/ (root)`.
4. Après une minute, la page est sur `https://TON-COMPTE.github.io/releve/`. Ouvre-la dans Chrome :
   le bouton d'installation de la barre d'adresse (ou menu → *Installer l'application*) en fait une application.

## Utilisation

- **Ouvrir** : glisse l'archive `.zip` du morceau (avec ses pistes audio) et le fichier `… - releve.json` du notebook,
  ensemble ou l'un après l'autre. Un `releve.json` placé dans le zip est lu automatiquement.
- **Lecture** : barre d'espace ou bouton. Le premier lancement crée les moteurs d'étirement (quelques secondes).
- **Décalage notes** : si les notes synthétisées te semblent avancer ou retarder sur l'audio, règle-le en millisecondes.
- Formats audio lus : wav, mp3, flac, ogg, **opus**, m4a/aac. Le décodage est fait par le navigateur : l'Opus passe sur Chrome et Firefox ; sur Safari, vérifie selon la version et le conteneur.
- Pas d'archive audio ? Le relevé seul se joue avec le synthé ou l'instrument choisi.

## Nouvelle version

1. Modifie le numéro dans **`version.js`** (par exemple `1.0.0` → `1.1.0`) et remplace les fichiers modifiés dans le dépôt.
2. À la prochaine ouverture (ou dans l'heure si l'application est ouverte), un bandeau
   « Nouvelle version disponible » propose **Mettre à jour**. Le numéro installé s'affiche en haut à droite.

Tant que `version.js` ne change pas, les appareils gardent la version déjà installée (cache), même si d'autres
fichiers ont changé : **pense à incrémenter la version à chaque modification**.

## Tester en local

`python -m http.server 8000` dans ce dossier, puis `http://localhost:8000`.
Ouvrir `index.html` en double-cliquant (`file://`) ne fonctionne pas pour l'audio étiré : le navigateur refuse le module AudioWorklet.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | l'application |
| `signalsmith-stretch.js` | moteur d'étirement temporel (WASM + AudioWorklet), extrait de `lecteur-morceau.html` |
| `sw.js`, `version.js` | service worker (cache hors ligne) et numéro de version |
| `manifest.webmanifest`, `icon-*.png` | installation en application |

## Licences

- Signalsmith Stretch : licence MIT (paquet npm `signalsmith-stretch`).
- WebAudioFont (lecteur et instruments chargés depuis `surikov.github.io` à l'exécution, non redistribués ici) :
  le lecteur se déclare sous GPL3 ; les banques d'instruments ont leurs propres licences. Vérifie le `LICENSE.md` du projet
  avant une diffusion publique.
