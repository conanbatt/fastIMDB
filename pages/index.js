import Layout from '../components/layout';
import React from 'react';
import Movie, { MovieThumb } from '../components/movie';
import Pagination from '../components/pagination';

import { searchMovies, parameterize } from '../utils/imdb';
import Router from 'next/router'

export default class extends React.Component {

  static async getInitialProps({ req, query }){
    //Code that fetches initial props here
    let def = query.query || "Jack Reacher"
    return {
      query: def,
      response: await searchMovies({query: def})
    }
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
    if(!query){
      this.setState({ query: query})
      return
    }
    clearTimeout(this.state.currentTimeout)
    let timeout = setTimeout(()=>{
      searchMovies({ query: query})
      .then(json => {
        Router.replace({pathname: "/", query: {query: this.state.query, page: this.state.page}})
        this.setState({ response: json, movies: json.results })
      })
    }, 100)
    this.setState({ query: query, currentTimeout: timeout })
  }

  render(){

    return(<Layout>
      <style jsx>{`
        .search {
            margin-bottom: 20px;
        }
        .jumbotron.bg-primary {
            background: #337ab7 !important;
            color: white;
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
              className="form-control input-lg" type="text"
              onChange={ (e)=> this.searchMovies(e)}
              placeholder="Movie title..."/>
            <span className="input-group-addon">
              <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
            </span>
          </div>

          <div className="movies">
            { this.state.movies.length == 0 ? <p class="lead">No results found for this query. </p> : null}
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