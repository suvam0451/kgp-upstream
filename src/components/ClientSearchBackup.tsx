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
      selectedSanitizer: 'Lower Case' // HARD SET(params)
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
    this.setState({ searchQuery: e.target.value, searchResults: queryResult })
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
              />
              <Icon icon="search" className="search_icon" />
            </div>
          </form>
          <div>
            Number of items:
            {queryResults.length}
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                borderRadius: '4px',
                border: '1px solid #d3d3d3'
              }}
            >
              <thead style={{ border: '1px solid #808080' }}>
                <tr>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '5px',
                      fontSize: '14px',
                      fontWeight: 600,
                      borderBottom: '2px solid #d3d3d3',
                      cursor: 'pointer'
                    }}
                  >
                    Book ISBN
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '5px',
                      fontSize: '14px',
                      fontWeight: 600,
                      borderBottom: '2px solid #d3d3d3',
                      cursor: 'pointer'
                    }}
                  >
                    Book Title
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '5px',
                      fontSize: '14px',
                      fontWeight: 600,
                      borderBottom: '2px solid #d3d3d3',
                      cursor: 'pointer'
                    }}
                  >
                    Book Author
                  </th>
                </tr>
              </thead>
              <tbody>
                {queryResults.map((item: any) => {
                  return (
                    <tr key={`row_${item.isbn}`}>
                      <td
                        style={{
                          fontSize: '14px',
                          border: '1px solid #d3d3d3'
                        }}
                      >
                        {item.isbn}
                      </td>
                      <td
                        style={{
                          fontSize: '14px',
                          border: '1px solid #d3d3d3'
                        }}
                      >
                        {item.title}
                      </td>
                      <td
                        style={{
                          fontSize: '14px',
                          border: '1px solid #d3d3d3'
                        }}
                      >
                        {item.author}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
export default ClientSearch
