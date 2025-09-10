---
title: 'Chapitre 5: Setup du Système de Gestion des Utilisateurs'
description: 'Préparez la base de données, les modèles et les migrations pour créer un système complet de gestion des utilisateurs'
pubDate: '2025-09-04'
heroImage: '/user-man.jpg'
---


## 🎯 Objectifs du chapitre

<div class="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6 text-xs sm:text-base">
  <div class="flex items-center gap-2 sm:gap-3 bg-blue-50 rounded-lg p-2 sm:p-4">
    <span class="text-xl sm:text-2xl">🗄️</span>
    <span>Configurer la base de données pour les utilisateurs</span>
  </div>
  <div class="flex items-center gap-2 sm:gap-3 bg-blue-50 rounded-lg p-2 sm:p-4">
    <span class="text-xl sm:text-2xl">📝</span>
    <span>Créer et personnaliser les migrations</span>
  </div>
  <div class="flex items-center gap-2 sm:gap-3 bg-blue-50 rounded-lg p-2 sm:p-4">
    <span class="text-xl sm:text-2xl">👤</span>
    <span>Configurer le modèle User</span>
  </div>
  <div class="flex items-center gap-2 sm:gap-3 bg-blue-50 rounded-lg p-2 sm:p-4">
    <span class="text-xl sm:text-2xl">🌱</span>
    <span>Ajouter des données de test avec les seeders</span>
  </div>
  <div class="flex items-center gap-2 sm:gap-3 bg-blue-50 rounded-lg p-2 sm:p-4">
    <span class="text-xl sm:text-2xl">✅</span>
    <span>Préparer la validation des données</span>
  </div>
</div>
<br><br>

---

## 🗄️ Configuration de la base de données

### Vérification de la connexion

<div class="bg-blue-50 border-l-4 border-blue-400 p-2 sm:p-4 mb-4 text-xs sm:text-base">
  <span class="font-bold">Tester la connexion dans <code>tinker</code> :</span>
  <pre><code class="language-bash">php artisan tinker</code></pre>
  <pre><code class="language-php">// Dans tinker
DB::connection()->getPdo();
// Si ça fonctionne, vous verrez les détails de la connexion
exit
</code></pre>
</div>
<br><br>

---

### Migration des utilisateurs existante

Laravel inclut déjà une migration pour les utilisateurs. Examinons-la :

```php
// database/migrations/2014_10_12_000000_create_users_table.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
};
```
<br><br>

---

## 🔧 Personnalisation de la migration des utilisateurs

Nous allons enrichir la table users avec des champs supplémentaires :

### Créer une nouvelle migration

```bash
php artisan make:migration add_fields_to_users_table --table=users
```

```php
// database/migrations/xxxx_xx_xx_add_fields_to_users_table.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->nullable()->after('email');
            $table->date('birth_date')->nullable()->after('phone');
            $table->enum('gender', ['M', 'F', 'Other'])->nullable()->after('birth_date');
            $table->text('address')->nullable()->after('gender');
            $table->string('city')->nullable()->after('address');
            $table->string('country')->default('Cameroun')->after('city');
            $table->boolean('is_active')->default(true)->after('country');
            $table->string('avatar')->nullable()->after('is_active');
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'phone', 'birth_date', 'gender', 'address', 
                'city', 'country', 'is_active', 'avatar'
            ]);
        });
    }
};
```

<br>

### Exécuter les migrations

```bash
php artisan migrate
```
<br><br>

---

## 👤 Configuration du modèle User

