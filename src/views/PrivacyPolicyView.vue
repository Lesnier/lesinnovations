<template>
  <main>
    <!-- ======= Hero Section ======= -->
    <section class="privacy-hero d-flex align-items-center">
      <div class="container">
        <h1>Política de Privacidad</h1>
        <p>Última actualización: {{ lastUpdated }}</p>
      </div>
    </section>

    <!-- ======= Privacy Content ======= -->
    <section class="privacy-content section">
      <div class="container">

        <div class="privacy-card">
          <h2>1. Información que Recopilamos</h2>
          <p>
            En <strong>Les Innovations</strong>, recopilamos información personal que usted nos proporciona
            directamente al utilizar nuestros servicios, incluyendo:
          </p>
          <ul>
            <li>Nombre completo y datos de contacto (correo electrónico, teléfono).</li>
            <li>Información de la empresa u organización que representa.</li>
            <li>Datos relacionados con los proyectos o servicios solicitados.</li>
            <li>Información técnica del dispositivo y datos de navegación (IP, tipo de navegador, páginas visitadas).</li>
          </ul>
        </div>

        <div class="privacy-card">
          <h2>2. Uso de la Información</h2>
          <p>Utilizamos la información recopilada para:</p>
          <ul>
            <li>Proveer, operar y mejorar nuestros servicios de desarrollo de software.</li>
            <li>Comunicarnos con usted en relación a sus proyectos y consultas.</li>
            <li>Enviar información relevante sobre actualizaciones o nuevas funcionalidades (con su consentimiento).</li>
            <li>Cumplir con obligaciones legales y contractuales.</li>
            <li>Analizar el uso del sitio para mejorar la experiencia del usuario.</li>
          </ul>
        </div>

        <div class="privacy-card">
          <h2>3. Compartición de Información</h2>
          <p>
            <strong>Les Innovations</strong> no vende, alquila ni comparte su información personal con terceros,
            excepto en los siguientes casos:
          </p>
          <ul>
            <li>Con proveedores de servicios que nos asisten en la operación del sitio web y la prestación de servicios, bajo acuerdos de confidencialidad.</li>
            <li>Cuando sea requerido por ley o autoridad competente.</li>
            <li>Para proteger los derechos, la propiedad o la seguridad de Les Innovations, nuestros clientes o el público.</li>
          </ul>
        </div>

        <div class="privacy-card">
          <h2>4. Cookies y Tecnologías de Seguimiento</h2>
          <p>
            Nuestro sitio web utiliza cookies y tecnologías similares para mejorar su experiencia de navegación.
            Puede configurar su navegador para rechazar cookies; sin embargo, esto puede afectar algunas
            funcionalidades del sitio. Las cookies que utilizamos incluyen:
          </p>
          <ul>
            <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento básico del sitio.</li>
            <li><strong>Cookies analíticas:</strong> Nos ayudan a entender cómo los visitantes interactúan con el sitio.</li>
            <li><strong>Cookies de preferencias:</strong> Permiten al sitio recordar sus configuraciones.</li>
          </ul>
        </div>

        <div class="privacy-card">
          <h2>5. Seguridad de los Datos</h2>
          <p>
            Implementamos medidas técnicas y organizativas apropiadas para proteger su información personal
            contra acceso no autorizado, alteración, divulgación o destrucción. Estas medidas incluyen
            cifrado SSL/TLS, controles de acceso y auditorías regulares de seguridad.
          </p>
        </div>

        <div class="privacy-card">
          <h2>6. Retención de Datos</h2>
          <p>
            Conservamos su información personal durante el tiempo necesario para cumplir con los fines
            descritos en esta política, o según lo requiera la ley. Cuando los datos ya no sean necesarios,
            los eliminamos de forma segura.
          </p>
        </div>

        <div class="privacy-card">
          <h2>7. Sus Derechos</h2>
          <p>De acuerdo con la legislación aplicable, usted tiene derecho a:</p>
          <ul>
            <li><strong>Acceder</strong> a los datos personales que tenemos sobre usted.</li>
            <li><strong>Rectificar</strong> información incorrecta o incompleta.</li>
            <li><strong>Eliminar</strong> sus datos personales (derecho al olvido).</li>
            <li><strong>Oponerse</strong> al tratamiento de sus datos en determinadas circunstancias.</li>
            <li><strong>Portabilidad</strong> de sus datos en un formato estructurado y legible.</li>
          </ul>
          <p>Para ejercer estos derechos, contáctenos a través de los medios indicados al final de esta política.</p>
        </div>

        <div class="privacy-card">
          <h2>8. Cambios en esta Política</h2>
          <p>
            Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento.
            Le notificaremos sobre cambios significativos publicando la nueva política en esta página
            con una fecha de actualización revisada. Le recomendamos revisar esta página periódicamente.
          </p>
        </div>

        <div class="privacy-card">
          <h2>9. Contacto</h2>
          <p>
            Si tiene preguntas o inquietudes sobre esta Política de Privacidad, puede contactarnos:
          </p>
          <ul>
            <li><strong>Empresa:</strong> Les Innovations</li>
            <li><strong>Correo electrónico:</strong> <a href="mailto:support@lesinnovations.tech">support@lesinnovations.tech</a></li>
            <li><strong>Sitio web:</strong> <a href="https://lesinnovations.tech" target="_blank">lesinnovations.tech</a></li>
          </ul>
        </div>

        <div class="privacy-back">
          <RouterLink to="/" class="btn-back">
            <i class="bx bx-arrow-back"></i> Volver al inicio
          </RouterLink>
        </div>

      </div>
    </section>
  </main>
</template>

<script setup>
const lastUpdated = new Date().toLocaleDateString('es-ES', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
</script>

<style scoped>
.privacy-hero {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  min-height: 220px;
  padding: 60px 0 40px;
  text-align: center;
  color: #fff;
}

.privacy-hero h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #fff;
}

.privacy-hero p {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.65);
  margin: 0;
}

.privacy-content {
  padding: 60px 0 80px;
  background: #f8f9fa;
}

.privacy-card {
  background: #fff;
  border-radius: 12px;
  padding: 32px 36px;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  border-left: 4px solid #0f3460;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.privacy-card:hover {
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.privacy-card h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f3460;
  margin-bottom: 16px;
}

.privacy-card p {
  color: #555;
  line-height: 1.8;
  margin-bottom: 12px;
}

.privacy-card ul {
  padding-left: 20px;
  color: #555;
}

.privacy-card ul li {
  margin-bottom: 8px;
  line-height: 1.7;
}

.privacy-card a {
  color: #0f3460;
  text-decoration: underline;
}

.privacy-back {
  text-align: center;
  margin-top: 40px;
}

.btn-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #0f3460;
  color: #fff;
  padding: 12px 28px;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.3s ease, transform 0.2s ease;
}

.btn-back:hover {
  background: #16213e;
  color: #fff;
  transform: translateY(-2px);
}
</style>
