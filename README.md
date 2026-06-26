# CI/CD Demo — React + Alova

Proyecto de ejemplo para el ejercicio de **Pipeline básico de entrega continua**.
Incluye una app React que consume una API pública con **Alova**, pruebas
automáticas con **Vitest**, y un pipeline de **GitHub Actions** que compila,
prueba, empaqueta y simula el despliegue a un entorno de staging.

## Estructura relevante

```
.github/workflows/ci-cd.yml   → el pipeline de CI/CD
src/api/alovaInstance.js      → cliente Alova (instancia + método GET)
src/components/PostsList.jsx  → componente que consume la API con useRequest
src/components/PostsList.test.jsx → pruebas del componente
```

## 1. Desarrollo local

```bash
npm install
npm run dev      # entorno de desarrollo
npm run lint     # análisis estático
npm run test     # pruebas automáticas (Vitest)
npm run build    # build de producción → genera /dist
```

## 2. Subir el proyecto a GitHub

```bash
git init
git add .
git commit -m "Pipeline CI/CD inicial con React y Alova"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/<tu-repo>.git
git push -u origin main
```

En cuanto el push llega a `main`, GitHub Actions detecta el archivo
`.github/workflows/ci-cd.yml` y ejecuta el pipeline automáticamente. Puedes
verlo en la pestaña **Actions** del repositorio.

## 3. Qué hace el pipeline (`ci-cd.yml`)

El workflow tiene dos jobs encadenados:

### Job 1 — `build-and-test`
1. Descarga el código (`actions/checkout`).
2. Instala Node.js 20 con caché de `npm`.
3. Instala dependencias con `npm ci`.
4. Corre el linter (`npm run lint`).
5. Ejecuta las pruebas automáticas (`npm run test`).
6. Compila la app (`npm run build`), generando `/dist`.
7. Sube `/dist` como **artefacto** del workflow (`actions/upload-artifact`).

### Job 2 — `deploy-staging`
Solo corre si el job anterior fue exitoso **y** el push es a `main` (no en
pull requests). Usa un *environment* de GitHub llamado `staging`:
1. Descarga el artefacto generado por el job anterior.
2. Lista su contenido (verificación).
3. **Simula** el despliegue: imprime los pasos típicos de un deploy real
   (conexión al servidor, sincronización de archivos, reinicio del servicio).
4. Escribe un resumen del despliegue visible en la propia ejecución de
   GitHub Actions (`$GITHUB_STEP_SUMMARY`).

Este job es deliberadamente una **simulación**: no necesita credenciales ni
un servidor real, pero reproduce exactamente la secuencia de pasos que
tendría un despliegue real, que es justo lo que pide el ejercicio.

## 4. Cómo ver los resultados

1. Ve a la pestaña **Actions** de tu repositorio en GitHub.
2. Abre la ejecución más reciente del workflow "CI/CD Pipeline".
3. Expande `build-and-test` para ver el log de lint, tests y build.
4. Expande `deploy-staging` para ver el resumen del despliegue simulado.
5. En la sección **Artifacts** de esa misma ejecución podrás descargar el
   `app-dist.zip` (el build de producción), tal como se descargaría para un
   despliegue real.

## 5. Llevarlo a un despliegue real (opcional, para profundizar)

Si quieres ir un paso más allá de la simulación, el job `deploy-staging` se
puede reemplazar fácilmente por un despliegue real, por ejemplo:

- **GitHub Pages**: con `actions/deploy-pages` (gratis, sin servidor propio).
- **Vercel / Netlify**: con sus acciones oficiales y un token en
  *Settings → Secrets and variables → Actions*.
- **Servidor propio por SSH**: con `appleboy/scp-action` /
  `appleboy/ssh-action` para copiar `dist/` y reiniciar el servicio.

En cualquier caso, el resto del pipeline (build + test + artefacto) no
cambia — solo se sustituye el paso de "Simular despliegue" por la acción de
despliegue real correspondiente.
