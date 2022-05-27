import './App.scss';
import { useEffect, useState } from 'react'
import {v4 as uuidv4} from 'uuid';
import Nota from './components/Nota'
import { MdAdd } from 'react-icons/md';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { BsViewList } from 'react-icons/bs';
import { IoGridOutline } from 'react-icons/io5';

function App () {

const [notas, setNotas] = useState([]);

const [renderAgregarNota, setRenderAgregarNota] = useState(false);
const [notasColumn_Row, setNotasColumn_Row] = useState(true);
const [consultaNotas, setConsultaNotas] = useState('');
const [notasFiltradas, setNotasFiltradas] = useState([])



useEffect(() => {
    let data = localStorage.getItem("notas");
    if(data === '[]'){
        setNotas([{id: "idTest", titulo: 'Bienvenido', texto: 'Esta es  una nota de ejemplo, puedes borrarla cuando quieras', color: '#2D555E'}])
    }else{
        setNotas(JSON.parse(data))
    }
},[ ])

useEffect(() =>{
    localStorage.setItem("notas", JSON.stringify(notas))
}, [notas])

const crearNota = () =>{

    var tituloNota = document.querySelector('.inputTitulo_AgregarNota').value;
    var textoNota = document.querySelector('.inputText_AgregarNota').textContent;
    var colorNota = '';

    const notaObj = {
        id: uuidv4(),
        titulo: tituloNota,
        texto: textoNota,
        color: colorNota,
    }
    agregarNota(notaObj);
}
const agregarNota = (nota) => {
    var notasNuevas = [nota, ...notas];
    setNotas(notasNuevas);


    document.querySelector('.inputTitulo_AgregarNota').value = '';
    document.querySelector('.inputText_AgregarNota').textContent = '';

}
const eliminarNota = (id) => {
    var notasActualizadas = notas.filter(notas => notas.id !== id);
    var NotaHTML = document.getElementById(id)
    NotaHTML.style = `height: 0px; width: 0px; padding: 0px; overflow: hidden; border: none; margin: 0; opacity: 0;`
    setTimeout(() => {
        setNotas(notasActualizadas); 
    }, 300);
        
    
}
const eliminarTodas = () =>{
    setNotas([])
}
const buscarNotas = (e) =>{

setConsultaNotas((e.target.value))

var notasBuscadas = notas.filter(nota => {
    for (let i = 0; i < consultaNotas.length; i++) {
        var notasEncontradas =  nota.titulo.charAt(i) === consultaNotas.charAt(i);
    }
    return notasEncontradas;
})
setNotasFiltradas(notasBuscadas)
}

  return (
    <div className='App'>
        <nav>
            <div style={{display: 'flex', alignItems: 'center', gap: '2rem'}}>
            <h1>Notas</h1>
            <input type="search" onChange={(e) => buscarNotas(e) } placeholder='Buscar tus notas por titulo'/>
            </div>

            <div className="botonesNav">
                <button onClick={() => setNotasColumn_Row(!notasColumn_Row)} title={notasColumn_Row ? 'Vista de lista' : 'Vista de cuadricula'}>
                {notasColumn_Row ? <BsViewList color='#e8eaed' size={'1.5rem'}/> : <IoGridOutline color='#e8eaed' size={'1.5rem'}/>}
                </button>
                <button onClick={() => eliminarTodas()} title='Eliminar todo'>
                <RiDeleteBin5Line color='#e8eaed' size={'1.5rem'}/>
                </button>
            </div>
        </nav>
        {!renderAgregarNota ? 
        <div onClick={() => setRenderAgregarNota(!renderAgregarNota)} className="contenedorCrearNota">
            Crear nota
            <MdAdd color='#e8eaed' size='1.5rem'/>
        </div>
        : null
}
{
    renderAgregarNota ?
    <div className="contenedorAgregarNota">
        <input type="text"  placeholder='Titulo' className='inputTitulo_AgregarNota'/>
        <div contentEditable='true' placeholder='Crear una nota...'  className='inputText_AgregarNota'/>
        <div style={{display: 'flex', justifyContent: 'flex-end', alignItems:'center', padding: '0 0.5rem', gap: '0.5rem'}}>
        <button onClick={crearNota}>Agregar</button>
        <button onClick={() => setRenderAgregarNota(!renderAgregarNota)}>Cerrar</button>
        </div>
    </div>
    : null
}
<div className="contenedorNotas" style={notasColumn_Row ? null : {flexDirection: 'column', alignItems: 'center'}}>
{consultaNotas === '' ?
    notas.map((nota) => 
    <Nota
    estilo = {notasColumn_Row ? {backgroundColor: nota.color, borderColor: nota.color} : {width: '700px', margin: '1rem', backgroundColor: nota.color, borderColor: nota.color}}
    titulo = {nota.titulo}
    texto = {nota.texto}
    key={nota.id}
    id={nota.id}
    eliminarFunction = {eliminarNota}
    color = {nota.color}
    notaObj = {notas}
    />
    )
    :
    notasFiltradas.map(notaFiltrada =>
    <Nota
    estilo = {notasColumn_Row ? {backgroundColor: notaFiltrada.color, borderColor: notaFiltrada.color} : {width: '700px', margin: '1rem', backgroundColor: notaFiltrada.color, borderColor: notaFiltrada.color}}
    titulo ={notaFiltrada.titulo}
    texto = {notaFiltrada.texto}
    key = {notaFiltrada.id}
    id = {notaFiltrada.id}
    eliminarFunction = {eliminarNota}
    color = {notaFiltrada.color}
    notaObj = {notasFiltradas}
    />
    )
}
</div>
    </div>
  )
}

export default App