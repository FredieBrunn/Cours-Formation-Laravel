---
title: 'Chapitre 1: Prérequis et Outils Nécessaires'
description: 'Découvrez tous les outils et prérequis nécessaires pour commencer votre apprentissage de Laravel 10 sur Windows'
pubDate: '2025-09-04'
heroImage: '/cour-laravel10.png'
---

<br><br>
<div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6 md:p-10 mb-8 flex flex-col md:flex-row items-center gap-8 text-white">
  <div class="flex-shrink-0">
    <img src="/assets/logo.png" alt="UniTechs Logo" class="w-24 h-24 md:w-32 md:h-32 rounded-xl shadow-lg mb-4 md:mb-0" />
  </div>
  <div>
    <h1 class="text-2xl md:text-3xl font-extrabold mb-2 flex items-center gap-2">🛠️ {frontmatter.title}</h1>
    <p class="mb-2">{frontmatter.description}</p>
    <div class="flex flex-wrap gap-4 mt-4">
      <span class="inline-flex items-center bg-white/20 px-3 py-1 rounded-full text-sm font-semibold"><svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>Débutant accepté</span>
      <span class="inline-flex items-center bg-white/20 px-3 py-1 rounded-full text-sm font-semibold"><svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2"/></svg>~30 min</span>
    </div>
  </div>
</div>

## 🎯 Objectifs du chapitre

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
  <div class="flex items-start gap-3 bg-blue-50 rounded-lg p-4 shadow">
    <span class="text-2xl">✅</span>
    <span>Comprendre les prérequis techniques</span>
  </div>
  <div class="flex items-start gap-3 bg-blue-50 rounded-lg p-4 shadow">
    <span class="text-2xl">🛠️</span>
    <span>Installer tous les outils nécessaires</span>
  </div>
  <div class="flex items-start gap-3 bg-blue-50 rounded-lg p-4 shadow">
    <span class="text-2xl">⚙️</span>
    <span>Configurer votre environnement de développement</span>
  </div>
  <div class="flex items-start gap-3 bg-blue-50 rounded-lg p-4 shadow">
    <span class="text-2xl">🔍</span>
    <span>Vérifier que tout fonctionne correctement</span>
  </div>
</div>
<br><br>

---

## 📋 Prérequis techniques

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  <div>
    <h3 class="font-semibold text-blue-700 mb-2 flex items-center gap-2">💻 Système d'exploitation</h3>
    <ul class="list-disc ml-6 text-gray-700">
      <li><strong>Windows 10/11</strong> (64 bits recommandé)</li>
      <li><strong>RAM</strong> : Minimum 4 GB (8 GB recommandé)</li>
      <li><strong>Espace disque</strong> : Au moins 5 GB d'espace libre</li>
      <li><strong>Processeur</strong> : Intel i3 ou équivalent AMD</li>
    </ul>
  </div>
  <div>
    <h3 class="font-semibold text-blue-700 mb-2 flex items-center gap-2">📚 Connaissances de base</h3>
    <ul class="list-disc ml-6 text-gray-700">
      <li>Notions de base en HTML/CSS</li>
      <li>Compréhension basique de la programmation</li>
      <li>Familiarité avec l'utilisation d'un ordinateur</li>
    </ul>
    <div class="bg-yellow-50 text-yellow-800 rounded-lg p-3 mt-3 flex items-center gap-2">
      <span class="text-xl">ℹ️</span>
      <span>Pas besoin d'être expert ! Cette formation est conçue pour les débutants.</span>
    </div>
  </div>
</div>
<br><br>

---

