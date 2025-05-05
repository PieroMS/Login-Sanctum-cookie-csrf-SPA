<!-- resources/views/app.blade.php -->
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>Laravel Vue SPA</title>
    
    <!-- Scripts and CSS -->
    @vite(['resources/css/app.css', 'resources/js/app.ts'])
</head>
<body class="antialiased">
    <div id="app"></div>
</body>
</html>