
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { getListMoviesPreview, selectMoviesPreview } from "../redux/moviePreview/moviePreviewSlice"

export const MovieListPreview = () => {
    const {movies, error} = useAppSelector(selectMoviesPreview)
    const dispatch = useAppDispatch()
    console.log(error)
    return (<div>
        <button style={{width: '50px', height: '50px'}} onClick={() => dispatch(getListMoviesPreview({name: 'thor', page: 10}))}></button>
    </div>)
        

}