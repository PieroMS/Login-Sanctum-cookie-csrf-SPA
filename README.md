# Documentación del Proyecto 📝

## Descripción 🚀

- **Laravel 12**: Actúa como servidor API.
- **Vue 3**: Se encarga de la interfaz de usuario, ubicada en la carpeta `resources/js`.

## Estructura General del Proyecto 🏗️

- **Vista Principal**: 
  - El archivo `resources/views/app.blade.php` contiene un `<div>` con el id `app`, que es donde se carga toda la aplicación de Vue. 🖥️
  
- **Inicialización de Vue**:
  - El archivo `resources/js/app.ts` inicia Vue, conecta el sistema de rutas (definido en `App.vue`) con `app.blade.php`, y activa Pinia para manejar datos que se usan en diferentes partes de la app. ⚙️
  
- **Rutas y Vistas**:
  - El componente `resources/js/App.vue` incluye un `router-view`, que actúa como un contenedor dinámico para las vistas. Estas vistas se renderizan según las rutas definidas en el archivo del router. 🛣️

## Creación del proyecto: ⚙️

- `laravel new ...`
- `composer require laravel/sanctum`
- `php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"`
- `npm install vue@3 vue-router@4 pinia axios @vitejs/plugin-vue`
- `npm i js-cookie`
- `npm install pinia-plugin-persistedstate`
- `npm install tailwindcss @tailwindcss/vite`

## Configuración de archivos: 🔧

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

- En Cors:

```
return [
    'paths' => ['api/*', 'login', 'logout', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://login.test', 'http://login.test:8000'],

    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
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
    }
});
```

## 🛠️ Desarrollo del Proyecto

### 🔐 Autenticación (Sanctum + Cookies)

- Se usa Laravel Sanctum para autenticación basada en cookies, no tokens.

- Se realiza una petición ```GET /sanctum/csrf-cookie``` antes del login para establecer cookies de sesión (laravel_session, XSRF-TOKEN).

- Todas las peticiones con axios deben incluir withCredentials: true.

### 🧪 Usuario de prueba

- Se incluye un seeder que crea un usuario por defecto:

```
Email: piero@prueba.com
Password: 12345678
```

### 🍪 Configuración de CSRF

- Axios está configurado con un interceptor que toma el token CSRF de la cookie y lo agrega a los headers.

### 📦 Store (Pinia)

- Se usa Pinia como store principal.

- Se implementa pinia-plugin-persistedstate para mantener el estado entre recargas, se almacena en el localstorage.

### 🌐 Axios Client

- Se creó una instancia personalizada de axios (client) para toda la app.

## 🔄 Flujo del Proyecto

1. Obtener el CSRF Token
  - Petición del Cliente: GET /sanctum/csrf-cookie

  - Resultado:
    - El servidor responde con cookies: XSRF-TOKEN (token CSRF) y laravel_session.
    - Estas cookies se almacenan automáticamente en el navegador (withCredentials: activo).
    - Es un paso obligatorio para que Laravel valide correctamente el CSRF en el login.

2. Login del usuario
  - Petición: POST /login
  - Headers: 
    - 'X-XSRF-TOKEN': Extraído desde la cookie XSRF-TOKEN, enviado manualmente usando un interceptor.
    - 'Content-Type': 'application/json'
  - Resultado esperado:
    - Si las credenciales son válidas:
      - Laravel responde con código 204 o 200.
      - El navegador mantiene la sesión mediante la cookie laravel_session.
      - Redirección a la ruta protegida.
    - Si las credenciales son inválidas:
      - Laravel responde con código 422.
      - Se muestra mensaje de error en el formulario.

3. Peticiones autenticadas
  - Una vez logueado, cualquier petición GET, POST, etc., al backend incluirá automáticamente la cookie laravel_session (porque withCredentials: true está activo).
  - Laravel identifica la sesión por cookie y retorna datos asociados al usuario autenticado.

4. Logout
  - Petición: POST /logout
  - Headers: Incluye el token CSRF (X-XSRF-TOKEN) de la misma forma que el login.
  
  - Resultado:
    - Laravel destruye la sesión.
    - Las cookies siguen visibles en el navegador, pero la sesión ya no es válida.
  - Frontend:
    - Limpia el store de Pinia (usuario, tokens, flags de autenticación).
    - Redirige a la pantalla de login.

## 🛠️ Instalación y Ejecución del Proyecto

```
- git clone ...
- composer insall
- npm install
- php artisan migrate // para crear la bd
- php artisan migrate:fresh --seed // para ejecutar los seeders
- composer run dev
```
