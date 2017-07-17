import Layout from '../components/layout';
import React from 'react';
import Movie, { MovieThumb } from '../components/movie';
import Pagination from '../components/pagination';

import { searchMovies } from '../utils/imdb';
import { debounce } from 'lodash';

export default class extends React.Component {

  static async getInitialProps({ req }){
    //Code that fetches initial props here
    return { query: "Jack Reacher", response: await searchMovies({query: "Jack Reacher"}) }
  }

  constructor(props){
    super(props)
    this.state = {
      query: props.query,
      movies: props.response.results,
      response: props.response,
      page: props.response.page,
    }
  }

  goToPage(i){
    this.setState({ page: i})
    searchMovies({ query: this.state.query, page: i}).then(json =>(
      this.setState({ response: json, movies: json.results, page: json.page })
    ))
  }

  searchMovies(e){
    let query = e.target.value
    clearTimeout(this.state.currentTimeout)
    let timeout = setTimeout(()=>{
      searchMovies({ query: query})
      .then(json => (
        this.setState({ response: json, movies: json.results })
      ))
    }, 100)
    this.setState({ query: query, currentTimeout: timeout })
  }

  render(){

    return(<Layout>
      <style jsx>{`
        .search {
            margin-bottom: 20px;
        }
        `}</style>
      <div className="index">
        <div className="container">
          <div className="jumbotron bg-primary">
            <h1 className="">Fast IMDB</h1>
            <p> Your one-stop shop for Movies </p>
          </div>

          <div className="input-group search">
            <input value={this.state.query}
              className="form-control" type="text"
              onChange={ (e)=> this.searchMovies(e)}
              placeholder="Movie title..."/>
            <span className="input-group-addon">
              <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
            </span>
          </div>

          <div className="movies">
            <div className="row">
              { this.state.movies.map((movie,i) =>{
                return <MovieThumb key={i} movie={movie}/>
              })}
            </div>
          </div>
          <div className="text-center">
            <Pagination currentPage={this.state.page} pages={this.state.response.total_pages} onPageChange={ (i)=>this.goToPage(i) }/>
          </div>
        </div>
      </div>
    </Layout>)
  }

}