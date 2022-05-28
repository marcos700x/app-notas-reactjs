import { BsPalette } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useState } from 'react';

const Nota = ({titulo, texto, id, eliminarFunction, estilo, notaObj}) => {

  const [renderPaleta, setRenderPaleta] = useState(false);
  
  const colores = ['202124','#5C2B29','#614A19','#635D19','#345920','#16504B','#2D555E','#1E3A5F','#42275E','#5B2245'];
  const coloresBotones = [];
  for (let i = 0; i < colores.length; i++) {
    coloresBotones.push(
      <button key={i} className="colorBoton" style={{backgroundColor: `${colores[i]}`}} onClick={() => cambiarColores(colores[i], id)}></button>
    )
    
  }

const cambiarColores = (color, id) => {
  var colorAgregado = '';
  var notaSeleccionada = notaObj.filter(nota => nota.id === id)
   notaSeleccionada.forEach(nota => {
     nota.color = color;
     colorAgregado = nota.color;
   });
   localStorage.setItem("notas", JSON.stringify(notaObj));
  
  document.getElementById(id).style.backgroundColor = colorAgregado;
  document.getElementById(id).style.borderColor = (colorAgregado !== '202124' ? colorAgregado : '#5f6368')
}



return (

    <div className='nota' id={id} style={estilo}>
        <h1>{titulo ? titulo : 'Sin titulo'}</h1>
        <p>{texto ? texto : ''}</p>
        <div className="notaTools">
          <div className="contenedorBotones" style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
          <button onClick={() => setRenderPaleta(!renderPaleta)} className='botonMostrarPaleta' title='Opciones de fondo'>
            <BsPalette size={'1.2rem'} color='#DADCE0' style={{pointerEvents: 'none'}}/>
          </button>
          <button onClick={() => eliminarFunction(id) } >
            <RiDeleteBin6Line size={'1.2rem'} color='#DADCE0' title='Eliminar nota'/>
          </button>
          </div>
          {renderPaleta ?
            <div className="paletaColores">
      {coloresBotones}
        </div>
        : null
            }
        </div>
        
    </div>
  )
}

export default Nota