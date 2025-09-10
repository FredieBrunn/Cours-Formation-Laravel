---
title: 'Chapitre 7: Intégration TailwindCSS avec Laravel'
description: 'Configurez et maîtrisez TailwindCSS dans votre projet Laravel pour créer des interfaces modernes et responsives'
pubDate: '2025-09-04'
heroImage: '/tailwind-laravel.png'
---


## 🎯 Objectifs du chapitre

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
  <div class="flex items-center gap-3 bg-blue-50 rounded-lg p-4">
    <span class="text-2xl">⚙️</span>
    <span>Installer et configurer TailwindCSS avec Laravel</span>
  </div>
  <div class="flex items-center gap-3 bg-blue-50 rounded-lg p-4">
    <span class="text-2xl">🛠️</span>
    <span>Utiliser les classes utilitaires de base</span>
  </div>
  <div class="flex items-center gap-3 bg-blue-50 rounded-lg p-4">
    <span class="text-2xl">🔁</span>
    <span>Créer des composants Blade réutilisables</span>
  </div>
  <div class="flex items-center gap-3 bg-blue-50 rounded-lg p-4">
    <span class="text-2xl">🎨</span>
    <span>Personnaliser la configuration Tailwind</span>
  </div>
  <div class="flex items-center gap-3 bg-blue-50 rounded-lg p-4">
    <span class="text-2xl">🚀</span>
    <span>Optimiser pour la production</span>
  </div>
</div>
<br><br>

---

## 📦 Installation de TailwindCSS

TailwindCSS est déjà inclus dans Laravel 10, mais vérifions la configuration :

### 1. Vérifier les dépendances

**`package.json` :**
```json
{
    "devDependencies": {
        "@tailwindcss/forms": "^0.5.2",
        "autoprefixer": "^10.4.2",
        "postcss": "^8.4.6",
        "tailwindcss": "^3.1.0"
    }
}
```

### 2. Configuration Tailwind

**`tailwind.config.js` :**
```javascript
import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    50: '#eff6ff',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                },
                unitechs: {
                    blue: '#1e40af',
                    green: '#059669',
                    gray: '#6b7280',
                }
            }
        },
    },

    plugins: [forms],
};
```

### 3. Fichier CSS principal

**`resources/css/app.css` :**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Styles personnalisés UniTechs */
@layer base {
    body {
        font-family: 'Figtree', sans-serif;
    }
}

@layer components {
    /* Boutons */
    .btn {
        @apply px-4 py-2 rounded-md font-medium transition-colors duration-200;
    }
    
    .btn-primary {
        @apply btn bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
    }
    
    .btn-secondary {
        @apply btn bg-gray-600 text-white hover:bg-gray-700;
    }
    
    .btn-danger {
        @apply btn bg-red-600 text-white hover:bg-red-700;
    }
    
    .btn-outline {
        @apply btn border border-gray-300 text-gray-700 hover:bg-gray-50;
    }

    /* Formulaires */
    .form-input {
        @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500;
    }
    
    .form-label {
        @apply block text-sm font-medium text-gray-700 mb-1;
    }
    
    .form-error {
        @apply mt-1 text-sm text-red-600;
    }

    /* Cards */
    .card {
        @apply bg-white rounded-lg shadow-md;
    }
    
    .card-header {
        @apply px-6 py-4 border-b border-gray-200;
    }
    
    .card-body {
        @apply p-6;
    }

    /* Badges */
    .badge {
        @apply px-2 py-1 text-xs font-semibold rounded-full;
    }
    
    .badge-success {
        @apply badge bg-green-100 text-green-800;
    }
    
    .badge-danger {
        @apply badge bg-red-100 text-red-800;
    }
    
    .badge-warning {
        @apply badge bg-yellow-100 text-yellow-800;
    }
}

@layer utilities {
    .text-shadow {
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }
}
```
<br><br>

---

## 🧩 Composants Blade réutilisables

### 1. Composant Button

**`resources/views/components/button.blade.php` :**
```php
@props([
    'type' => 'button',
    'variant' => 'primary',
    'size' => 'md',
    'href' => null
])

@php
$classes = 'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

