### Modificadores de acceso

- `public` **(o vacío)**: El miembro es accesible desde cualquier parte de la aplicación, incluyendo otros componentes, servicios y el propio **template**.

- `protected`: El miembro es accesible únicamente dentro de la clase, sus **clases derivadas** (hijas) y el **template** del componente.

- `private`: El miembro es accesible solo dentro de la clase donde se define, limitando su visibilidad en **tiempo de compilación** para cualquier agente externo.

- `#`: El miembro es estrictamente privado y queda oculto por el motor de JavaScript **en tiempo de ejecución**, siendo inaccesible incluso para el template o mediante técnicas de casting en typescript.

### Regiones (`#region`)

Las regiones son comentarios especiales que permiten **colapsar y expandir bloques de código** en el editor, mejorando la navegación en clases con muchos miembros.

- **Sintaxis**: Se definen con `// #region Nombre` y se cierran con `// #endregion`
