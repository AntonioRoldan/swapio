import React, { Component } from 'react'
import './Swap.css'
import { Card, CardText, CardBody, CardLink,
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
          <CardLink href="#">See item</CardLink> {'   '}
        </CardBody>
      </Card>
    </div>
    )
  }
}

export default Swap