$variants = [
    'primary' => 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    'secondary' => 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    'danger' => 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    'outline' => 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
];

$sizes = [
    'sm' => 'px-3 py-1.5 text-sm rounded',
    'md' => 'px-4 py-2 text-sm rounded-md',
    'lg' => 'px-6 py-3 text-base rounded-lg',
];

$classes .= ' ' . $variants[$variant] . ' ' . $sizes[$size];
@endphp

@if($href)
    <a href="{{ $href }}" {{ $attributes->merge(['class' => $classes]) }}>
        {{ $slot }}
    </a>
@else
    <button type="{{ $type }}" {{ $attributes->merge(['class' => $classes]) }}>
        {{ $slot }}
    </button>
@endif
```

**Utilisation :**
```html
<x-button variant="primary">Enregistrer</x-button>
<x-button variant="outline" href="{{ route('users.index') }}">Annuler</x-button>
<x-button variant="danger" onclick="confirmDelete()">Supprimer</x-button>
```

### 2. Composant Input

**`resources/views/components/input.blade.php` :**
```html
@props([
    'label' => null,
    'name',
    'type' => 'text',
    'required' => false,
    'placeholder' => null
])

<div>
    @if($label)
        <label for="{{ $name }}" class="form-label">
            {{ $label }}
            @if($required)
                <span class="text-red-500">*</span>
            @endif
        </label>
    @endif
    
    <input 
        type="{{ $type }}"
        name="{{ $name }}"
        id="{{ $name }}"
        @if($required) required @endif
        @if($placeholder) placeholder="{{ $placeholder }}" @endif
        value="{{ old($name) }}"
        {{ $attributes->merge(['class' => 'form-input' . ($errors->has($name) ? ' border-red-500' : '')]) }}
    >
    
    @error($name)
        <p class="form-error">{{ $message }}</p>
    @enderror
</div>
```

**Utilisation :**
```html
<x-input name="name" label="Nom complet" required />
<x-input name="email" type="email" label="Email" required />
<x-input name="phone" label="Téléphone" placeholder="+237 6XX XX XX XX" />
```

### 3. Composant Alert

**`resources/views/components/alert.blade.php` :**
```php
@props([
    'type' => 'info',
    'dismissible' => false
])

@php
$classes = 'px-4 py-3 rounded relative';
$iconClasses = 'w-5 h-5 mr-2';

$types = [
    'success' => 'bg-green-100 border border-green-400 text-green-700',
    'error' => 'bg-red-100 border border-red-400 text-red-700',
    'warning' => 'bg-yellow-100 border border-yellow-400 text-yellow-700',
    'info' => 'bg-blue-100 border border-blue-400 text-blue-700',
];

$icons = [
    'success' => 'M5 13l4 4L19 7',
    'error' => 'M6 18L18 6M6 6l12 12',
    'warning' => 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z',
    'info' => 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
];

$classes .= ' ' . $types[$type];
@endphp

<div {{ $attributes->merge(['class' => $classes]) }} role="alert">
    <div class="flex items-center">
        <svg class="{{ $iconClasses }}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{{ $icons[$type] }}"></path>
        </svg>
        <span>{{ $slot }}</span>
        
        @if($dismissible)
            <button type="button" class="absolute top-0 bottom-0 right-0 px-4 py-3" onclick="this.parentElement.remove()">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </button>
        @endif
    </div>
</div>
```
<br><br>

---

## 📱 Design Responsive

### Breakpoints Tailwind
- `sm:` - 640px et plus
- `md:` - 768px et plus
- `lg:` - 1024px et plus
- `xl:` - 1280px et plus
- `2xl:` - 1536px et plus

### Exemples responsive
```html
<!-- Navigation responsive -->
<nav class="flex flex-col md:flex-row md:items-center md:justify-between">
    <div class="mb-4 md:mb-0">Logo</div>
    <div class="space-y-2 md:space-y-0 md:space-x-4 md:flex">
        <a href="#" class="block md:inline">Lien 1</a>
        <a href="#" class="block md:inline">Lien 2</a>
    </div>
</nav>

<!-- Grid responsive -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <!-- Items -->
</div>

