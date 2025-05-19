# Documentación del Proyecto

## Descripción

- **Laravel 12**: Actúa como servidor API.
- **Vue 3**: Se encarga de la interfaz de usuario, que está ubicada en la carpeta `resources/js`.

## Estructura del Proyecto

- **Vista Principal**: 
  - El archivo `resources/views/app.blade.php` contiene un `<div>` con el id `app`, que es donde se carga toda la aplicación de Vue.
  
- **Inicialización de Vue**:
  - El archivo `resources/js/app.ts` inicia Vue, conecta el sistema de rutas (definido en `App.vue`) con `app.blade.php`, y activa Pinia para manejar datos que se usan en diferentes partes de la app.
  
- **Rutas y Vistas**:
  - El componente `resources/js/App.vue` incluye un `router-view`, que actúa como un contenedor dinámico para las vistas. Estas vistas se renderizan según las rutas definidas en el archivo del router.

## Creación del proyecto:

- `laravel new ...`
- `composer require laravel/sanctum`
- `php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"`
- `npm install vue@3 vue-router@4 pinia axios @vitejs/plugin-vue`
- `npm i js-cookie`
- `npm install pinia-plugin-persistedstate`
- `npm install tailwindcss @tailwindcss/vite`
- En bootsrtap/app.php:
  ```
  $middleware->group('api', [
      \Illuminate\Session\Middleware\StartSession::class,
      \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
      \Illuminate\Cookie\Middleware\EncryptCookies::class,
      \Illuminate\View\Middleware\ShareErrorsFromSession::class,
      \Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests::class,
      \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
  ]);

  $middleware->alias([
      'auth.sanctum' => \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
  ]);
  ```
- En config/sanctum:
  ```
  'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', sprintf(
        '%s%s',
        'localhost,localhost:3000,127.0.0.1,127.0.0.1:8000,::1',
        env('APP_URL') ? ','.parse_url(env('APP_URL'), PHP_URL_HOST) : ''
    ))),
  ```
- En vite:
  ```
  import { defineConfig } from 'vite';
  import laravel from 'laravel-vite-plugin';
  import tailwindcss from '@tailwindcss/vite';
  import vue from '@vitejs/plugin-vue';
  import path from 'path';

  export default defineConfig({
      plugins: [
          vue(),
          laravel({
              input: ['resources/css/app.css', 'resources/js/app.js'],
              refresh: true,
          }),
          tailwindcss(),
      ],
      resolve: {
          alias: {
              '@': path.resolve(__dirname, './resources/js'),
              '~': path.resolve(__dirname, './resources'),
          },
      },
  });
  ```
## Desarrollo del proyecto:


