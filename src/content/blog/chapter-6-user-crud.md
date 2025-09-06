---
title: 'Chapitre 6: CRUD Complet des Utilisateurs'
description: 'Implémentez toutes les fonctionnalités CRUD : création, lecture, modification, suppression et recherche des utilisateurs'
pubDate: '2025-09-04'
heroImage: '/laravel-crud.webp'
---


## 🎯 Objectifs du chapitre

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
  <div class="flex items-center gap-3 bg-blue-50 rounded-lg p-4">
    <span class="text-2xl">📝</span>
    <span>Créer une interface complète de gestion des utilisateurs</span>
  </div>
  <div class="flex items-center gap-3 bg-blue-50 rounded-lg p-4">
    <span class="text-2xl">🔄</span>
    <span>Implémenter toutes les fonctionnalités CRUD</span>
  </div>
  <div class="flex items-center gap-3 bg-blue-50 rounded-lg p-4">
    <span class="text-2xl">🔍</span>
    <span>Ajouter la recherche et le filtrage</span>
  </div>
  <div class="flex items-center gap-3 bg-blue-50 rounded-lg p-4">
    <span class="text-2xl">📑</span>
    <span>Gérer la pagination et les messages de succès/erreur</span>
  </div>
</div>
<br><br>

---

## 🎨 Mise à jour du contrôleur

**`app/Http/Controllers/UserController.php` :**

```php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Afficher la liste des utilisateurs
     */
    public function index(Request $request)
    {
        $query = User::query();

        // Recherche
        if ($request->filled('search')) {
            $query->search($request->search);
        }

        // Filtrage par statut
        if ($request->filled('status')) {
            if ($request->status === 'active') {
                $query->active();
            } elseif ($request->status === 'inactive') {
                $query->where('is_active', false);
            }
        }

        // Filtrage par genre
        if ($request->filled('gender')) {
            $query->byGender($request->gender);
        }

        $users = $query->latest()->paginate(10)->withQueryString();

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
    public function store(StoreUserRequest $request)
    {
        $validated = $request->validated();

        // Gestion de l'avatar
        if ($request->hasFile('avatar')) {
            $validated['avatar'] = $request->file('avatar')->store('avatars', 'public');
        }

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
    public function update(UpdateUserRequest $request, User $user)
    {
        $validated = $request->validated();

        // Gestion de l'avatar
        if ($request->hasFile('avatar')) {
            // Supprimer l'ancien avatar
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }
            $validated['avatar'] = $request->file('avatar')->store('avatars', 'public');
        }

        $user->update($validated);

        return redirect()->route('users.index')
            ->with('success', 'Utilisateur modifié avec succès.');
    }

    /**
     * Supprimer un utilisateur
     */
    public function destroy(User $user)
    {
        // Supprimer l'avatar s'il existe
        if ($user->avatar) {
            Storage::disk('public')->delete($user->avatar);
        }

        $user->delete();

        return redirect()->route('users.index')
            ->with('success', 'Utilisateur supprimé avec succès.');
    }

    /**
     * Basculer le statut d'un utilisateur
     */
    public function toggleStatus(User $user)
    {
        $user->update(['is_active' => !$user->is_active]);

        $status = $user->is_active ? 'activé' : 'désactivé';
        
        return redirect()->back()
            ->with('success', "Utilisateur {$status} avec succès.");
    }
}
```
<br><br>

---

## 🖥️ Création des vues Blade

### 1. Layout principal

**`resources/views/layouts/app.blade.php` :**

```html
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Gestion Utilisateurs - UniTechs')</title>
    <!-- TailwindCSS -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gray-100 font-sans">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <img src="{{ asset('assets/logo.png') }}" alt="UniTechs" class="h-8 w-auto">
                    <span class="ml-2 text-xl font-bold text-gray-800">Gestion Utilisateurs</span>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="{{ route('users.index') }}" class="text-gray-700 hover:text-blue-600">
                        Utilisateurs
                    </a>
                    <a href="{{ route('users.create') }}" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        Nouveau
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Messages Flash -->
    @if(session('success'))
        <div class="max-w-7xl mx-auto px-4 py-4">
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <span class="block sm:inline">{{ session('success') }}</span>
            </div>
        </div>
    @endif

    @if(session('error'))
        <div class="max-w-7xl mx-auto px-4 py-4">
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span class="block sm:inline">{{ session('error') }}</span>
            </div>
        </div>
    @endif

    <!-- Contenu principal -->
    <main class="max-w-7xl mx-auto py-6 px-4">
        @yield('content')
    </main>

    <!-- Pied de page -->
    <footer class="bg-gray-800 text-white py-8 mt-12">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <p>&copy; 2025 UniTechs - Formation Laravel 10 par Fredie TUEGUEM</p>
        </div>
    </footer>
</body>
</html>
```
<br><br>

