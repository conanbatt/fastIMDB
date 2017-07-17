import { imageUrl } from '../utils/imdb';

export default ({movie})=> (
  <div className="panel panel-default">
    <div className="panel-body">
      <div className="row">
        <div className="col-md-3 col-lg-3 col-sm-3">
          <img src={imageUrl(movie.poster_path)} className="img-responsive"/>
        </div>
        <div className="col-md-9 col-lg-9 col-sm-9">
          <h3> { movie.title } </h3>
          <div>{movie.vote_count} Votes</div>
          <div> {movie.vote_average} rating</div>
          <p> { movie.overview } </p>
        </div>
      </div>
    </div>
  </div>
)

export const MovieThumb = ({movie}) =>(
  <div className="col-md-3 col-lg-3 col-sm-4">
    <style jsx>{`
      .description {
          height: 80px;
          overflow: hidden;
      }
      .image {
          height: 315px;
      }
      .movie_title {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
      }
    `}</style>
    <div className="thumbnail">
      <img src={imageUrl(movie.poster_path)} className="img-responsive image"/>
      <div className="caption">
        <h4 className="movie_title"> { movie.title } </h4>
        <p className="text-muted">
          <span> { movie.vote_count } Votes | { movie.vote_average } rating </span>
        </p>
        <p className="description"> { movie.overview } </p>
      </div>
    </div>
  </div>
)