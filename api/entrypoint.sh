#!/bin/sh
set -e

# Crear el archivo SQLite
mkdir -p /var/www/html/database
touch /var/www/html/database/database.sqlite

# Ajustar permisos para que Apache pueda leer y escribir la base de datos
chown -R www-data:www-data /var/www/html/database
chmod 775 /var/www/html/database
chmod 664 /var/www/html/database/database.sqlite

# Limpiar la configuracion por si acaso se bloquea el cors
php artisan config:clear
php artisan cache:clear

# Ejecutar migraciones pendientes
php artisan migrate --force --seed
echo "Migraciones ejecutadas"

# Generar caché de configuración y rutas para mejorar el rendimiento
php artisan config:cache
php artisan route:cache
echo "Caché generado"

# Crear un enlace para que las imagenes de los usuarios sean accesibles
php artisan storage:link

# Arrancar el programador de tareas en segundo plano
php artisan schedule:work &
echo "Programador de tareas arrancado"

# Arrancar Apache
exec apache2-foreground