```php
// app/Models/User.php
<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Champs assignables en masse
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'birth_date',
        'gender',
        'address',
        'city',
        'country',
        'is_active',
        'avatar',
    ];

    /**
     * Champs cachés pour la sérialisation
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Conversion automatique des types
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'birth_date' => 'date',
        'is_active' => 'boolean',
    ];

    /**
     * Accesseurs et Mutateurs
     */
    
    // Mutateur pour le mot de passe (hachage automatique)
    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = bcrypt($password);
    }

    // Accesseur pour le nom complet
    public function getFullNameAttribute()
    {
        return $this->name;
    }

    // Accesseur pour l'avatar par défaut
    public function getAvatarUrlAttribute()
    {
        if ($this->avatar) {
            return asset('storage/avatars/' . $this->avatar);
        }
        $initials = strtoupper(substr($this->name, 0, 1));
        return "https://ui-avatars.com/api/?name={$initials}&background=4f46e5&color=fff";
    }

    // Accesseur pour le statut
    public function getStatusAttribute()
    {
        return $this->is_active ? 'Actif' : 'Inactif';
    }

    /**
     * Scopes (requêtes réutilisables)
     */
    
    // Utilisateurs actifs seulement
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Recherche par nom ou email
    public function scopeSearch($query, $term)
    {
        return $query->where(function ($query) use ($term) {
            $query->where('name', 'like', "%{$term}%")
                  ->orWhere('email', 'like', "%{$term}%");
        });
    }

    // Filtrer par genre
    public function scopeByGender($query, $gender)
    {
        return $query->where('gender', $gender);
    }
}
```
<br><br>

---

## 🌱 Seeders pour les données de test

### Créer un seeder pour les utilisateurs

```bash
php artisan make:seeder UserSeeder
```

```php
// database/seeders/UserSeeder.php
<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create('fr_FR');

        // Créer un utilisateur admin
        User::create([
            'name' => 'Fredie TUEGUEM',
            'email' => 'frediet85@gmail.com',
            'password' => 'password123',
            'phone' => '+237 657 902 940',
            'birth_date' => '1990-01-01',
            'gender' => 'M',
            'address' => 'Dschang, Cameroun',
            'city' => 'Dschang',
            'country' => 'Cameroun',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Créer des utilisateurs de test
        for ($i = 0; $i < 20; $i++) {
            User::create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'password' => 'password123',
                'phone' => $faker->phoneNumber,
                'birth_date' => $faker->date('Y-m-d', '2000-01-01'),
                'gender' => $faker->randomElement(['M', 'F', 'Other']),
                'address' => $faker->address,
                'city' => $faker->city,
                'country' => 'Cameroun',
                'is_active' => $faker->boolean(80),
                'email_verified_at' => $faker->boolean(70) ? now() : null,
            ]);
        }
    }
}
```

<br><br>

### Enregistrer le seeder

```php
// database/seeders/DatabaseSeeder.php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            UserSeeder::class,
        ]);
    }
}
```

<br>

### Exécuter les seeders

```bash
# Exécuter tous les seeders
php artisan db:seed

# Ou exécuter un seeder spécifique
php artisan db:seed --class=UserSeeder

# Réinitialiser et re-seeder
php artisan migrate:fresh --seed
```
<br><br>

---

## 🏭 Factory pour les tests

### Personnaliser la factory User

```php
// database/factories/UserFactory.php
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    public function definition()
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'phone' => fake()->phoneNumber(),
            'birth_date' => fake()->date('Y-m-d', '2000-01-01'),
            'gender' => fake()->randomElement(['M', 'F', 'Other']),
            'address' => fake()->address(),
            'city' => fake()->city(),
            'country' => 'Cameroun',
            'is_active' => fake()->boolean(80),
            'remember_token' => Str::random(10),
        ];
    }

    public function unverified()
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    public function inactive()
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}
```
<br><br>

---

## ✅ Validation des données

### Créer des Request classes pour la validation

```bash
php artisan make:request StoreUserRequest
php artisan make:request UpdateUserRequest
```

```php
// app/Http/Requests/StoreUserRequest.php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255|min:2',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'nullable|string|max:20',
            'birth_date' => 'nullable|date|before:today',
            'gender' => 'nullable|in:M,F,Other',
            'address' => 'nullable|string|max:500',
            'city' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Le nom est obligatoire.',
            'name.min' => 'Le nom doit contenir au moins 2 caractères.',
            'email.required' => 'L\'email est obligatoire.',
            'email.email' => 'L\'email doit être valide.',
            'email.unique' => 'Cet email est déjà utilisé.',
            'password.required' => 'Le mot de passe est obligatoire.',
            'password.min' => 'Le mot de passe doit contenir au moins 8 caractères.',
            'password.confirmed' => 'La confirmation du mot de passe ne correspond pas.',
            'birth_date.before' => 'La date de naissance doit être antérieure à aujourd\'hui.',
            'avatar.image' => 'Le fichier doit être une image.',
            'avatar.max' => 'L\'image ne doit pas dépasser 2MB.',
        ];
    }
}
```