## 🛠️ Outils à installer

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  <div class="bg-white rounded-xl shadow p-5">
    <h4 class="font-semibold text-blue-700 mb-2 flex items-center gap-2">📝 Visual Studio Code</h4>
    <ul class="list-disc ml-6 text-gray-700 mb-2">
      <li>Gratuit, open source, extensions riches</li>
      <li>Excellent support pour PHP et Laravel</li>
    </ul>
    <a href="https://code.visualstudio.com/" target="_blank" class="text-blue-600 underline hover:text-blue-800">Télécharger VS Code</a>
    <div class="mt-2">
      <span class="font-semibold">Extensions recommandées :</span>
      <ul class="list-disc ml-6 text-gray-700">
        <li>PHP Intelephense</li>
        <li>Laravel Blade Snippets</li>
        <li>Laravel Artisan</li>
        <li>Tailwind CSS IntelliSense</li>
        <li>GitLens</li>
      </ul>
    </div>
  </div>
  <div class="bg-white rounded-xl shadow p-5">
    <h4 class="font-semibold text-blue-700 mb-2 flex items-center gap-2">🧰 Laragon</h4>
    <ul class="list-disc ml-6 text-gray-700 mb-2">
      <li>Environnement local complet (Apache/Nginx, PHP, MySQL, Node.js, Git...)</li>
      <li>Simple à installer et à utiliser</li>
    </ul>
    <a href="https://laragon.org/" target="_blank" class="text-blue-600 underline hover:text-blue-800">Télécharger Laragon</a>
    <div class="mt-2 text-sm text-gray-600">Alternative : <a href="https://www.apachefriends.org/" target="_blank" class="text-blue-600 underline hover:text-blue-800">XAMPP</a></div>
  </div>
  <div class="bg-white rounded-xl shadow p-5">
    <h4 class="font-semibold text-blue-700 mb-2 flex items-center gap-2">📦 Composer</h4>
    <ul class="list-disc ml-6 text-gray-700 mb-2">
      <li>Gestionnaire de dépendances PHP</li>
      <li>Inclus avec Laragon ou à installer séparément</li>
    </ul>
    <a href="https://getcomposer.org/" target="_blank" class="text-blue-600 underline hover:text-blue-800">Télécharger Composer</a>
  </div>
  <div class="bg-white rounded-xl shadow p-5">
    <h4 class="font-semibold text-blue-700 mb-2 flex items-center gap-2">🟩 Node.js & NPM</h4>
    <ul class="list-disc ml-6 text-gray-700 mb-2">
      <li>Nécessaire pour TailwindCSS et la compilation des assets</li>
    </ul>
    <a href="https://nodejs.org/" target="_blank" class="text-blue-600 underline hover:text-blue-800">Télécharger Node.js</a>
  </div>
  <div class="bg-white rounded-xl shadow p-5">
    <h4 class="font-semibold text-blue-700 mb-2 flex items-center gap-2">🔗 Git (optionnel)</h4>
    <ul class="list-disc ml-6 text-gray-700 mb-2">
      <li>Gestion de version de code</li>
      <li>Recommandé pour le travail collaboratif</li>
    </ul>
    <a href="https://git-scm.com/" target="_blank" class="text-blue-600 underline hover:text-blue-800">Télécharger Git</a>
  </div>
</div>
<br><br>

---

## ⚙️ Configuration de l'environnement

### <span class="inline-flex items-center gap-2 text-blue-700 font-semibold">🚦 Laragon</span>
1. Démarrez Laragon et cliquez sur <span class="font-mono bg-blue-50 px-2 py-1 rounded">Start All</span>
2. Vérifiez que Apache et MySQL sont verts
3. Accédez à <span class="font-mono bg-blue-50 px-2 py-1 rounded">http://localhost</span> et <span class="font-mono bg-blue-50 px-2 py-1 rounded">phpmyadmin</span>

