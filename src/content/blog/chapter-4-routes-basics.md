---
title: 'Chapitre 4: Configuration des Routes Laravel'
description: 'Maîtrisez le système de routage Laravel : routes simples, paramètres, groupes, middleware et routes nommées'
pubDate: '2025-09-04'
heroImage: '/laravel-routing.jpg'
---

<!-- <div class="flex flex-col items-center text-center mb-4 sm:mb-8">
  <span class="text-4xl sm:text-5xl mb-1 sm:mb-2">🛣️</span>
  <h1 class="text-xl sm:text-3xl md:text-4xl font-extrabold text-blue-700 mb-1 sm:mb-2">Chapitre 4 : Configuration des Routes Laravel</h1>
  <p class="text-gray-600 max-w-xl text-xs sm:text-base">Maîtrisez le système de routage Laravel : routes simples, paramètres, groupes, middleware et routes nommées.</p>
</div> -->


## 🎯 Objectifs du chapitre

<div class="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6 text-xs sm:text-base">
  <div class="flex items-center gap-2 sm:gap-3 bg-blue-50 rounded-lg p-2 sm:p-4">
    <span class="text-xl sm:text-2xl">🔗</span>
    <span>Créer des routes simples et avancées</span>
  </div>
  <div class="flex items-center gap-2 sm:gap-3 bg-blue-50 rounded-lg p-2 sm:p-4">
    <span class="text-xl sm:text-2xl">📦</span>
    <span>Utiliser les paramètres de routes</span>
  </div>
  <div class="flex items-center gap-2 sm:gap-3 bg-blue-50 rounded-lg p-2 sm:p-4">
    <span class="text-xl sm:text-2xl">🛡️</span>
    <span>Appliquer des middleware aux routes</span>
  </div>
  <div class="flex items-center gap-2 sm:gap-3 bg-blue-50 rounded-lg p-2 sm:p-4">
    <span class="text-xl sm:text-2xl">🏷️</span>
    <span>Créer des routes nommées et générer des URLs dynamiques</span>
  </div>
  <div class="flex items-center gap-2 sm:gap-3 bg-blue-50 rounded-lg p-2 sm:p-4">
    <span class="text-xl sm:text-2xl">🗂️</span>
    <span>Organiser les routes avec des groupes</span>
  </div>
</div>

---

## 🛣️ Types de routes Laravel

### Routes de base

**Fichier : `routes/web.php`**

```php
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

// Route GET simple
Route::get('/', function () {
    return view('welcome');
});

// Route vers un contrôleur
Route::get('/users', [UserController::class, 'index']);

// Différents verbes HTTP
Route::get('/users', [UserController::class, 'index']);      // Afficher
Route::post('/users', [UserController::class, 'store']);     // Créer
Route::put('/users/{id}', [UserController::class, 'update']); // Modifier
Route::delete('/users/{id}', [UserController::class, 'destroy']); // Supprimer
```

---

### Routes avec paramètres

```php
// Paramètre obligatoire
Route::get('/users/{id}', [UserController::class, 'show']);

// Paramètre optionnel
Route::get('/users/{id?}', function ($id = null) {
    if ($id) {
        return "Utilisateur ID: $id";
    }
    return "Tous les utilisateurs";
});

// Contraintes sur les paramètres
Route::get('/users/{id}', [UserController::class, 'show'])
    ->where('id', '[0-9]+'); // Seulement des chiffres

Route::get('/users/{name}', [UserController::class, 'showByName'])
    ->where('name', '[A-Za-z]+'); // Seulement des lettres
```

---

## 🏷️ Routes nommées

Les routes nommées permettent de générer des URLs facilement :

```php
// Définir une route nommée
Route::get('/users', [UserController::class, 'index'])->name('users.index');
Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
Route::post('/users', [UserController::class, 'store'])->name('users.store');
Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');
Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
```

**Utilisation dans les vues :**
```html
<!-- Générer une URL -->
<a href="{{ route('users.index') }}">Liste des utilisateurs</a>

<!-- Avec paramètres -->
<a href="{{ route('users.show', $user->id) }}">Voir l'utilisateur</a>

<!-- Dans un formulaire -->
<form action="{{ route('users.store') }}" method="POST">
    @csrf
    <!-- Champs du formulaire -->
</form>
```

---

## 📦 Routes ressources

Laravel offre un raccourci pour créer toutes les routes CRUD :

```php
// Crée automatiquement 7 routes
Route::resource('users', UserController::class);
```

