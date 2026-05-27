### Modificadores de acceso

- `public` **(o vacío)**: El miembro es accesible desde cualquier parte de la aplicación, incluyendo otros componentes, servicios y el propio **template**.

- `protected`: El miembro es accesible únicamente dentro de la clase, sus **clases derivadas** (hijas) y el **template** del componente.

- `private`: El miembro es accesible solo dentro de la clase donde se define, limitando su visibilidad en **tiempo de compilación** para cualquier agente externo.

- `#`: El miembro es estrictamente privado y queda oculto por el motor de JavaScript **en tiempo de ejecución**, siendo inaccesible incluso para el template o mediante técnicas de casting en typescript.

### Reactividad Moderna (Signals APIs)

- `model()` / `model.required()`: Habilita el **Two-Way Data Binding** de forma nativa. A diferencia de un `input()`, el componente puede escribir en él mediante `.set()` o `.update()`, notificando automáticamente al componente padre del cambio.

- `resource()`: Diseñado para manejar **operaciones asíncronas** (Promesas) de forma reactiva. Proporciona automáticamente señales de estado como `value()`, `isLoading()`, `status()` y `error()`.

- `rxResource()`: Variante de `resource()` optimizada para **RxJS**. Permite consumir Observables (como los de `HttpClient`) y transformarlos en señales, gestionando automáticamente la suscripción y su cancelación al destruir el componente.

### Regiones (`#region`)

Las regiones son comentarios especiales que permiten **colapsar y expandir bloques de código** en el editor, mejorando la navegación en clases con muchos miembros.

- **Sintaxis**: Se definen con `// #region Nombre` y se cierran con `// #endregion`