### <span class="inline-flex items-center gap-2 text-blue-700 font-semibold">📝 VS Code</span>
- Installez les extensions recommandées
- Ouvrez le terminal intégré <span class="font-mono bg-blue-50 px-2 py-1 rounded">Ctrl + `</span>

<br><br>

---

## 🔍 Vérification de l'installation

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  <div class="bg-white rounded-xl shadow p-5">
    <h4 class="font-semibold text-blue-700 mb-2 flex items-center gap-2">🐘 PHP</h4>
    <code class="block bg-blue-50 text-blue-800 rounded p-2 mb-2">php -v</code>
    <span class="text-gray-700">Vous devez voir la version PHP installée.</span>
  </div>
  <div class="bg-white rounded-xl shadow p-5">
    <h4 class="font-semibold text-blue-700 mb-2 flex items-center gap-2">📦 Composer</h4>
    <code class="block bg-blue-50 text-blue-800 rounded p-2 mb-2">composer -V</code>
    <span class="text-gray-700">Vous devez voir la version Composer installée.</span>
  </div>
  <div class="bg-white rounded-xl shadow p-5">
    <h4 class="font-semibold text-blue-700 mb-2 flex items-center gap-2">🟩 Node.js & NPM</h4>
    <code class="block bg-blue-50 text-blue-800 rounded p-2 mb-2">node -v<br/>npm -v</code>
    <span class="text-gray-700">Vous devez voir les versions Node.js et NPM.</span>
  </div>
  <div class="bg-white rounded-xl shadow p-5">
    <h4 class="font-semibold text-blue-700 mb-2 flex items-center gap-2">🔗 Git</h4>
    <code class="block bg-blue-50 text-blue-800 rounded p-2 mb-2">git --version</code>
    <span class="text-gray-700">Vous devez voir la version Git (si installé).</span>
  </div>
</div>
<br><br>

---

## 🚨 Problèmes courants et solutions

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  <div class="bg-yellow-50 rounded-xl shadow p-5">
    <h4 class="font-semibold text-yellow-700 mb-2 flex items-center gap-2">❌ PHP n'est pas reconnu</h4>
    <ul class="list-disc ml-6 text-gray-700">
      <li>Redémarrez votre ordinateur</li>
      <li>Ajoutez PHP au PATH manuellement</li>
      <li>Avec Laragon : Menu → Tools → Path → Add Laragon to Path</li>
    </ul>
  </div>
  <div class="bg-yellow-50 rounded-xl shadow p-5">
    <h4 class="font-semibold text-yellow-700 mb-2 flex items-center gap-2">❌ Composer ne fonctionne pas</h4>
    <ul class="list-disc ml-6 text-gray-700">
      <li>Vérifiez que PHP fonctionne d'abord</li>
      <li>Réinstallez Composer</li>
      <li>Redémarrez le terminal</li>
    </ul>
  </div>
  <div class="bg-yellow-50 rounded-xl shadow p-5">
    <h4 class="font-semibold text-yellow-700 mb-2 flex items-center gap-2">❌ Laragon ne démarre pas</h4>
    <ul class="list-disc ml-6 text-gray-700">
      <li>Lancez en tant qu'administrateur</li>
      <li>Vérifiez qu'aucun autre serveur n'utilise le port 80</li>
      <li>Désactivez temporairement l'antivirus</li>
    </ul>
  </div>
</div>
<br><br>

---

## 📝 Raccourcis utiles

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  <div class="bg-white rounded-xl shadow p-5">
    <h4 class="font-semibold text-blue-700 mb-2 flex items-center gap-2">⌨️ VS Code</h4>
    <ul class="list-disc ml-6 text-gray-700">
      <li><span class="font-mono bg-blue-50 px-2 py-1 rounded">Ctrl + Shift + P</span> : Palette de commandes</li>
      <li><span class="font-mono bg-blue-50 px-2 py-1 rounded">Ctrl + `</span> : Terminal intégré</li>
      <li><span class="font-mono bg-blue-50 px-2 py-1 rounded">Ctrl + Shift + E</span> : Explorateur de fichiers</li>
      <li><span class="font-mono bg-blue-50 px-2 py-1 rounded">Ctrl + /</span> : Commenter/décommenter</li>
    </ul>
  </div>
  <div class="bg-white rounded-xl shadow p-5">
    <h4 class="font-semibold text-blue-700 mb-2 flex items-center gap-2">🪟 Windows</h4>
    <ul class="list-disc ml-6 text-gray-700">
      <li><span class="font-mono bg-blue-50 px-2 py-1 rounded">Win + R</span> : Exécuter</li>
      <li><span class="font-mono bg-blue-50 px-2 py-1 rounded">Win + X</span> : Menu administrateur</li>
      <li><span class="font-mono bg-blue-50 px-2 py-1 rounded">Ctrl + Shift + Échap</span> : Gestionnaire des tâches</li>
    </ul>
  </div>
</div>
<br><br>

---

## ✅ Checklist de fin de chapitre

<div class="bg-white rounded-xl shadow p-5 mb-8 mt-7">
  <ul class="space-y-2">
    <li class="flex items-center gap-2"><span class="text-green-500">☐</span> VS Code est installé et configuré</li>
    <li class="flex items-center gap-2"><span class="text-green-500">☐</span> Laragon ou XAMPP fonctionne correctement</li>
    <li class="flex items-center gap-2"><span class="text-green-500">☐</span> PHP est accessible depuis le terminal</li>
    <li class="flex items-center gap-2"><span class="text-green-500">☐</span> Composer est installé et fonctionnel</li>
    <li class="flex items-center gap-2"><span class="text-green-500">☐</span> Node.js et NPM sont disponibles</li>
    <li class="flex items-center gap-2"><span class="text-green-500">☐</span> Vous pouvez accéder à <span class="font-mono bg-blue-50 px-2 py-1 rounded">http://localhost</span></li>
    <li class="flex items-center gap-2"><span class="text-green-500">☐</span> phpMyAdmin est accessible</li>
  </ul>
</div>

---

<div class="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
  <a href="/" class="pointer-events-none opacity-50 bg-gray-200 text-gray-500 px-6 py-3 rounded-lg font-semibold flex items-center gap-2">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
    Accuiel
  </a>
  <a href="/blog/chapter-2-installation" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-800 transition">
    Chapitre suivant ➡️
    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
  </a>
</div>
<!-- <div class="text-center text-gray-500 text-sm mt-8">
  <strong>Formateur :</strong> Fredie TUEGUEM &nbsp;|&nbsp; <strong>Institution :</strong> UniTechs
</div> -->