import React, { Component } from "react";
// import Navbar from './Navbar'
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=92432247195e4a7a8deb711adab94be2&page=1&pagesize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      val: parsedData.totalResults,
      loading: false,
    });
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  handleNextClick = async () => {
    // console.log('Next is clicked')
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&category=${
      this.props.category
    }&apiKey=92432247195e4a7a8deb711adab94be2&page=${
      this.state.page + 1
    }&pagesize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();

    if (this.state.val - this.props.pageSize > 0) {
      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1,
        val: this.state.val - this.props.pageSize,
        loading: false,
      });
    }
  };

  handlePrevClick = async () => {
    console.log("Prev is clicked");

    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=92432247195e4a7a8deb711adab94be2&page=${
      this.state.page - 1
    }&pagesize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false,
    });
  };

  fetchData=async ()=>{

    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&category=${
      this.props.category
    }&apiKey=92432247195e4a7a8deb711adab94be2&page=${
      this.state.page + 1
    }&pagesize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();

    if (this.state.val - this.props.pageSize > 0) {
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        page: this.state.page + 1,
        val: this.state.val - this.props.pageSize,
        loading: false,
      });
    }
      
  }

  render() {
    return (
        <>

  
        <h2 className="text-center my-2">News Monkey-Top Headlines</h2>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchData}
          hasMore={this.state.articles.length!==this.state.val}
          loader={<Spinner/>}>
              <div className="container">
          <div className="row my-4">
            {
              this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageURL={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fgreatdemo.com%2Fwhy-like-a-news-article%2F&psig=AOvVaw0LSxwqzRSVE4-3l8G_c0zA&ust=1648823271771000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKDlqr7H8PYCFQAAAAAdAAAAABAD"
                      }
                      newsURL={element.url}
                      author={element.author}
                      publish={element.publishedAt}
                    />
                  </div>
                );
              })}
          </div>
          </div>
        </InfiniteScroll>
        </>

    );
  }
}
