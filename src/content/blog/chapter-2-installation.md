---
title: 'Chapitre 2: Installation de Laravel 10 sur Windows'
description: 'Guide complet pour installer Laravel 10 et créer votre premier projet sur Windows avec Composer'
pubDate: '2024-12-02'
heroImage: '/installing-laravel.png'
---

<div class="flex flex-col items-center text-center mb-8">
  <span class="text-5xl mb-2">💻</span>
  <h1 class="text-3xl md:text-4xl font-extrabold text-blue-700 mb-2">Chapitre 2 : Installation de Laravel 10 sur Windows</h1>
  <p class="text-gray-600 max-w-xl">Guide complet pour installer Laravel 10 et créer votre premier projet sur Windows avec Composer.</p>
</div>
<br><br>

---

## 🎯 Objectifs du chapitre

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
  <div class="flex items-center gap-3 bg-blue-50 rounded-lg p-4">
    <span class="text-2xl">⬇️</span>
    <span>Installer Laravel 10 via Composer</span>
  </div>
  <div class="flex items-center gap-3 bg-blue-50 rounded-lg p-4">
    <span class="text-2xl">🛠️</span>
    <span>Créer et configurer votre premier projet Laravel</span>
  </div>
  <div class="flex items-center gap-3 bg-blue-50 rounded-lg p-4">
    <span class="text-2xl">🗄️</span>
    <span>Configurer la base de données</span>
  </div>
  <div class="flex items-center gap-3 bg-blue-50 rounded-lg p-4">
    <span class="text-2xl">🚀</span>
    <span>Lancer votre première application Laravel</span>
  </div>
  <div class="flex items-center gap-3 bg-blue-50 rounded-lg p-4">
    <span class="text-2xl">📁</span>
    <span>Comprendre la structure de base d’un projet Laravel</span>
  </div>
</div>
<br><br>

---

## 📦 Installation de Laravel

### Méthode 1 : Via l'installateur Laravel (Recommandée)

**Étape 1 : Installer l'installateur Laravel**
```bash
composer global require laravel/installer
```
<br>

**Étape 2 : Vérifier l'installation**
```bash
laravel --version
```
<br>

**Étape 3 : Créer un nouveau projet**
```bash
laravel new gestion-utilisateurs
```
<br>

### Méthode 2 : Via Composer directement

Si la méthode 1 ne fonctionne pas :
```bash
composer create-project laravel/laravel gestion-utilisateurs
```
<br><br>

---

## 🗂️ Structure du projet créé

Une fois le projet créé, voici ce que vous devriez voir :

```plaintext
gestion-utilisateurs/
├── app/                 # Logique de l'application
│   ├── Http/           # Contrôleurs, Middleware
│   ├── Models/         # Modèles Eloquent
│   └── Providers/      # Fournisseurs de services
├── bootstrap/          # Fichiers de démarrage
├── config/            # Fichiers de configuration
├── database/          # Migrations, seeders
├── public/            # Point d'entrée web
├── resources/         # Vues, assets
│   ├── css/
│   ├── js/
│   └── views/
├── routes/            # Définition des routes
├── storage/           # Logs, cache, uploads
├── tests/             # Tests automatisés
├── vendor/            # Dépendances Composer
├── .env               # Variables d'environnement
├── artisan            # CLI Laravel
├── composer.json      # Dépendances PHP
└── package.json       # Dépendances NPM
```
<br><br>

---

## ⚙️ Configuration initiale

### 1. Naviguer vers le projet
```bash
cd gestion-utilisateurs
```
<br>

### 2. Configurer l'environnement

**Copier le fichier d'environnement :**
```bash
copy .env.example .env
```
<br>

**Générer la clé d'application :**
```bash
php artisan key:generate
```
<br>

### 3. Configuration de la base de données

**Ouvrir le fichier .env dans VS Code :**
```bash
code .env
```
<br>

**Modifier les paramètres de base de données :**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gestion_utilisateurs
DB_USERNAME=root
DB_PASSWORD=
```
<br>

### 4. Créer la base de données

**Via phpMyAdmin :**
1. Ouvrez `http://localhost/phpmyadmin`
2. Cliquez sur "Nouvelle base de données"
3. Nom : `gestion_utilisateurs`
4. Interclassement : `utf8mb4_unicode_ci`
5. Cliquez sur "Créer"

**Ou via le terminal MySQL :**
```sql
CREATE DATABASE gestion_utilisateurs CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
<br><br>

---

## 🚀 Premier lancement

### 1. Lancer le serveur de développement
```bash
php artisan serve
```

Vous devriez voir :
```plaintext
Laravel development server started: http://127.0.0.1:8000
```

### 2. Tester l'application

Ouvrez votre navigateur et allez sur `http://127.0.0.1:8000`

Vous devriez voir la page d'accueil de Laravel avec le message "Laravel" !
<br><br>

---

## 🗄️ Migrations de base

Laravel inclut des migrations par défaut. Exécutons-les :

```bash
php artisan migrate
```

