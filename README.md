

# 🚀 Definitely Not Shortly - Frontend

Interface utilisateur interactive pour le service de raccourcissement d'URLs. Cette application permet aux utilisateurs de transformer des liens longs en alias mémorisables avec génération automatique de QR codes.

---

## 🛠️ Stack Technique

* **Framework :** [Next.js 15+](https://nextjs.org/) (App Router, Client/Server Components).
* **Styling :** [TailwindCSS](https://tailwindcss.com/) pour une interface moderne et responsive.
* **Animations :** [GSAP](https://gsap.com/) pour des transitions fluides et une interaction utilisateur poussée.
* **Langage :** TypeScript (Strict Mode).
* **Communication :** Fetch API vers le backend [Definitely Not Shortly Backend](https://github.com/GautierWiann/definitly-not-shortly-backend).

---

## 🚀 Installation & Démarrage

### Prérequis

* Node.js v20+
* Backend [definitly-not-shortly-backend](https://github.com/GautierWiann/definitly-not-shortly-backend) lancé localement sur le port 3001.

### Étapes

1. **Cloner le projet :**
```bash
git clone <votre-url-frontend>
cd definitly-not-shortly-frontend

```


2. **Installer les dépendances :**
```bash
npm install

```


3. **Lancer le serveur de développement :**
```bash
npm run dev

```



---

## 🌍 SEO & Localisation (GEO Targeting)

Le projet est optimisé pour un référencement local (Lille/France) et international (FR/EN) :

* **Performance :** Optimisation des Core Web Vitals via `next/image` et séparation Server/Client Components.

---

## 🤖 Guide pour les LLM (Contexte sémantique)

Ce projet inclut des fichiers de contexte pour guider les assistants IA :


---

## 📝 Structure du projet

```text
/app
  /components     # background react bits
  layout.tsx      # Structure racine & SEO global
  page.tsx        # Point d'entrée principal

```

---
