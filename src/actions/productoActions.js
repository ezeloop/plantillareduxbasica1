import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR 
} from '../types'

import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'

//crear nuevos productos
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto());

        try {
            //insertar en la api
           await clienteAxios.post('/productos', producto)

            //si todo sale bien, actualizar el state
            dispatch(agregarProductoExito(producto))

            //alerta
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )
        } catch (error) {
            //si hay un error. cambiar el state
            dispatch(agregarProductoError(true))

            //alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intente de nuevo'
            })
        }
    }
}   
const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})
//ahora la uso en el componente, me voy a nuevo producto

//como modificare el state, entonces si lelva payload
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})


//func que descarga los productos de la bd
export function obtenerProductosAction(){
    return async (dispatch) => {
        dispatch( descargarProductos() )

        try {
            //con esto es para demorar 3 seg la respuesta de la api
           /*  setTimeout(async () => {
                const respuesta = await clienteAxios.get('/productos')
                dispatch( descargaProductosExitosa (respuesta.data))
            }, 3000); */
            const respuesta = await clienteAxios.get('/productos')
            dispatch( descargaProductosExitosa (respuesta.data))
           
        } catch (error) {
            console.log(error)
            dispatch( descargaProductosError())
            //aca le creo un error en particular, porque el fake server tira errores raros de leer
            
        }
    }

}

const descargarProductos = () => ({
        type: COMENZAR_DESCARGA_PRODUCTOS,
        payload: true
})

const descargaProductosExitosa = (productos) => ({
        type: DESCARGA_PRODUCTOS_EXITO,
        payload: productos
})

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

//selecciona y elimina el prod
export function borrarProductoAction(id){
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id))

        try {
            await clienteAxios.delete(`/productos/${id}`)
            dispatch( eliminarProductoExito() )

            //si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado!',
                'El producto se eliminó correctamente.',
                'success'
              )
        } catch (error) {
            console.log(error)
            dispatch( eliminarProductoError() )
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO,
    
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})

export function obtenerProductoEditar(producto) {
    return(dispatch) => {
        dispatch(obtenerProductoEditarAction(producto))
    }
}
const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

//edita un registro en la api y state
export function editarProductoAction(producto){
    return async (dispatch) => {
        dispatch( editarProducto() )

        try {
            await clienteAxios.put(`productos/${producto.id}`, producto)
            dispatch( editarProductoExito(producto))
        } catch (error) {
            console.log(error)
            dispatch( editarProductoError ())
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO,
})

const editarProductoExito = (producto) => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})


//los actions van entre parentesis