<!-- Texte responsive -->
<h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold">
    Titre responsive
</h1>
```
<br><br>

---

## 🎨 Classes Tailwind essentielles

### Layout et Flexbox
```html
<div class="container mx-auto px-4">
<div class="flex justify-between items-center">
<div class="flex flex-col space-y-4">
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
<div class="w-full md:w-1/2 lg:w-1/3">
```

### Spacing et Sizing
```html
<div class="p-4 m-2">
<div class="px-6 py-4">
<div class="mt-8 mb-4">
<div class="w-full h-64">
<div class="max-w-md mx-auto">
```

### Typography
```html
<h1 class="text-3xl font-bold">Titre</h1>
<p class="text-base text-gray-600">Paragraphe</p>
<span class="text-sm text-gray-500">Petit texte</span>
<p class="text-blue-600">Texte bleu</p>
<p class="text-red-500">Texte rouge</p>
```

### Background et Borders
```html
<div class="bg-white">
<div class="bg-gray-100">
<div class="bg-gradient-to-r from-blue-500 to-purple-600">
<div class="border border-gray-300 rounded-md">
<div class="border-t border-b">
```
<br><br>

---

## 🚀 Optimisation pour la production

### 1. Purge CSS automatique
Tailwind purge automatiquement les classes inutilisées en production.

### 2. Build pour la production
```bash
npm run build
```

### 3. Configuration avancée

**`vite.config.js` :**
```javascript
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['alpinejs']
                }
            }
        }
    }
});
```
<br><br>

---

## 🚀 Mise à jour du layout avec les composants

**`resources/views/layouts/app.blade.php` (version améliorée) :**
```html
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Gestion Utilisateurs - UniTechs')</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gray-50 font-sans antialiased">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <img src="{{ asset('assets/logo.png') }}" alt="UniTechs" class="h-8 w-auto">
                    <span class="ml-3 text-xl font-bold text-gray-800 hidden sm:block">
                        Gestion Utilisateurs
                    </span>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="{{ route('users.index') }}" 
                       class="text-gray-700 hover:text-unitechs-blue transition-colors">
                        Utilisateurs
                    </a>
                    <x-button variant="primary" href="{{ route('users.create') }}">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        <span class="hidden sm:inline">Nouveau</span>
                    </x-button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Messages Flash -->
    @if(session('success'))
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <x-alert type="success" dismissible>
                {{ session('success') }}
            </x-alert>
        </div>
    @endif

    @if(session('error'))
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <x-alert type="error" dismissible>
                {{ session('error') }}
            </x-alert>
        </div>
    @endif

    <!-- Contenu principal -->
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        @yield('content')
    </main>

    <!-- Pied de page -->
    <footer class="bg-gray-800 text-white py-8 mt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; 2025 UniTechs - Formation Laravel 10 par Fredie TUEGUEM</p>
        </div>
    </footer>
</body>
</html>
```
<br><br>

---

## ✅ Checklist de fin de chapitre

<div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
  <div>✔️ TailwindCSS configuré et personnalisé</div>
  <div>✔️ Classes utilitaires personnalisées créées</div>
  <div>✔️ Composants Blade réutilisables développés</div>
  <div>✔️ Design responsive implémenté</div>
  <div>✔️ Layout mis à jour avec les composants</div>
  <div>✔️ Optimisation pour la production configurée</div>
</div>
<br><br>

---

<div class="flex flex-row justify-between items-center gap-4 mt-8">
  <a href="/blog/chapter-6-user-crud" class="inline-flex items-center px-6 py-3 bg-gray-100 text-blue-700 rounded-lg shadow hover:bg-blue-50 transition font-semibold text-xs sm:text-base">
    ⬅️ Chapitre précédent
  </a>
  <a href="/blog/chapter-8-shortcuts-tips" class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold text-xs sm:text-base">
    Chapitre suivant ➡️
  </a>
</div>
<!-- <div class="text-center mt-8 text-gray-500 text-sm">
  <strong>Formateur :</strong> Fredie TUEGUEM &nbsp;|&nbsp; <strong>Institution :</strong> UniTechs
</div> -->