---

### 2. Liste des utilisateurs

**`resources/views/users/index.blade.php` :**

```php
@extends('layouts.app')

@section('title', 'Liste des Utilisateurs')

@section('content')
<div class="bg-white rounded-lg shadow">
    <!-- En-tête -->
    <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold text-gray-900 flex items-center gap-2">👥 Gestion des Utilisateurs</h1>
            <a href="{{ route('users.create') }}" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Nouvel utilisateur
            </a>
        </div>
    </div>

    <!-- Filtres et recherche -->
    <div class="px-6 py-4 bg-gray-50 border-b">
        <form method="GET" class="flex flex-wrap gap-4 items-end">
            <!-- Recherche -->
            <div class="flex-1 min-w-64">
                <label class="block text-sm font-medium text-gray-700 mb-1">🔍 Recherche</label>
                <input type="text" name="search" value="{{ request('search') }}" 
                       placeholder="Nom ou email..." 
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <!-- Statut -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                <select name="status" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Tous</option>
                    <option value="active" {{ request('status') === 'active' ? 'selected' : '' }}>Actifs</option>
                    <option value="inactive" {{ request('status') === 'inactive' ? 'selected' : '' }}>Inactifs</option>
                </select>
            </div>
            <!-- Genre -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                <select name="gender" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Tous</option>
                    <option value="M" {{ request('gender') === 'M' ? 'selected' : '' }}>Masculin</option>
                    <option value="F" {{ request('gender') === 'F' ? 'selected' : '' }}>Féminin</option>
                    <option value="Other" {{ request('gender') === 'Other' ? 'selected' : '' }}>Autre</option>
                </select>
            </div>
            <!-- Boutons -->
            <div class="flex gap-2">
                <button type="submit" class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                    Filtrer
                </button>
                <a href="{{ route('users.index') }}" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">
                    Reset
                </a>
            </div>
        </form>
    </div>

    <!-- Tableau des utilisateurs -->
    <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Utilisateur
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Informations
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                @forelse($users as $user)
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <img class="h-10 w-10 rounded-full" src="{{ $user->avatar_url }}" alt="{{ $user->name }}">
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">{{ $user->name }}</div>
                                <div class="text-sm text-gray-500">ID: {{ $user->id }}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ $user->email }}</div>
                        <div class="text-sm text-gray-500">{{ $user->phone ?? 'N/A' }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ $user->city ?? 'N/A' }}</div>
                        <div class="text-sm text-gray-500">
                            @if($user->gender)
                                {{ $user->gender === 'M' ? 'Masculin' : ($user->gender === 'F' ? 'Féminin' : 'Autre') }}
                            @else
                                N/A
                            @endif
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                   {{ $user->is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                            {{ $user->status }}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div class="flex space-x-2">
                            <a href="{{ route('users.show', $user) }}" class="text-blue-600 hover:text-blue-900 flex items-center gap-1">
                                <span>👁️</span> Voir
                            </a>
                            <a href="{{ route('users.edit', $user) }}" class="text-indigo-600 hover:text-indigo-900 flex items-center gap-1">
                                <span>✏️</span> Modifier
                            </a>
                            <form action="{{ route('users.destroy', $user) }}" method="POST" class="inline"
                                  onsubmit="return confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-red-600 hover:text-red-900 flex items-center gap-1">
                                    <span>🗑️</span> Supprimer
                                </button>
                            </form>
                        </div>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                        Aucun utilisateur trouvé.
                    </td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <!-- Pagination -->
    @if($users->hasPages())
    <div class="px-6 py-4 border-t border-gray-200">
        {{ $users->links() }}
    </div>
    @endif
</div>
@endsection
```
<br><br>

---

### 3. Formulaire de création

**`resources/views/users/create.blade.php` :**

