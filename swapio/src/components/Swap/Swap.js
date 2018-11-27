import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Swap.css'
import { Card, CardText, CardBody,
  CardTitle, CardSubtitle} from 'reactstrap';

class Swap extends Component {
  render() {
    const swap = this.props.swap
    return (
      <div>
      <Card>
        <CardBody>
          <CardTitle>There is a swap!</CardTitle>
          <CardSubtitle>{(swap.theirItem).title}</CardSubtitle>
        </CardBody>
        <img width="30%" src={(swap.theirItem).imgurl || "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"} alt="Card" />
        <CardBody>
          <CardText>Traded for: {(swap.yourItem).title}</CardText>
          <CardText>Trade with user: {(swap.swapWithUser).email}</CardText>
          <Link to={`/item/${(swap.theirItem)._id}`}>See item</Link> {'   '}
        </CardBody>
      </Card>
    </div>
    )
  }
}

export default Swap