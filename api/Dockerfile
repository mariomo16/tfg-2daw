# Imagen base oficial de PHP 8.4 con Apache
FROM php:8.4-apache

# Evitar el warning de Apache sobre el nombre de dominio
RUN echo "ServerName tfg-2daw-git-main-ortegamario.vercel.app" >> /etc/apache2/apache2.conf

# Instalación dependencias del sistema necesarias para las extensiones de PHP
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    libzip-dev \
    libsqlite3-dev \
    && docker-php-ext-install pdo_sqlite mbstring exif pcntl bcmath gd zip \
    && rm -rf /var/lib/apt/lists/*

# Habilitar mod_rewrite para que las rutas de Laravel funcionen
RUN a2enmod rewrite

# Apuntar el DocumentRoot a /public que es donde Laravel sirve la app
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf \
    && sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Copiamos Composer desde su imagen oficial
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copiar solo los archivos de dependencias primero para aprovechar el cache de Docker
COPY composer.json composer.lock ./

# Instalamos dependencias sin scripts porque el código aún no está copiado
RUN composer install --no-dev --optimize-autoloader --no-scripts --no-interaction

# Copiar el resto del proyecto
COPY . .

# Regenerar el autoloader con el código ya presente y ajustamos permisos
RUN composer dump-autoload --optimize \
    && chown -R www-data:www-data storage bootstrap/cache

# Puerto que usa Render para recibir tráfico
EXPOSE 10000

# CMD ["apache2-foreground"]

# Copiamos y ejecutamos el entrypoint que arranca migraciones y Apache
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]