**Routes générées :**
| Verbe | URI | Action | Nom de route |
|-------|-----|--------|--------------|
| GET | `/users` | index | users.index |
| GET | `/users/create` | create | users.create |
| POST | `/users` | store | users.store |
| GET | `/users/{user}` | show | users.show |
| GET | `/users/{user}/edit` | edit | users.edit |
| PUT/PATCH | `/users/{user}` | update | users.update |
| DELETE | `/users/{user}` | destroy | users.destroy |

**Routes ressources partielles :**
```php
// Seulement certaines routes
Route::resource('users', UserController::class)->only(['index', 'show', 'create', 'store']);

// Exclure certaines routes
Route::resource('users', UserController::class)->except(['destroy']);
```

---

## 🔒 Middleware sur les routes

### Appliquer un middleware

```php
// Middleware sur une route
Route::get('/admin', function () {
    return 'Zone admin';
})->middleware('auth');

// Plusieurs middleware
Route::get('/admin/users', [UserController::class, 'adminIndex'])
    ->middleware(['auth', 'admin']);

// Middleware sur les routes ressources
Route::resource('users', UserController::class)->middleware('auth');
```

### Middleware courants

- `auth` : Utilisateur authentifié
- `guest` : Utilisateur non authentifié
- `verified` : Email vérifié
- `throttle` : Limitation du taux de requêtes

---

## 📂 Groupes de routes

### Groupes avec préfixe

```php
Route::prefix('admin')->group(function () {
    Route::get('/users', [AdminUserController::class, 'index']);
    Route::get('/settings', [AdminController::class, 'settings']);
});
// URLs : /admin/users, /admin/settings
```

### Groupes avec middleware

```php
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
    Route::resource('/admin/users', AdminUserController::class);
});
```

### Groupes avec namespace

```php
Route::namespace('Admin')->prefix('admin')->group(function () {
    Route::get('/users', 'UserController@index');
});
```

### Groupes combinés

```php
Route::prefix('admin')
    ->middleware(['auth', 'admin'])
    ->name('admin.')
    ->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
        Route::resource('/users', AdminUserController::class);
    });
```

---

## 🔧 Configuration avancée

### Routes avec sous-domaines

```php
Route::domain('{account}.monsite.com')->group(function () {
    Route::get('/', function ($account) {
        return "Compte : $account";
    });
});
```

### Routes avec contraintes globales

**Dans `RouteServiceProvider.php` :**
```php
public function boot()
{
    Route::pattern('id', '[0-9]+');
    Route::pattern('slug', '[a-z0-9-]+');
}
```

---

## 📝 Exercice pratique : Routes pour la gestion des utilisateurs

<div class="bg-blue-50 border-l-4 border-blue-400 p-2 sm:p-4 mb-3 sm:mb-4 text-xs sm:text-base">
  <strong>Créer le contrôleur ressource :</strong>
  <ol class="list-decimal ml-4 sm:ml-6">
    <li>
      <span class="text-blue-600">Créer le contrôleur ressource</span>
      <pre><code class="language-bash">php artisan make:controller UserController --resource</code></pre>
    </li>
    <li>
      <span class="text-blue-600">Définir les routes dans <code>routes/web.php</code></span>

```php
// <?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

// Page d'accueil
Route::get('/', function () {
    return view('welcome');
})->name('home');

// Routes pour la gestion des utilisateurs
Route::resource('users', UserController::class);

// Routes additionnelles pour la recherche
Route::get('/users/search/{term?}', [UserController::class, 'search'])->name('users.search');

// Route pour exporter les utilisateurs
Route::get('/users-export', [UserController::class, 'export'])->name('users.export');
```

    </li>
    <li>
      <span class="text-blue-600">Compléter le contrôleur UserController</span>
      
```php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Afficher la liste des utilisateurs
     */
    public function index()
    {
        $users = User::paginate(10);
        return view('users.index', compact('users'));
    }

    /**
     * Afficher le formulaire de création
     */
    public function create()
    {
        return view('users.create');
    }

    /**
     * Enregistrer un nouvel utilisateur
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $validated['password'] = bcrypt($validated['password']);
        
        User::create($validated);

        return redirect()->route('users.index')
            ->with('success', 'Utilisateur créé avec succès.');
    }

    /**
     * Afficher un utilisateur spécifique
     */
    public function show(User $user)
    {
        return view('users.show', compact('user'));
    }

    /**
     * Afficher le formulaire d'édition
     */
    public function edit(User $user)
    {
        return view('users.edit', compact('user'));
    }

    /**
     * Mettre à jour un utilisateur
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
        ]);

        $user->update($validated);

        return redirect()->route('users.index')
            ->with('success', 'Utilisateur modifié avec succès.');
    }

    /**
     * Supprimer un utilisateur
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('users.index')
            ->with('success', 'Utilisateur supprimé avec succès.');
    }

    /**
     * Rechercher des utilisateurs
     */
    public function search($term = null)
    {
        if ($term) {
            $users = User::where('name', 'like', "%{$term}%")
                        ->orWhere('email', 'like', "%{$term}%")
                        ->paginate(10);
        } else {
            $users = User::paginate(10);
        }

        return view('users.index', compact('users', 'term'));
    }
}
```

    </li>
  </ol>
