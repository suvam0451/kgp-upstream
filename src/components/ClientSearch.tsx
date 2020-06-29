import React, { Component } from 'react'
import * as JsSearch from 'js-search'
import { Icon } from '@blueprintjs/core'

// search
interface IBook {
  isbn: string
  title: string
  author: string
}

interface IClientSearchProps {
  books: IBook[]
  engine: {
    TitleIndex: boolean
    AuthorIndex: boolean
    SearchByTerm: boolean
    indexStrategy: string
    searchSanitizer: string
  }
  placeholder?: string
}
interface IClientSearchState {
  indexByTitle: boolean
  indexByAuthor: boolean
  selectedSanitizer: string
  termFrequency: boolean
  books: IBook[]
  search: any
  searchResults: Object[]
  isError: boolean
  searchQuery: string
  isLoading: boolean
  removeStopWords: boolean
  selectedStrategy: string
  searchResultVisible: boolean
}

import './special/searchbar.scss'
class ClientSearch extends Component<IClientSearchProps, IClientSearchState> {
  constructor(props: IClientSearchProps) {
    super(props)
    this.state = {
      books: [],
      isLoading: true,
      searchResults: [],
      search: [],
      isError: false,
      indexByTitle: true, // HARD SET(query)
      indexByAuthor: true, // HARD SET(query)
      termFrequency: true, // HARD SET(query)
      removeStopWords: false,
      searchQuery: '',
      selectedStrategy: 'Prefix match', // HARD SET(params)
      selectedSanitizer: 'Lower Case', // HARD SET(params)
      searchResultVisible: false
    }
  }
  /**
   * React lifecycle method that will inject the data into the state.
   */
  static getDerivedStateFromProps(nextProps: IClientSearchProps, prevState: IClientSearchState) {
    if (prevState.search === null) {
      const { engine } = nextProps
      console.log(engine.AuthorIndex, engine.TitleIndex)
      return {
        indexByTitle: engine.TitleIndex,
        indexByAuthor: engine.AuthorIndex,
        termFrequency: engine.SearchByTerm,
        selectedSanitizer: engine.searchSanitizer,
        selectedStrategy: engine.indexStrategy
      }
    }
    return null
  }
  async componentDidMount() {
    this.rebuildIndex()
  }

  /**
   * rebuilds the overall index based on the options
   */
  rebuildIndex = () => {
    const { selectedStrategy, selectedSanitizer, removeStopWords, termFrequency, indexByTitle, indexByAuthor } = this.state
    const { books } = this.props

    const dataToSearch = new JsSearch.Search('isbn')

    if (removeStopWords) {
      dataToSearch.tokenizer = new JsSearch.StopWordsTokenizer(dataToSearch.tokenizer)
    }
    /**
     * defines an indexing strategy for the data
     * read more about it here https://github.com/bvaughn/js-search#configuring-the-index-strategy
     */
    if (selectedStrategy === 'All') {
      dataToSearch.indexStrategy = new JsSearch.AllSubstringsIndexStrategy()
    }
    if (selectedStrategy === 'Exact match') {
      dataToSearch.indexStrategy = new JsSearch.ExactWordIndexStrategy()
    }
    if (selectedStrategy === 'Prefix match') {
      dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy()
    }

    /**
     * defines the sanitizer for the search
     * to prevent some of the words from being excluded
     */
    selectedSanitizer === 'Case Sensitive'
      ? (dataToSearch.sanitizer = new JsSearch.CaseSensitiveSanitizer())
      : (dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer())
    termFrequency === true
      ? (dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex('isbn'))
      : (dataToSearch.searchIndex = new JsSearch.UnorderedSearchIndex())

    console.log(indexByTitle, indexByAuthor)
    // sets the index attribute for the data
    if (indexByTitle) {
      dataToSearch.addIndex('title')
    }
    // sets the index attribute for the data
    if (indexByAuthor) {
      dataToSearch.addIndex('author')
    }

    dataToSearch.addDocuments(books) // adds the data to be searched

    this.setState({ search: dataToSearch, isLoading: false })
  }
  /**
   * handles the input change and perform a search with js-search
   * in which the results will be added to the state
   */
  searchData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { search } = this.state
    const queryResult: Object[] = search.search(e.target.value)

    // If the box is not empty
    if (e.target.value == '') {
      this.setState({ searchResultVisible: false })
    } else {
      this.setState({ searchResultVisible: true })
    }

    this.setState({ searchQuery: e.target.value, searchResults: queryResult })
  }

  inputFocusGained = (e: React.FocusEvent<HTMLInputElement>) => {
    let currentValue = e.target.value
    if (currentValue != '') {
      this.setState({ searchResultVisible: true })
    }
  }
  inputFocusLost = (e: React.FocusEvent<HTMLInputElement>) => {
    this.setState({ searchResultVisible: false })
  }

  handleSubmit = (e: any) => {
    e.preventDefault()
  }
  render() {
    const { searchResults, searchQuery } = this.state
    const { books } = this.props
    const queryResults = searchQuery === '' ? books : searchResults
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="container_search">
              <input
                id="Search"
                value={searchQuery}
                className="search_bar"
                onChange={this.searchData}
                placeholder={this.props.placeholder ? this.props.placeholder : 'Enter your search here'}
                style={{ margin: '0 auto', width: '400px' }}
                onFocus={this.inputFocusGained}
                onBlur={this.inputFocusLost}
              />
              <Icon icon="search" className="search_icon" />
            </div>
          </form>
          {this.state.searchResultVisible === true ? (
            <div className="container_result">
              <ul className="search_ac">
                Number of matches: {queryResults.length}
                {queryResults.map((item: any) => {
                  return (
                    <div className="search_output_single">
                      <a className="search_output_links">
                        <div>{item.title}</div>
                        <div className="lowemphasis">by {item.author}</div>
                        {item.title} <i className="lowemphasis">by {item.author}</i>
                      </a>
                    </div>
                  )
                })}
              </ul>
            </div>
          ) : (
            true
          )}
        </div>
      </div>
    )
  }
}
export default ClientSearch
