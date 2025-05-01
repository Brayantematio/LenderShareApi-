# LenderShareAPI

**LenderShareAPI** est une bibliothèque JavaScript moderne qui facilite le partage de contenu (texte, liens, titres) via l'API `navigator.share()` sur les navigateurs compatibles. Elle propose aussi une alternative simple pour les navigateurs qui ne prennent pas en charge cette API.

---

## Fonctionnalités

- Partage natif via `navigator.share()`
- Fallback personnalisé pour les navigateurs non compatibles
- Léger et facile à intégrer
- Basé sur JavaScript moderne (`ES6`)

---

## Démo en ligne

> [Voir la démonstration en direct](https://lendershareapi.pages.dev)

---

## Installation

### 1. Téléchargement direct

Télécharge le fichier `LenderShareAPI.js` et place-le dans ton projet.

### 2. Utilisation dans un projet HTML

```html
<script type="module">
  import { LenderShareAPI } from './js/LenderShareAPI.js';

  document.getElementById("shareBtn").addEventListener("click", () => {
    LenderShareAPI.share({
      title: "LenderShareAPI",
      text: "Essaie cette API de partage !",
      url: "https://lendershareapi.pages.dev"
    });
  });
</script>