Cette commande va créer les tables de base :
- `users` (utilisateurs)
- `password_resets` (réinitialisation de mots de passe)
- `failed_jobs` (tâches échouées)
- `personal_access_tokens` (tokens d'accès)
<br><br>

---

## 📁 Fichiers importants à connaître

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
  <div class="bg-white rounded-xl shadow p-4">
    <span class="font-bold text-blue-700">1. Routes (<code>routes/web.php</code>)</span>

```php
<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
```

  </div>
  <div class="bg-white rounded-xl shadow p-4">
    <span class="font-bold text-blue-700">2. Configuration principale (<code>config/app.php</code>)</span>
    <p class="text-gray-700 text-sm">Contient les paramètres principaux de l'application.</p>
  </div>
  <div class="bg-white rounded-xl shadow p-4">
    <span class="font-bold text-blue-700">3. Variables d'environnement (<code>.env</code>)</span>
    <p class="text-gray-700 text-sm">Contient les configurations sensibles (base de données, clés API, etc.).</p>
  </div>
  <div class="bg-white rounded-xl shadow p-4">
    <span class="font-bold text-blue-700">4. Artisan (<code>artisan</code>)</span>
    <p class="text-gray-700 text-sm">Interface en ligne de commande de Laravel.</p>
  </div>
</div>
<br><br>

---

## 🛠️ Commandes Artisan essentielles

Laravel fournit l'outil Artisan pour faciliter le développement :

```bash
# Voir toutes les commandes disponibles
php artisan list

# Créer un contrôleur
php artisan make:controller UserController

# Créer un modèle
php artisan make:model User

# Créer une migration
php artisan make:migration create_users_table

# Voir les routes
php artisan route:list

# Nettoyer le cache
php artisan cache:clear

# Optimiser l'application
php artisan optimize
```
<br><br>

---

## 🔧 Configuration avancée

### 1. Timezone (Fuseau horaire)

Dans `config/app.php`, modifiez :
```php
'timezone' => 'Africa/Douala', // ou votre fuseau horaire
```
<br>

### 2. Langue de l'application

```php
'locale' => 'fr', // Français
'fallback_locale' => 'en',
```
<br>

### 3. Configuration de debug

Dans `.env` :
```env
APP_DEBUG=true  # En développement
APP_DEBUG=false # En production
```
<br><br>

---

## 🚨 Problèmes courants et solutions

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
  <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
    <span class="font-bold text-yellow-700">Erreur : "Class 'PDO' not found"</span>
    <ul class="list-disc ml-6 text-gray-700">
      <li>Activez l'extension PDO dans PHP</li>
      <li>Ouvrez <code>php.ini</code></li>
      <li>Décommentez <code>extension=pdo_mysql</code></li>
      <li>Redémarrez Apache</li>
    </ul>
  </div>
  <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
    <span class="font-bold text-yellow-700">Erreur : "Permission denied"</span>
    <ul class="list-disc ml-6 text-gray-700">
      <li>Donnez les permissions au dossier storage</li>
      <li>
        <code>chmod -R 775 storage bootstrap/cache</code>
      </li>
    </ul>
  </div>
  <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
    <span class="font-bold text-yellow-700">Erreur de connexion à la base de données</span>
    <ul class="list-disc ml-6 text-gray-700">
      <li>MySQL est démarré dans Laragon</li>
      <li>Les paramètres dans <code>.env</code> sont corrects</li>
      <li>La base de données existe</li>
    </ul>
  </div>
  <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
    <span class="font-bold text-yellow-700">Port 8000 déjà utilisé</span>
    <ul class="list-disc ml-6 text-gray-700">
      <li>Lancer sur un autre port :</li>
      <li>
        <code>php artisan serve --port=8080</code>
      </li>
    </ul>
  </div>
</div>
<br><br>

---

## 📝 Exercice pratique

### Créer une route personnalisée

1. **Ouvrez `routes/web.php`**

<br>

2. **Ajoutez cette route :**
```php
Route::get('/bonjour', function () {
    return '<h1>Bonjour UniTechs !</h1>';
});
```
<br>

1. **Testez en allant sur `http://127.0.0.1:8000/bonjour`**

### Créer une vue personnalisée

1. **Créez le fichier `resources/views/bonjour.blade.php` :**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Bonjour UniTechs</title>
</head>
<body>
    <h1>Bienvenue dans Laravel 10 !</h1>
    <p>Formation par Fredie T.</p>
    <p>Centre : UniTechs</p>
</body>
</html>
```

<br>

2. **Modifiez la route :**
```php
Route::get('/bonjour', function () {
    return view('bonjour');
});
```
<br><br>

---

## ✅ Checklist de fin de chapitre

<div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
  <div>✔️ Laravel 10 est installé</div>
  <div>✔️ Le projet "gestion-utilisateurs" est créé</div>
  <div>✔️ La base de données est configurée et connectée</div>
  <div>✔️ Les migrations de base sont exécutées</div>
  <div>✔️ Le serveur de développement fonctionne</div>
  <div>✔️ Vous pouvez accéder à <code>http://127.0.0.1:8000</code></div>
  <div>✔️ L'exercice pratique est réalisé</div>
</div>
<br><br>

---

<div class="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
  <a href="/blog/chapitre-1-prerequisites" class="inline-flex items-center px-6 py-3 bg-gray-100 text-blue-700 rounded-lg shadow hover:bg-blue-300 transition font-semibold">
    ⬅️ Chapitre précédent
  </a>
  <a href="/blog/chapter-3-project-structure" class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold">
    Chapitre suivant ➡️
  </a>
</div>
<!-- <div class="text-center mt-8 text-gray-500 text-sm">
  <strong>Formateur :</strong> Fredie TUEGUEM &nbsp;|&nbsp; <strong>Institution :</strong> UniTechs
</div> -->