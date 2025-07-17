// App.js
import React, { useState, useEffect } from 'react';
import perfilImg from './image/mifoto.jpeg';
import proyecto1Img from './image/masalladelpib.jpeg';
import proyecto2Img from './image/tortugaalrescate.jpeg';
import proyecto3Img from './image/rickandmorty.png';
import proyecto4Img from './image/capuno.png';
import udcImg from './image/udc.png';
import './App.css';
import { Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Code, GitBranch, Users, MessageCircle, Brain } from "lucide-react";
import cvFile from './image/cv.pdf';
import emailjs from "@emailjs/browser";

function TypingEffect({ text, speed = 100 }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <h1 style={{ color: "#00ffd5" }}>{displayedText}</h1>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  const [form, setForm] = useState({
    from_name: "",
    reply_to: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_k2t3o5n",   // <- REEMPLAZA
        "template_9fvwakq",  // <- REEMPLAZA
        form,
        "CZq2E5_QGn9nKP0Uz"    // <- REEMPLAZA
      )
      .then(
        () => {
          alert("Mensaje enviado correctamente ✅");
          setForm({ from_name: "", reply_to: "", message: "" });
      })
      .catch((error) => {
        console.error(error);
        alert("Ocurrió un error ❌");
      });
  };

  return (
    <>
      <header>
        <nav>
          <button
            id="menu-toggle"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            className={menuOpen ? 'open' : ''}
            onClick={toggleMenu}
          >
            <span></span><span></span><span></span>
          </button>
          <ul className={`nav-list ${menuOpen ? 'active' : ''}`}>
            <li><a href="#portada">Inicio</a></li>
            <li><a href="#sobremi">Sobre mí</a></li>
            <li><a href="#experiencia">Proyectos</a></li>
            <li><a href="#habilidades">Habilidades</a></li>
            <li><a href="#educacion">Educación</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </nav>
      </header>

      <main className={menuOpen ? 'menu-open' : ''}>
        <section id="portada">
          <div className="contenido-portada">
            <article className="texto-portada">
              <TypingEffect text="¡Hola! Soy Daira Gómez" speed={150} />
              <p>Desarrolladora apasionada por la tecnología y el aprendizaje constante. Bienvenido a mi portafolio.</p>
              <a href={cvFile} download className="btn-cv">Descargar CV</a>
            </article>
            <img src={perfilImg} alt="Foto de perfil de Daira Gómez" className="fotoperfil" loading="lazy" />
          </div>
        </section>

        <section id="sobremi" aria-label="Sobre mí">
          <div className="contenido-sobremi">
          <TypingEffect text="Sobre mi" speed={250} />
            <p>
              Soy estudiante de Ingeniería en Software en la Universidad de Colima. Me interesa el desarrollo web, especialmente el front-end.
              Disfruto trabajar en proyectos colaborativos, donde puedo aplicar mis conocimientos y seguir creciendo profesionalmente.
              Me esfuerzo por ser organizada, responsable y creativa.
            </p>
            <div className="redes-sociales">
              <a href="https://github.com/pame-dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Github size={24} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/daira-pamela-rodriguez-gomez-167452324/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Linkedin size={24} /> LinkedIn
              </a>
            </div>

          </div>
        </section>

        <section id="experiencia">
          <div className="contenido-experiencia">
            <TypingEffect text="Proyectos" speed={250} />
            <p>
              He trabajado en proyectos colaborativos donde desarrollé interfaces responsivas,
              validaciones en formularios y lógica de negocio tanto en el front-end como en el back-end.
            </p>
            <div className="proyectos">
              <div className="proyecto">
                <img src={proyecto1Img} alt="Videojuego con Python" className="img-proyecto" />
                <h3>Videojuego con Python</h3>
                <a href="https://github.com/pame-dev/tortuga_al_rescate" target="_blank" rel="noopener noreferrer">Ver en GitHub</a>
              </div>
              <div className="proyecto">
                <img src={proyecto2Img} alt="Blog con usuarios" className="img-proyecto" />
                <h3>Blog con usuarios</h3>
                <a href="https://github.com/Edubedo/MasAllaDelPIB" target="_blank" rel="noopener noreferrer">Ver en GitHub</a><br />
                <a href="https://www.masalladelpib.site/" target='_blank' rel='noopener noreferrer'> Entra al sitio</a>
              </div>
              <div className="proyecto">
                <img src={proyecto3Img} alt="Buscador" className="img-proyecto" />
                <h3>Buscador de personajes con una API</h3>
                <a href="https://github.com/pame-dev/buscador-de-personajes-de-Rick-y-Mort" target="_blank" rel="noopener noreferrer">Ver en GitHub</a><br />
                <a href="https://683a3f7251d0807ad2d6a64f--remarkable-crepe-006513.netlify.app/" target='_blank' rel='noopener noreferrer'> Entra al sitio</a>
              </div>
              <div className="proyecto">
                <img src={proyecto4Img} alt="Carta interactiva" className="img-proyecto" />
                <h3>Carta interactiva</h3>
                <a href="https://github.com/pame-dev/-Carta-Interactiva-Para-Ti-?tab=readme-ov-file" target="_blank" rel="noopener noreferrer">Ver en GitHub</a><br />
                <a href="https://cumpleminino.netlify.app/" target='_blank' rel='noopener noreferrer'> Entra al sitio</a>
              </div>
            </div>
          </div>
        </section>

        <section id="habilidades" className="py-12 bg-blue-50">
          <div className="contenido-habilidades">
          <TypingEffect text="Habilidades" speed={200} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-2xl shadow-md flex items-start gap-4">
                <Code className="text-blue-600 w-8 h-8" />
                <div>
                  <h3 className="font-semibold text-lg text-blue-800">Lenguajes</h3>
                  <p>HTML, CSS, JavaScript, React, Python, Java, Laravel, mySQL, PostgreSQL</p><br></br>
                </div>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-md flex items-start gap-4">
                <GitBranch className="text-green-600 w-8 h-8" />
                <div>
                  <h3 className="font-semibold text-lg text-green-800">Herramientas</h3>
                  <p>Git, GitHub</p><br></br>
                </div>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-md flex items-start gap-4">
                <Users className="text-purple-600 w-8 h-8" />
                <div>
                  <h3 className="font-semibold text-lg text-purple-800">Trabajo en equipo</h3>
                  <p>Colaboración y liderazgo en entornos grupales.</p><br></br>
                </div>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-md flex items-start gap-4">
                <MessageCircle className="text-pink-600 w-8 h-8" />
                <div>
                  <h3 className="font-semibold text-lg text-pink-800">Comunicación</h3>
                  <p>Expresión clara, escucha activa y empatía.</p><br></br>
                </div>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-md flex items-start gap-4 col-span-1 md:col-span-2">
                <Brain className="text-yellow-600 w-8 h-8" />
                <div>
                  <h3 className="font-semibold text-lg text-yellow-800">Aprendizaje autónomo</h3>
                  <p>Capacidad para investigar, experimentar y resolver problemas de forma independiente.</p>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        <section id="educacion">
          <div className="contenido-educacion">
            <TypingEffect text="Educación y certificaciones" speed={150} />
            <div className="proyectos">
              <div className="proyecto">
                <img src={udcImg} className="img-proyecto" />
                <h3>Universidad de Colima</h3>
                <a href="https://www.ucol.mx/" target="_blank" rel="noopener noreferrer">Ver universidad</a>
              </div>
              <div className="proyecto">
                <img src="https://cdn-icons-png.flaticon.com/512/5968/5968282.png" alt="Certificado Java Intermedio" className="img-proyecto" />
                <h3>Certificado Java Intermedio</h3>
                <a href="https://github.com/tuusuario/repositorio-certificado-java2" target="_blank" rel="noopener noreferrer">Ver certificado</a>
              </div>
              <div className="proyecto">
                <img src="/certificados/chatgpt.jpeg" alt="Certificado ChatGPT" className="img-proyecto" />
                <h3>Fundamentos de ChatGPT</h3>
                <a href="/certificados/chatgpt.pdf" target="_blank" rel="noopener noreferrer">Ver certificado</a>
              </div>
                
              <div className="proyecto">
                <img src="/certificados/pygame.jpeg" alt="Certificado Pygame" className="img-proyecto" />
                <h3>Juego con Pygame</h3>
                <a href="/certificados/pygame.pdf" target="_blank" rel="noopener noreferrer">Ver certificado</a>
              </div>
                
              <div className="proyecto">
                <img src="/certificados/powerBI.jpeg" alt="Certificado Power BI" className="img-proyecto" />
                <h3>Power BI</h3>
                <a href="/certificados/powerBI.jpeg" target="_blank" rel="noopener noreferrer">Ver certificado</a>
              </div>
                
              <div className="proyecto">
                <img src="/certificados/githubCopilot.jpeg" alt="Certificado Copilot" className="img-proyecto" />
                <h3>GitHub Copilot</h3>
                <a href="/certificados/githubCopilot.jpeg" target="_blank" rel="noopener noreferrer">Ver certificado</a>
              </div>

              <div className="proyecto">
                <img src="/certificados/sololern.png" alt="Certificado Introducción a Java" className="img-proyecto" />
                <h3>Introducción a Java</h3>
                <a href="/certificados/sololern.png" target="_blank" rel="noopener noreferrer">Ver certificado</a>
              </div>

            </div>
          </div>
        </section>

        <section id="contacto">
          <div className="contenido-contacto">
            <TypingEffect text="Contacto" speed={150} />
            <p>¿Te gustaría trabajar conmigo? ¡Hablemos!</p><br />

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="from_name">Nombre:</label>
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  value={form.from_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="reply_to">Correo electrónico:</label>
                <input
                  type="email"
                  id="reply_to"
                  name="reply_to"
                  value={form.reply_to}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="message">Mensaje:</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit">Enviar</button>
            </form>
          </div>
        </section>

      </main>
    </>
  );
}


export default App;
