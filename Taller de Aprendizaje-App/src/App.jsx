import { useState } from 'react'

const tips = 
[
  {
    titulo: '💻 Practicá código un poco todos los días.',
    detalle: 'La práctica constante ayuda a fijar conceptos y ganar confianza al programar.'
  },
  {
    titulo: '🧠 Leé los errores antes de buscar ayuda.',
    detalle: 'Los mensajes de error suelen indicar exactamente dónde está el problema.'
  },
  {
    titulo: '📝 Dividí un problema grande en pasos pequeños.',
    detalle: 'Resolver partes pequeñas hace más fácil entender y programar la solución completa.'
  },
  {
    titulo: '📚 Comentá tu código para entenderlo mejor.',
    detalle: 'Los comentarios te ayudan a recordar qué hace cada parte del programa.'
  },
  {
    titulo: '🚀 Probá aunque no estés segura del resultado.',
    detalle: 'Experimentar y equivocarse forma parte del aprendizaje en programación.'
  },
  {
    titulo: '💾 Guardá tus archivos antes de ejecutar.',
    detalle: 'Guardar evita perder cambios y permite probar siempre la última versión del código.'
  },
  {
    titulo: '🔍 No copies código sin comprenderlo.',
    detalle: 'Entender cada línea te ayuda a aprender y resolver problemas sola.'
  },
  {
    titulo: '☕ La paciencia también es parte de programar.',
    detalle: 'Tomarse tiempo para pensar y descansar ayuda a encontrar soluciones.'
  }
]

function App() 
{
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(tips.length).fill(0))
  const [views, setViews] = useState(1)
  const [openTip, setOpenTip] = useState(null)
  const [hoverVote, setHoverVote] = useState(false)
  const [hoverNext, setHoverNext] = useState(false)

  const handleRandom = () => 
    {
      const randomIndex = Math.floor(Math.random() * tips.length)
      setSelected(randomIndex)
      setViews(v => views + 1)
    }

  const handleVote = () => 
  {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const maxVotes = Math.max(...votes)
  const winnerIndex = votes.reduce((bestIdx, val, idx, arr) =>
  val > arr[bestIdx] ? idx : bestIdx
, 0)

  return (
    <div style={{ 
      backgroundColor: 'linear-gradient (#f4e9dc, #e8d8c3)', 
      minHeight: '100vh', 
      padding: '20px', 
      fontFamily: 'Comic Sans Ms', 
      display: 'flex', 
      justifyContent: 'center' 
      }}>
      <div style={{ width: '800px' }}>
        <header style={{ 
          backgroundColor: '#a65f3c', 
          color: 'white', padding: '20px', 
          borderRadius: '10px', 
          textAlign: 'center', 
          marginBottom: '20px' 
          }}>
          <h1 style={{ 
            fontFamily: 'INK Free', 
            fontSize: '50px', 
            fontWeight: 'bold', 
            color: '#fff8dc', 
            textShadow: '2px 2px 0px #8d5524, 4px 4px 6px rgba(60, 30, 10, 0.6)', 
            WebkitTextStroke: '1px #f4e9dc' 
            }}>
            📚 Tips para Aprender Programación
           </h1>
          <p>Aprender paso a paso también es avanzar</p>
        </header>

        <div style={{ 
          backgroundColor: '#fffaf3', 
          padding: '20px', 
          borderRadius: '12px', 
          marginBottom: '20px' 
          }}>
          <h3>💡 Consejo actual</h3>
          <p>{tips[selected].titulo}</p>
          <p>👀 Consejos vistos: {views}</p>
          <p>⭐ Votos: {votes[selected]}</p>

          <button
            onClick={handleVote}
            onMouseEnter={() => setHoverVote(true)}
            onMouseLeave={() => setHoverVote(false)}
            style={{
              backgroundColor: hoverVote ? '#d98c4d' : '#c97b36',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              fontFamily: 'Comic Sans MS',
              borderRadius: '25px',
              marginRight: '10px',
              cursor: 'pointer',
              transform: hoverVote ? 'scale(1.08)' : 'scale(1)',
              transition: 'all 0.3s ease',
            }}
          >
            Votar consejo 👍
          </button>

          <button
            onClick={handleRandom}
            onMouseEnter={() => setHoverNext(true)}
            onMouseLeave={() => setHoverNext(false)}
            style={{
              backgroundColor: hoverNext ? '#a66a38' : '#8d5524',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              fontFamily: 'Comic Sans MS',
              borderRadius: '25px',
              cursor: 'pointer',
              transform: hoverNext ? 'scale(1.08)' : 'scale(1)',
              transition: 'all 0.3s ease',
            }}
          >
            Mostrar otro 📚
          </button>
        </div>

        <div style={{
          backgroundColor: '#fffaf3',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px',
          transition: 'all 0.5s ease',
          boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
       }}>
          <h3>📋 Consejos con explicación</h3>
          {tips.map((tip, index) => (
           <div key={index} style={{ marginBottom: '15px' }}>
             <div style={{ display: 'flex', alignItems: 'center' }}>
               <button
                onClick={() => setOpenTip(openTip === index ? null : index)}
                style={{
                  backgroundColor: openTip === index ? '#c97b36' : '#ecd5c5',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
              >
                {index + 1}
              </button>

              <span>{tip.titulo}</span>
            </div>

            {openTip === index && (
              <p style={{ 
                marginLeft: '40px', 
                color: '#7f5539', 
                marginTop: '8px' 
                }}>
                 {tip.detalle}
              </p>
            )}
          </div>
          ))}
        </div>

        <div style={{ 
          backgroundColor: '#fffaf3', 
          padding: '20px', 
          borderRadius: '12px' 
          }}>
          <h3>🏆 Consejo más votado</h3>
          {maxVotes === 0 ? <p>Todavía no hay votos</p> : <p>{tips[winnerIndex].titulo} — 🔥 {maxVotes} votos</p>}
        </div>
           <footer style=
           {{
              textAlign: 'center',
              marginTop: '20px',
              color: '#7f5539',
              fontWeight: 'bold'
           }}>
          Proyecto realizado por Susana – React UTN 💛
          </footer>
      </div>
    </div>
  )
}


export default App