```php
@extends('layouts.app')

@section('title', 'Créer un Utilisateur')

@section('content')
<div class="max-w-2xl mx-auto">
    <div class="bg-white rounded-lg shadow">
        <!-- En-tête -->
        <div class="px-6 py-4 border-b border-gray-200">
            <h1 class="text-2xl font-bold text-gray-900 flex items-center gap-2">➕ Créer un nouvel utilisateur</h1>
        </div>

        <!-- Formulaire -->
        <form action="{{ route('users.store') }}" method="POST" enctype="multipart/form-data" class="p-6">
            @csrf

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Nom -->
                <div class="md:col-span-2">
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                        Nom complet <span class="text-red-500">*</span>
                    </label>
                    <input type="text" name="name" id="name" value="{{ old('name') }}" required
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 @error('name') border-red-500 @enderror">
                    @error('name')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>
                <!-- Email -->
                <div class="md:col-span-2">
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                        Email <span class="text-red-500">*</span>
                    </label>
                    <input type="email" name="email" id="email" value="{{ old('email') }}" required
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 @error('email') border-red-500 @enderror">
                    @error('email')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>
                <!-- Mot de passe -->
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                        Mot de passe <span class="text-red-500">*</span>
                    </label>
                    <input type="password" name="password" id="password" required
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 @error('password') border-red-500 @enderror">
                    @error('password')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>
                <!-- Confirmation mot de passe -->
                <div>
                    <label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-1">
                        Confirmer le mot de passe <span class="text-red-500">*</span>
                    </label>
                    <input type="password" name="password_confirmation" id="password_confirmation" required
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <!-- Téléphone -->
                <div>
                    <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input type="text" name="phone" id="phone" value="{{ old('phone') }}"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 @error('phone') border-red-500 @enderror">
                    @error('phone')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>
                <!-- Date de naissance -->
                <div>
                    <label for="birth_date" class="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                    <input type="date" name="birth_date" id="birth_date" value="{{ old('birth_date') }}"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 @error('birth_date') border-red-500 @enderror">
                    @error('birth_date')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>
                <!-- Genre -->
                <div>
                    <label for="gender" class="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                    <select name="gender" id="gender"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 @error('gender') border-red-500 @enderror">
                        <option value="">Sélectionner</option>
                        <option value="M" {{ old('gender') === 'M' ? 'selected' : '' }}>Masculin</option>
                        <option value="F" {{ old('gender') === 'F' ? 'selected' : '' }}>Féminin</option>
                        <option value="Other" {{ old('gender') === 'Other' ? 'selected' : '' }}>Autre</option>
                    </select>
                    @error('gender')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>
                <!-- Ville -->
                <div>
                    <label for="city" class="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                    <input type="text" name="city" id="city" value="{{ old('city') }}"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 @error('city') border-red-500 @enderror">
                    @error('city')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>
                <!-- Adresse -->
                <div class="md:col-span-2">
                    <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                    <textarea name="address" id="address" rows="3"
                              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 @error('address') border-red-500 @enderror">{{ old('address') }}</textarea>
                    @error('address')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>
                <!-- Avatar -->
                <div class="md:col-span-2">
                    <label for="avatar" class="block text-sm font-medium text-gray-700 mb-1">Photo de profil</label>
                    <input type="file" name="avatar" id="avatar" accept="image/*"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 @error('avatar') border-red-500 @enderror">
                    @error('avatar')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>
            </div>
            <!-- Boutons -->
            <div class="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                <a href="{{ route('users.index') }}" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                    Annuler
                </a>
                <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Créer l'utilisateur
                </button>
            </div>
        </form>
    </div>
</div>
@endsection
```
<br><br>

---

## ⚙️ Configuration du stockage des fichiers

### Créer le lien symbolique pour le stockage

```bash
php artisan storage:link
```

### Ajouter la route pour le toggle du statut

**Dans `routes/web.php`, ajouter :**
```php
Route::patch('/users/{user}/toggle-status', [UserController::class, 'toggleStatus'])->name('users.toggle-status');
```
<br><br>

---

## ✅ Checklist de fin de chapitre

<div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
  <div>✔️ Contrôleur UserController complet avec toutes les méthodes CRUD</div>
  <div>✔️ Layout principal créé avec navigation</div>
  <div>✔️ Vue index avec tableau, filtres et pagination</div>
  <div>✔️ Vue create avec formulaire complet</div>
  <div>✔️ Gestion des messages flash</div>
  <div>✔️ Validation des données avec Request classes</div>
  <div>✔️ Gestion des fichiers (avatars)</div>
  <div>✔️ Lien symbolique pour le stockage créé</div>
</div>
<br><br>

---

<div class="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
  <a href="/blog/chapter-5-user-management-setup" class="inline-flex items-center px-6 py-3 bg-gray-100 text-blue-700 rounded-lg shadow hover:bg-blue-50 transition font-semibold">
    ⬅️ Chapitre précédent
  </a>
  <a href="/blog/chapter-7-tailwindcss-integration" class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold">
    Chapitre suivant ➡️
  </a>
</div>
<!-- <div class="text-center mt-8 text-gray-500 text-sm">
  <strong>Formateur :</strong> Fredie TUEGUEM &nbsp;|&nbsp; <strong>Institution :</strong> UniTechs
</div> -->