<br><br>

```php
// app/Http/Requests/UpdateUserRequest.php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255|min:2',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($this->user),
            ],
            'phone' => 'nullable|string|max:20',
            'birth_date' => 'nullable|date|before:today',
            'gender' => 'nullable|in:M,F,Other',
            'address' => 'nullable|string|max:500',
            'city' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'is_active' => 'boolean',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Le nom est obligatoire.',
            'name.min' => 'Le nom doit contenir au moins 2 caractères.',
            'email.required' => 'L\'email est obligatoire.',
            'email.email' => 'L\'email doit être valide.',
            'email.unique' => 'Cet email est déjà utilisé.',
            'birth_date.before' => 'La date de naissance doit être antérieure à aujourd\'hui.',
            'avatar.image' => 'Le fichier doit être une image.',
            'avatar.max' => 'L\'image ne doit pas dépasser 2MB.',
        ];
    }
}
```
<br><br>

---

## 🧪 Tester la configuration

<div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
  <span class="font-bold">Vérifier les données en base :</span>
  <pre><code class="language-bash">php artisan tinker</code></pre>

```php
// Compter les utilisateurs
User::count();

// Récupérer tous les utilisateurs
User::all();

// Tester les scopes
User::active()->count();
User::search('fredie')->get();

// Tester les accesseurs
$user = User::first();
$user->avatar_url;
$user->status;

exit
```

</div>
<br><br>

---

## 🚨 Bonnes pratiques

<div class="bg-yellow-50 border-l-4 border-yellow-400 p-2 sm:p-4 mb-4 text-xs sm:text-base">
  <strong>Organisation :</strong>
  <ul class="list-disc ml-4 sm:ml-6">
    <li>Utilisez les migrations pour toute modification de structure</li>
    <li>Centralisez la logique métier dans les modèles</li>
    <li>Utilisez les factories et seeders pour vos tests</li>
    <li>Validez toujours les données côté serveur</li>
  </ul>
</div>
<div class="bg-yellow-50 border-l-4 border-yellow-400 p-2 sm:p-4 mb-4 text-xs sm:text-base">
  <strong>Sécurité :</strong>
  <ul class="list-disc ml-4 sm:ml-6">
    <li>Ne stockez jamais de mots de passe en clair</li>
    <li>Protégez les routes sensibles avec des middleware</li>
    <li>Vérifiez les droits d'accès dans vos policies</li>
  </ul>
</div>
<br><br>

---

## ✅ Checklist de fin de chapitre

<div class="grid grid-cols-1 md:grid-cols-2 gap-1 sm:gap-2 mb-4 sm:mb-6 text-xs sm:text-base">
  <div>✔️ Migration des utilisateurs enrichie et exécutée</div>
  <div>✔️ Modèle User personnalisé avec accesseurs/mutateurs</div>
  <div>✔️ Seeders créés et exécutés</div>
  <div>✔️ Factory configurée pour les tests</div>
  <div>✔️ Request classes pour la validation créées</div>
  <div>✔️ Tests en base de données effectués</div>
  <div>✔️ Au moins 20 utilisateurs de test en base</div>
</div>
<br><br>

---

<div class="flex flex-col md:flex-row justify-between items-center gap-2 sm:gap-4 mt-4 sm:mt-8">
  <a href="/blog/chapter-4-routes-basics" class="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-gray-100 text-blue-700 rounded-lg shadow hover:bg-blue-50 transition font-semibold text-xs sm:text-base">
    ⬅️ Chapitre précédent
  </a>
  <a href="/blog/chapter-6-user-crud" class="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold text-xs sm:text-base">
    Chapitre suivant ➡️
  </a>
</div>
<!-- <div class="text-center mt-8 text-gray-500 text-sm">
  <strong>Formateur :</strong> Fredie TUEGUEM &nbsp;|&nbsp; <strong>Institution :</strong> UniTechs
</div> -->