</div>

---

## 🔍 Commandes utiles pour les routes

<div class="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6 text-xs sm:text-base">
  <div class="bg-blue-50 border-l-4 border-blue-400 p-2 sm:p-4">
    <span class="font-bold">Voir toutes les routes</span><br>
    <code>php artisan route:list</code>
  </div>
  <div class="bg-blue-50 border-l-4 border-blue-400 p-2 sm:p-4">
    <span class="font-bold">Filtrer les routes par nom</span><br>
    <code>php artisan route:list --name=users</code>
  </div>
  <div class="bg-blue-50 border-l-4 border-blue-400 p-2 sm:p-4">
    <span class="font-bold">Voir les routes d'un contrôleur spécifique</span><br>
    <code>php artisan route:list --path=users</code>
  </div>
  <div class="bg-blue-50 border-l-4 border-blue-400 p-2 sm:p-4">
    <span class="font-bold">Nettoyer le cache des routes</span><br>
    <code>php artisan route:clear</code>
  </div>
  <div class="bg-blue-50 border-l-4 border-blue-400 p-2 sm:p-4">
    <span class="font-bold">Mettre en cache les routes (production)</span><br>
    <code>php artisan route:cache</code>
  </div>
</div>

---

## 🚨 Bonnes pratiques

<div class="bg-yellow-50 border-l-4 border-yellow-400 p-2 sm:p-4 mb-3 sm:mb-4 text-xs sm:text-base">
  <strong>Organisation des routes :</strong>
  <ul class="list-disc ml-4 sm:ml-6">
    <li>Groupez les routes liées</li>
    <li>Utilisez des noms de routes cohérents</li>
    <li>Appliquez les middleware appropriés</li>
  </ul>
</div>
<div class="bg-yellow-50 border-l-4 border-yellow-400 p-2 sm:p-4 mb-3 sm:mb-4 text-xs sm:text-base">
  <strong>Sécurité :</strong>
  <ul class="list-disc ml-4 sm:ml-6">
    <li>Validez toujours les paramètres</li>
    <li>Utilisez le middleware CSRF pour les formulaires</li>
    <li>Protégez les routes sensibles</li>
  </ul>
</div>
<div class="bg-yellow-50 border-l-4 border-yellow-400 p-2 sm:p-4 mb-3 sm:mb-4 text-xs sm:text-base">
  <strong>Performance :</strong>
  <ul class="list-disc ml-4 sm:ml-6">
    <li>Mettez en cache les routes en production</li>
    <li>Évitez les routes trop complexes</li>
    <li>Utilisez la liaison de modèle quand possible</li>
  </ul>
</div>

---

## 🔗 Liaison de modèle (Model Binding)

Laravel peut automatiquement injecter les modèles dans vos routes :

```php
// Au lieu de :
Route::get('/users/{id}', function ($id) {
    $user = User::findOrFail($id);
    return view('users.show', compact('user'));
});

// Utilisez :
Route::get('/users/{user}', function (User $user) {
    return view('users.show', compact('user'));
});
```

---

## ✅ Checklist de fin de chapitre

<div class="grid grid-cols-1 md:grid-cols-2 gap-1 sm:gap-2 mb-4 sm:mb-6 text-xs sm:text-base">
  <div>✔️ Vous comprenez les différents types de routes</div>
  <div>✔️ Vous savez créer des routes avec paramètres</div>
  <div>✔️ Vous maîtrisez les routes nommées</div>
  <div>✔️ Vous avez configuré les routes ressources</div>
  <div>✔️ Vous savez appliquer des middleware</div>
  <div>✔️ Vous avez créé le UserController complet</div>
  <div>✔️ Vous pouvez lister et filtrer les routes</div>
</div>

---

<div class="flex flex-col md:flex-row justify-between items-center gap-2 sm:gap-4 mt-6 sm:mt-8">
  <a href="/blog/chapter-3-project-structure" class="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-gray-100 text-blue-700 rounded-lg shadow hover:bg-blue-50 transition font-semibold text-xs sm:text-base">
    ⬅️ Chapitre précédent
  </a>
  <a href="/blog/chapter-5-user-management-setup" class="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold text-xs sm:text-base">
    Chapitre suivant ➡️
  </a>
</div>