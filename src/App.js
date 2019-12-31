import React, { Component } from 'react';
import Characters from './components/characters';
import './App.css';
import Pagination from 'react-bootstrap/Pagination'
import PageItem from 'react-bootstrap/PageItem'

class App extends Component {
  state = {
    rickMortyCharacters: [],
    paginationList: [],
    searchText: '',
    searchResult: [],
  };
  active = 1;
  totalPages = 0;
  constructor() {
    super();
    this.pageChanged = this.pageChanged.bind(this);
    this.clickNext = this.clickNext.bind(this);
    this.clickPrev = this.clickPrev.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.searhTextClick = this.searhTextClick.bind(this);
  }
  createApiUrl() {
    return 'https://rickandmortyapi.com/api/character/?page=' + this.active;
  }
  componentDidMount() {
    this.fetchCharacterList();
  }
  fetchCharacterList() {
    fetch(this.createApiUrl())
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        this.totalPages = data.info.pages;
        this.setState({ searchResult: data.results, rickMortyCharacters: data.results, paginationList: this.createPagination(data.info.pages) });
      })
  }
  createPagination(pageLength) {
    let items = []
    for (let number = this.active; number <= this.active + 4 && number <= pageLength; number++) {
      items.push(
        <Pagination.Item key={number} active={number === this.active} onClick={this.pageChanged}>
          {number}
        </Pagination.Item>,
      );
    }
    return items;
  }
  pageChanged(event) {
    this.active = Number(event.target.text);
    this.fetchCharacterList();
  }
  clickNext() {
    if (this.active < this.totalPages) {
      this.active += 1;
      this.fetchCharacterList();
    }
  }
  clickPrev() {
    if (this.active > 1) {
      this.active -= 1;
      this.fetchCharacterList();
    }
  }
  sortByIDAsc() {
    this.setState({rickMortyCharacters: this.state.rickMortyCharacters.sort((a, b) => (a.id - b.id))});
  }

  sortByIDDesc() {
    this.setState({rickMortyCharacters: this.state.rickMortyCharacters.sort((a, b) => (b.id - a.id))});
  }
  onChange(event) {
    const id = event.nativeEvent.target.selectedIndex;
    if (event.nativeEvent.target[id].value === 'asc') {
      this.sortByIDAsc();
    } else if (event.nativeEvent.target[id].value === 'desc') {
      this.sortByIDDesc();
    }
  }
  onSearchChange(event){
    this.setState({searchText:event.target.value});
    if(!event.target.value){
      this.setState({rickMortyCharacters: this.state.searchResult});
    }
  }
  searhTextClick(){
    if(this.state.searchText){
      const searchedItem = this.state.searchResult.filter(el =>
        el.name.toLowerCase().includes(this.state.searchText)
      );
      this.setState({rickMortyCharacters: searchedItem});
    }
  }

  render() {
    return (
      <div className="App">
        <h6 className="padding-left">Search by Name</h6>
        <div className="row">
          <div className="col-6 padding-left">
            <input type="text" placeholder="Search text" onChange={this.onSearchChange}/>
            <button onClick={this.searhTextClick}>Search</button>
          </div>
          <div className="offset-4">
            <select onChange={this.onChange}>
              <option>Sort by ID</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        <Characters characters={this.state.rickMortyCharacters} />
        <footer>
          <div className="pagination-wrapper">
            <Pagination>
              <Pagination.Prev onClick={this.clickPrev} />
              {this.state.paginationList}
              <Pagination.Next onClick={this.clickNext} />
            </Pagination>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
